import csv
import json
from pathlib import Path
from typing import Dict, List

import pandas as pd
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session

from auth import get_current_user, router as auth_router
from models import User as UserModel


def get_current_user_disabled(db: Session = Depends(get_db)):
    """
    Функция для временного отключения аутентификации.
    Создаёт или возвращает пользователя с фиксированным именем.
    """
    
    # Проверяем, существует ли уже пользователь с именем "anonymous"
    user = db.query(UserModel).filter(UserModel.username == "anonymous").first()
    
    if not user:
        # Создаём пользователя, если его нет
        user = UserModel(
            username="anonymous",
            email="anonymous@example.com",
            full_name="Anonymous User",
            hashed_password=""  # Пустой пароль для анонимного пользователя
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user
from config import ALLOWED_ORIGINS, DATA_DIR, STATIC_DIR
from database import get_db, init_db
from models import Task, User
from schemas import (
    CrowdsourcingRoadsForm,
    KpiSuzdalFeedbackForm,
    MonitoringKostromaForm,
    NNGorodIdeyForm,
    TaskOut,
)

app = FastAPI(title="Цифровое государство: учебный портал кейсов")
app.include_router(auth_router)

NEKRASOVKA_DIR = DATA_DIR / "nekrasovka"

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    init_db()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    STATIC_DIR.mkdir(parents=True, exist_ok=True)
    NEKRASOVKA_DIR.mkdir(parents=True, exist_ok=True)


def append_csv_row(file_path: Path, fieldnames: List[str], payload: Dict[str, str]) -> None:
    file_exists = file_path.exists()
    with file_path.open("a", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(payload)


@app.get("/api/tasks", response_model=List[TaskOut])
def list_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_disabled),
) -> List[TaskOut]:
    tasks = db.query(Task).order_by(Task.task_number).all()
    return [TaskOut.model_validate(task) for task in tasks]


@app.get("/api/tasks/{slug}", response_model=TaskOut)
def get_task(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_disabled),
) -> TaskOut:
    task = db.query(Task).filter(Task.slug == slug).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return TaskOut.model_validate(task)


@app.post("/api/forms/monitoring-kostroma")
def submit_monitoring_form(
    payload: MonitoringKostromaForm,
    current_user: User = Depends(get_current_user_disabled),
) -> JSONResponse:
    file_path = DATA_DIR / "monitoring_kostroma_responses.csv"
    append_csv_row(
        file_path,
        ["age", "gender", "employment_type", "life_quality_score", "intent_to_leave", "comment"],
        payload.model_dump(),
    )
    return JSONResponse({"status": "ok"})


@app.post("/api/forms/crowdsourcing-roads")
def submit_crowdsourcing_form(
    payload: CrowdsourcingRoadsForm,
    current_user: User = Depends(get_current_user_disabled),
) -> JSONResponse:
    file_path = DATA_DIR / "crowdsourcing_roads_responses.csv"
    append_csv_row(file_path, ["district", "issue_type", "description", "priority"], payload.model_dump())
    return JSONResponse({"status": "ok"})


@app.post("/api/forms/nn-gorod-idey")
def submit_nn_ideas_form(
    payload: NNGorodIdeyForm,
    current_user: User = Depends(get_current_user_disabled),
) -> JSONResponse:
    file_path = DATA_DIR / "nn_gorod_idey_ideas.csv"
    append_csv_row(file_path, ["category", "title", "description", "expected_impact"], payload.model_dump())
    return JSONResponse({"status": "ok"})


@app.post("/api/forms/kpi-suzdal")
def submit_kpi_feedback(
    payload: KpiSuzdalFeedbackForm,
    current_user: User = Depends(get_current_user_disabled),
) -> JSONResponse:
    file_path = DATA_DIR / "kpi_suzdal_feedback.csv"
    append_csv_row(
        file_path,
        ["service_name", "month", "wait_time_minutes", "satisfaction_score", "comment"],
        payload.model_dump(),
    )
    return JSONResponse({"status": "ok"})


