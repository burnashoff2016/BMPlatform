from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def run() -> None:
    df = pd.read_csv(DATA_DIR / "nn_gorod_idey_ideas.csv")
    counts = df["category"].value_counts()
    top_category = counts.idxmax()
    print(f"Всего идей: {len(df)}")
    print("Распределение по категориям:")
    for category, count in counts.items():
        print(f"- {category}: {count}")
    print(f"Лидер категории: {top_category}")


if __name__ == "__main__":
    run()
