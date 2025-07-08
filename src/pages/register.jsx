import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

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
  const [, setLocation] = useLocation();        // Wouter navigation
  const [showPwd, setShowPwd] = useState(true);

  /* ------------ helpers ------------ */
  const isTenDigits = (num) => /^\d{10}$/.test(num);

  /* ------------ change handlers ------------ */
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

  /* ------------ submit ------------ */
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

  if (
      !isTenDigits(form.phone) ||
      form.contacts.some((c) => !isTenDigits(c.phone))
    ) {
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

      toast.success(
        " Registration Successful",
       { description: "Redirecting to dashboard...",
      });
      setTimeout(() => setLocation("/login"), 1000);
    } catch (error) {
      const message =
        error.response?.data?.message || "Unexpected error occurred";
      toast.error(
       " Registration Failed",
       { description: message,});
    } finally {
      setLoading(false);
    }
  };

  /* ------------ render ------------ */
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[hsl(220,39%,11%)]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg bg-[hsl(215,28%,17%)] text-white p-6 sm:p-8 rounded-lg shadow-lg border border-[hsl(218,40%,61%)]"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded text-slate-800 bg-white focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded text-slate-800 bg-white focus:outline-none"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          maxLength={10}
          pattern="\d{10}"
          placeholder="Phone (10 digits)"
          value={form.phone}
          onChange={(e) =>
            /^\d{0,10}$/.test(e.target.value) && handleChange(e)
          }
          className="w-full mb-4 px-4 py-2 rounded text-slate-800 bg-white focus:outline-none"
        />

        {/* Password */}
        <div className="relative mb-4">
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

        {/* Emergency contacts */}
        <div className="mb-6">
          <label className="block mb-3 text-slate-400 text-sm sm:text-base">
            Emergency Contacts (3 required)
          </label>

          {form.contacts.map((contact, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                name={`contactName${idx}`}
                placeholder="Name"
                value={contact.name}
                onChange={(e) => handleChange(e, idx)}
                className="flex-1 px-3 py-2 text-slate-800 bg-white rounded"
              />
              <input
                type="text"
                name={`contactPhone${idx}`}
                placeholder="Phone"
                maxLength={10}
                value={contact.phone}
                onChange={(e) =>
                  /^\d{0,10}$/.test(e.target.value) && handleChange(e, idx)
                }
                className="flex-1 px-3 py-2 text-slate-800 bg-white rounded"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[hsl(74,100%,40%)] text-[hsl(220,39%,11%)] font-bold py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm text-center mt-4 text-slate-400">
  Already a member?{" "}
  <button
    type="button"
    onClick={() => setLocation("/login")}
    className="text-yellow-400 underline hover:text-yellow-300"
  >
    Login
  </button>
</p>

      </form>
    </div>
  );
};

export default Register;
