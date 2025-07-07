import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "sonner";

/**
 *  Emergency‑alert hook (keyboard double‑press “V”, voice, manual button)
 */
export function useEmergency() {
  const [emergencyState, setEmergencyState] = useState({
    status: "safe", // "safe" | "alert" | "sending"
    lastAlert: undefined,
  });

  const [keyPressCount, setKeyPressCount] = useState(0);
  const [keyPressTimer, setKeyPressTimer] = useState(null);
  const queryClient = useQueryClient();

  /* -------------------------------------------------- */
  /*  React‑Query mutation: send alert to backend        */
  /* -------------------------------------------------- */
  const triggerAlertMutation = useMutation({
    mutationFn: async (params) => {
      const res = await apiRequest("POST", "/api/trigger-alert", params);
      return res.json();
    },
    onSuccess: (data) => {
      setEmergencyState({ status: "sending", lastAlert: new Date() });

      toast.warning("Emergency Alert Sent",
        {description: `Alert sent to ${data.contactsNotified} emergency contacts`,
      });

      // Return to safe after 3 s
      setTimeout(() => {
        setEmergencyState({ status: "safe", lastAlert: new Date() });
      }, 3000);

      // Refresh alert‑logs list
      queryClient.invalidateQueries({ queryKey: ["/api/alert-logs"] });
    },
    onError: () => {
      setEmergencyState({ status: "safe" });
      toast.warning( "Alert Failed",
        {description: "Failed to send emergency alert. Please try again.",
        variant: "destructive",
      });
    },
  });

  /* -------------------------------------------------- */
  /*  Public helper to trigger an alert                  */
  /* -------------------------------------------------- */
  const triggerAlert = useCallback(
    async (params) => {
      setEmergencyState({ status: "alert" });

      // Add current geolocation if available
      if (navigator.geolocation && !params.location) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              enableHighAccuracy: true,
            });
          });
          params.location = JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        } catch (err) {
          console.warn("Could not get location:", err);
        }
      }

      setEmergencyState({ status: "sending" });
      triggerAlertMutation.mutate(params); // async fire‑and‑forget
    },
    [triggerAlertMutation]
  );

  /* -------------------------------------------------- */
  /*  Keyboard shortcut: double‑press “V”                */
  /* -------------------------------------------------- */
  useEffect(() => {
    const handleKeyPress = (evt) => {
      if (evt.key && evt.key.toLowerCase() === "v") {
        setKeyPressCount((prev) => prev + 1);

        // reset counter after 500 ms
        if (keyPressTimer) clearTimeout(keyPressTimer);
        const t = setTimeout(() => setKeyPressCount(0), 500);
        setKeyPressTimer(t);

        // second press = trigger alert
        if (keyPressCount === 1) {
          triggerAlert({
            alertType: "keyboard",
            message: "Emergency alert triggered via keyboard shortcut",
          });
          setKeyPressCount(0);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      if (keyPressTimer) clearTimeout(keyPressTimer);
    };
  }, [keyPressCount, keyPressTimer, triggerAlert]);

  /* -------------------------------------------------- */
  /*  Expose state & helpers                             */
  /* -------------------------------------------------- */
  return {
    emergencyState,
    triggerAlert,
    isTriggering: triggerAlertMutation.isPending,
  };
}
