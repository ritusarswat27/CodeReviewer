# 🚀 CodeReviewAI

An AI-powered code review platform that gives developers instant, expert-level feedback on their code — with tailored review modes, multi-language support, and personalized history tracking.

Built as a full-stack project combining **React**, **Firebase**, **Express**, and **Google's Gemini API**.

---

## ✨ Features

### 🎯 Three Review Modes
- **Senior Review** — Precise, in-depth feedback covering performance, security, scalability, and best practices — as if reviewed by a 7+ year experienced developer.
- **Beginner Mode** — Simple, jargon-free explanations with real-life analogies, designed for learners.
- **Interview Prep** — Reviews your code and generates likely interviewer follow-up questions (time/space complexity, edge cases, scalability), helping you prep for technical interviews.

### 🌐 Multi-Language Support
Supports code review for **JavaScript, TypeScript, React (JSX), Python, Java, C, and C++** — with syntax highlighting tailored to each language.

### 🔧 Fix + Explain View
Beyond just pointing out issues, the app suggests a corrected version of your code and displays it **side-by-side** with the original for easy comparison.

### 🔐 Authentication
- Email/Password signup & login
- Google Sign-In
- First & Last name captured at signup to personalize the experience

### 🕓 Personalized Review History
Every review is saved to your account in real-time (Firebase Realtime Database). A ChatGPT-style sidebar lets you revisit any past review — code, feedback, and suggested fixes — with a single click.

### 👤 Profile Display
Auto-generated avatar with your initials, displayed in the sidebar — no extra setup needed.

### 📱 Fully Responsive
Optimized layouts for mobile, tablet, and desktop — the editor and review panels adapt gracefully across screen sizes.

### ⚡ Real-time Feedback States
Clear loading indicators while your code is being analyzed, and graceful handling of API rate limits with user-friendly messages.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS |
| **Routing** | React Router |
| **Code Editor** | `@uiw/react-textarea-code-editor` |
| **Markdown Rendering** | `react-markdown` + `rehype-highlight` |
| **Authentication** | Firebase Authentication (Email/Password + Google OAuth) |
| **Database** | Firebase Realtime Database |
| **Backend** | Node.js, Express |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash`) |
| **HTTP Client** | Axios |

---

## 📂 Project Structure

```
CodeReview/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ai.controller.js       # Handles review request logic
│   │   ├── routes/
│   │   │   └── ai.routes.js           # API route definitions
│   │   └── services/
│   │       └── ai.service.js          # Gemini API integration & prompt engineering
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   └── ProtectedRoute.jsx     # Auth-gated route wrapper
        ├── context/
        │   └── AuthContext.jsx        # Global auth state
        ├── pages/
        │   ├── Landing.jsx            # Public landing page
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   └── CodeReview.jsx         # Main app (editor + review + history)
        ├── firebase.js                # Firebase config
        └── App.jsx                    # Route definitions
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js installed
- A Firebase project (Authentication + Realtime Database enabled)
- A Google Gemini API key ([Get one here](https://aistudio.google.com/))

### 1. Clone the repository
```bash
git clone https://github.com/ritusarswat27/CodeReviewer.git
cd CodeReviewer
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Update `src/firebase.js` with your own Firebase project config.

Run the frontend:
```bash
npm run dev
```

---

## 🧠 How It Works

1. User writes or pastes code into the editor and selects a **language** and **review mode**.
2. On clicking **"Review Code"**, the frontend sends the code to the Express backend.
3. The backend builds a mode-specific system instruction and sends it to the **Gemini API**, requesting a structured JSON response (review text, suggested fix, and interview questions where applicable).
4. The response is rendered with syntax-highlighted Markdown, a side-by-side diff of the original vs. fixed code, and (in Interview Prep mode) a list of likely interview questions.
5. Each review is saved to **Firebase Realtime Database**, scoped to the logged-in user, and appears instantly in the sidebar history.

---

## 🔮 Future Improvements

- [ ] Streaming responses for a real-time "typing" review experience
- [ ] Shareable review links
- [ ] Delete/rename history items
- [ ] Rate limiting per user to manage API quota
- [ ] Dark/Light theme toggle

---

## 📸 Screenshots

*(Add screenshots of the Landing Page, Login/Signup, and the main Code Review dashboard here)*

---

## 📄 License

This project is open source and available for learning purposes.

---

## 🙋‍♀️ Author

Built by **Ritu Sarswat** as a full-stack learning project — combining AI integration, authentication, and real-time data to build a genuinely useful developer tool.
