import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/app");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/app");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-950">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 p-8 rounded-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-white mb-2">Login</h1>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-neutral-800 text-white px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-neutral-800 text-white px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-700"></div>
          <span className="text-neutral-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-neutral-700"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 rounded-lg transition-all disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"/>
            <path fill="#FBBC05" d="M3.95 10.7c-.18-.54-.28-1.11-.28-1.7s.1-1.16.28-1.7V4.96H.96A8.99 8.99 0 000 9c0 1.45.35 2.83.96 4.04l2.99-2.34z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.99 2.34C4.66 5.16 6.65 3.58 9 3.58z"/>
          </svg>
          Login with Google
        </button>

        <p className="text-neutral-400 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;