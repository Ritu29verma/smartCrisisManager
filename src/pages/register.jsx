import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight,ArrowLeft, Mail , Phone} from "lucide-react";
import axios from "axios";
import backgroundImage from "../assets/logo2.png";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    contacts: [
      { name: "", phone: "" },
      { name: "", phone: "" },
      { name: "", phone: "" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(true);
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);

  const isTenDigits = (num) => /^\d{10}$/.test(num);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("contactName") || name.startsWith("contactPhone")) {
      const field = name.includes("Name") ? "name" : "phone";
      const updatedContacts = [...form.contacts];
      if (typeof index === "number") {
        updatedContacts[index][field] = value;
      }
      setForm({ ...form, contacts: updatedContacts });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

   const handleNextStep = () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("Please complete all fields before continuing.");
      return;
    }

    if (!isTenDigits(form.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("All fields are required", {
        description: "Please fill in name, email, phone, and password.",
      });
      return;
    }

    if (form.contacts.some((c) => !c.name || !c.phone)) {
      toast.error("All contact fields are required", {
        description: "Each emergency contact must have a name and phone.",
      });
      return;
    }

    if (!isTenDigits(form.phone) || form.contacts.some((c) => !isTenDigits(c.phone))) {
      toast.error("Invalid phone number", {
        description: "All phone numbers must be exactly 10 digits.",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/users/register`,
        form
      );
      toast.success("Registration Successful", {
        description: "Redirecting to dashboard...",
      });
      setTimeout(() => setLocation("/login"), 1000);
    } catch (error) {
      const message = error.response?.data?.message || "Unexpected error occurred";
      toast.error("Registration Failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-left bg-no-repeat bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-[hsl(224,38%,25%)] opacity-95" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg min-h-[520px] bg-white/5 backdrop-blur-md text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-center"
      >
        <p className="uppercase text-xs text-slate-400 mb-2">Start for free</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 leading-tight tracking-tight">
          Create new <span className="text-[var(--accent)]">account</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 mb-5">
  Already a member?{" "}
  <button
    type="button"
    onClick={() => setLocation("/login")}
    className="text-[var(--accent)] underline hover:text-[hsl(75,38%,68%)] transition-colors duration-150"
  >
    Login
  </button>
</p>

{step === 1 && (
  <>
    {/* Name */}
    <div className="relative mb-6">
      <label className="block text-sm text-slate-400 mb-1">Your Name</label>
      <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
        />
      </div>
    </div>

    {/* Email */}
    <div className="relative mb-6">
      <label className="block text-sm text-slate-400 mb-1">Email</label>
      <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
        />
        <Mail size={18} className="ml-2 text-slate-400" />
      </div>
    </div>

    {/* Phone */}
    <div className="relative mb-6">
      <label className="block text-sm text-slate-400 mb-1">Phone Number</label>
      <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
        <input
          type="text"
          name="phone"
          maxLength={10}
          placeholder="10-digit number"
          value={form.phone}
          onChange={(e) => /^\d{0,10}$/.test(e.target.value) && handleChange(e)}
          className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
        />
        <Phone size={18} className="ml-2 text-slate-400" />
      </div>
    </div>

    {/* Password */}
    <div className="relative mb-6">
      <label className="block text-sm text-slate-400 mb-1">Password</label>
      <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
        <input
          type={showPwd ? "password" : "text"}
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
        />
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          className="ml-2 text-slate-400"
        >
          {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>

    <button
      type="button"
      className="ml-auto mt-2 flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[hsl(75,38%,68%)]"
      onClick={handleNextStep}
    >
      Continue <ArrowRight size={18} />
    </button>
  </>
)}

      {step === 2 && (
  <>
    <label className="block mb-4 text-slate-400 text-sm sm:text-base font-medium">
      Emergency Contacts <span className="text-red-500">*</span>
    </label>

    {form.contacts.map((contact, idx) => (
      <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2">
        {/* <p className="text-sm text-slate-500 mb-1">Contact {idx + 1}</p> */}

        {/* Contact Name */}
        <div className="relative mb-3">
          <label className="block text-sm text-slate-400 mb-1">Name</label>
          <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
            <input
              type="text"
              name={`contactName${idx}`}
              placeholder="Full Name"
              value={contact.name}
              onChange={(e) => handleChange(e, idx)}
              className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Contact Phone */}
        <div className="relative">
          <label className="block text-sm text-slate-400 mb-1">Phone</label>
          <div className="flex items-center bg-slate-800 text-white px-4 py-3 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]">
            <input
              type="text"
              name={`contactPhone${idx}`}
              placeholder="10-digit phone"
              maxLength={10}
              value={contact.phone}
              onChange={(e) =>
                /^\d{0,10}$/.test(e.target.value) && handleChange(e, idx)
              }
              className="flex-1 bg-transparent text-sm outline-none placeholder-slate-500"
            />
          </div>
        </div>
      </div>
    ))}

    {/* Back Button */}
    <button
      type="button"
      onClick={() => setStep(1)}
      className="ml-auto mt-2 flex items-center gap-2 text-sm text-[var(--accent)] hover:text-white"
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>

    {/* Register Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full mt-4 bg-[var(--accent)] hover:bg-white text-black font-semibold py-3 rounded-md transition duration-300"
    >
      {loading ? "Registering..." : "Register"}
    </button>
  </>
)}

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

export default Register;