import pickle
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
IMG_DIR = BASE_DIR / "static" / "img"
IMG_DIR.mkdir(parents=True, exist_ok=True)


def run() -> None:
    # 1. Load the data
    df = pd.read_csv(DATA_DIR / "digital_inequality_regions.csv")
    
    # 2. Split into features X and target y
    feature_columns = ["gdp_per_capita_k", "urban_share", "education_index", "elderly_share", 
                       "unemployment_rate", "internet_penetration", "infrastructure_exp_per_cap"]
    X = df[feature_columns]
    y = df["digital_inequality_index"]
    
    # 3. Build the linear regression model
    model = LinearRegression()
    
    # 4. Use cross-validation for more robust evaluation
    cv_r2_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
    cv_rmse_scores = -cross_val_score(model, X, y, cv=5, scoring='neg_root_mean_squared_error')
    
    print(f"Cross-validation R² scores: {cv_r2_scores}")
    print(f"Mean CV R²: {cv_r2_scores.mean():.4f} (+/- {cv_r2_scores.std() * 2:.4f})")
    print(f"Cross-validation RMSE scores: {cv_rmse_scores}")
    print(f"Mean CV RMSE: {cv_rmse_scores.mean():.4f} (+/- {cv_rmse_scores.std() * 2:.4f})")
    
    # Fit the model on the full dataset for final use
    model.fit(X, y)
    
    # Also do a train/test split evaluation
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model_train_test = LinearRegression()
    model_train_test.fit(X_train, y_train)
    y_pred = model_train_test.predict(X_test)
    
    # Calculate train/test metrics
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = mse ** 0.5
    
    print(f"\nTrain/Test Split R²: {r2:.4f}")
    print(f"Train/Test Split RMSE: {rmse:.4f}")
    print("Коэффициенты:")
    for feature, coef in zip(X.columns, model.coef_):
        print(f"- {feature}: {coef:.4f}")
    print(f"Intercept: {model.intercept_:.4f}")
    
    # 7. Create predict_scenario function
    def predict_scenario(gdp_per_capita_k, urban_share, education_index, elderly_share,
                         unemployment_rate, internet_penetration, infrastructure_exp_per_cap):
        """Function to predict digital inequality index based on feature values"""
        scenario_data = np.array([[gdp_per_capita_k, urban_share, education_index, elderly_share,
                                   unemployment_rate, internet_penetration, infrastructure_exp_per_cap]])
        prediction = model.predict(scenario_data)
        return prediction[0]
    
    # 8. Run scenarios
    # Optimistic scenario
    optimistic_pred = predict_scenario(
        gdp_per_capita_k=1000,      # high income
        urban_share=0.9,            # high urbanization
        education_index=0.9,        # high education
        elderly_share=0.15,         # low elderly share
        unemployment_rate=0.05,     # low unemployment
        internet_penetration=0.95,  # high internet penetration
        infrastructure_exp_per_cap=70  # high infrastructure spending
    )
    
    # Pessimistic scenario
    pessimistic_pred = predict_scenario(
        gdp_per_capita_k=500,       # low income
        urban_share=0.6,            # medium urbanization
        education_index=0.5,        # low education
        elderly_share=0.35,         # high elderly share
        unemployment_rate=0.12,     # high unemployment
        internet_penetration=0.5,   # low internet penetration
        infrastructure_exp_per_cap=30  # low infrastructure spending
    )
    
    print(f"Optimistic scenario prediction: {optimistic_pred:.4f}")
    print(f"Pessimistic scenario prediction: {pessimistic_pred:.4f}")
    
    # 9. Save model
    model_path = BASE_DIR / "digital_inequality_model.pkl"
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_path}")
    
    # 10. Generate charts
    # Chart 1: Bar chart of absolute coefficient values (feature importance)
    plt.figure(figsize=(10, 6))
    abs_coefs = np.abs(model.coef_)
    plt.barh(X.columns, abs_coefs)
    plt.xlabel('Absolute Coefficient Value')
    plt.title('Feature Importance (Absolute Coefficient Values)')
    plt.tight_layout()
    coef_chart_path = IMG_DIR / "feature_importance.png"
    plt.savefig(coef_chart_path)
    plt.close()
    print(f"Feature importance chart saved to {coef_chart_path}")
    
    # Chart 2: Scatter plot of actual vs predicted on test set
    plt.figure(figsize=(8, 6))
    plt.scatter(y_test, y_pred, alpha=0.7)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
    plt.xlabel('Actual Digital Inequality Index')
    plt.ylabel('Predicted Digital Inequality Index')
    plt.title('Actual vs Predicted Digital Inequality Index')
    plt.tight_layout()
    scatter_chart_path = IMG_DIR / "actual_vs_predicted.png"
    plt.savefig(scatter_chart_path)
    plt.close()
    print(f"Actual vs predicted chart saved to {scatter_chart_path}")


if __name__ == "__main__":
    run()
