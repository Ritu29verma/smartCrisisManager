import { useEffect, useState } from "react";
import { useLocation as useRouteLocation } from "wouter"; // ✅ alias for navigation
import { Sidebar } from "@/components/Sidebar";
import { EmergencyStatus } from "@/components/EmergencyStatus";
import { EmergencyContactsSection } from "@/components/EmergencyContactsSection";
import { AIChatSection } from "@/components/AIChatSection";
import { toast } from "sonner";
import axios from "axios";
import { useEmergency } from "@/hooks/useEmergency";
import { useLocation as useGeoLocation } from "@/hooks/useLocation"; // ✅ alias for custom location
import { useVoice } from "@/hooks/useVoice";

import { MapPin, User } from "lucide-react";

import {
  AISettingsSection,
  GestureSettingsSection,
  AutomationRulesSection,
  ChatHistorySection,
  ThemeAppearanceSection,
  LanguageVoiceSection,
  NotificationSettingsSection,
  PrivacyPermissionsSection,
  DeviceIntegrationSection,
  HelpSupportSection,
} from "@/components/settingsSections";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [, setLocation] = useRouteLocation();
  const { triggerAlert, isTriggering } = useEmergency();
  const { formatLocation } = useGeoLocation();

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


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("You must be logged in to access the dashboard");
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    toast.success("Logged out successfully");
    setLocation("/");
  };

  // Listen for the phrase “Help me” and trigger an alert via voice hook
  useVoice(() =>
    triggerAlert({
      alertType: "voice",
      message: 'Emergency alert triggered via voice command: "Help me"',
    })
  );

  const handleEmergencyTrigger = () => {
    triggerAlert({
      alertType: "manual",
      message: "Emergency alert triggered manually via button",
    });
  };

  const titles = {
    dashboard: "Dashboard",
    "ai-chat": "AI Assistant",
    "emergency-contacts": "Emergency Contacts",
    "ai-settings": "AI Settings",
    "gesture-settings": "Gesture Settings",
    "automation-rules": "Automation Rules",
    "chat-history": "Chat History",
    "theme-appearance": "Theme & Appearance",
    "language-voice": "Language / Voice Input",
    "notification-settings": "Notification Settings",
    "privacy-permissions": "Privacy & Permissions",
    "device-integration": "Device Integration",
    "help-support": "Help & Support",
  };

  const getSectionTitle = (section) => titles[section] || "Dashboard";

  const renderSection = () => {
    switch (activeSection) {
      case "ai-chat":
        return <AIChatSection />;
      case "emergency-contacts":
        return <EmergencyContactsSection />;
      case "ai-settings":
        return <AISettingsSection />;
      case "gesture-settings":
        return <GestureSettingsSection />;
      case "automation-rules":
        return <AutomationRulesSection />;
      case "chat-history":
        return <ChatHistorySection />;
      case "theme-appearance":
        return <ThemeAppearanceSection />;
      case "language-voice":
        return <LanguageVoiceSection />;
      case "notification-settings":
        return <NotificationSettingsSection />;
      case "privacy-permissions":
        return <PrivacyPermissionsSection />;
      case "device-integration":
        return <DeviceIntegrationSection />;
      case "help-support":
        return <HelpSupportSection />;
      default:
        return <EmergencyStatus />;
    }
  };

  return (
    <div className="flex h-screen bg-[hsl(220,39%,11%)]">
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <header className="bg-[hsl(215,28%,17%)] border-b border-[hsl(217,32%,26%)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* (Optional) show burger / sidebar toggle on mobile */}
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onEmergencyTrigger={handleEmergencyTrigger}
              isEmergencyTriggering={isTriggering}
            />
            <div className="hidden sm:block">
              <h2 className="text-xl font-semibold text-white">
                {getSectionTitle(activeSection)}
              </h2>
              <p className="text-sm text-slate-400">
                Smart Crisis Management System
              </p>
            </div>

            <div className="block sm:hidden w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--accent)]">
              <img
                src="/logo.png"
                alt="Smart Crisis Manager Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Current location (fetched from useLocation) */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-[var(--accent)]" />
              <span>{formatLocation()}</span>
            </div>

            <div className=" bg-[hsl(220,39%,11%)] text-white flex flex-col items-center justify-center">
              <button
                onClick={handleLogout}
                className="bg-[var(--accent)] text-[hsl(220,39%,11%)] font-bold py-2 px-4 rounded hover:opacity-90 transition"
              >
                Logout
              </button>
            </div>

            {/* User avatar placeholder */}
            {/* User avatar placeholder */}
            <div className="relative">
              <div
                onClick={async () => {
                  const next = !showProfileDropdown;
                  setShowProfileDropdown(next);
                  if (next && !userInfo) {
                    await fetchUserDetails();
                  }
                }}
                className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center cursor-pointer text-[hsl(220,39%,11%)] font-bold uppercase"
              >
                {userInfo?.name?.[0] || <User className="w-4 h-4" />}
              </div>

              {showProfileDropdown && userInfo && (
                <div>
                  <div className="absolute right-0 mt-2 w-60 bg-[hsl(215,28%,17%)] border border-[hsl(218,40%,61%)] rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-lg p-4 z-50 text-white">
                    <p className="text-sm"><strong>Name:</strong> {userInfo.name}</p>
                    <p className="text-sm"><strong>Email:</strong> {userInfo.email}</p>
                    <p className="text-sm"><strong>Phone:</strong> {userInfo.phone}</p>
                  </div>
                </div>
              )}
            </div>


          </div>
        </header>

        {/* Main scroll‑area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
