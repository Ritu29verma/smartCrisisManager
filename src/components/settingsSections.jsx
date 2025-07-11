import { useState , useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "sonner";
import { applyAccentColor, applyTheme } from "@/lib/themeUtils";
import jsPDF from "jspdf";

/* ------------------------------------------------------------------ */
/*  1) AI Settings                                                     */
/* ------------------------------------------------------------------ */
export function AISettingsSection() {
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({ queryKey: ["/api/user-settings"] });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings) => {
      const res = await apiRequest("PUT", "/api/user-settings", newSettings);
      return res.json();
    },
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["/api/user-settings"] });
    },
  });

  const handleSettingChange = (key, value) => {
    updateSettingsMutation.mutate({ [key]: value });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">AI Settings</h2>
        <p className="text-slate-400">
          Configure AI response behavior and tone for emergency situations
        </p>
      </header>

      {/* Response tone */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Response Tone</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings?.aiTone || "calm"}
            onValueChange={(val) => handleSettingChange("aiTone", val)}
          >
            {["calm", "urgent", "professional"].map((tone) => (
              <div key={tone} className="flex items-center space-x-2">
                <RadioGroupItem value={tone} id={tone} />
                <Label htmlFor={tone} className="text-white capitalize">
                  {tone === "calm"
                    ? "Calm & Reassuring"
                    : tone === "urgent"
                    ? "Direct & Urgent"
                    : "Professional & Clinical"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Behaviour */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">AI Behavior Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: "autoEscalation",
              label: "Auto‑escalation",
              desc: "Automatically escalate based on severity",
            },
            {
              key: "contextAwareness",
              label: "Context awareness",
              desc: "Consider user history and patterns",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">{item.label}</Label>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <Switch
                checked={settings?.[item.key] ?? true}
                onCheckedChange={(val) => handleSettingChange(item.key, val)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  2) Gesture Settings                                                */
/* ------------------------------------------------------------------ */
export function GestureSettingsSection() {
  const [gestures, setGestures] = useState([
    { gesture: "Triple Tap", action: "Emergency SOS" },
    { gesture: "Double Tap", action: "Volume Control" },
  ]);

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Gesture Settings</h2>
        <p className="text-slate-400">
          Configure gesture controls for emergency actions
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Gesture Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {gestures.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <Select defaultValue={item.gesture}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Triple Tap", "Double Tap", "Long Press", "Shake"].map(
                    (g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <span className="text-slate-400">→</span>
              <Input defaultValue={item.action} className="flex-1" />
              <Button className="crisis-accent">Save</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3) Automation Rules                                                */
/* ------------------------------------------------------------------ */
export function AutomationRulesSection() {
  const rules = [
    {
      name: "Chest Pain Alert",
      condition: "If symptom = chest pain → notify emergency contacts",
      status: "Active",
    },
    {
      name: "Location-based Alert",
      condition: "If location = high-risk area → increase monitoring",
      status: "Active",
    },
  ];

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Automation Rules
        </h2>
        <p className="text-slate-400">
          Define triggers and automated responses
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Active Rules</CardTitle>
          <Button className="bg-[var(--accent)] hover:white text-black">
            Add Rule
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rules.map((rule, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{rule.name}</p>
                  <p className="text-sm text-slate-400">{rule.condition}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-900/30 text-green-400 border-green-700">
                    {rule.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4) Chat History                                                    */
/* ------------------------------------------------------------------ */

export function ChatHistorySection() {
  const token = sessionStorage.getItem("token");

  const { data: chatHistory, isLoading } = useQuery({
    queryKey: ["chat-history"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/chat/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

const exportHistory = () => {
  if (!chatHistory || chatHistory.length === 0) return;

  const doc = new jsPDF();
  let y = 10;

  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text("Crisis Manager Chat History", 10, y);
  y += 10;

  chatHistory.forEach((log, idx) => {
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Chat ${idx + 1}`, 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`Date: ${new Date(log.createdAt).toLocaleString()}`, 10, y);
    y += 6;

    log.messages.forEach((msg) => {
      const role = msg.role === "assistant" ? "AI" : "You";
      const prefix = `${role}: `;
      const text = `${prefix}${msg.content}`;

      const splitText = doc.splitTextToSize(text, 180); // wrap long lines
      if (y + splitText.length * 6 >= 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(splitText, 10, y);
      y += splitText.length * 6;
    });

    if (log.suggestedActions?.length) {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.text("Suggested Actions:", 10, y);
      doc.setFont("helvetica", "normal");
      y += 6;
      log.suggestedActions.forEach((action) => {
        const wrapped = doc.splitTextToSize(`- ${action}`, 180);
        if (y + wrapped.length * 6 >= 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(wrapped, 10, y);
        y += wrapped.length * 6;
      });
    }

    y += 10; // space between chats
    if (y >= 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("crisis-manager-chat-history.pdf");
};

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Chat History</h2>
        <p className="text-slate-400">View and export past conversations</p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Conversations</CardTitle>
          <Button
            variant="outline"
            onClick={exportHistory}
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            Export History
          </Button>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(74,100%,40%)] mx-auto" />
            </div>
          ) : chatHistory?.length ? (
            <div className="space-y-6">
              {chatHistory.map((chat, idx) => (
                <div key={chat._id} className="bg-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-medium">
                      {new Date(chat.createdAt).toLocaleString()}
                    </span>
                    {chat.emergencyDetected && (
                      <Badge
                        className={`${
                          chat.severity === "high"
                            ? "bg-red-900/30 text-red-400 border-red-700"
                            : chat.severity === "medium"
                            ? "bg-orange-900/30 text-orange-400 border-orange-700"
                            : "bg-yellow-900/30 text-yellow-400 border-yellow-700"
                        }`}
                      >
                        {chat.severity} Emergency
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    {chat.messages.map((msg, mIdx) => (
                      <div
                        key={msg._id || mIdx}
                        className={`p-3 rounded-md ${
                          msg.role === "user"
                            ? "bg-[var(--accent)] text-black"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        <p className="text-sm">
                          <strong className="capitalize">{msg.role}:</strong> {msg.content}
                        </p>
                        <p className="text-xs text-black mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {chat.suggestedActions?.length > 0 && (
                    <div className="text-sm text-red-400 mt-2">
                      <p className="font-medium">Suggested Actions:</p>
                      <ul className="list-disc ml-5 mt-1">
                        {chat.suggestedActions.map((action, i) => (
                          <li key={i}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-slate-400">No chat history found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  5) Theme & Appearance                                              */
/* ------------------------------------------------------------------ */

export function ThemeAppearanceSection() {
  const accentColors = ["#99CC00", "#3B82F6", "#8B5CF6", "#fef9c3", "#F97316"];
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    applyTheme(theme);
    setCurrentTheme(theme);
  };

  const accentBorder = "border-[var(--accent)]";

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Theme & Appearance</h2>
        <p className="text-slate-400">Customize the visual appearance of your crisis manager</p>
      </header>

      {/* Theme Switch */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Theme Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 rounded-lg">
        <div className="flex space-x-4">
          <button
            onClick={() => handleThemeChange("dark")}
            className={`bg-slate-800 border-2 rounded-lg p-4 flex-1 text-center ${
              currentTheme === "dark" ? accentBorder : "border-slate-600"
            }`}
          >
            <div className="text-2xl mb-2">🌙</div>
            <p className="font-medium text-white">Dark Mode</p>
          </button>

          <button
            onClick={() => handleThemeChange("light")}
            className={`bg-slate-800 border-2 rounded-lg p-4 flex-1 text-center ${
              currentTheme === "light" ? accentBorder : "border-slate-600"
            }`}
          >
            <div className="text-2xl mb-2">☀️</div>
            <p className="font-medium text-white">Light Mode</p>
          </button>
        </div>
      </div>
        </CardContent>
      </Card>

      {/* Accent Color Switch */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Accent Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => applyAccentColor(color)}
                className="w-8 h-8 rounded-full border-2 cursor-pointer hover:border-white"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  6) Language / Voice                                                */
/* ------------------------------------------------------------------ */
export function LanguageVoiceSection() {
  const queryClient = useQueryClient();
  const { data: settings } = useQuery({ queryKey: ["/api/user-settings"] });

  const update = useMutation({
    mutationFn: async (newSettings) =>
      (await apiRequest("PUT", "/api/user-settings", newSettings)).json(),
    onSuccess: () => {
      toast.success("Language settings updated");
      queryClient.invalidateQueries({ queryKey: ["/api/user-settings"] });
    },
  });

  return (
    <div className="max-w-4xl space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Language / Voice Input
        </h2>
        <p className="text-slate-400">
          Configure language preferences and voice input settings
        </p>
      </header>

      {/* Language selection */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Language Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={settings?.language || "en"}
            onValueChange={(val) => update.mutate({ language: val })}
          >
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                ["en", "English (US)"],
                ["es", "Spanish"],
                ["fr", "French"],
                ["de", "German"],
              ].map(([val, label]) => (
                <SelectItem key={val} value={val}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Voice mode */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Voice Input Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings?.voiceMode || "always"}
            onValueChange={(val) => update.mutate({ voiceMode: val })}
          >
            {[
              ["always", "Always listening"],
              ["push", "Push to talk"],
              ["keyword", "Wake word activation"],
            ].map(([val, label]) => (
              <div key={val} className="flex items-center space-x-2">
                <RadioGroupItem value={val} id={val} />
                <Label htmlFor={val} className="text-white">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  7) Notification Settings                                           */
/* ------------------------------------------------------------------ */
export function NotificationSettingsSection() {
  const rows = [
    ["Emergency alerts", "Critical emergency notifications", true],
    ["System updates", "Software and security updates", true],
    ["Weekly reports", "Summary of your safety status", false],
  ];

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Notification Settings
        </h2>
        <p className="text-slate-400">
          Configure when and how you receive notifications
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Alert Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rows.map(([label, desc, checked], idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">{label}</Label>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
              <Switch defaultChecked={checked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  8) Privacy & Permissions                                           */
/* ------------------------------------------------------------------ */
export function PrivacyPermissionsSection() {
  const perms = [
    ["🎤", "Microphone", "For voice commands", "Granted"],
    ["📍", "Location", "For emergency location sharing", "Granted"],
    ["💬", "SMS", "For emergency messaging", "Pending"],
  ];

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Privacy &amp; Permissions
        </h2>
        <p className="text-slate-400">
          Manage app permissions and privacy settings
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">App Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {perms.map(([icon, name, desc, status]) => (
              <div
                key={name}
                className="flex items-center justify-between space-x-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <Label className="text-white font-medium">{name}</Label>
                    <p className="text-sm text-slate-400">{desc}</p>
                  </div>
                </div>
                <Badge
                  className={
                    status === "Granted"
                      ? "bg-green-900/30 text-green-400 border-green-700"
                      : "bg-yellow-900/30 text-yellow-400 border-yellow-700"
                  }
                >
                  {status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  9) Device Integration                                              */
/* ------------------------------------------------------------------ */
export function DeviceIntegrationSection() {
  const blocks = [
    ["🔊", "Volume Control", "Triple tap to adjust volume", true],
    ["🔦", "Flashlight", "Shake to toggle flashlight", false],
  ];

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Device Integration
        </h2>
        <p className="text-slate-400">Connect gestures to device functions</p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Device Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blocks.map(([emoji, title, desc, checked], idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-lg p-4 space-y-3 flex flex-col"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{emoji}</span>
                  <h4 className="font-medium text-white">{title}</h4>
                </div>
                <p className="text-sm text-slate-400 flex-1">{desc}</p>
                <Switch defaultChecked={checked} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  10) Help & Support                                                 */
/* ------------------------------------------------------------------ */
export function HelpSupportSection() {
  const faqs = [
    [
      "How do I set up emergency contacts?",
      'You can add emergency contacts in the main dashboard by clicking on the "Emergency Contacts" card and following the setup wizard.',
    ],
    [
      "What triggers an emergency alert?",
      'Emergency alerts can be triggered by double‑pressing the "V" key, using voice commands, or through configured gesture controls.',
    ],
    [
      "How is my location shared?",
      "Your location is only shared during emergency alerts and is sent directly to your configured emergency contacts.",
    ],
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <header>
        <h2 className="text-2xl font-bold mb-2 text-white">Help & Support</h2>
        <p className="text-slate-400">
          Get help and support for your crisis manager
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={i} className="bg-slate-800 rounded-lg">
                <summary className="p-4 cursor-pointer font-medium text-white">
                  {q}
                </summary>
                <div className="p-4 pt-0 text-sm text-slate-400">{a}</div>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="crisis-accent">📧 Email Support</Button>
            <Button variant="outline">📞 Call Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
