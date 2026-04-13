import sys
import os

# Add the parent directory to sys.path so we can import 'src'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.db import SessionLocal
from src.models import User

from src.auth import get_password_hash

def promote_user(email: str, name: str = "Admin", password: str = None):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            if not password:
                print(f"❌ Error: User '{email}' not found. To create a new one, provide a password.")
                return
            
            print(f"📝 User not found. Creating new admin: {email}...")
            user = User(
                name=name,
                email=email,
                password=get_password_hash(password),
                role="admin"
            )
            db.add(user)
            print("✅ Success: New Admin account created.")
        else:
            user.role = "admin"
            print(f"✅ Success: Existing user '{email}' promoted to ADMIN.")
            
        db.commit()
    except Exception as e:
        print(f"❌ Fatal Error: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/promote_admin.py <email> [name] [password]")
    else:
        email = sys.argv[1]
        name = sys.argv[2] if len(sys.argv) > 2 else "Admin User"
        password = sys.argv[3] if len(sys.argv) > 3 else None
        promote_user(email, name, password)
