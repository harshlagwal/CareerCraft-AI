from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime
from src.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="user", server_default="user", nullable=False, index=True) # Roles: user, admin
    created_at = Column(DateTime, default=datetime.utcnow)

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    prediction = Column(String, nullable=False)
    liked = Column(Boolean, nullable=False)
    comment = Column(String, nullable=True)
    is_processed = Column(Boolean, default=False) # For retraining pipeline
    created_at = Column(DateTime, default=datetime.utcnow)

class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(String, index=True, nullable=False) # For tracing
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    input_data = Column(String, nullable=False) # JSON string of inputs
    output_data = Column(String, nullable=False) # JSON string of outputs
    experiment_group = Column(String, default="A") # For A/B testing (A: Boosted, B: Model Only)
    created_at = Column(DateTime, default=datetime.utcnow)
class UserJourney(Base):
    __tablename__ = "user_journey"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    skills = Column(String, nullable=False)
    predicted_role = Column(String, nullable=False)
    confidence = Column(Integer, nullable=False) # Store as percentage 0-100
    created_at = Column(DateTime, default=datetime.utcnow)
