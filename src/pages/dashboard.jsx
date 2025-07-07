import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { EmergencyStatus } from "@/components/EmergencyStatus";
import { EmergencyContactsSection } from "@/components/EmergencyContactsSection";
import { AIChatSection } from "@/components/AIChatSection";

import { useEmergency } from "@/hooks/useEmergency";
import { useLocation } from "@/hooks/useLocation";
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

  const { triggerAlert, isTriggering } = useEmergency();
  const { formatLocation } = useLocation();

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
      {/* Sidebar (dock‑out icon, nav links, emergency button, etc.) */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onEmergencyTrigger={handleEmergencyTrigger}
        isEmergencyTriggering={isTriggering}
      />

      {/* MAIN PANEL  **************************************************** */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {/* Header */}
        <header className="bg-[hsl(215,28%,17%)] border-b border-[hsl(217,32%,26%)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* (Optional) show burger / sidebar toggle on mobile */}
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onEmergencyTrigger={handleEmergencyTrigger}
              isEmergencyTriggering={isTriggering}
            />

            <div>
              <h2 className="text-xl font-semibold text-white">
                {getSectionTitle(activeSection)}
              </h2>
              <p className="text-sm text-slate-400">
                Smart Crisis Management System
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Current location (fetched from useLocation) */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-[hsl(74,100%,40%)]" />
              <span>{formatLocation()}</span>
            </div>

            {/* User avatar placeholder */}
            <div className="w-8 h-8 bg-[hsl(74,100%,40%)] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[hsl(220,39%,11%)]" />
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
