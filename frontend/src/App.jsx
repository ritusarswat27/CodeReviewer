import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CodeReview from "./pages/CodeReview";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <CodeReview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;