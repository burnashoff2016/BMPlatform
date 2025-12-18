from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
IMG_DIR = BASE_DIR / "static" / "img"
IMG_DIR.mkdir(parents=True, exist_ok=True)


def run() -> None:
    df = pd.read_csv(DATA_DIR / "kpi_suzdal_monthly.csv")
    df["month_label"] = pd.to_datetime(df["month"]).dt.strftime("%b")

    fig, ax1 = plt.subplots(figsize=(9, 4))
    ax1.plot(df["month_label"], df["portal_visits"], color="#2563eb", label="Визиты")
    ax1.set_ylabel("Визиты портала", color="#2563eb")
    ax1.tick_params(axis="y", labelcolor="#2563eb")

    ax2 = ax1.twinx()
    ax2.plot(df["month_label"], df["conversion_rate"], color="#16a34a", label="Конверсия")
    ax2.set_ylabel("Конверсия", color="#16a34a")
    ax2.tick_params(axis="y", labelcolor="#16a34a")

    fig.tight_layout()
    output_path = IMG_DIR / "kpi_suzdal_line.png"
    plt.title("Динамика KPI электронных услуг Суздаля")
    plt.savefig(output_path)
    plt.close(fig)
    best_month = df.sort_values("conversion_rate", ascending=False).iloc[0]["month"]
    print(f"Лучший месяц по конверсии: {best_month}")
    print(f"График сохранён в {output_path}")


if __name__ == "__main__":
    run()
