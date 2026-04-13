RESUME_KEYWORDS = {
    # Tech & Data
    "Data Scientist": ["Predictive Modeling", "Big Data", "Statistical Analysis", "Data Visualization", "ETL Pipelines", "A/B Testing", "Spark", "Cloud Computing", "Scikit-Learn", "Deep Learning"],
    "ML Engineer": ["Deep Learning", "TensorFlow", "Model Optimization", "Computer Vision", "NLP", "Neural Networks", "Scalable Systems", "HPC", "PyTorch", "Kubernetes"],
    "Full Stack Developer": ["RESTful APIs", "Microservices", "Responsive Design", "DevOps", "CICD", "Unit Testing", "System Architecture", "State Management", "Docker", "AWS"],
    "Frontend Developer": ["React", "TypeScript", "Redux", "CSS Grid", "Next.js", "Web Accessibility", "Performance Optimization", "Component-Based Design"],
    "Backend Developer": ["Node.js", "Python", "Golang", "Database Design", "Redis", "Message Queues", "OAuth2", "GraphQL", "Swagger / OpenAPI"],
    "Cybersecurity Analyst": ["Network Security", "Threat Intelligence", "Incident Response", "Encryption", "SOC", "Vulnerability Assessment", "SIEM", "Penetration Testing", "ISO 27001"],
    "Data Analyst": ["SQL", "Tableau", "Power BI", "Data Wrangling", "Dashboarding", "Descriptive Statistics", "Data Cleaning", "Google Analytics"],
    
    # Management & Business
    "Product Manager": ["Product Roadmap", "Stakeholder Management", "User Experience (UX)", "Market Research", "Agile Methodology", "Requirement Gathering", "Go-to-market Strategy", "Product Analytics"],
    "Financial Analyst": ["Financial Modeling", "Budgeting", "Risk Analysis", "Investment Strategy", "Excel VBA", "Portfolio Optimization", "Variance Analysis", "Financial Reporting"],
    "Marketing Manager": ["Digital Marketing", "SEO", "SEM", "Content Strategy", "Campaign Optimization", "Social Media ROI", "Market Segmentation", "Customer Acquisition"],
    "Business Analyst": ["Process Improvement", "Requirements Analysis", "BPMN", "SWOT Analysis", "Gap Analysis", "Stakeholder Communication", "User Stories", "UML"],
    "HR Manager": ["Talent Acquisition", "Employee Relations", "Performance Management", "Organizational Development", "HRIS", "Compensation & Benefits", "Onboarding", "Labor Law"],
    
    # Engineering & Science
    "Structural Engineer": ["Civil Engineering", "AutoCAD", "Structural Design", "Blueprint Interpretation", "Project Management", "Construction Safety", "Feasibility Studies", "SAP2000"],
    "Mechanical Engineer": ["SolidWorks", "Finite Element Analysis (FEA)", "Thermodynamics", "CAD/CAM", "Prototyping", "Material Science", "Automation", "Fluid Dynamics"],
    "Embedded Systems Engineer": ["C/C++", "RTOS", "Microcontrollers", "PCB Design", "Firmware Development", "VHDL/Verilog", "Hardware-Software Integration", "I2C/SPI"],
}

DEFAULT_KEYWORDS = ["Leadership", "Problem Solving", "Team Collaboration", "Interpersonal Skills", "Critical Thinking", "Adaptability", "Time Management", "Project Management"]

def generate_resume_bullets(role, user_skills):
    """
    Generates standard resume bullet points based on the predicted role and user's skills.
    In a real app, this would use an LLM or a more complex template engine.
    """
    skill_list = user_skills if user_skills else ["relevant technologies"]
    s1 = skill_list[0]
    s2 = skill_list[1] if len(skill_list) > 1 else "cross-functional tools"
    s3 = skill_list[2] if len(skill_list) > 2 else "industry standard workflows"

    bullets = [
        f"Spearheaded the development and optimization of {role} workflows using {s1}, resulting in a 20% increase in operational efficiency.",
        f"Collaborated with diverse teams to integrate {s2} into core production systems, ensuring high availability and scalability.",
        f"Leveraged expertise in {s3} to conduct in-depth analysis and deliver data-driven insights for {role}-critical projects.",
        f"Streamlined {role} processes by implementing automated solutions and adopting best practices in {s1} and {s2}.",
        f"Mentored junior team members on {role} methodologies and the effective use of {s2} to achieve project milestones."
    ]
    return bullets

def calculate_resume_score(role, user_skills, confidence):
    role_keywords = RESUME_KEYWORDS.get(role, DEFAULT_KEYWORDS)
    user_skills_lower = [s.lower() for s in user_skills]
    
    # 1. Keyword Coverage
    matched_keywords = [k for k in role_keywords if k.lower() in user_skills_lower]
    keyword_match_pct = (len(matched_keywords) / len(role_keywords)) * 100 if role_keywords else 0
    
    # 2. Skill Gap
    skill_gap = [k for k in role_keywords if k.lower() not in user_skills_lower][:4]
    
    # 3. Overall Score Calculation
    # - Match Score: 50%
    # - Confidence Score: 30%
    # - Variety Score: 20% (number of skills)
    
    match_score = min(keyword_match_pct, 100) * 0.5
    conf_score = (confidence * 100) * 0.3
    variety_score = min(len(user_skills) * 10, 20) 
    
    total_score = int(match_score + conf_score + variety_score)
    total_score = min(max(total_score, 0), 100)
    
    # 4. Readiness Level
    if total_score < 40:
        readiness = "Low"
    elif total_score < 75:
        readiness = "Moderate"
    else:
        readiness = "High"
        
    # 5. Smart Suggestions
    suggestions = []
    if skill_gap:
        suggestions.append(f"Add {skill_gap[0]} to your profile to improve your ATS score.")
    if len(user_skills) < 5:
        suggestions.append("Add more diverse projects and technologies to show breadth.")
    if confidence < 0.6:
        suggestions.append("Clarify your core specialization to increase match confidence.")

    return {
        "score": total_score,
        "keyword_match_pct": int(keyword_match_pct),
        "skill_gap": skill_gap,
        "readiness": readiness,
        "smart_suggestions": suggestions
    }

def get_resume_optimization(role, user_skills, confidence=0.5):
    keywords = RESUME_KEYWORDS.get(role, DEFAULT_KEYWORDS)
    bullets = generate_resume_bullets(role, user_skills)
    scoring = calculate_resume_score(role, user_skills, confidence)
    
    return {
        "resume_keywords": keywords,
        "resume_suggestions": bullets,
        "resume_score": scoring["score"],
        "keyword_match_pct": scoring["keyword_match_pct"],
        "skill_gap": scoring["skill_gap"],
        "readiness": scoring["readiness"],
        "smart_suggestions": scoring["smart_suggestions"]
    }
