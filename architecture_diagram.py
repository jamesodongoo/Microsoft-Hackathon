from groq import Groq
import os

def generate_architecture_diagram(project_desc):
    client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    
    prompt = f"""Generate Mermaid.js architecture diagram for:
    {project_desc}
    
    Requirements:
    - Components as rectangles
    - Data flows as arrows
    - Technologies in brackets
    - External services as cloud shapes
    
    Return ONLY the mermaid code between ```mermaid``` markers"""
    
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama3-70b-8192",
        temperature=0.1
    )
    
    # Extract mermaid code from response
    full_response = response.choices[0].message.content
    return full_response.split('```mermaid')[1].split('```')[0].strip()