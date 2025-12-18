from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
IMG_DIR = BASE_DIR / "static" / "img"
IMG_DIR.mkdir(parents=True, exist_ok=True)


def run() -> None:
    df = pd.read_csv(DATA_DIR / "monitoring_kostroma_responses.csv")
    avg_score = round(df["life_quality_score"].mean(), 2)
    intent_share = round((df[df["intent_to_leave"] == "Планирую уехать"].shape[0] / len(df)) * 100, 1)
    positive_words = ["комфорт", "улучш", "событ", "поддерж"]
    negative_words = ["проблем", "жалоб", "слаб", "ухудш"]

    def detect_sentiment(text: str) -> str:
        t = text.lower()
        if any(word in t for word in positive_words):
            return "positive"
        if any(word in t for word in negative_words):
            return "negative"
        return "neutral"

    df["sentiment"] = df["comment"].astype(str).apply(detect_sentiment)
    sentiment_counts = df["sentiment"].value_counts()

    plt.figure(figsize=(8, 4))
    df["life_quality_score"].plot(kind="hist", bins=10, color="#2563eb", edgecolor="white")
    plt.title("Распределение оценок качества жизни")
    plt.xlabel("Оценка по шкале 1-10")
    plt.tight_layout()
    output_path = IMG_DIR / "monitoring_kostroma_ratings.png"
    plt.savefig(output_path)
    plt.close()

    print(f"Средняя оценка: {avg_score}")
    print(f"Готовность уехать: {intent_share}%")
    print("Тональность:")
    for label, count in sentiment_counts.items():
        print(f"  {label}: {count}")
    print(f"Гистограмма сохранена в {output_path}")


if __name__ == "__main__":
    run()
