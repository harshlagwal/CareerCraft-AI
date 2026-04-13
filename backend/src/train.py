import os
import pickle
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
)

from src.config import TEST_SIZE, RANDOM_STATE, RF_MODEL_PATH, MODEL_PATH, DOMAIN_MODEL_PATH, ROLE_MODEL_PATH, DOMAIN_MODEL_V2_PATH, ROLE_MODEL_V2_PATH
from src.preprocessing import preprocess_data, load_data
from src.registry import update_registry, get_latest_version


def train_model(X, y):
    from sklearn.model_selection import train_test_split

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=y
    )

    param_grid = {
        "n_estimators": [100, 200],
        "max_depth": [10, 20, 30],
        "min_samples_split": [2, 5],
    }

    rf = RandomForestClassifier(random_state=RANDOM_STATE, class_weight="balanced")
    grid_search = GridSearchCV(rf, param_grid, cv=5, scoring="accuracy", n_jobs=-1)
    grid_search.fit(X_train, y_train)

    best_model = grid_search.best_estimator_

    y_train_pred = best_model.predict(X_train)
    y_test_pred = best_model.predict(X_test)

    train_acc = accuracy_score(y_train, y_train_pred)
    test_acc = accuracy_score(y_test, y_test_pred)

    metrics = {
        "accuracy": test_acc,
        "precision": precision_score(
            y_test, y_test_pred, average="weighted", zero_division=0
        ),
        "recall": recall_score(
            y_test, y_test_pred, average="weighted", zero_division=0
        ),
        "f1": f1_score(y_test, y_test_pred, average="weighted", zero_division=0),
    }

    print(f"\nBest Parameters: {grid_search.best_params_}")
    print(f"Train Accuracy: {train_acc:.4f}")
    print(f"Test Accuracy: {test_acc:.4f}")
    print(f"Precision: {metrics['precision']:.4f}")
    print(f"Recall: {metrics['recall']:.4f}")
    print(f"F1 Score: {metrics['f1']:.4f}")
    print(f"\nClassification Report:")
    print(classification_report(y_test, y_test_pred, zero_division=0))

    return best_model, metrics, grid_search.best_params_


def save_model(model, path=None):
    if path is None:
        os.makedirs(MODEL_PATH, exist_ok=True)
        path = RF_MODEL_PATH
    with open(path, "wb") as f:
        pickle.dump(model, f)
    print(f"Model saved to {path}")


def load_model(path=None):
    if path is None:
        path = RF_MODEL_PATH
    with open(path, "rb") as f:
        return pickle.load(f)


def main():
    print("Loading data...")
    df = load_data()

    print("Preprocessing data...")
    X, y_domain, y_role, encoder_data = preprocess_data(df, return_groups=False)

    # Versioning
    domain_version = get_latest_version("domain")
    role_version = get_latest_version("role")

    print(f"\n" + "=" * 30 + f" TRAINING DOMAIN MODEL v{domain_version} (Multi-Domain) " + "=" * 30)
    domain_model, domain_metrics, domain_params = train_model(X, y_domain)
    save_model(domain_model, DOMAIN_MODEL_PATH)
    save_model(domain_model, DOMAIN_MODEL_V2_PATH)
    save_model(domain_model, os.path.join(MODEL_PATH, f"domain_v{domain_version}.pkl"))
    update_registry(domain_version, domain_metrics, "domain")

    print("\n" + "=" * 30 + f" TRAINING ROLE MODEL v{role_version} (Multi-Domain) " + "=" * 30)
    role_model, role_metrics, role_params = train_model(X, y_role)
    save_model(role_model, ROLE_MODEL_PATH)
    save_model(role_model, ROLE_MODEL_V2_PATH)
    save_model(role_model, os.path.join(MODEL_PATH, f"role_v{role_version}.pkl"))
    save_model(role_model, RF_MODEL_PATH) # Legacy
    update_registry(role_version, role_metrics, "role")

    # Feature Importance Analysis (using Role Model as reference)
    feature_names = encoder_data["feature_names"]
    importances = role_model.feature_importances_
    indices = np.argsort(importances)[::-1]

    print("\nFeature Importances (Top 10):")
    for f in range(min(10, len(feature_names))):
        print(f"{f + 1}. {feature_names[indices[f]]}: {importances[indices[f]]:.4f}")

    # Verify if skills dominate
    total_skill_importance = sum(importances[i] for i, name in enumerate(feature_names) if name in encoder_data["all_skills"])
    total_spec_importance = sum(importances[i] for i, name in enumerate(feature_names) if "specialization_" in name)
    total_interest_importance = sum(importances[i] for i, name in enumerate(feature_names) if "interests_" in name)
    
    print(f"\nTotal Skills Importance: {total_skill_importance:.4f}")
    print(f"Total Specialization Importance: {total_spec_importance:.4f}")
    print(f"Total Interests Importance: {total_interest_importance:.4f}")

    print(f"\nClass Mapping: {dict(enumerate(encoder_data['career_classes']))}")

    print("\n" + "=" * 60)
    print("MODEL SUMMARY")
    print("- Train/Test split: 80/20 with random_state=42")
    print("- GridSearchCV: max_depth=[5,10,15], n_estimators=[50,100]")
    print("- Best domain params:", domain_params)
    print("- Best role params:", role_params)
    print("=" * 60 + "\n")

    return role_model, role_metrics, encoder_data


if __name__ == "__main__":
    main()
