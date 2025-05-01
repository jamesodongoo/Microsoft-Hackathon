from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv
import json

load_dotenv()
app = Flask(__name__)
CORS(app)

# Initialize Groq client
groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def analyze_criteria(criteria_name, project_details):
    """Analyze project against specific criteria"""
    prompt = f"""Analyze this hackathon project for {criteria_name}:
    {project_details}
    
    Return JSON with these exact keys:
    - "score" (1-5)
    - "feedback" (detailed analysis)
    - "improvements" (bullet points)
    """
    
    try:
        response = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192",
            response_format={"type": "json_object"},
            temperature=0.3
        )
        result = json.loads(response.choices[0].message.content)
        
        # Ensure all required fields exist
        result.setdefault("score", 3)
        result.setdefault("feedback", "No feedback available")
        result.setdefault("improvements", "- No specific suggestions")
        
        return result
        
    except Exception as e:
        return {
            "score": 3,
            "feedback": f"Analysis failed: {str(e)}",
            "improvements": "- Please try again later"
        }

def generate_demo_script(project_details):
    """Generate demo script"""
    prompt = f"""Create a 1-minute demo script for:
    {project_details}
    
    Structure:
    1. Problem (15s)
    2. Solution (30s)
    3. Tech (10s)
    4. Call-to-action (5s)"""
    
    try:
        response = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192",
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Could not generate demo script: {str(e)}"

@app.route('/analyze', methods=['POST'])
def analyze_project():
    data = request.json
    project_details = data.get('project_details', "")
    
    if not project_details:
        return jsonify({"error": "Project description required"}), 400
    
    try:
        results = {
            "feedback": {
                "innovation": analyze_criteria("innovation", project_details),
                "impact": analyze_criteria("impact", project_details),
                "usability": analyze_criteria("usability", project_details),
                "solution_quality": analyze_criteria("solution quality", project_details)
            },
            "demo_script": generate_demo_script(project_details)
        }
        return jsonify(results)
        
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

@app.route('/')
def home():
    return "CodeCatalyst Backend is running"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)