@app.get("/api/data/monitoring-kostroma")
def monitoring_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    df = pd.read_csv(DATA_DIR / "monitoring_kostroma_responses.csv")
    rating_counts = (
        df["life_quality_score"].value_counts().sort_index().reset_index(name="count").rename(columns={"index": "score"})
    )
    intent_share = round((df[df["intent_to_leave"] == "Планирую уехать"].shape[0] / len(df)) * 100, 1)
    average_score = round(df["life_quality_score"].mean(), 1)
    return {
        "average_score": average_score,
        "intent_share": intent_share,
        "ratings_distribution": rating_counts.to_dict(orient="records"),
    }


@app.get("/api/data/crowdsourcing-roads")
def crowdsourcing_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    df = pd.read_csv(DATA_DIR / "crowdsourcing_roads_responses.csv")
    by_issue = df["issue_type"].value_counts().reset_index(name="count").rename(columns={"index": "issue_type"})
    by_district = df["district"].value_counts().reset_index(name="count").rename(columns={"index": "district"})
    return {
        "issues_by_type": by_issue.to_dict(orient="records"),
        "issues_by_district": by_district.to_dict(orient="records"),
    }


@app.get("/api/data/kpi-suzdal")
def kpi_suzdal_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    df = pd.read_csv(DATA_DIR / "kpi_suzdal_monthly.csv")
    return {"monthly": df.to_dict(orient="records")}


@app.get("/api/data/digital-inequality")
def digital_inequality_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    df = pd.read_csv(DATA_DIR / "digital_inequality_regions.csv")
    return {"regions": df.to_dict(orient="records")}


@app.get("/api/digital_inequality/report")
def get_digital_inequality_report(
    current_user: User = Depends(get_current_user_disabled),
):
    """Return the digital inequality analysis report"""
    import pickle
    from sklearn.linear_model import LinearRegression
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import r2_score, mean_squared_error
    
    # Load the model
    model_path = Path(__file__).parent / "digital_inequality_model.pkl"
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    
    # Load the data
    df = pd.read_csv(DATA_DIR / "digital_inequality_regions.csv")
    feature_columns = ["gdp_per_capita_k", "urban_share", "education_index", "elderly_share", 
                       "unemployment_rate", "internet_penetration", "infrastructure_exp_per_cap"]
    X = df[feature_columns]
    y = df["digital_inequality_index"]
    
    # Split into train/test sets (80/20) for proper evaluation
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train a model on the training set for proper evaluation
    model_train_test = LinearRegression()
    model_train_test.fit(X_train, y_train)
    
    # Make predictions on the test set for metrics
    y_pred = model_train_test.predict(X_test)
    
    # Calculate metrics on test set
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = mse ** 0.5
    
    # Use the full model for coefficients and other data
    full_y_pred = model.predict(X)  # Use the loaded model for predictions
    
    # Calculate coefficients with feature names
    coefficients = []
    for feature, coef in zip(feature_columns, model.coef_):
        coefficients.append({
            "feature": feature,
            "coefficient": float(coef),
            "abs_coefficient": abs(float(coef))
        })
    
    # Define scenarios using model coefficients directly
    optimistic_pred = (
        model.coef_[0] * 1000 +  # gdp_per_capita_k
        model.coef_[1] * 0.9 +   # urban_share
        model.coef_[2] * 0.9 +   # education_index
        model.coef_[3] * 0.15 +  # elderly_share
        model.coef_[4] * 0.05 +  # unemployment_rate
        model.coef_[5] * 0.95 +  # internet_penetration
        model.coef_[6] * 70 +    # infrastructure_exp_per_cap
        model.intercept_         # intercept
    )
    
    pessimistic_pred = (
        model.coef_[0] * 500 +   # gdp_per_capita_k
        model.coef_[1] * 0.6 +   # urban_share
        model.coef_[2] * 0.5 +   # education_index
        model.coef_[3] * 0.35 +  # elderly_share
        model.coef_[4] * 0.12 +  # unemployment_rate
        model.coef_[5] * 0.5 +   # internet_penetration
        model.coef_[6] * 30 +    # infrastructure_exp_per_cap
        model.intercept_         # intercept
    )
    
    scenario_predictions = {
        "optimistic": {
            "name": "Оптимистичный",
            "values": {
                "gdp_per_capita_k": 1000,
                "urban_share": 0.9,
                "education_index": 0.9,
                "elderly_share": 0.15,
                "unemployment_rate": 0.05,
                "internet_penetration": 0.95,
                "infrastructure_exp_per_cap": 70
            },
            "prediction": float(optimistic_pred)
        },
        "pessimistic": {
            "name": "Пессимистичный",
            "values": {
                "gdp_per_capita_k": 500,
                "urban_share": 0.6,
                "education_index": 0.5,
                "elderly_share": 0.35,
                "unemployment_rate": 0.12,
                "internet_penetration": 0.5,
                "infrastructure_exp_per_cap": 30
            },
            "prediction": float(pessimistic_pred)
        }
    }
    
    # Prepare data for charts using full dataset predictions
    chart_data = []
    for actual, predicted in zip(y.tolist(), full_y_pred.tolist()):
        chart_data.append({
            "actual": actual,
            "predicted": predicted
        })
    
    coefficient_chart_data = []
    for item in coefficients:
        coefficient_chart_data.append({
            "feature": item["feature"],
            "value": item["abs_coefficient"]
        })
    
    return {
        "model_stats": {
            "r2": r2,
            "rmse": rmse,
            "intercept": float(model.intercept_)
        },
        "coefficients": coefficients,
        "scenarios": scenario_predictions,
        "chart_data": chart_data,
        "coefficient_chart_data": coefficient_chart_data
    }


