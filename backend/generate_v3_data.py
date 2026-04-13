import pandas as pd
import numpy as np
import random
import os

# Set seeds for reproducibility
random.seed(42)
np.random.seed(42)

# --- CONFIGURATION ---
DOMAINS = {
    "TECH": {
        "degrees": ["B.Tech", "M.Tech"],
        "specializations": ["Computer Science", "AI/ML", "Data Science", "Web Development"],
        "careers": ["Software Engineer", "Data Scientist", "ML Engineer", "Full Stack Developer", "Backend Developer"],
        "skills": ["Python", "Java", "SQL", "React", "Docker", "AWS", "TensorFlow", "Node.js", "Git"],
        "interests": ["Coding", "Automation", "Software", "AI", "Cloud"]
    },
    "SCIENCE": {
        "degrees": ["B.Sc", "M.Sc"],
        "specializations": ["Physics", "Chemistry", "Mathematics", "Biology"],
        "careers": ["Research Scientist", "Lab Technician", "Data Analyst", "Professor", "Statistician"],
        "skills": ["Analytical Thinking", "Statistics", "Lab Techniques", "R", "Mathematica", "Research Methodologies"],
        "interests": ["Research", "Experiments", "Mathematics", "Nature", "Analysis"]
    },
    "MANAGEMENT": {
        "degrees": ["BBA", "MBA"],
        "specializations": ["Marketing", "Finance", "HR", "Operations"],
        "careers": ["Marketing Manager", "Financial Analyst", "HR Manager", "Business Analyst", "Operations Manager"],
        "skills": ["Excel", "Accounting", "Public Speaking", "SEO", "Project Management", "Strategic Planning"],
        "interests": ["Business", "Finance", "People Management", "Strategy", "Social Media"]
    },
    "CORE_ELECTRICAL": {
        "degrees": ["B.Tech", "Diploma"],
        "specializations": ["Electrical Engineering"],
        "careers": ["Power Systems Engineer", "Embedded Engineer", "Electrical Design Engineer", "Control Systems Engineer"],
        "skills": ["Circuit Analysis", "PLC", "MATLAB", "Embedded C", "Safety Protocols", "AutoCAD Electrical"],
        "interests": ["Hardware", "Electronics", "Power Grids", "Robotics"]
    },
    "CORE_MECHANICAL": {
        "degrees": ["B.Tech", "Diploma"],
        "specializations": ["Mechanical Engineering"],
        "careers": ["Design Engineer", "CAD Engineer", "Manufacturing Engineer", "Thermal Engineer"],
        "skills": ["CAD", "SolidWorks", "Thermodynamics", "Materials Science", "Ansys", "CNC Programming"],
        "interests": ["Machinery", "Automobiles", "Aerodynamics", "Manufacturing"]
    },
    "CORE_CIVIL": {
        "degrees": ["B.Tech", "Diploma"],
        "specializations": ["Civil Engineering"],
        "careers": ["Site Engineer", "Structural Engineer", "Urban Planner", "Quantity Surveyor"],
        "skills": ["AutoCAD", "Surveying", "Structural Analysis", "Project Estimation", "Revit", "Construction Management"],
        "interests": ["Infrastructure", "Architecture", "Urban Development", "Construction"]
    }
}

def generate_multi_domain_dataset(n_rows=8000):
    data = []
    domain_keys = list(DOMAINS.keys())
    
    for i in range(1, n_rows + 1):
        # Choose Domain
        domain_key = random.choice(domain_keys)
        domain_cfg = DOMAINS[domain_key]
        
        # Choose Degree & Specialization
        degree = random.choice(domain_cfg["degrees"])
        spec = random.choice(domain_cfg["specializations"])
        
        # Choose Career (mostly from domain, with 5% noise for realism)
        if random.random() > 0.05:
            career = random.choice(domain_cfg["careers"])
        else:
            # Random career from any domain
            all_careers = [c for d in DOMAINS.values() for c in d["careers"]]
            career = random.choice(all_careers)
            
        # Choose Skills (2-4 skills matching domain)
        n_skills = random.randint(2, 4)
        selected_skills = random.sample(domain_cfg["skills"], n_skills)
        # Add 1 random skill from pool for noise
        all_other_skills = [s for d in DOMAINS.values() for s in d["skills"] if s not in domain_cfg["skills"]]
        if random.random() > 0.7:
             selected_skills.append(random.choice(all_other_skills))
        
        # Choose Interests (1-2 matching domain)
        n_interests = random.randint(1, 2)
        selected_interests = random.sample(domain_cfg["interests"], n_interests)
        
        # Other fields
        marks = round(random.uniform(6.5, 9.8), 2)
        certs = random.randint(0, 5)
        
        data.append({
            "id": i,
            "degree": degree,
            "specialization": spec,
            "interests": ", ".join(selected_interests),
            "skills": ", ".join(selected_skills),
            "marks": marks,
            "certifications": certs,
            "career": career,
            "domain": domain_key if domain_key.startswith("CORE") else domain_key # Group Core together later if needed
        })

    return pd.DataFrame(data)

if __name__ == "__main__":
    if not os.path.exists("data"):
        os.makedirs("data")
        
    df = generate_multi_domain_dataset(8000)
    
    # Save as v3
    df.to_csv("data/career_data_v3.csv", index=False)
    print(f"Generated {len(df)} rows and saved to data/career_data_v3.csv")
    
    print("\nDegree distribution:")
    print(df["degree"].value_counts())
    
    print("\nDomain distribution:")
    print(df["domain"].value_counts())
    
    print("\nTop Careers:")
    print(df["career"].value_counts().head(10))
