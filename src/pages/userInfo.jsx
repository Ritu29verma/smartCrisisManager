import { useEffect, useState } from "react";
import { User, Pencil, Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import axios from "axios";
import { toast } from "sonner";

export default function UserInfo() {
  const [, navigate] = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
     const fetchUserDetails = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/users/get-user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(res.data.User);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch user details");
    }
  };
    fetchUserDetails();
  }, []);

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(220,39%,11%)] text-white">
        <p>Loading user info...</p>
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(220,39%,11%)] to-[hsl(215,28%,17%)] text-white px-4 py-16 relative overflow-hidden">
      {/* Background SVG pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="40" cy="40" r="15" fill="currentColor" opacity="0.3" />
              <path d="M30,40 L37,47 L50,30" fill="none" stroke="currentColor" strokeWidth="3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" className="text-[hsl(74,100%,40%)]" />
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-[hsl(218,40%,61%)] p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[hsl(74,100%,40%)]">User Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-[hsl(74,100%,40%)]"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-[hsl(220,39%,11%)] flex items-center justify-center font-bold text-2xl uppercase shadow-md">
            {userInfo.name[0]}
          </div>
          <div>
            <p className="text-lg font-semibold">{userInfo.name}</p>
            <p className="text-sm text-gray-400">Active User</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[hsl(74,100%,40%)]" />
            <p>{userInfo.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[hsl(74,100%,40%)]" />
            <p>{userInfo.phone}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-8">
          <Button
            className="bg-[hsl(74,100%,40%)] hover:bg-lime-400 text-[hsl(220,39%,11%)] font-semibold w-full sm:w-1/2"
            onClick={() => alert("Edit profile coming soon")}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