@app.get("/api/digital_inequality/data")
def get_digital_inequality_data(
    current_user: User = Depends(get_current_user_disabled)
) -> FileResponse:
    """Return the digital inequality dataset as a file"""
    file_path = DATA_DIR / "digital_inequality_regions.csv"
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Dataset not found")
    return FileResponse(file_path, media_type='text/csv', filename='digital_inequality_data.csv')


@app.get("/api/digital_inequality/model")
def get_digital_inequality_model(
    current_user: User = Depends(get_current_user_disabled)
) -> FileResponse:
    """Return the digital inequality model file"""
    model_path = Path(__file__).parent / "digital_inequality_model.pkl"
    if not model_path.exists():
        raise HTTPException(status_code=404, detail="Model file not found")
    return FileResponse(model_path, media_type='application/octet-stream', filename='digital_inequality_model.pkl')


@app.get("/api/data/healthcare-nekrasovka")
def healthcare_nekrasovka_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    stats_path = NEKRASOVKA_DIR / "coverage_stats.json"
    facilities_path = NEKRASOVKA_DIR / "health_facilities.geojson"
    if not stats_path.exists() or not facilities_path.exists():
        raise HTTPException(status_code=404, detail="Набор данных Некрасовки не найден")

    stats = json.loads(stats_path.read_text(encoding="utf-8"))
    facilities_geojson = json.loads(facilities_path.read_text(encoding="utf-8"))
    facilities = []
    for feature in facilities_geojson.get("features", []):
        props = feature.get("properties", {})
        geometry = feature.get("geometry", {})
        coords = geometry.get("coordinates") or [None, None]
        facilities.append(
            {
                "name": props.get("name") or props.get("amenity", ""),
                "amenity": props.get("amenity", ""),
                "lat": coords[1] if len(coords) > 1 else None,
                "lon": coords[0] if coords else None,
            }
        )

    return {
        "stats": stats,
        "facilities": facilities,
        "map_path": "/static/nekrasovka_health_map.html",
    }


