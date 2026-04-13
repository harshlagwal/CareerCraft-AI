
import os
import json
import pandas as pd
from sqlalchemy.orm import Session
from src.db import engine, SessionLocal
from src.models import Feedback
from src.config import DATA_PATH
from src.train import main as trigger_retraining

def run_retraining_cycle():
    """ 
    Pro-Level Retraining Loop:
    1. Fetches successful (liked) user inputs.
    2. Merges with base dataset.
    3. Triggers updated training.
    """
    db = SessionLocal()
    try:
        # Fetch 'liked' feedback that hasn't been processed yet
        new_samples = db.query(Feedback).filter(Feedback.liked == True, Feedback.is_processed == False).all()
        
        if len(new_samples) < 10: # Minimum batch size for retraining
            print(f"Skipping retraining: Only {len(new_samples)} new feedback samples found. Need at least 10.")
            return
            
        print(f"Starting retraining cycle with {len(new_samples)} new user-verified samples...")
        
        # Load base dataset
        base_df = pd.read_csv(DATA_PATH)
        
        # Process and convert feedback to dataframe rows
        augmented_rows = []
        for sample in new_samples:
            # Parse the prediction to get the target role (usually the top one)
            # Sample prediction would be 'ML Engineer' (stored as string in our system)
            input_data = json.loads(sample.input_data) if hasattr(sample, 'input_data') else {}
            # Fallback if input_data wasn't explicitly stored in feedback but is in prediction_logs
            # (In a real system we'd join prediction_logs and feedback tables)
            
            # For this demo, we assume the feedback contains the target class
            row = input_data
            row['Career'] = sample.prediction
            augmented_rows.append(row)
            
        if augmented_rows:
            new_df = pd.DataFrame(augmented_rows)
            # Align columns with base dataset
            for col in base_df.columns:
                if col not in new_df.columns:
                    new_df[col] = base_df[col].mode()[0] # Simple imputation
            
            # Concatenate and save
            final_df = pd.concat([base_df, new_df], ignore_index=True)
            final_df.to_csv(DATA_PATH, index=False)
            
            # Trigger Training
            trigger_retraining()
            
            # Mark as processed
            for sample in new_samples:
                sample.is_processed = True
            db.commit()
            print("Retraining cycle complete. Model upgraded with user feedback.")
            
    finally:
        db.close()

if __name__ == "__main__":
    run_retraining_cycle()
