<div align="center">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=400" alt="CareerCraft AI Banner" width="100%" style="border-radius: 10px; margin-bottom: 20px;" />
  
  <h1>CareerCraft AI</h1>
  <p><b>Next-Generation, Data-Driven Career Intelligence Hub</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend" />
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="Backend" />
    <img src="https://img.shields.io/badge/AI--Engine-Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="AI Engine" />
  </p>
</div>

<br />

## 🚀 Overview

**CareerCraft AI** is an advanced, full-stack SaaS platform designed to eliminate guesswork from career planning. By leveraging deep data analysis and machine learning algorithms, the platform evaluates a user's skills, values, and academic background to predict high-probability career paths with industrial precision.

Beyond core predictions, the Intelligence Hub offers a multi-module experience including real-time **Market Intelligence**, automated **AI Resume Optimization**, and step-by-step **Career Roadmaps**.

---

## ✨ Core Features

*   🧠 **Neural Career Matching**: Hierarchical ML prediction engine (Domain → Role) that analyzes user inputs to suggest optimal career trajectories with percentage-based confidence scores.
*   🌐 **Neural Network Visualizer**: A professional, high-performance canvas-based neural network background animation in the hero section, representing data connectivity.
*   📊 **Market Intelligence Module**: Real-time salary insights, demand signals, localized talent hotspots, and global hiring trends across specific tech sectors.
*   📄 **Resume Booster**: Automated, AI-driven resume auditing that cross-references a user's skills against industry standards to instantly identify missing competencies.
*   🛣️ **Interactive Learning Roadmaps**: Segmented progression tracks detailing the core foundations, advanced specializations, and real-world projects required.
*   💎 **Premium Ethereal UI**: An ultra-modern, glassmorphic dark-theme interface utilizing **Montserrat** branding, fluid micro-animations, and uncompromised responsive design.

---

## 🏗️ Architecture & Tech Stack

### Frontend (Client)
*   **Framework**: React 19 / Vite 6
*   **Styling**: Tailwind CSS 4 (Custom Design System)
*   **Animations**: Framer Motion & Lottie (Lottie-React)
*   **Typography**: Montserrat (Branding) & Plus Jakarta Sans (Display)
*   **Charts**: Recharts (Market Benchmarks)

### Backend (Server)
*   **Framework**: FastAPI (Python)
*   **Security**: JWT Authentication & Passlib (Bcrypt)
*   **Database ORM**: SQLAlchemy with Alembic Migrations
*   **Database**: PostgreSQL
*   **AI/ML**: Scikit-Learn based hierarchical classification models.

---

## 📂 Project Structure

```text
career-craft-ai/
├── backend/                       # FastAPI Server Architecture
│   ├── main.py                    # API entry point & routes
│   ├── src/                       # Core backend logic (Auth, DB, ML)
│   └── models/                    # ML Model Registries (.pkl files)
├── data/                          # Training datasets and schema designs
└── frontend/                      # React/Vite Client Architecture
    ├── src/                       
    │   ├── admin/                 # Admin management boards
    │   ├── components/            # Reusable UI (Navbar, Sidebar, Charts)
    │   ├── context/               # Auth & Prediction State Management
    │   ├── pages/                 # Full-Page views (Landing, Dashboard, etc.)
    │   └── index.css              # Custom Tailwind 4 theme tokens
    └── tailwind.config.js         # Design system configuration
```

---

## ⚙️ Installation & Setup

### 1. Backend Initialization
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8003
```

### 2. Frontend Initialization
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security Notice
This repository is designed for private deployment. Sensitive data like machine learning models (`.pkl`) and local environment variables (`.env`) are managed via `.gitignore` to ensure security and prevent intellectual property leakage.

<p align="center">
  <i>Engineered to replace guesswork with data science.</i><br/>
  <b>— The CareerCraft Team</b>
</p>
