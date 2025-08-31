# AI Chatbot 🤖

An **AI-powered chatbot** that answers user queries from uploaded documents and assists in **booking appointments** by collecting user information.  
Built using **Gemini LLM** with **LangChain** for orchestration and a **React frontend** for seamless interaction.

---

## ✨ Features

- 📄 **Document Q&A** – Upload documents and ask natural language queries.  
- 🗓 **Smart Date Parsing** – Understands expressions like *“next Monday”* → `2025-08-24`.  
- 👤 **User Info Collection** – Chat form to collect name, email, phone number, and appointment details.  
- 🤝 **Appointment Booking** – Integrated tool-agents help confirm and book appointments.  
- ⚡ **Modern Frontend** – Built with React for smooth UI/UX.  
- 🧠 **Powered by Gemini Model** – Enhanced reasoning and natural language understanding.

---

## 🛠️ Tech Stack

- **LLM**: Gemini  
- **Framework**: LangChain  
- **Frontend**: React  
- **Backend**: FastAPI (or Node.js, adjust as needed)  
- **Other Tools**:  
  - Date parsing (`dateparser`)  
  - File upload & retrieval pipeline

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/AI-chatbot.git
cd AI-chatbot
```
### 2. Set up Environment Variables
1. Copy .env.example to .env
```bash
cp .env.example .env
```
2. Open .env and add your Gemini API key
```bash
GEMINI_API_KEY=your_api_key_here
```   
### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### 5. Open Browser
``` bash
Visit http://localhost:5173
```
## Usage
1. Upload your document (PDF, DOCX, or TXT).

2. Ask natural language queries like:
  - “Summarize this document.”
  - “What are the key points in section 2?”
    
3. Book an appointment:
  - “Schedule a meeting for me next Monday at 2 PM.”
  - The chatbot will parse dates, collect details, and confirm.
### Project Structure
```
AI-chatbot/
├── backend/
│   ├── models.py
│   ├── requirements.txt
│   └── uploads/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .env.example
└── README.md
```
## 📜 License

MIT License © 2025
