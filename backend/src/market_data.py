MARKET_DATA = {
    # TECH DOMAIN
    "Data Scientist": {
        "salary_india": "₹12L - ₹28L",
        "salary_global": "$115k - $190k",
        "growth_rate": "31%",
        "demand_level": "Hot",
        "top_companies": ["Google", "NVIDIA", "Microsoft", "Meta"]
    },
    "Machine Learning Engineer": {
        "salary_india": "₹14L - ₹32L",
        "salary_global": "$130k - $210k",
        "growth_rate": "40%",
        "demand_level": "Hot",
        "top_companies": ["Tesla", "OpenAI", "DeepMind", "Amazon"]
    },
    "Full Stack Developer": {
        "salary_india": "₹8L - ₹22L",
        "salary_global": "$95k - $160k",
        "growth_rate": "22%",
        "demand_level": "Rising",
        "top_companies": ["Netflix", "Airbnb", "Uber", "Spotify"]
    },
    "Cybersecurity Analyst": {
        "salary_india": "₹10L - ₹25L",
        "salary_global": "$105k - $175k",
        "growth_rate": "35%",
        "demand_level": "Hot",
        "top_companies": ["CrowdStrike", "Palo Alto", "Cisco", "IBM"]
    },
    "DevOps Engineer": {
        "salary_india": "₹12L - ₹26L",
        "salary_global": "$110k - $185k",
        "growth_rate": "24%",
        "demand_level": "High",
        "top_companies": ["HashiCorp", "AWS", "Datadog", "RedHat"]
    },

    # MANAGEMENT DOMAIN
    "Product Manager": {
        "salary_india": "₹15L - ₹35L",
        "salary_global": "$125k - $200k",
        "growth_rate": "18%",
        "demand_level": "Rising",
        "top_companies": ["Adobe", "Apple", "Salesforce", "Atlassian"]
    },
    "Financial Analyst": {
        "salary_india": "₹7L - ₹18L",
        "salary_global": "$75k - $140k",
        "growth_rate": "9%",
        "demand_level": "Stable",
        "top_companies": ["Goldman Sachs", "JP Morgan", "Morgan Stanley"]
    },

    # CORE ENGINEERING
    "Structural Engineer": {
        "salary_india": "₹6L - ₹16L",
        "salary_global": "$70k - $130k",
        "growth_rate": "7%",
        "demand_level": "Stable",
        "top_companies": ["AECOM", "Bechtel", "Arup", "L&T"]
    },
    "Embedded Systems Engineer": {
        "salary_india": "₹9L - ₹22L",
        "salary_global": "$90k - $155k",
        "growth_rate": "15%",
        "demand_level": "Rising",
        "top_companies": ["Intel", "Qualcomm", "STMicroelectronics", "ARM"]
    }
}

DEFAULT_INSIGHTS = {
    "salary_india": "₹6L - ₹15L",
    "salary_global": "$65k - $120k",
    "growth_rate": "12%",
    "demand_level": "Stable",
    "top_companies": ["Deloitte", "Accenture", "TCS", "Infosys"]
}

def get_market_insights(role_name: str):
    """
    Returns market insights for a specific role or a default set if not found.
    """
    return MARKET_DATA.get(role_name, DEFAULT_INSIGHTS)
