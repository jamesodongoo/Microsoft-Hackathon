from groq import Groq
import os

class ResponsibleAIChecker:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    
    def analyze_project(self, project_details, code_snippets):
        response = self.client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"""Analyze for Responsible AI concerns:
                Project: {project_details}
                Code: {code_snippets}
                
                Check for:
                1. Bias risks
                2. Privacy issues
                3. Transparency
                4. Potential misuse
                
                Return JSON with findings and mitigation suggestions."""
            }],
            model="llama3-70b-8192",
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)