@app.get("/api/data/regional-digital-services")
def regional_digital_services_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    # Получаем данные из существующего источника
    from seed_data import generate_digital_services_summary
    data = generate_digital_services_summary()
    
    # Подготовляем точки для карты с цифровой зрелостью регионов
    regions_data = [
        {
            "name": "Санкт-Петербург",
            "maturity_index": data.get("st_petersburg", {}).get("maturity_index", 82.0),
            "services_count": data.get("st_petersburg", {}).get("digital_services_count", 120),
            "regulations_count": data.get("st_petersburg", {}).get("regulations_count", 28),
            "lat": data.get("st_petersburg", {}).get("lat", 59.9343),
            "lon": data.get("st_petersburg", {}).get("lon", 30.3351),
            "best_practices": data.get("st_petersburg", {}).get("best_practices", ["Единый стандарт данных услуг", "Омниканальность", "ИИ-помощь"])
        },
        {
            "name": "Свердловская область",
            "maturity_index": data.get("sverdlovsk", {}).get("maturity_index", 75.0),
            "services_count": data.get("sverdlovsk", {}).get("digital_services_count", 105),
            "regulations_count": data.get("sverdlovsk", {}).get("regulations_count", 19),
            "lat": data.get("sverdlovsk", {}).get("lat", 56.8389),
            "lon": data.get("sverdlovsk", {}).get("lon", 60.6057),
            "best_practices": data.get("sverdlovsk", {}).get("best_practices", ["Центр компетенций GovTech", "SLA-мониторинг", "Кроссплатформенность"])
        },
        {
            "name": "Чеченская Республика",
            "maturity_index": data.get("chechen", {}).get("maturity_index", 68.0),
            "services_count": data.get("chechen", {}).get("digital_services_count", 75),
            "regulations_count": data.get("chechen", {}).get("regulations_count", 13),
            "lat": data.get("chechen", {}).get("lat", 43.3246),
            "lon": data.get("chechen", {}).get("lon", 45.6718),
            "best_practices": data.get("chechen", {}).get("best_practices", ["Единое окно для предпринимателей", "Учет специфики", "Социальная интеграция"])
        },
    ]
    
    return {
        "regions": regions_data,
        "leader": data.get("leader", "Санкт-Петербург"),
        "regulations_gap": data.get("gap", 15),
        "map_path": "/static/regional_digital_services_map.html",  # Путь к карте
    }


@app.get("/api/data/digital-inclusion-dfo")
def digital_inclusion_dfo_dataset(
    current_user: User = Depends(get_current_user_disabled),
) -> Dict[str, object]:
    """
    API endpoint для получения данных о цифровой инклюзивности органов власти ДФО
    """
    df = pd.read_csv(DATA_DIR / "digital_inclusion_dfo.csv")
    
    # Подготовим данные для визуализации
    authorities_data = df.to_dict(orient="records")
    
    # Подготовим данные для карты ДФО (координаты центров регионов)
    dfo_regions_coordinates = [
        {"name": "Сахалинская область", "lat": 46.9507, "lon": 142.7358, "authority": "Министерство цифрового развития и связи Сахалинской области", "score": 78.3},
        {"name": "Хабаровский край", "lat": 48.4805, "lon": 135.0916, "authority": "Департамент информационных технологий и связи Хабаровского края", "score": 72.1},
        {"name": "Республика Саха (Якутия)", "lat": 66.7613, "lon": 124.1673, "authority": "Министерство по делам национальностей и развитие коренных малочисленных народов Республики Саха (Якутия)", "score": 68.7},
        {"name": "Камчатский край", "lat": 55.0974, "lon": 159.5729, "authority": "Департамент по информатизации Правительства Камчатского края", "score": 54.2},
        {"name": "Магаданская область", "lat": 62.9343, "lon": 151.2542, "authority": "Управление информационных технологий и связи Магаданской области", "score": 42.8}
    ]
    
    # Подготовим данные для радиальных диаграмм
    radar_data = []
    for authority in authorities_data:
        authority_radar = [
            {"direction": "Тех. доступность", "value": authority["technical_accessibility"]},
            {"direction": "Контент и языки", "value": authority["content_language"]},
            {"direction": "Инф. поддержка", "value": authority["information_support"]},
            {"direction": "Норм. база", "value": authority["legal_framework"]},
            {"direction": "Обратная связь", "value": authority["feedback"]},
            {"direction": "Образование", "value": authority["education"]}
        ]
        radar_data.append({
            "authority_name": authority["authority_name"],
            "radar_values": authority_radar
        })
    
    return {
        "authorities": authorities_data,
        "map_data": dfo_regions_coordinates,
        "radar_charts_data": radar_data,
        "summary": {
            "total_authorities": len(authorities_data),
            "average_score": float(df["overall_score"].mean()),
            "top_authority": df.loc[df["overall_score"].idxmax()]["authority_name"],
            "bottom_authority": df.loc[df["overall_score"].idxmin()]["authority_name"]
        }
    }


@app.get("/static/nekrasovka_health_map.html")
def get_nekrasovka_map() -> FileResponse:
    map_file = STATIC_DIR / "nekrasovka_health_map.html"
    if not map_file.exists():
        raise HTTPException(status_code=404, detail="Карта Некрасовки не найдена")
    return FileResponse(map_file)
