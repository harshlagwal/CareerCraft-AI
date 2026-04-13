import requests
import json
import sys
import os

def test_low_signal_behavior():
    base_url = "http://127.0.0.1:8003"
    endpoint = f"{base_url}/predict/top"
    
    # Check if server is reachable first
    try:
        requests.get(f"{base_url}/", timeout=2)
    except:
        print(f"!!! Server is not running on {base_url}. Please start main.py first.")
        return

    test_cases = [
        {
            "name": "Single Skill (Hard Block)",
            "payload": {
                "degree": "B.Tech",
                "specialization": "Computer Science",
                "interests": "Software",
                "skills": ["Python"],
                "marks": 8.0,
                "certifications": 1
            },
            "expected_status": "uncertain"
        },
        {
            "name": "Two Skills (Soft Prediction - Low Confidence)",
            "payload": {
                "degree": "B.Tech",
                "specialization": "Computer Science",
                "interests": "Software",
                "skills": ["Python", "React"],
                "marks": 8.0,
                "certifications": 1
            },
            "expected_status": "low_confidence"
        },
        {
            "name": "Three Skills (Success - High/Moderate Confidence)",
            "payload": {
                "degree": "B.Tech",
                "specialization": "Computer Science",
                "interests": "Software",
                "skills": ["Python", "React", "Node.js"],
                "marks": 8.0,
                "certifications": 1
            },
            "expected_status": "success"
        }
    ]

    print("[SEARCH] Validating Low-Signal Prediction Behavior...\n")
    
    for case in test_cases:
        print(f"Testing {case['name']}...")
        try:
            response = requests.post(endpoint, json=case['payload'])
            if response.status_code == 200:
                data = response.json()
                received_status = data.get('status')
                
                print(f"   Status: {received_status}")
                print(f"   Message: {data.get('message')}")
                
                if received_status == case['expected_status']:
                    print(f"   [OK] Correct Status Mapping")
                else:
                    print(f"   [ERROR] Incorrect Status: Expected {case['expected_status']}, got {received_status}")
                
                if received_status != 'uncertain':
                    role = data.get('top_roles')[0]['role']
                    confidence = data.get('top_roles')[0]['confidence']
                    print(f"   Prediction: {role} ({confidence * 100}% confidence)")
                else:
                    print(f"   Hints Provided: {len(data.get('suggested_hints', []))} suggestions")
            else:
                print(f"   [ERROR] API Request Failed: {response.status_code}")
        except Exception as e:
            print(f"   [ERROR] Error: {str(e)}")
        print("-" * 60)

if __name__ == "__main__":
    test_low_signal_behavior()
