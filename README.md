# Microsoft-Hackathon
This is an AI agent build for competition launched by Microsoft

# CodeCatalyst AI - Hackathon Assistant
# 🚀 Overview
CodeCatalyst AI is an intelligent assistant designed to help hackathon participants optimize their projects. It provides real-time feedback on:

✅ Innovation

✅ Impact

✅ Usability

✅ Solution Quality

# Note: The project can also be replicted using OPENAI API KEY
Powered by Groq's Llama 3 and built with Python (Flask) + React, it offers:

AI-Powered Analysis against judging criteria

Responsible AI checks


# 🛠️ Tech Stack

Category	Technologies Used

Backend	Python, Flask, Groq API

Frontend	React, JavaScript, CSS

DevOps	Git, npm, pip

# 🎯 Features
✔ Real-time Project Analysis

✔ Multi-Criteria Evaluation (Innovation, Impact, etc.)

✔ Responsible AI Compliance Checks

✔ Demo Video Script Generator


# ⚙️ Setup Instructions

1. Backend Setup
   
bash

cd backend

python -m venv venv           # Create virtual env

source venv/bin/activate      # Activate (Linux/Mac)

venv\Scripts\activate         # Activate (Windows)

pip install -r requirements.txt

echo "GROQ_API_KEY=your_key" > .env

python app.py                 # Runs on http://localhost:5000

3. Frontend Setup

bash

cd frontend

npm install                   # Install dependencies

npm start                     # Runs on http://localhost:3000

# 🔍 How It Works

Step 1: User Input

Describe your project in the text area

(Optional) Add code snippets

Step 2: AI Analysis

The backend:

Sends the project details to Groq's Llama 3

Evaluates against 4 key criteria

Returns structured feedback

Step 3: Results Display

Frontend shows:

Scores (1-5) for each category

Detailed feedback

Actionable improvements

# ✨ Key Optimizations

Backend (Python/Flask)

✔ Strict JSON validation to prevent "N/A" values

✔ Error handling for API failures

✔ CORS enabled for frontend communication

Frontend (React)

✔ Real-time feedback with loading states

✔ Responsive UI with score visualization

✔ Bullet-point formatting for suggestions

# 🚨 Troubleshooting

Issue	Solution

"N/A" values	Ensure backend returns all required fields

CORS errors	Verify CORS(app) is enabled in Flask

Groq API fails	Check .env file for correct API key

React crashes	Delete node_modules and re-run npm install

# 📜 License

MIT License - Free for personal use.

# 📬 Contact

Author: Otieno James Odongo

Email: jamesodongo1290@gmail.com

GitHub: https://github.com/jamesodongoo

# 🎉 Final Notes

This project was built for Microsoft Hackathon Judging and showcases:

🔹 AI Integration (Groq + Llama 3)

🔹 Full-Stack Development (Flask + React)

🔹 Responsible AI Practices

# Happy Hacking! 🚀
