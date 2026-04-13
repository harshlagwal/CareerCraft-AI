import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder
from src.config import DATA_PATH, ENCODER_PATH


def load_data(path=None):
    if path is None:
        path = DATA_PATH
    return pd.read_csv(path)


def extract_skills(df):
    all_skills = set()
    for skills_str in df["skills"]:
        if pd.notna(skills_str):
            for skill in skills_str.split(","):
                all_skills.add(skill.strip())
    return sorted(list(all_skills))


def encode_skills(df, all_skills):
    skills_matrix = np.zeros((len(df), len(all_skills)), dtype=int)
    for i, skills_str in enumerate(df["skills"]):
        if pd.notna(skills_str):
            for skill in skills_str.split(","):
                skill = skill.strip()
                if skill in all_skills:
                    skills_matrix[i, all_skills.index(skill)] = 1
    return skills_matrix


def preprocess_data(df=None, save_encoders=True, return_groups=False):
    if df is None:
        df = load_data()

    all_skills = extract_skills(df)
    
    # 1. Filter classes with < 30 samples
    class_counts = df["career"].value_counts()
    classes_to_drop = class_counts[class_counts < 30].index.tolist()
    if classes_to_drop:
        print(f"Dropping classes with < 30 samples: {classes_to_drop}")
        df = df[~df["career"].isin(classes_to_drop)].reset_index(drop=True)

    skills_encoded = encode_skills(df, all_skills)

    # Use One-Hot Encoding for categorical columns instead of Label Encoding
    # This ensures no arbitrary order is implied and allows us to see importance of specific choices
    categorical_cols = ["degree", "specialization"]
    
    # 2. Extract multi-hot features
    def extract_multi_val(df, col):
        vals = set()
        for s in df[col]:
            if pd.notna(s):
                for v in str(s).split(","):
                    vals.add(v.strip())
        return sorted(list(vals))

    def encode_multi_val(df, col, all_vals):
        matrix = np.zeros((len(df), len(all_vals)), dtype=int)
        for i, s in enumerate(df[col]):
            if pd.notna(s):
                for v in str(s).split(","):
                    v = v.strip()
                    if v in all_vals:
                        matrix[i, all_vals.index(v)] = 1
        return matrix

    all_interests = extract_multi_val(df, "interests")
    interests_encoded = encode_multi_val(df, "interests", all_interests)
    
    # LabelEncoder for Domain and Career
    domain_le = LabelEncoder()
    career_le = LabelEncoder()
    
    df["domain_encoded"] = domain_le.fit_transform(df["domain"].astype(str))
    df["career_encoded"] = career_le.fit_transform(df["career"].astype(str))
    
    # One-hot encoding for categorical features
    df_encoded = pd.get_dummies(df[categorical_cols])
    categorical_feature_names = df_encoded.columns.tolist()
    interest_feature_names = [f"interests_{i}" for i in all_interests]
    
    # Combine everything
    X_numeric = df[["marks", "certifications"]].values
    X = np.hstack([X_numeric, df_encoded.values, interests_encoded, skills_encoded])
    
    feature_names = ["marks", "certifications"] + categorical_feature_names + interest_feature_names + all_skills
    
    y_domain = df["domain_encoded"].values
    y_career = df["career_encoded"].values

    if save_encoders:
        encoder_data = {
            "domain_encoder": domain_le,
            "career_encoder": career_le,
            "all_skills": all_skills,
            "all_interests": all_interests,
            "categorical_cols": categorical_cols,
            "categorical_feature_names": categorical_feature_names,
            "interest_feature_names": interest_feature_names,
            "feature_names": feature_names,
            "domain_classes": domain_le.classes_,
            "career_classes": career_le.classes_,
        }
        with open(ENCODER_PATH, "wb") as f:
            pickle.dump(encoder_data, f)

    df_key = (
        df["degree"]
        + "|"
        + df["specialization"]
        + "|"
        + df["interests"]
        + "|"
        + df["skills"].fillna("")
        + "|"
        + df["career"]
    )
    groups = pd.factorize(df_key)[0]

    if return_groups:
        return X, y_domain, y_career, encoder_data, groups

    return X, y_domain, y_career, encoder_data


def encode_input(input_data, encoder_path=None):
    if encoder_path is None:
        encoder_path = ENCODER_PATH

    with open(encoder_path, "rb") as f:
        encoder_data = pickle.load(f)

    all_skills = encoder_data["all_skills"]
    all_interests = encoder_data["all_interests"]
    categorical_feature_names = encoder_data["categorical_feature_names"]

    # Initialize categorical features with 0
    cat_features = np.zeros(len(categorical_feature_names))
    
    # Fill one-hot for degree, specialization
    for col in encoder_data["categorical_cols"]:
        val = str(input_data[col]).strip()
        feat_name = f"{col}_{val}"
        if feat_name in categorical_feature_names:
            cat_features[categorical_feature_names.index(feat_name)] = 1

    # Interests encoding
    interest_matrix = np.zeros(len(all_interests), dtype=int)
    interest_val = str(input_data["interests"])
    for interest in interest_val.split(","):
        interest = interest.strip()
        if interest in all_interests:
            interest_matrix[all_interests.index(interest)] = 1

    # Skills encoding
    skills_matrix = np.zeros(len(all_skills), dtype=int)
    for skill in input_data["skills"]:
        skill = skill.strip()
        if skill in all_skills:
            skills_matrix[all_skills.index(skill)] = 1

    # Combine
    features = np.array([[input_data["marks"], input_data["certifications"]]])
    features = np.hstack([features, cat_features.reshape(1, -1), interest_matrix.reshape(1, -1), skills_matrix.reshape(1, -1)])

    return features, encoder_data
