
import os
import json
import datetime
from src.config import MODEL_PATH

REGISTRY_PATH = os.path.join(MODEL_PATH, "model_registry.json")

def update_registry(version, metrics, model_type="role"):
    """ Tracks model versions and their performance metrics. """
    registry = {}
    if os.path.exists(REGISTRY_PATH):
        with open(REGISTRY_PATH, "r") as f:
            registry = json.load(f)
    
    entry = {
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "metrics": metrics,
        "active": True
    }
    
    if model_type not in registry:
        registry[model_type] = {}
    
    # Set previous versions to inactive
    for v in registry[model_type]:
        registry[model_type][v]["active"] = False
        
    registry[model_type][version] = entry
    
    with open(REGISTRY_PATH, "w") as f:
        json.dump(registry, f, indent=4)
    
    print(f"Registry updated for {model_type} v{version}")

def get_latest_version(model_type="role"):
    if not os.path.exists(REGISTRY_PATH):
        return "1.0.0"
    with open(REGISTRY_PATH, "r") as f:
        registry = json.load(f)
    if model_type not in registry:
        return "1.0.0"
    
    versions = list(registry[model_type].keys())
    # Simple version increment logic for this demo
    latest = versions[-1]
    parts = latest.split('.')
    parts[-1] = str(int(parts[-1]) + 1)
    return ".".join(parts)
