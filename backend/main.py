from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import numpy as np
import json
import uuid
import math
import os
from sqlalchemy import func

from src.config import RF_MODEL_PATH, ENCODER_PATH, DOMAIN_MODEL_V2_PATH, ROLE_MODEL_V2_PATH
from src.preprocessing import encode_input
from datetime import datetime
from src.train import load_model, load_data

from src.db import get_db, engine, Base
from src.models import User, Feedback, PredictionLog, UserJourney
from src.auth import get_password_hash, verify_password, create_access_token, get_current_user, get_optional_user
from src.recommendations import get_recommendations
from src.market_data import get_market_insights
from src.resume_optimizer import get_resume_optimization

# Ensure tables are built (if they don't exist yet)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareerCraft AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

domain_model = load_model(DOMAIN_MODEL_V2_PATH)
role_model = load_model(ROLE_MODEL_V2_PATH)


class CareerInput(BaseModel):
    degree: str
    specialization: str
    interests: str
    skills: list[str]
    marks: float
    certifications: int


@app.get("/")
def root():
    return {"message": "CareerCraft AI API is running"}


@app.get("/market-debug")
def market_debug():
    return {"status": "updated", "message": "Market Intelligence is active"}

# Rule-Based Boost Mapping (Hybrid Approach)
ROLE_BOOST_MAP = {
    # Data & Tech
    'Power BI': 'Data Analyst', 'Excel': 'Data Analyst', 'Tableau': 'Data Analyst', 'SQL': 'Data Analyst',
    'TensorFlow': 'ML Engineer', 'PyTorch': 'ML Engineer', 'Scikit-Learn': 'ML Engineer', 'Model Deployment': 'ML Engineer',
    'Statistics': 'Data Scientist', 'Pandas': 'Data Scientist', 'Research': 'Data Scientist', 
    'React': 'Frontend Developer', 'Next.js': 'Frontend Developer', 'Tailwind': 'Frontend Developer',
    'Node.js': 'Backend Developer', 'Express': 'Backend Developer', 'Spring Boot': 'Backend Developer',
    'MongoDB': 'Full Stack Developer', 'MERN Stack': 'Full Stack Developer', 'PostgreSQL': 'Full Stack Developer',
    'AWS': 'Cloud Architect', 'Docker': 'Cloud Architect', 'Kubernetes': 'Cloud Architect',
    # Management
    'Digital Marketing': 'Marketing Manager', 'SEO': 'Marketing Manager', 'CRM': 'Marketing Manager',
    'Strategic Planning': 'Business Analyst', 'Agile': 'Business Analyst', 'Jira': 'Business Analyst',
    'HR Policy': 'HR Manager', 'Talent Acquisition': 'HR Manager', 'Payroll': 'HR Manager',
    # Core Engineering
    'AutoCAD': 'Structural Engineer', 'MATLAB': 'Control Systems Engineer', 'SolidWorks': 'Design Engineer',
    'Circuit Analysis': 'Power Systems Engineer', 'PLC': 'Power Systems Engineer',
    'Surveying': 'Site Engineer', 'Thermodynamics': 'Thermal Engineer'
}

