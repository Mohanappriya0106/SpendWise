import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import api from "../api/axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ GOOGLE INIT — RUNS ONCE
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          const res = await api.post("/auth/google", {
            token: response.credential
          });

          login(res.data.token, res.data.user);
          navigate("/dashboard");
        } catch (err) {
          console.error("Google login failed", err);
          setError("Google login failed");
        }
      },

      // 🔴 CRITICAL FIX FOR LOCALHOST
      use_fedcm_for_prompt: false
    });

    // Render Google button
    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      {
        theme: "outline",
        size: "large",
        width: "100%"
      }
    );
  }, []);

  // EMAIL + PASSWORD LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-50  relative">

      <button
  onClick={() => navigate("/")}
  className="absolute top-4 left-4 flex items-center gap-2 text-m font-medium text-slate-600 hover:text-slate-900 transition pt-4 pl-4"
>
  <ArrowLeftIcon className="h-4 w-4" />
  Back to Home
</button>
      {/* LEFT */}
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/login-illustration.svg"
          alt="Login illustration"
          className="max-w-md"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          {/* LOGO */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-indigo-600">Spend</span>
              <span className="text-slate-900">Wise</span>
            </h1>

            <p className="text-3xl font-bold mt-4">Welcome Back</p>
            <p className="text-slate-500 mt-1">
              Please login to your account
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-rose-600 bg-rose-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-lg border px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700"
            >
              Login
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* GOOGLE BUTTON */}
          <div id="google-login-btn" />

          <p className="text-sm text-slate-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



