import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

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
      toast.success("Login Successful", {
        description: "Redirecting to dashboard...",
      });

      // Optionally save token/user in localStorage or context
      // localStorage.setItem("token", res.data.token);

      setTimeout(() => setLocation("/dashboard"), 1000);
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      toast.error("Login Failed", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[hsl(220,39%,11%)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg bg-[hsl(215,28%,17%)] text-white p-6 sm:p-8 rounded-lg shadow-lg border border-[hsl(218,40%,61%)]"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded text-slate-800 bg-white focus:outline-none"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPwd ? "password" : "text"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 rounded text-slate-800 bg-white focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[hsl(74,100%,40%)] text-[hsl(220,39%,11%)] font-bold py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4 text-slate-400">
  New here?{" "}
  <button
    type="button"
    onClick={() => setLocation("/")}
    className="text-yellow-400 underline hover:text-yellow-300"
  >
    Register
  </button>
</p>

      </form>
    </div>
  );
};

export default Login;
