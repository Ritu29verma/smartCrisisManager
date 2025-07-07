import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "sonner";

import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Shield,
  MessageCircle,
  Loader2,
} from "lucide-react";

/* ----------------------------- component ----------------------------- */
export function AIChatSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Crisis Manager AI Assistant. I’m here to help you with emergency guidance and system questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef(null);

  /* -------------- chat mutation (POST /api/chat) -------------- */
  const chatMutation = useMutation({
    mutationFn: async (message) => {
      const res = await apiRequest("POST", "/api/chat", {
        message,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
      });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          timestamp: new Date(data.timestamp),
          emergencyDetected: data.emergencyDetected,
          severity: data.severity,
          suggestedActions: data.suggestedActions,
        },
      ]);

      if (data.emergencyDetected) {
        toast.warning( "Emergency Detected",
         { description: `The AI detected a potential ${data.severity} severity emergency. Consider using the emergency alert system.`,
          variant: "destructive",
        });
      }
    },
    onError: () =>
      toast.error("Chat Error",
       { description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      }),
  });

  /* ------------------------- helpers ------------------------- */
  const handleSendMessage = () => {
    if (!inputMessage.trim() || chatMutation.isPending) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputMessage, timestamp: new Date() },
    ]);
    chatMutation.mutate(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current)
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
  };

  useEffect(scrollToBottom, [messages]);

  const getMessageIcon = (role) =>
    role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />;

  const severityColor = (s) =>
    ({
      high: "bg-red-900/30 text-red-400 border-red-700",
      medium: "bg-orange-900/30 text-orange-400 border-orange-700",
      low: "bg-yellow-900/30 text-yellow-400 border-yellow-700",
    }[s] || "bg-slate-900/30 text-slate-400 border-slate-700");

  /* --------------------------- UI --------------------------- */
  return (
    <div className="max-w-4xl space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">AI Assistant</h2>
        <p className="text-slate-400">
          Chat with your intelligent crisis‑management assistant
        </p>
      </header>

      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-white">
            <MessageCircle className="w-5 h-5 text-[hsl(74,100%,40%)]" />
            <span>Crisis Manager AI</span>
            <Badge className="bg-green-900/30 text-green-400 border-green-700">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 pb-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="space-y-2">
                  {/* bubble */}
                  <div
                    className={`flex items-start space-x-3 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div className="p-2 bg-[hsl(74,100%,40%)]/20 rounded-full">
                        {getMessageIcon(m.role)}
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] ${
                        m.role === "user" ? "order-first" : ""
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          m.role === "user"
                            ? "bg-[hsl(74,100%,40%)] text-black ml-auto"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{m.content}</p>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 px-1">
                        {m.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {m.role === "user" && (
                      <div className="p-2 bg-slate-600 rounded-full">
                        {getMessageIcon(m.role)}
                      </div>
                    )}
                  </div>

                  {/* emergency alert */}
                  {m.emergencyDetected && (
                    <Alert className="bg-red-900/20 border-red-700 mx-6">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        <div className="flex items-center justify-between">
                          <span>Emergency detected in your message</span>
                          <Badge className={severityColor(m.severity)}>
                            {m.severity} severity
                          </Badge>
                        </div>

                        {m.suggestedActions?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-red-400 mb-1">
                              Suggested actions:
                            </p>
                            <ul className="text-xs space-y-1">
                              {m.suggestedActions.map((a, idx) => (
                                <li key={idx} className="flex items-center space-x-1">
                                  <Shield className="w-3 h-3" />
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}

              {/* thinking… */}
              {chatMutation.isPending && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-[hsl(74,100%,40%)]/20 rounded-full">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-700 text-white p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">AI is thinking…</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* input */}
          <footer className="border-t border-slate-700 p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about crisis management or this system…"
                className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || chatMutation.isPending}
                className="bg-[hsl(74,100%,40%)] hover:bg-[hsl(74,100%,35%)] text-black"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setInputMessage("How do I add emergency contacts?")
                }
                className="text-xs border-slate-600 text-gray-700 hover:bg-slate-500"
              >
                How to add contacts?
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setInputMessage("What should I do in a medical emergency?")
                }
                className="text-xs border-slate-600 text-gray-700 hover:bg-slate-500"
              >
                Medical emergency help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setInputMessage("How does the keyboard trigger work?")
                }
                className="text-xs border-slate-600 text-gray-700 hover:bg-slate-500"
              >
                Keyboard triggers
              </Button>
            </div>
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}
