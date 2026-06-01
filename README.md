# 🚀 AI Interview Coach

A full-stack AI-powered interview preparation platform that helps candidates prepare for job interviews by analyzing resumes, job descriptions, and personal profiles. The system uses Google Gemini AI to generate personalized interview questions, skill-gap analysis, preparation roadmaps, and tailored resumes while providing secure user authentication and report history management.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing

### 📄 Resume Analysis
- Upload PDF Resume
- Automatic Resume Parsing
- Extract Skills and Experience

### 💼 Job Description Matching
- Analyze Job Requirements
- Compare Candidate Profile
- Generate Match Score

### 🤖 AI Interview Report Generation
- Technical Questions
- Behavioral Questions
- Model Answers
- Interview Preparation Guidance

### 📊 Match Score
- AI-powered Resume vs Job Description Matching

### 🛠 Skill Gap Analysis
- Missing Skills Detection
- Learning Recommendations

### 🗺 Personalized Roadmap
- Structured Preparation Plan
- Topic-wise Improvement Suggestions

### 📑 AI Resume Generator
- Generate Professional Resume
- Tailor Resume to Job Description

### 🕒 Interview History
- Save Previous Reports
- Access Past Interview Plans

  ### 📑 AI Resume Generator
- Generate Professional AI-Powered Resumes
- Tailor Resume According to Job Description
- ATS-Friendly Resume Formatting
- Download Resume as PDF

---

## 🖥 Tech Stack

### Frontend
- React.js
- React Router
- SCSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt

### AI Integration
- Google Gemini API

### File Handling
- Multer
- PDF Parse

---

## 📂 Project Structure

```bash
ai-interview-coach
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/MonalishaRakshit/ai-interview-coach.git
```

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔄 Workflow

1. Register/Login
2. Upload Resume or Enter Self Description
3. Paste Target Job Description
4. Generate Interview Report
5. Review:
   - Match Score
   - Technical Questions
   - Behavioral Questions
   - Skill Gaps
   - Learning Roadmap
6. Generate a customized AI Resume based on:
   - Uploaded Resume
   - Self Description
   - Target Job Description

7. Download the AI-generated Resume as PDF

8. Access Previous Reports from Dashboard

---

## 🎯 Future Improvements

- Voice Mock Interviews
- AI Feedback on Answers
- ATS Resume Scoring
- Company-specific Interview Preparation
- Interview Analytics Dashboard

---

## 👨‍💻 Author

Monalisha Rakshit

GitHub: https://github.com/MonalishaRakshit

---

## 📄 License

MIT License
