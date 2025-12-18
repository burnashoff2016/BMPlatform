"""Generate healthcare accessibility assets for Nekrasovka (Moscow)."""

from __future__ import annotations

import json
from pathlib import Path

import folium
import geopandas as gpd
import networkx as nx
import osmnx as ox
from shapely.geometry import Polygon

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "nekrasovka"
STATIC_DIR = BASE_DIR / "static"

DATA_DIR.mkdir(parents=True, exist_ok=True)
STATIC_DIR.mkdir(parents=True, exist_ok=True)

PLACE_NAME = "Некрасовка, Москва, Россия"
ISO_TIMES = [5, 10, 15, 20]
PEDESTRIAN_SPEED_KMPH = 5


def download_boundary() -> gpd.GeoDataFrame:
    print("Downloading boundary…")
    boundary = ox.geocode_to_gdf(PLACE_NAME)
    return boundary.to_crs(epsg=4326)


def download_graph(boundary: gpd.GeoDataFrame) -> nx.MultiDiGraph:
    print("Downloading pedestrian graph…")
    polygon = boundary.geometry.iloc[0]
    graph = ox.graph_from_polygon(polygon, network_type="walk")
    graph = ox.add_edge_speeds(graph)
    for _, _, data in graph.edges(data=True):
        data["speed_kph"] = PEDESTRIAN_SPEED_KMPH
        length = data.get("length", 0)
        data["travel_time"] = length / (PEDESTRIAN_SPEED_KMPH * 1000 / 60)
    return graph


