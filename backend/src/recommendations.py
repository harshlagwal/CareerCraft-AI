
# Skill sets for each major role
ROLE_REQUIREMENTS = {
    # Tech - Data
    'Data Scientist': ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Deep Learning', 'Pandas'],
    'ML Engineer': ['Python', 'TensorFlow', 'PyTorch', 'Model Deployment', 'Docker', 'MLOps'],
    'Data Analyst': ['Excel', 'SQL', 'Power BI', 'Tableau', 'Data Visualization', 'Statistics'],
    
    # Tech - Development
    'Frontend Developer': ['React', 'JavaScript', 'CSS', 'Tailwind', 'Next.js', 'Vite'],
    'Backend Developer': ['Node.js', 'Spring Boot', 'SQL', 'MongoDB', 'Redis', 'Docker'],
    'Full Stack Developer': ['React', 'Node.js', 'SQL', 'Next.js', 'Express', 'JWT'],
    'Cyber Security Analyst': ['SIEM', 'Kali Linux', 'Network Security', 'Pentesting', 'Firewall'],
    
    # Management
    'Marketing Manager': ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy', 'CRM'],
    'Financial Analyst': ['Accounting', 'Financial Modeling', 'Excel', 'Corporate Finance'],
    'Product Manager': ['Agile', 'Jira', 'Product Roadmap', 'User Research', 'Scrum'],
    'HR Manager': ['Talent Acquisition', 'HR Policy', 'Labor Law', 'Payroll Management'],
    
    # Engineering
    'Structural Engineer': ['AutoCAD', 'STAAD.Pro', 'Steel Design', 'Structural Analysis'],
    'Design Engineer': ['SolidWorks', 'CATIA', 'Product Design', 'Material Science'],
    'Site Engineer': ['Surveying', 'Project Management', 'Construction Safety', 'Estimation'],
    'Control Systems Engineer': ['MATLAB', 'Simulink', 'Control Theory', 'PLC', 'SCADA'],
    'Cybersecurity': ['Network Security', 'Cryptography', 'Ethical Hacking', 'SIEM']
}

# Skill to Course Mapping
COURSE_CATALOG = {
    'TensorFlow': [
        {'title': 'Deep Learning Specialization', 'platform': 'Coursera', 'url': 'https://www.coursera.org/specializations/deep-learning'},
        {'title': 'TensorFlow Developer Certificate', 'platform': 'DeepLearning.AI', 'url': 'https://www.deeplearning.ai/tensorflow-developer-professional-certificate/'}
    ],
    'Deep Learning': [
        {'title': 'Deep Learning A-Z', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/deeplearning/'},
        {'title': 'Neural Networks and Deep Learning', 'platform': 'Coursera', 'url': 'https://www.coursera.org/learn/neural-networks-deep-learning'}
    ],
    'Statistics': [
        {'title': 'Statistics for Data Science', 'platform': 'Khan Academy', 'url': 'https://www.khanacademy.org/math/statistics-probability'},
        {'title': 'Introduction to Statistics', 'platform': 'Stanford Online', 'url': 'https://online.stanford.edu/courses/stats101-introduction-statistics'}
    ],
    'React': [
        {'title': 'The Ultimate React Course', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/the-ultimate-react-course/'},
        {'title': 'React - The Complete Guide', 'platform': 'Academind', 'url': 'https://academind.com/courses/react-the-complete-guide'}
    ],
    'Node.js': [
        {'title': 'Node.js, Express, MongoDB Bootcamp', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/'},
        {'title': 'Learn Node.js', 'platform': 'NodeSchool', 'url': 'https://nodeschool.io/'}
    ],
    'SQL': [
        {'title': 'SQL for Data Analytics', 'platform': 'Mode', 'url': 'https://mode.com/sql-tutorial/'},
        {'title': 'The Ultimate MySQL Bootcamp', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/'}
    ],
    'Docker': [
        {'title': 'Docker Mastery', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/docker-mastery/'},
        {'title': 'Docker for Developers', 'platform': 'Pluralsight', 'url': 'https://www.pluralsight.com/courses/docker-web-development'}
    ],
    'Agile': [
        {'title': 'Agile with Atlassian Jira', 'platform': 'Coursera', 'url': 'https://www.coursera.org/learn/agile-atlassian-jira'},
        {'title': 'Agile Fundamentals', 'platform': 'ICAgile', 'url': 'https://icagile.com/learning-track/agile-fundamentals'}
    ],
    'AutoCAD': [
        {'title': 'AutoCAD 2024 Course', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/autocad-2021-course-beginner-to-certified-professional/'},
        {'title': 'AutoCAD Tutorial for Beginners', 'platform': 'AutoDesk', 'url': 'https://www.autodesk.com/campaigns/learning-content/autocad'}
    ],
    'MATLAB': [
        {'title': 'MATLAB Onramp', 'platform': 'MathWorks', 'url': 'https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted'},
        {'title': 'Mastering MATLAB', 'platform': 'Coursera', 'url': 'https://www.coursera.org/learn/matlab'}
    ],
    'Financial Modeling': [
        {'title': 'Financial Modeling Foundations', 'platform': 'LinkedIn Learning', 'url': 'https://www.linkedin.com/learning/financial-modeling-foundations'},
        {'title': 'Beginner to Pro in Excel', 'platform': 'Udemy', 'url': 'https://www.udemy.com/course/beginner-to-pro-in-excel-financial-modeling-and-valuation/'}
    ],
    'Machine Learning': [
        {'title': 'Machine Learning Specialization', 'platform': 'Coursera', 'url': 'https://www.coursera.org/specializations/machine-learning-introduction'},
        {'title': 'ML with Python', 'platform': 'IBM', 'url': 'https://www.edx.org/course/machine-learning-with-python-a-practical-introduction'}
    ],
    'SEO': [
        {'title': 'SEO Specialization', 'platform': 'Coursera', 'url': 'https://www.coursera.org/specializations/seo'},
        {'title': 'The SEO Playbook', 'platform': 'HubSpot', 'url': 'https://academy.hubspot.com/courses/seo-training'}
    ]
}

def get_recommendations(predicted_role, user_skills):
    """
    Identifies missing skills for a predicted role and recommends courses.
    """
    # Normalize user skills (lowercase for comparison)
    user_skills_normalized = [s.lower() for s in user_skills]
    
    # Get required skills for the role
    required_skills = ROLE_REQUIREMENTS.get(predicted_role, [])
    
    # Identify missing skills
    recommended_courses = []
    
    for skill in required_skills:
        if skill.lower() not in user_skills_normalized:
            # Skill is missing
            courses = COURSE_CATALOG.get(skill, [
                # Fallback if specific course not found
                {'title': f'Mastering {skill}', 'platform': 'Udemy/Coursera', 'url': f'https://www.google.com/search?q={skill}+courses'}
            ])
            recommended_courses.append({
                'skill': skill,
                'courses': courses[:2] # Limit to 2 courses per skill
            })
            
    # Return top 3 missing skill recommendations
    return recommended_courses[:3]
