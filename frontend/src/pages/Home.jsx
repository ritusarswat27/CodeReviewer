import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <h1 className="text-white font-bold text-base sm:text-lg md:text-xl">
          Code<span className="text-indigo-400">Review</span>AI
        </h1>
        <div className="flex gap-2 sm:gap-3">
          <Link
            to="/login"
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg hover:opacity-90 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8">
        <span className="text-indigo-400 text-xs sm:text-sm font-medium mb-4 bg-indigo-500/10 px-3 py-1 rounded-full">
          Powered by Gemini AI
        </span>

        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold max-w-2xl leading-tight">
          Get Instant, Expert-Level Code Reviews
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base md:text-lg mt-4 sm:mt-5 max-w-xl">
          Senior-level feedback, beginner-friendly explanations, or interview prep —
          all in one place. Supports JavaScript, Python, Java, C++, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 w-full sm:w-auto max-w-xs sm:max-w-none">
          <Link
            to="/signup"
            className="px-6 sm:px-7 py-3 rounded-lg font-semibold text-sm sm:text-base text-white bg-gradient-to-br from-indigo-500 to-purple-600
                       shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-6 sm:px-7 py-3 rounded-lg font-medium text-sm sm:text-base text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition-all"
          >
            I already have an account
          </Link>
        </div>

        {/* Feature strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-16 max-w-3xl w-full">
          <div className="bg-neutral-900 rounded-xl p-4 sm:p-5 text-left">
            <p className="text-white font-semibold mb-1 text-sm sm:text-base">🎯 Interview Prep</p>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Get likely interviewer follow-up questions on your code.
            </p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-4 sm:p-5 text-left">
            <p className="text-white font-semibold mb-1 text-sm sm:text-base">📘 Beginner Mode</p>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Simple, jargon-free explanations for learners.
            </p>
          </div>
          <div className="bg-neutral-900 rounded-xl p-4 sm:p-5 text-left">
            <p className="text-white font-semibold mb-1 text-sm sm:text-base">🕓 Review History</p>
            <p className="text-neutral-400 text-xs sm:text-sm">
              All your past reviews saved, synced across devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;