def download_facilities(boundary: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    print("Downloading healthcare POI…")
    tags = {"amenity": ["hospital", "clinic", "doctors"], "healthcare": True}
    polygon = boundary.geometry.iloc[0]
    gdf = ox.features_from_polygon(polygon, tags)
    if gdf.empty:
        raise RuntimeError("No healthcare features found in the specified area")

    utm_crs = boundary.estimate_utm_crs()
    gdf = gdf.to_crs(utm_crs).reset_index()
    gdf["geometry"] = gdf.geometry.centroid
    gdf = gdf.to_crs(epsg=4326)

    cols = [c for c in ["osmid", "index", "name", "amenity", "healthcare", "geometry"] if c in gdf.columns]
    gdf = gdf[cols]
    if "osmid" not in gdf.columns and "index" in gdf.columns:
        gdf = gdf.rename(columns={"index": "osmid"})
    gdf["facility_id"] = gdf.get("osmid", gdf.index)
    return gdf


def make_isochrones(graph_proj: nx.MultiDiGraph, center_node: int) -> list[Polygon]:
    isochrones: list[Polygon] = []
    for minutes in ISO_TIMES:
        meters = (PEDESTRIAN_SPEED_KMPH * 1000 / 60) * minutes
        subgraph = nx.ego_graph(graph_proj, center_node, radius=meters, distance="length")
        nodes = ox.graph_to_gdfs(subgraph, edges=False)
        if nodes.empty:
            continue
        polygon = nodes.union_all().convex_hull
        isochrones.append(polygon)
    return isochrones


def build_isochrones(
    graph_proj: nx.MultiDiGraph,
    facilities_wgs: gpd.GeoDataFrame,
    boundary_proj: gpd.GeoDataFrame,
) -> tuple[gpd.GeoDataFrame, dict[int, Polygon], Polygon, dict[str, object]]:
    print("Building isochrone polygons…")
    facilities_proj = facilities_wgs.to_crs(graph_proj.graph["crs"])
    records: list[dict[str, object]] = []
    coverage_layers: dict[int, list[Polygon]] = {t: [] for t in ISO_TIMES}

    for (_, row_wgs), (_, row_proj) in zip(facilities_wgs.iterrows(), facilities_proj.iterrows()):
        node = ox.distance.nearest_nodes(graph_proj, row_proj.geometry.x, row_proj.geometry.y)
        polygons = make_isochrones(graph_proj, node)
        for time_min, poly in zip(ISO_TIMES, polygons):
            coverage_layers[time_min].append(poly)
            records.append(
                {
                    "facility_id": row_wgs.get("facility_id", row_wgs.get("osmid", row_wgs.name)),
                    "name": row_wgs.get("name", ""),
                    "amenity": row_wgs.get("amenity", ""),
                    "time_min": time_min,
                    "geometry": poly,
                }
            )

    iso_gdf = gpd.GeoDataFrame(records, crs=graph_proj.graph["crs"]).to_crs(epsg=4326)

    boundary_poly_proj = boundary_proj.geometry.iloc[0]
    boundary_area = boundary_poly_proj.area
    coverage_unions_wgs: dict[int, Polygon] = {}
    coverage_percent: dict[int, float] = {}
    coverage_area: dict[int, float] = {}
    union_proj_lookup: dict[int, Polygon] = {}

    for minutes, polys in coverage_layers.items():
        if polys:
            union_proj = gpd.GeoSeries(polys, crs=graph_proj.graph["crs"]).union_all()
            union_proj_lookup[minutes] = union_proj
            union_proj_boundary = gpd.GeoSeries([union_proj], crs=graph_proj.graph["crs"]).to_crs(boundary_proj.crs).iloc[0]
            coverage_area[minutes] = round(union_proj_boundary.area / 1_000_000, 2)
            coverage_percent[minutes] = round((union_proj_boundary.area / boundary_area) * 100, 1)
            coverage_unions_wgs[minutes] = (
                gpd.GeoSeries([union_proj], crs=graph_proj.graph["crs"]).to_crs(epsg=4326).iloc[0]
            )
        else:
            coverage_area[minutes] = 0
            coverage_percent[minutes] = 0
            coverage_unions_wgs[minutes] = None

    union_20_proj = union_proj_lookup.get(ISO_TIMES[-1])
    if union_20_proj is not None:
        white_proj = boundary_poly_proj.difference(union_20_proj)
        white_spots_percent = round((white_proj.area / boundary_area) * 100, 1)
        white_spots_area = round(white_proj.area / 1_000_000, 2)
        white_spots_wgs = gpd.GeoSeries([white_proj], crs=boundary_proj.crs).to_crs(epsg=4326).iloc[0]
    else:
        white_spots_percent = 100.0
        white_spots_area = round(boundary_area / 1_000_000, 2)
        white_spots_wgs = boundary_proj.to_crs(epsg=4326).geometry.iloc[0]

    stats = {
        "total_facilities": int(len(facilities_wgs)),
        "coverage_area_km2": coverage_area,
        "coverage_percent": coverage_percent,
        "white_spots_area_km2": white_spots_area,
        "white_spots_percent": white_spots_percent,
    }

    return iso_gdf, coverage_unions_wgs, white_spots_wgs, stats


def save_geojson(gdf: gpd.GeoDataFrame, path: Path) -> None:
    gdf.to_file(path, driver="GeoJSON")
    print(f"Saved {path}")


def save_stats(data: dict[str, object], path: Path) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {path}")


def build_map(
    boundary: gpd.GeoDataFrame,
    facilities: gpd.GeoDataFrame,
    coverage_unions: dict[int, Polygon],
    white_spots: Polygon,
) -> None:
    centroid = boundary.geometry.iloc[0].centroid
    fmap = folium.Map(location=[centroid.y, centroid.x], zoom_start=13, tiles="cartodbpositron")

    folium.GeoJson(boundary.__geo_interface__, style_function=lambda _: {"fill": False, "color": "#6366f1"}).add_to(fmap)

    palette = {
        5: ("#22c55e", 0.45),
        10: ("#84cc16", 0.35),
        15: ("#f97316", 0.25),
        20: ("#ef4444", 0.15),
    }
    for time_min, geometry in coverage_unions.items():
        if geometry is None:
            continue
        color, opacity = palette[time_min]
        folium.GeoJson(
            geometry.__geo_interface__,
            name=f"Изохрона {time_min} мин",
            style_function=lambda _, col=color, op=opacity: {
                "fillColor": col,
                "color": col,
                "fillOpacity": op,
                "weight": 1,
            },
        ).add_to(fmap)

    folium.GeoJson(
        white_spots.__geo_interface__,
        name="Белые пятна",
        style_function=lambda _: {
            "fillColor": "#ffffff",
            "color": "#94a3b8",
            "fillOpacity": 0.35,
            "dashArray": "4 6",
            "weight": 1,
        },
    ).add_to(fmap)

    for _, row in facilities.iterrows():
        folium.CircleMarker(
            location=[row.geometry.y, row.geometry.x],
            radius=4,
            color="#312e81",
            fill=True,
            fill_color="#1d4ed8",
            popup=row.get("name", row.get("amenity", "")),
        ).add_to(fmap)

    map_path = STATIC_DIR / "nekrasovka_health_map.html"
    fmap.save(map_path)
    print(f"Saved {map_path}")


def main() -> None:
    boundary = download_boundary()
    boundary_proj = boundary.to_crs(boundary.estimate_utm_crs())
    graph = download_graph(boundary)
    graph_proj = ox.project_graph(graph)
    facilities = download_facilities(boundary)

    save_geojson(boundary, DATA_DIR / "boundary.geojson")
    save_geojson(facilities, DATA_DIR / "health_facilities.geojson")

    iso_gdf, coverage_unions, white_spots, stats = build_isochrones(graph_proj, facilities, boundary_proj)
    save_geojson(iso_gdf, DATA_DIR / "health_isochrones.geojson")
    save_stats(stats, DATA_DIR / "coverage_stats.json")

    build_map(boundary, facilities, coverage_unions, white_spots)


if __name__ == "__main__":
    main()
