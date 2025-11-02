import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(name, email, password);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-emerald-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label className="block text-emerald-700 mb-2 font-medium">Full Name*</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
            />
          </div>
          <div className="mb-5">
            <label className="block text-emerald-700 mb-2 font-medium">Email*</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-emerald-700 mb-2 font-medium">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          <div className="mt-5 text-center">
            <Link to="/login" className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">
              Already have an account? <span className="text-amber-600">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;