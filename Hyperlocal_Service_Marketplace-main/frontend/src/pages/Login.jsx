import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, cart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.fromRegistration) {
      toast.success("Registration successful! Please log in with your credentials.");
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      // Success notification is handled in AppContext
    } catch (error) {
      console.error("Login error:", error);
      // Error notification is handled in AppContext
      // Additional client-side error handling can be added here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-emerald-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">Welcome Back</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-5">
            <label className="block text-emerald-700 mb-2 font-medium">Email*</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-emerald-700 mb-2 font-medium">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 transition duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-5 text-center">
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">
              Don't have an account? <span className="text-amber-600">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;