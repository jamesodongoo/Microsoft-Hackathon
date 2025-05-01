from groq import Groq
import os
import autopep8

class CodeOptimizer:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    
    def optimize(self, code):
        prompt = f"""Optimize this Python code:
        {code}
        
        Provide:
        1. Optimized code with comments
        2. List of improvements made
        3. Performance considerations
        
        Return JSON with:
        - "optimized_code"
        - "improvements" (bulleted list)
        - "performance_impact"
        """
        
        response = self.client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192",
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        result['optimized_code'] = autopep8.fix_code(result['optimized_code'])
        return result