@app.post("/predict")
def predict(input_data: CareerInput, db: Session = Depends(get_db), current_user: User = Depends(get_optional_user)):
    request_id = str(uuid.uuid4())
    input_dict = input_data.model_dump()
    
    # 0. Context-Aware Suggested Skills (UI Hints)
    all_suggestions = {
        "Data": ["TensorFlow", "Power BI", "SQL", "Pandas", "Scikit-Learn"],
        "Development": ["React", "Node.js", "Next.js", "Docker", "MongoDB"],
        "Security": ["SIEM", "Kali Linux", "Firewall", "Penetration Testing"],
        "Mobile": ["Flutter", "Kotlin", "Swift", "React Native"],
        "Management": ["Jira", "Agile", "Scrum", "Product Roadmap"]
    }
    
    status_label = "success"
    msg = "Match results analyzed."
    hints = []

    if len(input_dict["skills"]) < 3:
        status_label = "low_confidence"
        hint_category = input_dict.get("specialization", "Development")
        hints = all_suggestions.get(hint_category, all_suggestions["Development"])
        msg = "Low Confidence Prediction. Add more skills to improve accuracy."

    features, encoder_data = encode_input(input_dict, ENCODER_PATH)

    # 1. A/B Testing: Determine group (A: Hybrid Boost, B: Pure Model)
    experiment_group = "A" if hash("".join(input_dict["skills"])) % 2 == 0 else "B"

    # 2. Predict Domain
    domain_proba = domain_model.predict_proba(features)[0]
    domain_classes = encoder_data["domain_classes"]
    top_domain = domain_classes[np.argmax(domain_proba)]

    # 3. Predict Roles
    role_proba = role_model.predict_proba(features)[0]
    classes = encoder_data["career_classes"]
    
    # Apply Dynamic Logarithmic Boost ONLY for Group A
    if experiment_group == "A":
        input_skills = [s.strip() for s in input_dict["skills"]]
        num_skills = len(input_skills)
        # Logarithmic scaling: Boost decreases slightly as skill count increases to prevent over-dominance
        # Formula: 1 + log2(1 + count) / 1.2
        dynamic_boost = 1.0 + (math.log2(1 + num_skills) / 1.2)
        
        for skill, role in ROLE_BOOST_MAP.items():
            if skill in input_skills and role in classes:
                role_idx = list(classes).index(role)
                role_proba[role_idx] *= dynamic_boost
        
        # Re-normalize
        role_proba = role_proba / np.sum(role_proba)
    
    # 4. Uncertainty Handling
    if (np.max(role_proba) < 0.15) or (len(input_dict["skills"]) < 2):
        hint_category = top_domain if top_domain in all_suggestions else "Development"
        return {
            "status": "uncertain",
            "request_id": request_id,
            "message": "Add more skills to improve accuracy. Our model needs at least 2 skills for a reliable prediction.",
            "suggestion": f"Try adding more role-specific tools from the {hint_category} domain.",
            "suggested_hints": all_suggestions.get(hint_category, []),
            "group": experiment_group
        }

    predictions = []
    for career, confidence in zip(classes, role_proba):
        # 5. Reduce Overconfidence
        capped_confidence = min(float(confidence), 0.7)
        predictions.append({
            "role": career, 
            "confidence": round(capped_confidence, 2)
        })
    
    predictions.sort(key=lambda x: x["confidence"], reverse=True)
    top_3 = predictions[:3]

    # 5. Recommendation Engine
    recommendations = get_recommendations(top_3[0]["role"], input_dict["skills"])

    # 6. Market Intelligence
    market_insights = get_market_insights(top_3[0]["role"])

    # 7. Resume Optimization
    resume_data = get_resume_optimization(top_3[0]["role"], input_dict["skills"], top_3[0]["confidence"])

    response = {
        "status": status_label,
        "request_id": request_id,
        "userInput": input_dict,
        "top_roles": top_3,
        "recommended_courses": recommendations,
        "market_insights": market_insights,
        "resume_keywords": resume_data["resume_keywords"],
        "resume_suggestions": resume_data["resume_suggestions"],
        "resume_score": resume_data["resume_score"],
        "keyword_match_pct": resume_data["keyword_match_pct"],
        "skill_gap": resume_data["skill_gap"],
        "resume_readiness": resume_data["readiness"],
        "resume_smart_suggestions": resume_data["smart_suggestions"],
        "experiment_group": experiment_group,
        "message": msg,
        "suggested_hints": hints,
        "explanation": f"Top match among {len(classes)} industry roles."
    }

    # 6. Prediction Logging (PRO Feature)
    log_entry = PredictionLog(
        request_id=request_id,
        user_id=current_user.id if current_user else None,
        input_data=json.dumps(input_dict),
        output_data=json.dumps(response),
        experiment_group=experiment_group
    )
    db.add(log_entry)
    
    # 7. Save Journey (New Tracking Feature)
    if current_user:
        journey_entry = UserJourney(
            user_id=current_user.id,
            skills=", ".join(input_dict["skills"]),
            predicted_role=top_3[0]["role"],
            confidence=int(top_3[0]["confidence"] * 100)
        )
        db.add(journey_entry)
        
    db.commit()

    return response

