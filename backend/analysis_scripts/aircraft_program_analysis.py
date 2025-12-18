from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def run() -> None:
    df = pd.read_csv(DATA_DIR / "aircraft_program_kpi.csv")
    efficiency = (df["aircraft_delivered"].sum() / df["budget_spent"].sum()) * 100
    best_year = df.sort_values("aircraft_delivered", ascending=False).iloc[0]["year"]
    print(f"Суммарная эффективность (самолётов на 100 млрд ₽): {efficiency:.1f}")
    print(f"Лучший год по поставкам: {int(best_year)}")
    print(df)


if __name__ == "__main__":
    run()
