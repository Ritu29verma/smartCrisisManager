import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

export function useVoice(onEmergencyCommand) {
  const [voiceState, setVoiceState] = useState({
    isListening: false,
    isSupported:
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window,
    transcript: "",
  });

  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!voiceState.isSupported) {
      toast.info( "Voice Recognition Not Supported",
        {description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    try {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setVoiceState((prev) => ({ ...prev, isListening: true }));
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript.toLowerCase();
        setVoiceState((prev) => ({ ...prev, transcript }));

        if (transcript.includes("help me") || transcript.includes("emergency")) {
          if (onEmergencyCommand) onEmergencyCommand();
          stopListening();
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setVoiceState((prev) => ({ ...prev, isListening: false }));

        if (event.error !== "aborted") {
          toast.error("Voice Recognition Error",
            {description: "There was an error with voice recognition",
            variant: "destructive",
          });
        }
      };

      recognition.onend = () => {
        setVoiceState((prev) => ({ ...prev, isListening: false }));
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      toast.error("Voice Recognition Failed",
        {description: "Could not start voice recognition",
        variant: "destructive",
      });
    }
  }, [voiceState.isSupported, onEmergencyCommand, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState((prev) => ({ ...prev, isListening: false }));
  }, []);

  const speak = useCallback((text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const testVoice = useCallback(() => {
    speak("Emergency alert activated. Help is on the way.");
  }, [speak]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    voiceState,
    startListening,
    stopListening,
    speak,
    testVoice,
  };
}
