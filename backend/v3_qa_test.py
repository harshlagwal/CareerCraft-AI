import requests
import json

def test_v3_system():
    base_url = "http://127.0.0.1:8003"
    endpoint = f"{base_url}/predict/top"
    
    test_cases = [
        {
            "name": "Case 1: B.Tech Electrical",
            "payload": {
                "degree": "B.Tech",
                "specialization": "Electrical Engineering",
                "interests": "Hardware, Robotics",
                "skills": ["Circuit Analysis", "MATLAB", "PLC"],
                "marks": 8.8,
                "certifications": 2
            }
        },
        {
            "name": "Case 2: MBA Finance",
            "payload": {
                "degree": "MBA",
                "specialization": "Finance",
                "interests": "Finance, Strategy",
                "skills": ["Excel", "Accounting", "Strategic Planning"],
                "marks": 9.2,
                "certifications": 1
            }
        },
        {
            "name": "Case 3: B.Sc Physics",
            "payload": {
                "degree": "B.Sc",
                "specialization": "Physics",
                "interests": "Research, Analysis",
                "skills": ["Analytical Thinking", "Mathematica", "Statistics"],
                "marks": 8.5,
                "certifications": 0
            }
        },
        {
            "name": "Case 4: Mixed Input (Creative/Tech)",
            "payload": {
                "degree": "B.Tech",
                "specialization": "Web Development",
                "interests": "Marketing, Design",
                "skills": ["Python", "Digital Marketing", "React"],
                "marks": 7.5,
                "certifications": 3
            }
        }
    ]

    print("🚀 Starting V3 Multi-Domain Validation...\n")
    
    for case in test_cases:
        print(f"Testing {case['name']}...")
        try:
            response = requests.post(endpoint, json=case['payload'])
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success | Domain: {data.get('domain')} | Top Role: {data.get('top_roles')[0]['role']} ({data.get('top_roles')[0]['confidence']} confidence)")
                print(f"📝 message: {data.get('message', 'N/A')}")
                print(f"🔬 Exp Group: {data.get('experiment_group')}")
            else:
                print(f"❌ Failed | Status: {response.status_code} | Body: {response.text}")
        except Exception as e:
            print(f"❌ Error: {str(e)}")
        print("-" * 50)

if __name__ == "__main__":
    # Check if server is reachable first
    try:
        requests.get("http://127.0.0.1:8003/", timeout=2)
    except:
        print("!!! Server is not running on port 8003. Please start main.py first.")
        print("Attempting to run validation via direct model calls instead...\n")
        
        # Fallback to direct model testing
        import sys
        import os
        # Add current directory to path so src can be imported
        sys.path.append(os.getcwd())
        
        from src.preprocessing import encode_input
        from src.train import load_model
        from src.config import DOMAIN_MODEL_V2_PATH, ROLE_MODEL_V2_PATH, ENCODER_PATH
        import numpy as np

        domain_model = load_model(DOMAIN_MODEL_V2_PATH)
        role_model = load_model(ROLE_MODEL_V2_PATH)
        
        test_cases = [
            {"degree": "B.Tech", "specialization": "Electrical Engineering", "interests": "Hardware", "skills": ["Circuit Analysis", "MATLAB"], "marks": 8.8, "certifications": 2},
            {"degree": "MBA", "specialization": "Finance", "interests": "Finance", "skills": ["Excel", "Accounting"], "marks": 9.2, "certifications": 1},
            {"degree": "B.Sc", "specialization": "Physics", "interests": "Research", "skills": ["Analytical Thinking", "Mathematica"], "marks": 8.5, "certifications": 0},
            {"degree": "B.Tech", "specialization": "Web Development", "interests": "Marketing", "skills": ["Python", "Digital Marketing"], "marks": 7.5, "certifications": 3}
        ]

        for i, payload in enumerate(test_cases):
            print(f"Testing Case {i+1}...")
            features, encoder_data = encode_input(payload, ENCODER_PATH)
            
            # Predict Domain
            d_proba = domain_model.predict_proba(features)[0]
            domain = encoder_data["domain_classes"][np.argmax(d_proba)]
            
            # Predict Role
            r_proba = role_model.predict_proba(features)[0]
            role = encoder_data["career_classes"][np.argmax(r_proba)]
            
            print(f"[OK] Direct Predict | Domain: {domain} | Predicted Role: {role}")
            print("-" * 50)
    else:
        test_v3_system()
