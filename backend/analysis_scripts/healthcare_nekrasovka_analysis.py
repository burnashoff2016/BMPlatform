import math
from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def run() -> None:
    facilities = pd.read_csv(DATA_DIR / "healthcare_nekrasovka_points.csv")
    districts = pd.read_csv(DATA_DIR / "healthcare_nekrasovka_population.csv")
    total_pop = districts["population"].sum()
    uncovered = 0
    for _, district in districts.iterrows():
        min_distance = min(
            haversine(district["lat"], district["lon"], f["lat"], f["lon"]) for _, f in facilities.iterrows()
        )
        if min_distance > 1.2:
            uncovered += district["population"]
        print(f"{district['microdistrict']}: ближайшая точка в {min_distance:.2f} км")
    coverage = (1 - uncovered / total_pop) * 100
    print(f"Доля населения в радиусе 1,2 км: {coverage:.1f}%")


if __name__ == "__main__":
    run()
