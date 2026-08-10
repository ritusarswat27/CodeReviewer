import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { signOut } from "firebase/auth";
import { ref, push, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MODES = [
  { id: "senior", label: "Senior Review" },
  { id: "beginner", label: "Beginner Mode" },
  { id: "interview", label: "Interview Prep" },
];

const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "jsx", label: "React (JSX)" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "c", label: "C" },
  { id: "typescript", label: "TypeScript" },
];

function CodeReview() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [mode, setMode] = useState("senior");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const historyRef = ref(db, `reviews/${currentUser.uid}`);

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setHistory(items);
      } else {
        setHistory([]);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  async function reviewCode() {
    if (!code.trim()) {
      setResult({ review: "Please enter some code first.", fixedCode: "", interviewQuestions: [] });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code, mode, language }
      );
      setResult(response.data);

      const historyRef = ref(db, `reviews/${currentUser.uid}`);
      await push(historyRef, {
        code,
        mode,
        language,
        review: response.data.review,
        fixedCode: response.data.fixedCode || "",
        interviewQuestions: response.data.interviewQuestions || [],
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Review Error:", error);
      if (error.response?.status === 429) {
        setResult({
          review: "⚠️ Daily review limit reached (free tier). Please try again tomorrow.",
          fixedCode: "",
          interviewQuestions: [],
        });
      } else {
        setResult({ review: "Something went wrong while getting the review.", fixedCode: "", interviewQuestions: [] });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function clearAll() {
    setCode("");
    setResult(null);
  }

  function loadHistoryItem(item) {
    setCode(item.code);
    setLanguage(item.language);
    setMode(item.mode);
    setResult({
      review: item.review,
      fixedCode: item.fixedCode,
      interviewQuestions: item.interviewQuestions,
    });
  }



  function getInitials(user) {
      if (!user) return "?";
      if (user.displayName) {
        const parts = user.displayName.trim().split(" ");
        if (parts.length >= 2) {
          return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
      }
      if (user.email) {
        return user.email[0].toUpperCase();
      }
      return "?";
  }




  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className="flex h-screen w-screen bg-neutral-950 overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`bg-[#1e1e2e] border-r border-neutral-800 flex flex-col transition-all duration-200
          ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden shrink-0`}
      >
        <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">History</h2>
          <button
            onClick={clearAll}
            className="text-xs px-2 py-1 rounded-md text-white bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 transition-all"
          >
            + New
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {history.length === 0 ? (
            <p className="text-neutral-500 text-xs px-2 py-4">No reviews yet.</p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => loadHistoryItem(item)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <p className="text-neutral-200 text-xs truncate">
                  {item.code.slice(0, 40) || "Untitled"}
                </p>
                <p className="text-neutral-500 text-[10px] mt-0.5 capitalize">
                  {item.language} · {item.mode}
                </p>
              </button>
            ))
          )}
        </div>


        <div className="p-3 border-t border-neutral-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {getInitials(currentUser)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-neutral-200 text-xs truncate font-medium">
              {currentUser?.displayName || "User"}
            </p>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 text-left font-medium"
            >
              Logout
            </button>
          </div>
        </div>
        </div>


      {/* MAIN CONTENT */}
      <main className="flex flex-col md:flex-row flex-1 gap-3 md:gap-4 p-3 md:p-4 overflow-hidden relative">
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 text-neutral-400 hover:text-white bg-neutral-800 rounded-r-md px-1.5 py-3 text-xs"
        >
          {sidebarOpen ? "‹" : "›"}
        </button>

        {/* LEFT: Editor */}
        <div className="flex flex-col bg-[#1e1e2e] rounded-xl p-3 h-1/2 md:h-full w-full md:flex-1 overflow-hidden">
          <div className="flex gap-2 mb-2 shrink-0 overflow-x-auto">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150
                  ${mode === m.id
                    ? "bg-indigo-600 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="mb-3 shrink-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-neutral-800 text-neutral-200 text-xs sm:text-sm rounded-md px-3 py-1.5
                         border border-neutral-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-auto rounded-lg">
            <CodeEditor
              value={code}
              language={language}
              placeholder="// Paste or write your code here..."
              onChange={(evn) => setCode(evn.target.value)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                minHeight: "100%",
              }}
              className="text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-row justify-end gap-2 sm:gap-3 mt-3 shrink-0">
            <button
              onClick={clearAll}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm text-neutral-300
                         bg-neutral-800 hover:bg-neutral-700 transition-all duration-150"
            >
              Clear
            </button>

            <button
              onClick={reviewCode}
              disabled={isLoading}
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg font-semibold text-sm text-white
                         bg-gradient-to-br from-indigo-500 to-purple-600
                         shadow-lg shadow-indigo-500/30
                         hover:-translate-y-0.5 hover:shadow-indigo-500/50
                         active:translate-y-0
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         transition-all duration-150"
            >
              {isLoading ? "Reviewing..." : "Review Code"}
            </button>
          </div>
        </div>

        {/* RIGHT: Review */}
        <div className="bg-neutral-900 rounded-xl p-4 md:p-5 overflow-y-auto text-neutral-200 h-1/2 md:h-full w-full md:flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-white pb-2.5 mb-4 border-b border-neutral-700">
            Code Review
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-4/5 gap-4 text-neutral-400">
              <div className="w-9 h-9 border-4 border-neutral-700 border-t-purple-500 rounded-full animate-spin"></div>
              <p className="text-sm tracking-wide animate-pulse">
                Analyzing your code...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="prose prose-invert prose-sm md:prose-base max-w-none
                               prose-headings:text-indigo-300 prose-headings:mt-5 prose-headings:mb-2
                               prose-strong:text-white prose-li:my-1 prose-p:leading-relaxed
                               prose-code:text-pink-400 prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded">
                <Markdown rehypePlugins={[rehypeHighlight]}>{result.review}</Markdown>
              </div>

              {result.fixedCode && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                    Suggested Fix
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-red-400 mb-1">Original</p>
                      <pre className="bg-neutral-950 rounded-lg p-3 text-xs overflow-x-auto border border-red-900/30">
                        <code>{code}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs text-green-400 mb-1">Fixed</p>
                      <pre className="bg-neutral-950 rounded-lg p-3 text-xs overflow-x-auto border border-green-900/30">
                        <code>{result.fixedCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {result.interviewQuestions?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                    🎯 Likely Interview Questions
                  </h3>
                  <ul className="space-y-2">
                    {result.interviewQuestions.map((q, i) => (
                      <li
                        key={i}
                        className="bg-neutral-800/60 rounded-lg px-3 py-2 text-sm text-neutral-300"
                      >
                        {i + 1}. {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-neutral-500 text-sm">
              Your code review will appear here once you click "Review Code".
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CodeReview;
