import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Eye, EyeOff, Mail } from "lucide-react";
import axios from "axios";
import backgroundImage from "../assets/logo2.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required", {
        description: "Please enter both email and password.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/users/login`,
        form
      );
      sessionStorage.setItem("token", res.data.token);
      toast.success("Account Created", {
        description: "Redirecting to dashboard...",
      });
      setTimeout(() => setLocation("/dashboard"), 1000);
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed.";
      toast.error("Error", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-left bg-no-repeat bg-cover bg-center relative px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,

      }}
    >
      {/* Left to right dark gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-[hsl(224,38%,25%)] opacity-95" />
   <form
  onSubmit={handleSubmit}
  className="relative z-10 w-full max-w-lg min-h-[520px] bg-white/5 backdrop-blur-md text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-center">
  <p className="uppercase text-xs text-slate-400 mb-4">Start for free</p>
 <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-snug tracking-tight">
  Log in to your <span className="text-[var(--accent)]">account</span>
</h2>

<p className="text-sm sm:text-base text-slate-400 mb-8">
  New here?{" "}
  <button
    type="button"
    onClick={() => setLocation("/register")}
    className="text-[var(--accent)] underline hover:text-[hsl(75,38%,68%)] transition-colors duration-150"
  >
    Register
  </button>
</p>

   <div className="relative mb-6">
    <label className="block text-sm text-slate-400 mb-1">Enter your email</label>
    <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
      <input
        type="email"
        name="email"
       value={form.email}
    onChange={handleChange}
        placeholder="your@email.com"
        className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
      />
      <Mail size={18} className="ml-2 text-slate-400" />
    </div>
  </div>

   <div className="relative mb-6">
      {/* Label */}
      <label className="block text-sm text-slate-400 mb-1">Enter your password</label>

      {/* Styled Input Box */}
      <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-yellow-400">
        <input
          type={showPwd ? "password" : "text"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
        />
        <button
          type="button"
          onClick={() => setShowPwd((prev) => !prev)}
          className="ml-2 text-slate-400"
        >
          {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[var(--accent)] hover:bg-[hsl(72,22%,69%)] text-black font-semibold py-3 rounded-md transition duration-300"
  >
    {loading ? "Logging In..." : "Login"}
  </button>

   {/* Brand slogan */}
<div className="mt-5 hidden sm:flex">
  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full uppercase tracking-wide bg-white/10 text-white">
    <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
    Support That’s Smart. Control That’s Constant.
  </span>
</div>
</form>
      <div className="absolute bottom-4 right-4 z-10">
        <img src="/logo1.png" alt="logo" className="w-14 h-14" />
      </div>
    </div>
  );
};

export default Login;
