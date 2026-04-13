import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data", "career_data_v3.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models")
ENCODER_PATH = os.path.join(MODEL_PATH, "encoder.pkl")
RF_MODEL_PATH = os.path.join(MODEL_PATH, "model.pkl")
DOMAIN_MODEL_PATH = os.path.join(MODEL_PATH, "domain_model.pkl")
ROLE_MODEL_PATH = os.path.join(MODEL_PATH, "role_model.pkl")
DOMAIN_MODEL_V2_PATH = os.path.join(MODEL_PATH, "domain_model_v2.pkl")
ROLE_MODEL_V2_PATH = os.path.join(MODEL_PATH, "role_model_v2.pkl")

TEST_SIZE = 0.2
RANDOM_STATE = 42
