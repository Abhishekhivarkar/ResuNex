# 🚀 ResuNex – AI Powered Interview Preparation Platform

ResuNex is a **full-stack AI-powered interview preparation platform** built using the **MERN stack**.
It analyzes a candidate's **resume, job description, and self-introduction** to generate **personalized interview preparation insights** using advanced AI models.

The platform identifies **skill gaps**, generates **technical and behavioral interview questions**, and creates a **7-day preparation roadmap** to help candidates prepare effectively for job interviews.

--- 

# 🧠 AI Capabilities

ResuNex integrates **Groq AI (Llama-3.3-70B model)** to perform intelligent analysis on:

* Resume content
* Job description requirements
* Candidate self-introduction

The system then generates:

* Technical interview questions
* Behavioral interview questions
* Skill gap analysis
* Personalized preparation roadmap

---

# ✨ Features

### 🔐 Authentication & Security

* User registration & login
* Secure password hashing using **bcrypt**
* Email-based **password reset system**
* JWT authentication with secure cookies

---

### 📄 Resume Processing

* Resume upload support (PDF)
* Resume parsing using **pdf-parse**
* Automatic extraction of skills and experience

---

### 🤖 AI Interview Preparation

* AI-generated technical interview questions
* AI-generated behavioral questions
* Resume + job description comparison
* Skill gap detection with severity levels
* Personalized interview preparation insights

---

### 📊 Preparation Roadmap

* Automatically generated **7-day preparation roadmap**
* Skill-based improvement recommendations
* Previous interview report storage

---

### 🧾 Interview Reports

* Stores previous interview analysis
* Tracks progress and improvements
* Downloadable AI-generated reports

---

# 🏗️ System Architecture

```
Frontend (React + Vite)
        │
        ▼
Backend API (Node.js + Express)
        │
        ▼
MongoDB Database
        │
        ▼
AI Engine (Groq Llama-3.3-70B)
```

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* React Router
* Axios
* Sass

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (File Uploads)
* Joi & Zod (Validation)

## AI Integration

* Groq SDK
* Google Generative AI
* Llama-3.3-70B model

## Other Tools

* Puppeteer
* PDF Parsing
* SendinBlue Email API
* Cookie Parser
* CORS

---

# 📂 Project Structure

```
ResuNex
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middlewares
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Abhishekhivarkar/ResuNex.git
cd ResuNex
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

Run backend:

```bash
npm start
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create `.env` file inside **backend**

```
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
SENDINBLUE_API_KEY=your_email_api
```

---

# 📡 Core API Features

### Authentication

```
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
```

### Resume Analysis

```
POST /resume/upload
POST /resume/analyze
```

### Interview Preparation

```
POST /ai/generate-questions
POST /ai/skill-gap-analysis
POST /ai/preparation-roadmap
```

### Reports

```
GET /reports
GET /reports/:id
```

# 🚀 Future Improvements

* Voice-based mock interviews
* AI feedback on answers
* Resume auto-optimization
* Company-specific interview preparation
* AI mock interview simulator

---

# 👨‍💻 Author

**Abhishek Hivarkar**

GitHub:
https://github.com/Abhishekhivarkar

---

# 📜 License

MIT License
