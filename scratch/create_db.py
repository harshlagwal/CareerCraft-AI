import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_db():
    try:
        # Connect to default postgres DB
        conn = psycopg2.connect(
            dbname='postgres',
            user='postgres',
            password='Harsh@200515',
            host='127.0.0.1',
            port='5432'
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Create database
        cur.execute('CREATE DATABASE "carrier_craft_Ai"')
        print("Database 'carrier_craft_Ai' created successfully!")
        
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_db()