@app.post("/feedback")
def submit_feedback(data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """ Stores user feedback about a prediction for future retraining. """
    new_feedback = Feedback(
        user_id=current_user.id,
        prediction=data.get("prediction"),
        liked=data.get("liked"),
        comment=data.get("comment")
    )
    db.add(new_feedback)
    db.commit()
    return {"message": "Feedback submitted. Thank you for helping us improve!"}

@app.post("/predict/top")
def predict_top(input_data: CareerInput, db: Session = Depends(get_db), current_user: User = Depends(get_optional_user)):
    """ Legacy wrapper for predict """
    return predict(input_data, db, current_user)

@app.get("/journey")
def get_user_journey(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """ Returns history of user predictions for progress tracking. """
    history = db.query(UserJourney).filter(UserJourney.user_id == current_user.id).order_by(UserJourney.created_at.asc()).all()
    
    formatted_history = []
    for entry in history:
        formatted_history.append({
            "id": entry.id,
            "skills": entry.skills,
            "role": entry.predicted_role,
            "confidence": entry.confidence,
            "date": entry.created_at.strftime("%Y-%m-%d %H:%M")
        })
        
    return formatted_history

# === Admin Dependency ===

def require_admin(current_user: User = Depends(get_current_user)):
    """ Dependency that ensures the current user is an admin. """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required.")
    return current_user

# === Admin & Analytics Panel (PRO) ===

@app.get("/admin/stats")
def get_admin_stats(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """ Returns comprehensive analytics: users, predictions, career trends, feedback. """
    # Total Users
    total_users = db.query(User).count()
    
    # Total Predictions
    total_predictions = db.query(PredictionLog).count()
    
    # Feedback Summary
    feedback_stats = db.query(
        Feedback.liked, 
        func.count(Feedback.id)
    ).group_by(Feedback.liked).all()
    
    # Top 5 Predicted Roles (from JSON logs)
    logs = db.query(PredictionLog).all()
    role_counts = {}
    for log in logs:
        out = json.loads(log.output_data)
        if "top_roles" in out:
            top_role = out["top_roles"][0]["role"]
            role_counts[top_role] = role_counts.get(top_role, 0) + 1
    
    sorted_roles = sorted(role_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    distribution = [{"role": r[0], "count": r[1]} for r in sorted_roles]
    
    # Recent Users
    recent_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    users_list = [{
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "joined": u.created_at.isoformat() if u.created_at else None
    } for u in recent_users]

    return {
        "total_users": total_users,
        "total_interactions": total_predictions,
        "total_predictions": total_predictions,
        "feedback": dict(feedback_stats),
        "trending_careers": sorted_roles,
        "distribution": distribution,
        "recent_users": users_list,
        "system_status": "Healthy",
        "load": "Normal"
    }

@app.get("/admin/prediction-logs")
def get_prediction_logs(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """ Returns the most recent prediction logs for admin review. """
    logs = db.query(PredictionLog).order_by(PredictionLog.created_at.desc()).limit(50).all()
    result = []
    for log in logs:
        result.append({
            "id": log.id,
            "request_id": log.request_id,
            "user_id": log.user_id,
            "input": json.loads(log.input_data),
            "output": json.loads(log.output_data),
            "group": log.experiment_group,
            "created_at": log.created_at.isoformat() if log.created_at else None
        })
    return result

@app.get("/admin/registry")
def get_model_registry(admin: User = Depends(require_admin)):
    """ Returns history of model versions and performance. """
    registry_path = "models/model_registry.json"
    if os.path.exists(registry_path):
        with open(registry_path, "r") as f:
            return json.load(f)
    return {"error": "Registry not found"}

# === Authentication Schemas ===
class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


import re

# === Authentication APIs ===

@app.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserSignup, db: Session = Depends(get_db)):
    # Validate email uniqueness
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email is already registered"
        )
    
    # Password validation rules: Min 6 chars, at least one letter, one number, and one special character
    password_regex = r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
    if not re.match(password_regex, user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid password format"
        )

    # Hash password using bcrypt only after validation
    hashed_password = get_password_hash(user.password)
    
    # Assign admin role for special email
    role = "admin" if user.email.lower() == "admin@careercraft.ai" else "user"
    
    # Store in database
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User registered successfully", "user_id": new_user.id}


@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    
    # Verify exact user info
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # Generate JWT token with role
    access_token = create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role
        }
    }


@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "created_at": current_user.created_at
    }

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """ List all users in the system for administrative oversight. """
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "role": u.role,
        "created_at": u.created_at
    } for u in users]

@app.post("/admin/promote/{user_id}")
def promote_user_role(user_id: int, db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """ Endpoint to promote standard users to admin role. """
    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    target_user.role = "admin"
    db.commit()
    return {"message": f"User {target_user.email} promoted successfully"}
