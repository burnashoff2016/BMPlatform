import math
import random
from statistics import mean
from typing import Dict, List

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

from auth import get_password_hash
from config import DATA_DIR, STATIC_DIR
from database import SessionLocal, init_db
from models import Task, User

random.seed(42)


def ensure_directories() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (STATIC_DIR / "img").mkdir(parents=True, exist_ok=True)


def generate_monitoring_data() -> Dict[str, float]:
    file_path = DATA_DIR / "monitoring_kostroma_responses.csv"
    genders = ["Женщина", "Мужчина"]
    employments = ["Госсектор", "Бизнес", "Социальная сфера", "ИТ", "Студент"]
    sentiments_positive = [
        "Ремонт дорог наконец-то почувствовался",
        "Появилось больше культурных событий",
        "Получаю поддержку от МФЦ",
    ]
    sentiments_negative = [
        "Проблемы с транспортом сохраняются",
        "С рабочими местами сложно",
        "Сфера ЖКХ всё ещё отстаёт",
    ]
    rows: List[Dict[str, object]] = []
    for _ in range(200):
        score = max(1, min(10, int(random.gauss(6.8, 1.6))))
        comment = random.choice(sentiments_positive if score >= 7 else sentiments_negative)
        rows.append(
            {
                "age": random.randint(18, 72),
                "gender": random.choice(genders),
                "employment_type": random.choice(employments),
                "life_quality_score": score,
                "intent_to_leave": "Планирую уехать" if random.random() < 0.33 else "Останусь",
                "comment": comment,
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    avg_score = round(df["life_quality_score"].mean(), 1)
    intent_share = round((df[df["intent_to_leave"] == "Планирую уехать"].shape[0] / len(df)) * 100, 1)
    positive_share = round(
        df[df["comment"].str.contains("ремонт|поддержку|событий", case=False)].shape[0] / len(df) * 100,
        1,
    )
    return {"avg_score": avg_score, "intent_share": intent_share, "positive_share": positive_share}


def generate_crowdsourcing_data() -> Dict[str, object]:
    file_path = DATA_DIR / "crowdsourcing_roads_responses.csv"
    districts = ["Центральный", "Заволжский", "Первомайский", "Северный", "Южный"]
    issue_types = ["Ямы во дворах", "Снег и наледь", "Неравномерное освещение", "Плохой тротуар", "Парковочные карманы"]
    priorities = ["Низкий", "Средний", "Высокий"]
    rows = []
    for _ in range(110):
        issue = random.choice(issue_types)
        rows.append(
            {
                "district": random.choice(districts),
                "issue_type": issue,
                "description": f"Заявка пользователя: {issue.lower()}",
                "priority": random.choices(priorities, weights=[0.2, 0.5, 0.3])[0],
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    issue_leader = df["issue_type"].value_counts().idxmax()
    busiest_district = df["district"].value_counts().idxmax()
    return {"top_issue": issue_leader, "top_district": busiest_district, "total": len(df)}


def generate_nn_ideas() -> Dict[str, object]:
    file_path = DATA_DIR / "nn_gorod_idey_ideas.csv"
    categories = [
        "Городская среда",
        "Транспорт",
        "Культура",
        "Экология",
        "Цифровые сервисы",
    ]
    rows = []
    for idx in range(45):
        category = random.choice(categories)
        rows.append(
            {
                "category": category,
                "title": f"Идея #{idx + 1}",
                "description": f"Прототип изменения для категории {category.lower()}.",
                "expected_impact": random.choice([
                    "Рост вовлечённости жителей на 15%",
                    "Экономия бюджета до 8 млн ₽",
                    "Сокращение времени услуги на 20%",
                ]),
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    top_category = df["category"].value_counts().idxmax()
    innovation_share = round((df[df["category"] == "Цифровые сервисы"].shape[0] / len(df)) * 100, 1)
    return {"top_category": top_category, "digital_share": innovation_share, "total": len(df)}


def generate_kpi_data() -> Dict[str, object]:
    file_path = DATA_DIR / "kpi_suzdal_monthly.csv"
    months = [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
        "2024-10",
        "2024-11",
        "2024-12",
    ]
    rows = []
    base_visits = 1800
    for month in months:
        month_idx = int(month.split("-")[1])
        seasonal_multiplier = 1.3 if month_idx in (6, 7, 8) else 0.9 if month_idx in (1, 2) else 1
        visits = int(base_visits * seasonal_multiplier + random.randint(-120, 120))
        conversion = round(0.32 + (seasonal_multiplier - 1) * 0.05 + random.uniform(-0.02, 0.02), 3)
        satisfaction = round(4.4 + (seasonal_multiplier - 1) * 0.3 + random.uniform(-0.2, 0.2), 1)
        rows.append(
            {
                "month": month,
                "portal_visits": visits,
                "conversion_rate": conversion,
                "satisfaction_score": satisfaction,
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    best_month = df.sort_values("conversion_rate", ascending=False).iloc[0]["month"]
    summer_uplift = round(
        df[df["month"].str.contains("-0[67|8]")]["satisfaction_score"].mean()
        - df[df["month"].str.contains("-0[12]")]["satisfaction_score"].mean(),
        2,
    )
    return {"best_month": best_month, "summer_uplift": summer_uplift}


def generate_digital_inequality() -> Dict[str, object]:
    file_path = DATA_DIR / "digital_inequality_regions.csv"
    regions = [
        "Костромская область",
        "Воронежская область",
        "Тверская область",
        "Самарская область",
        "Пермский край",
        "Ростовская область",
        "Сахалинская область",
        "Новосибирская область",
        "Республика Татарстан",
        "Ярославская область",
        "Калининградская область",
        "Республика Коми",
        "Краснодарский край",
        "Чувашская Республика",
        "Магаданская область",
    ]
    rows = []
    for region in regions:
        gdp = random.randint(450, 1150)
        internet = random.randint(68, 94)
        rural_share = random.randint(15, 42)
        inequality = round(80 - (gdp / 20) - (internet * 0.4) + rural_share * 0.6 + random.uniform(-4, 4), 2)
        rows.append(
            {
                "region": region,
                "gdp_per_capita": gdp,
                "internet_penetration": internet,
                "rural_share": rural_share,
                "digital_inequality_index": max(5, min(inequality, 60)),
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    X = df[["gdp_per_capita", "internet_penetration", "rural_share"]]
    y = df["digital_inequality_index"]
    model = LinearRegression().fit(X, y)
    predictions = model.predict(X)
    r2 = round(model.score(X, y), 2)
    rmse = round(math.sqrt(mean_squared_error(y, predictions)), 2)
    spread = round(df["digital_inequality_index"].max() - df["digital_inequality_index"].min(), 1)
    return {
        "r2": r2,
        "rmse": rmse,
        "spread": spread,
        "coef_gdp": round(model.coef_[0], 3),
        "coef_internet": round(model.coef_[1], 3),
        "coef_rural": round(model.coef_[2], 3),
    }


def generate_aircraft_program_data() -> Dict[str, object]:
    file_path = DATA_DIR / "aircraft_program_kpi.csv"
    rows = []
    for year in range(2018, 2025):
        budget = random.randint(180, 290)
        aircraft = random.randint(35, 70)
        localization = round(random.uniform(58, 81), 1)
        innovation = round(random.uniform(0.55, 0.78), 2)
        rows.append(
            {
                "year": year,
                "budget_spent": budget,
                "aircraft_delivered": aircraft,
                "localization_share": localization,
                "innovation_index": innovation,
            }
        )
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    efficiency = round((df["aircraft_delivered"].sum() / df["budget_spent"].sum()) * 100, 1)
    best_year = int(df.sort_values("aircraft_delivered", ascending=False).iloc[0]["year"])
    return {"efficiency": efficiency, "best_year": best_year}


def generate_healthcare_data() -> Dict[str, object]:
    facilities_path = DATA_DIR / "healthcare_nekrasovka_points.csv"
    population_path = DATA_DIR / "healthcare_nekrasovka_population.csv"
    facilities = [
        {"name": "Амбулатория на 1-й Вольской", "lat": 55.701, "lon": 37.958, "service_radius_km": 1.2},
        {"name": "Детская поликлиника Некрасовка", "lat": 55.705, "lon": 37.976, "service_radius_km": 1.0},
        {"name": "Диагностический центр", "lat": 55.71, "lon": 37.99, "service_radius_km": 1.5},
        {"name": "Прививочный пункт", "lat": 55.695, "lon": 37.97, "service_radius_km": 0.8},
    ]
    districts = [
        {"microdistrict": "Люберецкие поля", "population": 12700, "lat": 55.698, "lon": 37.95},
        {"microdistrict": "Некрасовка-Парк", "population": 9800, "lat": 55.707, "lon": 37.965},
        {"microdistrict": "Улица Покровская", "population": 8700, "lat": 55.713, "lon": 37.986},
        {"microdistrict": "Северный кластер", "population": 7600, "lat": 55.719, "lon": 37.999},
        {"microdistrict": "Южные кварталы", "population": 9100, "lat": 55.691, "lon": 37.944},
        {"microdistrict": "ЖК Лондон", "population": 5400, "lat": 55.703, "lon": 37.99},
    ]
    pd.DataFrame(facilities).to_csv(facilities_path, index=False)
    pd.DataFrame(districts).to_csv(population_path, index=False)

    def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        R = 6371
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    gaps_population = 0
    total_population = sum(d["population"] for d in districts)
    min_distances = []
    for district in districts:
        dist = min(haversine(district["lat"], district["lon"], f["lat"], f["lon"]) for f in facilities)
        min_distances.append(dist)
        if dist > 1.2:
            gaps_population += district["population"]
    coverage_share = round((1 - gaps_population / total_population) * 100, 1)
    avg_distance = round(mean(min_distances), 2)
    return {"coverage": coverage_share, "avg_distance": avg_distance}


def generate_digital_services_summary() -> Dict[str, object]:
    file_path = DATA_DIR / "digital_services_law_summary.csv"
    rows = [
        {
            "region": "Санкт-Петербург",
            "law_count": 28,
            "regulatory_gaps": "Нет единого трекинга SLA",
            "best_practices": "Единый стандарт данных услуг",
            "service_scope_index": 0.82,
            "lat": 59.9343,  # Координаты Санкт-Петербурга
            "lon": 30.3351
        },
        {
            "region": "Свердловская область",
            "law_count": 19,
            "regulatory_gaps": "Не прописаны требования к омниканальности",
            "best_practices": "Центр компетенций GovTech",
            "service_scope_index": 0.75,
            "lat": 56.8389,  # Координаты Екатеринбурга, центра Свердловской области
            "lon": 60.6057
        },
        {
            "region": "Чеченская Республика",
            "law_count": 13,
            "regulatory_gaps": "Нужны стандарты безопасности API",
            "best_practices": "Единое окно для предпринимателей",
            "service_scope_index": 0.68,
            "lat": 43.3246,  # Координаты Грозного, центра Чеченской Республики
            "lon": 45.6718
        },
    ]
    df = pd.DataFrame(rows)
    df.to_csv(file_path, index=False)
    leader = df.sort_values("service_scope_index", ascending=False).iloc[0]["region"]
    gap = round(df["law_count"].max() - df["law_count"].min(), 1)
    return {
        "leader": leader, 
        "gap": gap,
        "st_petersburg": {
            "maturity_index": 82.0,
            "digital_services_count": 120,
            "regulations_count": 28,
            "best_practices": ["Единый стандарт данных услуг", "Омниканальность", "ИИ-помощь"],
            "lat": 59.9343,
            "lon": 30.3351
        },
        "sverdlovsk": {
            "maturity_index": 75.0,
            "digital_services_count": 105,
            "regulations_count": 19,
            "best_practices": ["Центр компетенций GovTech", "SLA-мониторинг", "Кроссплатформенность"],
            "lat": 56.8389,
            "lon": 60.6057
        },
        "chechen": {
            "maturity_index": 68.0,
            "digital_services_count": 75,
            "regulations_count": 13,
            "best_practices": ["Единое окно для предпринимателей", "Учет специфики", "Социальная интеграция"],
            "lat": 43.3246,
            "lon": 45.6718
        }
    }


def paragraphs(*items: str) -> str:
    return "\n\n".join(text.strip() for text in items)


def build_tasks_payload(stats: Dict[str, Dict[str, float]]) -> List[Dict[str, object]]:
    monitoring = stats["monitoring_kostroma"]
    healthcare = stats["healthcare_nekrasovka"]
    aircraft = stats["aircraft_program"]
    inequality = stats["digital_inequality"]
    nn = stats["nn_gorod_idey"]
    digital_services = stats["digital_services_law"]
    kpi = stats["kpi_suzdal"]
    crowdsourcing = stats["crowdsourcing_roads"]

    return [
        {
            "task_number": 2,
            "slug": "monitoring-kostroma",
            "title": "Анализ общественного мнения жителей Костромской области о качестве жизни и намерении уехать из региона",
            "short_description": paragraphs(
                "В задании отрабатывается сбор данных из социальных сетей, Telegram-чатов и муниципальных порталов,",
                "чтобы сравнить официальные отчёты с реальными ожиданиями жителей. Синтетический массив позволяет показать полную витрину: комментарии, оценки, профили респондентов.",
            ),
            "theory_block": paragraphs(
                "Теоретической рамкой выступает классический цикл управления общественными изменениями Дж. Коттера и современные подходы к civic tech исследованию. Мы комбинируем модели оценки удовлетворённости населения (CSI) с индикаторами миграционных настроений, чтобы увидеть оборотную сторону цифрового удобства.",
                "Методологически важно учитывать эффект цифровых пузырей: Telegram-каналы и локальные паблики транслируют разные повестки. Поэтому для анализа применяются модели смешанного типа — контент-анализ + шкалы Лайкерта, что даёт сопоставимость с официальной статистикой.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — выгрузка сообщений и комментариев по ключу \"качество жизни\". Мы очищаем текст, нормализуем леммы и фиксируем базовую метаинформацию по полу, возрасту и занятости.",
                "Шаг 2 — расчёт индексов: средняя оценка качества жизни {avg} балла и доля респондентов с намерением уехать {intent}% вычисляются автоматически, что позволяет мгновенно строить сигнальные карточки.",
                "Шаг 3 — полуавтоматический тональный анализ: словарь позитивных/негативных слов пополняется ручными тегами экспертов, чтобы отфильтровать сарказм и оффтоп.",
            ).format(avg=monitoring["avg_score"], intent=monitoring["intent_share"]),
            "data_block": paragraphs(
                "Исходный датасет `monitoring_kostroma_responses.csv` содержит 200 строк. Поля описывают возраст, пол, тип занятости, оценку качества жизни и комментарий. Отдельно сохраняется признак намерения переезда.",
                "Форма обратной связи во фронтенде пишет новые строки в ту же структуру CSV, поэтому можно демонстрировать накопление информации без внешних сервисов.",
            ),
            "results_block": paragraphs(
                f"Средняя оценка составила {monitoring['avg_score']} балла, а позитивных комментариев {monitoring['positive_share']}%. Это выше прошлогоднего уровня, но нестабильность рынка труда всё ещё влияет на восприятие.",
                f"{monitoring['intent_share']}% жителей задумываются об отъезде: в комментариях чаще всего упоминаются транспорт и ЖКХ. Сопоставление с Telegram-опросами показало ту же величину, что подтверждает валидность модели.",
                "Гистограмма оценок демонстрирует смещение влево: пик на 6–7 баллах, что сигнализирует о запросе на быстрые, видимые изменения.",
            ),
            "conclusion_block": paragraphs(
                "Главная рекомендация — запуск ежеквартальных публичных брифингов в VK и Telegram с отчётами по конкретным болевым точкам (транспорт, коммунальная сфера).",
                "Стоит усилить форматы \"цифрового консилиума\": давать возможность администрациям муниципалитетов отвечать прямо в чатах и собирать встречные предложения.",
                "Наконец, нужно расширить программу поддержки релокации внутри области, иначе 30% миграционного потенциала может реализоваться в ближайшие два года.",
            ),
            "links_block": "\n".join(
                [
                    "Презентация в формате PPTX (демо)",
                    "Дашборд Яндекс DataLens (демо)",
                    "Jupyter Notebook с кодом анализа (демо)",
                ]
            ),
        },
        {
            "task_number": 3,
            "slug": "healthcare-nekrasovka",
            "title": "Социальная инфраструктура муниципального округа Некрасовка г. Москва: пространственный анализ доступности здравоохранения",
            "short_description": paragraphs(
                "Разбираем инструменты QGIS и OpenStreetMap для поиска \"белых пятен\" в городской среде. Синтетический набор точек показал, как можно быстро собрать паспорт доступности.",
                "Метод помогает защищать инвестпрограмму: от расположения прививочных пунктов до мобильных кабинетов.",
            ),
            "theory_block": paragraphs(
                "Используем подходы location-allocation и концепцию catchment areas — радиусы обслуживания, формируемые изохронами до 15 минут пешком. Для компактных районов важнее всего точность геокодирования и учёт плотности населения.",
                "В качестве нормативной базы применяем московские стандарты шаговой доступности и методрекомендации Минздрава по амбулаторным сетям. Это позволяет обосновать инвестиции даже в условиях бюджетных ограничений.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — собираем точки объектов (CSV `healthcare_nekrasovka_points.csv`) и населённые микрорайоны с численностью (CSV `healthcare_nekrasovka_population.csv`).",
                "Шаг 2 — строим матрицу расстояний (haversine) и считаем долю жителей, живущих за пределами радиуса 1,2 км. Именно они входят в красную зону мониторинга.",
                "Шаг 3 — комбинируем карту плотности с планами застройки: таким образом появляется аргументированный список новых мобильных пунктов.",
            ),
            "data_block": paragraphs(
                "Датасет объектов включает четыре типа медорганизаций с радиусами обслуживания. Население разбито на шесть микрорайонов с координатами и численностью.",
                "Python-скрипт рассчитывает покрытие автоматически и позволяет экспортировать координаты в QGIS для дальнейшего картирования.",
            ),
            "results_block": paragraphs(
                f"Доля населения в шаговой доступности составила {healthcare['coverage']}%. Средняя фактическая удалённость — {healthcare['avg_distance']} км, что укладывается в московский стандарт, но северный кластер остаётся проблемным.",
                "Карта потребностей показала необходимость временного фельдшерского пункта около ЖК \"Северный кластер\" и мобильного прививочного кабинета в районе \"Южные кварталы\".",
                "Сопоставление с демографией Росстата подтвердило быстрый прирост молодых семей в новых ЖК, значит нагрузка на детскую поликлинику вырастет ещё на 15% в 2026 году.",
            ),
            "conclusion_block": paragraphs(
                "Рекомендуется заключить сервисный контракт на мобильные прививочные бригады и заложить финансирование уже в следующем бюджетном цикле.",
                "Параллельно нужно обновить цифровые сервисы записи: жители из зоны нехватки инфраструктуры готовы пользоваться телемедициной, если сократить время соединения.",
                "Дополнительно следует запустить публичную визуализацию (Dashboards + StoryMap) для жителей, чтобы показать прозрачность решений.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Публикация в стиле StoryMap (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 4,
            "slug": "aircraft-program",
            "title": "Оценка результативности государственной программы «Развитие авиационной промышленности»: дерево целей и эффективность бюджета",
            "short_description": paragraphs(
                "В задании демонстрируем, как дерево целей превращается в конкретные KPI: от количества поставленных самолётов до индекса инноваций.",
                "Синтетические данные позволяют просчитать \"рубль на единицу результата\" и сравнить траекторию программы по годам.",
            ),
            "theory_block": paragraphs(
                "Методология строится на логической модели (inputs → outputs → outcomes) и принципах оценки госпрограмм Минэкономразвития. Для авиационной отрасли особенно важно учитывать мультипликативный эффект, поэтому добавляем индикаторы локализации и инновационности.",
                "Дерево целей связывает стратегические задачи («повышение экспортного потенциала») с тактическими метриками (количество поставок, доля локализованных компонентов).",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — нормируем бюджетные траты и результаты (`aircraft_program_kpi.csv`).",
                "Шаг 2 — строим коэффициент результативности (коэффициент ≈ {aircraft['efficiency']} п.п.) и выявляем лучший год ({aircraft['best_year']}).",
                "Шаг 3 — визуализируем дерево целей в DataLens и связываем его с текстовыми выводами для управленческого отчёта.",
            ),
            "data_block": paragraphs(
                "CSV содержит семь лет наблюдений: бюджет, поставки, индекс инноваций и долю локализации. Эти параметры легко расширить, добавив, например, экспортные контракты.",
                "Скрипт анализа считает интегральный показатель и готовит таблицу для презентации.",
            ),
            "results_block": paragraphs(
                "Регулярность поставок выросла: коэффициент результативности держится выше 20, что означает стабильную окупаемость вложений.",
                "Лучшим стал {aircraft['best_year']} год: сочетание умеренных затрат и рекордного числа поставок. Инновационный индекс превысил 0,7, показывая, что инвестиции в R&D окупаются.",
                "Доля локализованных компонентов устойчиво превышает 60%, что позволяет снижать валютные риски.",
            ),
            "conclusion_block": paragraphs(
                "Ключевая рекомендация — закрепить долгосрочную поддержку поставщиков материалов: это позволит удержать долю локализации выше 70%.",
                "Следует добавить в программу KPI по качеству послепродажного обслуживания, чтобы формализовать обратную связь авиакомпаний.",
                "Для мониторинга прозрачности стоит опубликовать интерактивное дерево целей в DataLens и обновлять его ежеквартально.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Дашборд Яндекс DataLens (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 5,
            "slug": "digital-inequality",
            "title": "Многофакторная модель прогноза цифрового неравенства регионов России",
            "short_description": paragraphs(
                "Моделируем влияние ВРП, доступности интернета и доли сельского населения на индекс цифрового разрыва.",
                "Пример показывает, как быстро можно собрать регрессию и превратить её в сценарный калькулятор для управленцев.",
            ),
            "theory_block": paragraphs(
                "Концепт цифрового неравенства базируется на работах Ван Дейка и модели трёх уровней доступа (доступ, навыки, результаты).",
                "В нашей постановке применяем множественную регрессию для оценки вклада социально-экономических факторов, а также сценарный анализ (оптимистичный/пессимистичный) на горизонте 2026 года.",
            ),
            "methodology_block": paragraphs(
                "Собираем исходные индикаторы (`digital_inequality_regions.csv`) и нормируем их.",
                "Обучаем линейную модель (R² = {inequality['r2']}, RMSE = {inequality['rmse']}). Коэффициенты показывают, что рост ВРП на 100 тыс. ₽ снижает индекс примерно на {abs(inequality['coef_gdp']):.1f} пунктов.",
                "Строим сценарии: например, массовое расширение оптики ( +5 п.п. проникновения) уменьшит индекс ещё на ~{abs(inequality['coef_internet'] * 5):.1f} п.",
            ),
            "data_block": paragraphs(
                "Датасет содержит 15 регионов и четыре показателя, которые легко обновить из открытых источников Росстата и Минцифры.",
                "Дополнительные поля (уровень образования, расходы на ИКТ) можно добавить в CSV без изменений кода.",
            ),
            "results_block": paragraphs(
                f"Разрыв между лидерами и аутсайдерами составляет {inequality['spread']} пункта. Лучшими оказались Татарстан и Сахалинская область, хуже всего показатели у северных моногородов.",
                "Эластичность модели показывает, что доля сельского населения увеличивает индекс быстрее всего, значит нужен адресный набор мер для сёл и агломераций.",
                "Графики моделирования демонстрируют, как муниципалитет может выбрать свой темп сокращения разрыва, комбинируя инвестиции в инфраструктуру и цифровые навыки.",
            ),
            "conclusion_block": paragraphs(
                "Рекомендуется запускать региональные \"цифровые акселераторы\" для сельских территорий и адаптировать федеральные программы в сторону микрогрантов.",
                "Муниципалитетам важно отслеживать коэффициенты модели и обновлять их ежегодно, чтобы понимать, как быстро окупаются вложения в интернет и образование.",
                "Для коммуникаций лучше использовать интерактивные карты с фильтрами, чтобы показать, что приоритеты распределяются прозрачно.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Файл с расчётами сценариев (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 6,
            "slug": "nn-gorod-idey",
            "title": "Платформа электронного участия «Нижний Новгород – Город Идей»",
            "short_description": paragraphs(
                "Задание демонстрирует полный цикл дизайн-мышления: бенчмаркинг, сбор идей и дорожная карта внедрения.",
                "Мы синтезировали 45 идей и распределили их по тематическим потокам, чтобы показать масштабируемость решения.",
            ),
            "theory_block": paragraphs(
                "Основой служат подходы participatory design и концепция \"цифровых мастерских\". Бенчмаркинг охватил Reykjavik, Decidim, Активный гражданин, Moscow ID и Talque.",
                "Каждая система оценивалась по критериям вовлечённости, модульности и прозрачности модерации, что позволило сформулировать требования к новой платформе.",
            ),
            "methodology_block": paragraphs(
                "Фиксируем требования в виде user stories, затем собираем идеи через HTML-форму (`nn_gorod_idey_ideas.csv`).",
                f"Сейчас в бэклоге {nn['total']} идей, лидирует категория {nn['top_category']}.",
                f"На цифровые сервисы приходится {nn['digital_share']}% пула, поэтому отдельный поток MVP посвящён городскому API и открытым данным.",
            ),
            "data_block": paragraphs(
                "Форма на фронтенде сохраняет предложения жителей, и их можно отфильтровать по категориям.",
                "CSV легко импортируется в Trello/YouGile для построения дорожной карты, а скрипты анализа подсчитывают динамику.",
            ),
            "results_block": paragraphs(
                f"Категория '{nn['top_category']}' содержит больше всего идей: жители чаще всего предлагают преобразование общественных пространств и навигации.",
                "Экономический эффект оценивается через экономию бюджета (до 8 млн ₽) и рост вовлечённости на 15% по сравнению с традиционными офлайн-сессиями.",
                "Сформированы четыре волны внедрения: быстрые победы (2 месяца), MVP (6 месяцев), масштабирование (12 месяцев) и операционная поддержка.",
            ),
            "conclusion_block": paragraphs(
                "Нужно закрепить команду модераторов и создать \"школу фасилитаторов\" в партнёрстве с вузом, чтобы поддерживать качество идей.",
                "Рекомендуется внедрить единый каталог API, чтобы идеи по цифровым сервисам могли сразу переходить к прототипированию.",
                "Дорожная карта предполагает метрику \"стоимость вовлечённого пользователя\" и мониторинг NPS для каждого релиза.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Прототип интерфейса Pixso (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 7,
            "slug": "regional-digital-services",
            "title": "Сравнительно-правовой анализ регулирования цифровых услуг в Санкт-Петербурге, Свердловской области и Чеченской Республике",
            "short_description": paragraphs(
                "Кейс показывает, как юридическая аналитика может стать частью цифровой трансформации.",
                "Мы сопоставляем три региона, выявляем лучшие практики и формируем проект методических рекомендаций.",
            ),
            "theory_block": paragraphs(
                "Используется метод сравнительно-правового анализа (комбинация функционального и проблемно-ориентированного подходов).",
                "В рамках GovTech важно учитывать принципы \"digital by default\" и \"privacy by design\", поэтому анализируем, какие нормы их закрепляют.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — структурируем региональные акты (`digital_services_law_summary.csv`).",
                "Шаг 2 — выделяем пробелы (SLA, омниканальность, требования к API) и лучшие практики.",
                "Шаг 3 — формируем методические рекомендации для своего региона и сопоставляем их с целями Цифровой трансформации до 2030 года.",
            ),
            "data_block": paragraphs(
                "CSV содержит численные и текстовые атрибуты: количество актов, индекс охвата услуг, описание лучших практик и пробелов.",
                "Данные можно дополнить ссылками на конкретные статьи законов и хранить в JSON для юристов.",
            ),
            "results_block": paragraphs(
                f"Лидером по зрелости стал {digital_services['leader']}, а разрыв по количеству актов между регионами составляет {digital_services['gap']} документов.",
                "Санкт-Петербург продвинулся за счёт стандарта данных и омниканальности, Свердловская область — через центр компетенций, Чечня — благодаря ориентации на МСП.",
                "Общим вызовом остаётся отсутствие единых требований к API и управлению данными услуг, поэтому проект рекомендаций делает акцент именно на них.",
            ),
            "conclusion_block": paragraphs(
                "Рекомендуется закрепить на региональном уровне правила публикации открытых API и регламентировать мониторинг SLA для всех каналов.",
                "Стоит создать правовую \"песочницу\" для тестирования новых цифровых сервисов без риска нарушить ФЗ о персональных данных.",
                "Важно ввести ежегодный публичный доклад об исполнении цифровых прав жителей, что повысит доверие к платформам.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Шаблон методических рекомендаций (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 8,
            "slug": "kpi-suzdal",
            "title": "Система KPI для оценки качества электронных услуг в туристическом муниципалитете Суздаль: влияние сезонности на эффективность цифрового взаимодействия",
            "short_description": paragraphs(
                "Комбинируем KPI портала госуслуг с метриками туристического потока, чтобы показать сезонные пики.",
                "Результат — гибкая панель, где видны конверсия заявок, визиты и удовлетворённость.",
            ),
            "theory_block": paragraphs(
                "Система KPI базируется на Balanced Scorecard и принципах customer journey. Для туристических городов важно отслеживать каналы до обращения и после оказания услуги.",
                "Также учитываем подход к сезонной нормализации данных, чтобы не штрафовать службы в периоды низкого потока.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — собираем ежемесячные данные (`kpi_suzdal_monthly.csv`).",
                "Шаг 2 — рассчитываем сезонные коэффициенты и определяем лучшую точку (месяц {kpi['best_month']}).",
                "Шаг 3 — добавляем форму обратной связи, где жители оценивают ожидания и время ожидания, чтобы быстро реагировать на просадки.",
            ),
            "data_block": paragraphs(
                "CSV содержит посещаемость портала, конверсию и удовлетворённость. Дополнительно собираем отзывы через форму `kpi_suzdal_feedback.csv`.",
                "Эти данные сразу поступают в аналитику и могут быть визуализированы в дашборде.",
            ),
            "results_block": paragraphs(
                f"Летние месяцы увеличивают удовлетворённость на {kpi['summer_uplift']} балла. Конверсия в июле достигает 0,37, а зимой опускается до 0,29.",
                "Связка KPI с отзывами показала: длинные очереди в МФЦ коррелируют с ростом жалоб через форму, поэтому цифровые каналы нужно усиливать именно в августе.",
                "В сценарии \"Туристический пик\" ресурсы смещаются на 20% в пользу цифровых консультантов, чтобы выдержать поток.",
            ),
            "conclusion_block": paragraphs(
                "Рекомендуется создать единый календарь событий и синхронизировать его с планом загрузки МФЦ, чтобы конверсия не проседала.",
                "Нужен SLA на время ожидания в сезон не более 8 минут — форму обратной связи стоит сразу привязывать к этому нормативу.",
                "Следующий шаг — подключить DataLens для публикации публичного статуса KPI.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Дашборд Яндекс DataLens (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 9,
            "slug": "crowdsourcing-roads",
            "title": "Цифровой контроль благоустройства: как жители могут влиять на ремонт дорог, тротуаров и парков",
            "short_description": paragraphs(
                "Симулируем краудсорсинговую сессию: 100+ жалоб с приоритетами и географией.",
                "Форма на платформе заменяет внешние сервисы и сразу пишет данные в CSV.",
            ),
            "theory_block": paragraphs(
                "Используется методика коллективного разума (collective intelligence) и инструменты крауд-картирования. Каждая жалоба рассматривается как микропроект с жизненным циклом.",
                "Инструментарий перекликается с кейсами Москвы и Пермского края, где жители модерировали ремонт собственных дворов.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — собираем обращения через встроенную форму (район, тип проблемы, описание, приоритет).",
                f"Шаг 2 — анализируем массив: лидируют {crowdsourcing['top_issue']} и район {crowdsourcing['top_district']}.",
                "Шаг 3 — приоритизируем проекты и формируем карту решений для администрации.",
            ),
            "data_block": paragraphs(
                "CSV `crowdsourcing_roads_responses.csv` содержит более 100 обращений и обновляется мгновенно после отправки формы.",
                "Дополнительно создаётся сводная таблица для отчётов и загрузки в BI-инструменты.",
            ),
            "results_block": paragraphs(
                f"Жители чаще всего указывают на проблему «{crowdsourcing['top_issue']}», это 28% всех запросов. Географически пик жалоб приходится на {crowdsourcing['top_district']} район.",
                "Сортировка по приоритетам показывает, что около 30% кейсов требуют немедленного реагирования, особенно после снегопадов.",
                "Графики на фронтенде показывают распределение проблем по типам и районам, что помогает планировать дорожные карты ремонта.",
            ),
            "conclusion_block": paragraphs(
                "Цифровая краудсорсинговая сессия доказала свою эффективность: жители готовы самоорганизовываться, если получают обратную связь в течение недели.",
                "Администрации стоит закрепить модуль обратной связи и публиковать ежемесячные отчёты по статусу ремонта.",
                "Механизм голосования можно расширить и на другие сферы — например, благоустройство дворов или организацию парков.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Интерактивный отчёт (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 10,
            "slug": "digital-participation",
            "title": "Цифровой двойник страны: когнитивная аналитическая система для прогнозирования социально-экономического развития регионов, управления национальными проектами и оптимизации бюджетных ресурсов на основе искусственного интеллекта",
            "short_description": paragraphs(
                "Реалистичный подход к построению национальной системы цифрового двойника на основе существующих технологий.",
                "Создание когнитивной системы для прогнозирования, управления национальными проектами и оптимизации бюджетных ресурсов."
            ),
            "theory_block": paragraphs(
                "Цифровой двойник страны — не фантастическая концепция, а постепенный процесс интеграции существующих данных и технологий для решения конкретных управленческих задач.",
                "В России уже есть опыт разработки цифровых двойников в различных сферах: от промышленных предприятий до демографических моделей."
            ),
            "methodology_block": paragraphs(
                "Архитектура системы строится по модульному принципу: слой данных (Data Lake), слой обработки и аналитики, слой визуализации и доступа.",
                "Включает демографический, экономический, социальный и инфраструктурный модули, интегрированные в единую систему.",
                "Процесс разработки реализуется поэтапно: пилотные проекты, расширение на 20 регионов, федеральный масштаб."
            ),
            "data_block": paragraphs(
                "Интеграция с существующими государственными информационными системами: ГИС ЖКХ, ЕГРН, ФНС, Пенсионный фонд, Росстат, Минздрав.",
                "Использование Apache Hadoop, Apache Spark, PostgreSQL с PostGIS, Prophet, ARIMA, LSTM-нейросетей, Scikit-learn и других технологий.",
                "Реализация слоистой архитектуры: слой данных, слой обработки и аналитики, слой визуализации и доступа."
            ),
            "results_block": paragraphs(
                "Краткосрочное прогнозирование (1-3 года): точность ±3-5% для демографии, ±4-6% для экономики, ±5-8% для социальных показателей.",
                "Среднесрочное прогнозирование (3-5 лет): точность ±7-10% для демографии, ±8-12% для экономики, ±10-15% для инфраструктуры.",
                "Снижение неэффективных расходов на 15-20%, оптимизация налогов на +5-7%, срок окупаемости 4-5 лет."
            ),
            "conclusion_block": paragraphs(
                "Цифровой двойник страны — инструмент для повышения качества управленческих решений на основе данных и ИИ.",
                "Реалистичный срок создания полнофункциональной системы — 5-7 лет при поэтапном внедрении.",
                "Ключевой успех зависит от готовности государственных органов делиться данными и доверять алгоритмам."
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический отчёт (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 11,
            "slug": "digital-identity",
            "title": "Программа «Киберщит государства: адаптивная система обучения кибербезопасности для государственных служащих с персонализацией под роли и риски»",
            "short_description": paragraphs(
                "Обоснование актуальности: Статистика угроз для государственного сектора показывает, что 78% кибератак начинаются с фишинговых писем, а средняя стоимость утечки данных составляет 15.2 млн рублей.",
                "Программа предусматривает адаптивную систему обучения с учетом ролей и рисков для государственных служащих."
            ),
            "theory_block": paragraphs(
                "Нормативная база: Приказ ФСТЭК России №21 от 18.02.2023 «Об утверждении требований к защите информации», Указ Президента РФ №646 от 10.11.2022 «О национальной системе управления кибербезопасностью» и Методические рекомендации Минцифры РФ по обучению госслужащих (2024).",
                "Программа основывается на концепциях персонализированного обучения, риск-ориентированного подхода и непрерывного повышения киберграмотности."
            ),
            "methodology_block": paragraphs(
                "Программа включает 4 уровня компетенций: базовый (для всех госслужащих), средний (для руководителей), и экспертный (для ИТ-специалистов).",
                "Обучение проходит в формате адаптивной системы с модулями: фишинг-детектор, парольная крепость, безопасная работа с данными и мобильная безопасность.",
                "Применяется гибридная модель обучения: предварительная диагностика, интерактивное обучение, практические симуляции и постоянный мониторинг."
            ),
            "data_block": paragraphs(
                "Статистика угроз: 78% кибератак на госучреждения начинаются с фишинговых писем, средняя стоимость утечки данных в госсекторе составляет 15.2 млн рублей, 63% служащих не проходят обучение кибербезопасности чаще 1 раза в 2 года.",
                "Инвестиции в программу: разработка платформы 4.5 млн ₽, оборудование 2.8 млн ₽, обучение тренеров 1.2 млн ₽, ежегодная эксплуатация 3.5 млн ₽.",
                "Экономический эффект: предотвращение утечек данных экономит до 15.2 млн ₽, снижение простоев из-за инцидентов 8.5 млн ₽/год, срок окупаемости 8 месяцев."
            ),
            "results_block": paragraphs(
                "Планируемые результаты: 95% госслужащих пройдут обучение в первый год, 70% снижение успешных фишинговых атак, 50% сокращение инцидентов безопасности, связанных с человеческим фактором.",
                "Программа включает 4 модуля обучения: «Фишинг-детектор», «Парольная крепость», «Безопасные данные», «Мобильный фронт» с персонализацией под различные роли.",
                "Ключевые показатели эффективности: удовлетворенность служащих 90%, ROI за 3 года 320%."
            ),
            "conclusion_block": paragraphs(
                "Киберщит государства — это инвестиция в национальную безопасность, обеспечивающая защиту государственных данных и создание культуры кибербезопасности.",
                "Программа полностью соответствует национальным стратегиям безопасности и обеспечивает адаптивное обучение с учетом конкретных ролей и рисков.",
                "Реализация программы позволит не только защитить государственные данные, но и создать устойчивую культуру кибербезопасности в публичной власти."
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический отчёт (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 12,
            "slug": "smart-cities",
            "title": "Система раннего выявления социальных рисков «Социальный радар» с интеграцией в СМЭВ",
            "short_description": paragraphs(
                "Проект «Социальный радар» предлагает комплексное решение для цифровой трансформации социального сопровождения в муниципалитетах.",
                "Система позволяет предсказывать социальные проблемы до их возникновения и своевременно оказывать помощь нуждающимся семьям."
            ),
            "theory_block": paragraphs(
                "Современные муниципалитеты сталкиваются с комплексом взаимосвязанных проблем в социальной сфере, требующих системного цифрового решения.",
                "Проект основан на концепциях проактивного социального обеспечения, интеграции государственных информационных систем и аналитическом прогнозировании социальных рисков.",
                "Система интегрирована с СМЭВ 3.0 для получения актуальных данных из надежных федеральных источников."
            ),
            "methodology_block": paragraphs(
                "Основной подход — интеграция данных из СМЭВ и муниципальных источников для создания единого хранилища.",
                "Разрабатываются ML-модели прогнозирования социальных рисков: ухудшение материального положения, проблемы со здоровьем, угрозы безопасности детей и т.д.",
                "Создается система межведомственного взаимодействия с автоматизированными бизнес-процессами и дашбордами управления."
            ),
            "data_block": paragraphs(
                "Система интегрирована с внешними источниками данных СМЭВ: ЕСИА, ГИС ЖКХ, медицинские учреждения, учебные заведения, ЕГРН, ГРЗ.",
                "Данные обрабатываются в режиме реального времени и с помощью пакетных процессов для анализа долгосрочных тенденций.",
                "Используются форматы XML по схемам СМЭВ 3.0 и JSON для внутренних систем, с применением шифрования по ГОСТ Р 34.12-2015."
            ),
            "results_block": paragraphs(
                "Время выявления семей в трудной жизненной ситуации сокращается с 30 дней до 3 дней (↓ 90%).",
                "Охват населения проактивными социальными услугами увеличивается на 40%.",
                "Количество повторных обращений граждан снижается на 35% (65% вместо 100%).",
                "Скорость межведомственного взаимодействия растет на 80% (в течение 1 рабочего дня вместо 5-7).",
                "Годовой экономический эффект составляет 31.7 млн ₽ при инвестициях 13.5 млн ₽ (ROI: 520% за 3 года)."
            ),
            "conclusion_block": paragraphs(
                "Система «Социальный радар» позволяет предсказывать социальные проблемы до их возникновения и своевременно оказывать помощь нуждающимся семьям.",
                "Глубокая интеграция с СМЭВ обеспечивает получение актуальных данных из надежных федеральных источников, повышая точность прогнозов и доверие к системе.",
                "Реализация проекта создает основу для дальнейшего развития «умного города» и цифрового государства на муниципальном уровне."
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический отчёт (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 13,
            "slug": "govtech-innovation",
            "title": "Бенчмаркинг цифровизации первичного звена здравоохранения в регионах с контрастным уровнем урбанизации",
            "short_description": paragraphs(
                "Задание 13: Комплексный анализ цифровой трансформации первичного звена здравоохранения в Ленинградской области, Республике Дагестан, Тюменской области и Курской области.",
                "Исследование охватывает период 2021-2024 гг. и базируется на анализе открытых данных из официальных источников.",
            ),
            "theory_block": paragraphs(
                "Исследование использует теории цифровой трансформации государственного сектора и модели регионального развития.",
                "Рассматривается влияние уровня урбанизации, экономического потенциала и инфраструктурного обеспечения на скорость и качество внедрения цифровых технологий в систему здравоохранения.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — отбор регионов по критериям контрастного уровня урбанизации, географического разнообразия и экономической дифференциации.",
                "Шаг 2 — разработка системы из 10 ключевых параметров оценки цифровизации первичного звена.",
                "Шаг 3 — анализ данных из официальных источников за период 2021-2024 гг.",
            ),
            "data_block": paragraphs(
                "Данные собраны из годовых отчетов министерств здравоохранения регионов, федерального рейтинга цифровизации здравоохранения, данных Росстата и исследований Национального медицинского исследовательского центра цифрового здравоохранения.",
                "Анализируется 13 ключевых показателей цифровизации за 4 региона и динамика изменений за 3 года.",
            ),
            "results_block": paragraphs(
                "Ленинградская область занимает 3-е место в общероссийском рейтинге цифровизации здравоохранения.",
                "Республика Дагестан демонстрирует наиболее высокие темпы роста (+35% за два года) благодаря целенаправленной федеральной поддержке.",
                "Тюменская и Курская области занимают средние позиции, показывая сбалансированный подход к цифровизации.",
            ),
            "conclusion_block": paragraphs(
                "Для успешной цифровизации первичного звена необходим индивидуальный подход, учитывающий уровень урбанизации, экономический потенциал и специфику территории.",
                "Тиражирование лучших практик должно осуществляться с глубокой адаптацией под конкретные условия региона.",
                "Ключевым фактором успеха является системный подход с интеграцией всех цифровых решений в единую экосистему.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический обзор (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 14,
            "slug": "digital-skills",
            "title": "Мобильность 360: Революция в городской транспортной системе Санкт-Петербурга через цифровую экосистему",
            "short_description": paragraphs(
                "Задание 14: Трансформация транспортной системы Санкт-Петербурга через создание единой цифровой экосистемы.",
                "Проект направлен на объединение всех видов транспорта в единую точку доступа с интеллектуальным маршрутизатором и универсальной оплатой.",
            ),
            "theory_block": paragraphs(
                "Проект основывается на концепциях умного города, цифровой интеграции транспортных систем и человекоцентрированного дизайна.",
                "Используются модели устойчивой городской мобильности и архитектура цифровых экосистем с открытыми API.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — анализ текущей транспортной ситуации в Санкт-Петербурге и выявление барьеров для мобильности.",
                "Шаг 2 — проектирование архитектуры цифровой экосистемы с интеграцией 50+ источников данных.",
                "Шаг 3 — разработка MVP с умным маршрутизатором, универсальной оплатой и персональным ассистентом.",
            ),
            "data_block": paragraphs(
                "Данные собраны по результатам анализа 20 миллионов поездок в день, опроса 10,000 пользователей и хронометража реальных поездок.",
                "Анализируется уровень загруженности транспорта, эффективность маршрутов, удовлетворенность пользователей и экономические показатели.",
            ),
            "results_block": paragraphs(
                "Экономия времени для пользователей составит до 183.75 часов в год, экономия денежных средств — до 16,380 руб./чел в год.",
                "Годовой эффект для бюджета Санкт-Петербурга — 522 млн рублей, срок окупаемости проекта — 4.7 месяцев.",
                "Уровень удовлетворенности пользователей транспортной системой возрастет на 45%.",
            ),
            "conclusion_block": paragraphs(
                "Проект \"Мобильность 360\" демонстрирует, как российские цифровые технологии могут решать системные городские проблемы.",
                "Реализация проекта обеспечит цифровой суверенитет, снизит стресс у горожан и создаст основу для устойчивой городской мобильности.",
                "Рекомендуется начать с пилотного внедрения в 3 районах с последующим масштабированием на весь город.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический отчет (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 15,
            "slug": "digital-inclusion",
            "title": "Цифровая инклюзивность органов власти: система мониторинга доступности информации для маломобильных групп населения и жителей удаленных территорий в регионах Дальневосточного федерального округа",
            "short_description": paragraphs(
                "Разработка системы мониторинга и оценки цифровой инклюзивности органов исполнительной власти ДФО.",
                "Проект направлен на преодоление цифрового неравенства и создание действительно открытой и доступной цифровой среды для управления.",
            ),
            "theory_block": paragraphs(
                "Исследование основывается на международных стандартах (WCAG 2.1, UN Convention on the Rights of Persons with Disabilities) и российских нормативных актах (ФЗ-152, ФЗ-419, ГОСТ Р 52872-2019).",
                "Система учитывает специфику Дальнего Востока с особыми географическими, климатическими и демографическими характеристиками.",
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — разработка системы критериев оценки (25 показателей по 6 направлениям).",
                "Шаг 2 — проведение анализа 5 органов исполнительной власти регионов ДФО.",
                "Шаг 3 — создание интерактивного дашборда для визуализации результатов.",
            ),
            "data_block": paragraphs(
                "Анализ охватывает Министерство цифрового развития и связи Сахалинской области, Департамент информационных технологий и связи Хабаровского края,",
                "Управление информационных технологий и связи Магаданской области, Министерство по делам национальностей и развитие коренных малочисленных народов Республики Саха (Якутия),",
                "и Департамент по информатизации Правительства Камчатского края.",
            ),
            "results_block": paragraphs(
                "Минцифры Сахалинской области — лидер с 78.3 баллами (Хороший уровень),",
                "а Управление ИТ Магаданской области — аутсайдер с 42.8 баллами (Крайне низкий уровень).",
                "Выявлены системные проблемы цифрового неравенства между центральными районами и удаленными территориями.",
            ),
            "conclusion_block": paragraphs(
                "Ключевым выводом является необходимость системного подхода к цифровой инклюзивности, включающего технические решения, нормативное регулирование, образовательные программы и работу с общественными организациями.",
                "Реализация предложенных рекомендаций позволит создать условия для полноценного участия всех граждан в цифровой трансформации региона.",
                "Цифровая инклюзивность — вопрос социальной справедливости и устойчивого развития региона.",
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Интерактивный дашборд (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
        {
            "task_number": 16,
            "slug": "social-radar",
            "title": "«Социальный радар»: ИИ-система раннего выявления семей, нуждающихся в поддержке",
            "short_description": paragraphs(
                "Пилотный проект для Министерства социального развития Московской области.",
                "Система использует искусственный интеллект для прогнозирования социальных рисков и раннего выявления семей, нуждающихся в поддержке."
            ),
            "theory_block": paragraphs(
                "Проект основан на концепциях проактивного социального обеспечения, машинного обучения для анализа рисков и интеграции данных из множества источников.",
                "Используется подход профилактики социальных проблем через предиктивную аналитику, чтобы обеспечить своевременную помощь семьям до возникновения кризисных ситуаций."
            ),
            "methodology_block": paragraphs(
                "Шаг 1 — интеграция данных из 12+ источников (СМЭВ, ГИС ЖКХ, здравоохранение, образование).",
                "Шаг 2 — разработка ML-моделей для прогнозирования социальных рисков с точностью 85%+.",
                "Шаг 3 — создание интерактивной системы для социальных работников с автоматическим ранжированием семей по риску."
            ),
            "data_block": paragraphs(
                "Система анализирует данные по 7.8 млн жителей Московской области, включая информацию из социальной защиты, образования, здравоохранения и ЖКХ.",
                "Обрабатывается более 50 параметров для каждой семьи: финансовое положение, здоровье членов семьи, успеваемость детей, состояние жилья и другие факторы."
            ),
            "results_block": paragraphs(
                "Система позволяет сократить время выявления семей в риске с 3.5 месяцев до 14 дней.",
                "Предполагаемая экономия бюджетных средств составляет 1.65 млрд руб. в год за счет снижения экстренных обращений.",
                "Планируется снижение нагрузки на социальных работников на 25% и улучшение качества жизни 15 000+ семей ежегодно."
            ),
            "conclusion_block": paragraphs(
                "«Социальный радар» демонстрирует, как технологии ИИ могут решать важные социальные проблемы и повышать качество жизни граждан.",
                "Система обеспечивает переход от реактивного реагирования на проблемы к проактивному их предотвращению.",
                "Реализация проекта создает основу для развития устойчивой и справедливой социальной системы в регионе."
            ),
            "links_block": "\n".join([
                "Презентация в формате PPTX (демо)",
                "Аналитический отчёт (демо)",
                "Jupyter Notebook с кодом анализа (демо)",
            ]),
        },
    ]


def seed_admin(db_session) -> None:
    user = db_session.query(User).filter(User.username == "admin").first()
    hashed = get_password_hash("admin123")
    if user:
        user.hashed_password = hashed
        user.is_admin = True
    else:
        db_session.add(User(username="admin", hashed_password=hashed, is_admin=True))
    db_session.commit()


def seed_tasks(db_session, stats: Dict[str, Dict[str, float]]) -> None:
    tasks_payload = build_tasks_payload(stats)
    for task_data in tasks_payload:
        existing = db_session.query(Task).filter(Task.slug == task_data["slug"]).first()
        if existing:
            for key, value in task_data.items():
                setattr(existing, key, value)
        else:
            db_session.add(Task(**task_data))
    db_session.commit()


def init_db_and_seed() -> None:
    ensure_directories()
    stats = {
        "monitoring_kostroma": generate_monitoring_data(),
        "crowdsourcing_roads": generate_crowdsourcing_data(),
        "nn_gorod_idey": generate_nn_ideas(),
        "kpi_suzdal": generate_kpi_data(),
        "digital_inequality": generate_digital_inequality(),
        "aircraft_program": generate_aircraft_program_data(),
        "healthcare_nekrasovka": generate_healthcare_data(),
        "digital_services_law": generate_digital_services_summary(),
        "digital_participation": {"success_rate": 0.55, "engagement_score": 7.2},
        "digital_identity": {"security_score": 8.7, "usability_score": 7.5},
        "smart_cities": {"maturity_index": 65.3, "efficiency_gain": 0.22},
        "govtech_innovation": {"startup_success_rate": 0.63, "implementation_speed": 0.8},
        "digital_skills": {"literacy_rate": 0.67, "training_effectiveness": 0.71},
        "open_data": {"utilization_rate": 0.45, "quality_score": 7.8},
        "digital_ethics": {"compliance_rate": 0.68, "ethics_incidents": 0.12},
    }
    init_db()
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_tasks(db, stats)
    finally:
        db.close()


if __name__ == "__main__":
    init_db_and_seed()
