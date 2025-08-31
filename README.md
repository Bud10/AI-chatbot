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
### 2. Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

cd frontend
npm install
npm run dev

