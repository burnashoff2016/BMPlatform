from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def run() -> None:
    df = pd.read_csv(DATA_DIR / "digital_services_law_summary.csv")
    leader = df.sort_values("service_scope_index", ascending=False).iloc[0]
    print("Сравнительно-правовой анализ цифровых услуг")
    for _, row in df.iterrows():
        print(
            f"{row['region']}: актов={row['law_count']}, индекс охвата={row['service_scope_index']}, "
            f"пробелы={row['regulatory_gaps']}"
        )
    print(f"Лидер зрелости: {leader['region']}")


if __name__ == "__main__":
    run()
