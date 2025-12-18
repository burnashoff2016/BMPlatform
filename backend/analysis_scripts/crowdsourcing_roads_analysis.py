from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
IMG_DIR = BASE_DIR / "static" / "img"
IMG_DIR.mkdir(parents=True, exist_ok=True)


def run() -> None:
    df = pd.read_csv(DATA_DIR / "crowdsourcing_roads_responses.csv")
    issue_counts = df["issue_type"].value_counts().reset_index()
    issue_counts.columns = ["issue_type", "count"]

    plt.figure(figsize=(9, 4))
    plt.bar(issue_counts["issue_type"], issue_counts["count"], color="#0ea5e9")
    plt.xticks(rotation=30, ha="right")
    plt.ylabel("Количество обращений")
    plt.title("Структура обращений по типам проблем")
    plt.tight_layout()
    output_path = IMG_DIR / "crowdsourcing_roads_bar.png"
    plt.savefig(output_path)
    plt.close()

    print("Топ-3 проблем:")
    for _, row in issue_counts.head(3).iterrows():
        print(f"- {row['issue_type']}: {row['count']} заявок")
    print(f"Диаграмма сохранена в {output_path}")


if __name__ == "__main__":
    run()
