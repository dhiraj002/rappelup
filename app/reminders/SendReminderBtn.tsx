"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SendReminderBtn() {
  const [loading, setLoading] = useState(false);

  const handleSendReminders = async () => {
    try {
      setLoading(true);

      // Hit your API route
      const res = await fetch("/api/send-reminders", { method: "POST" });
      const data = await res.json();

      // Handle response
      if (!res.ok) {
        throw new Error(data.error || "Failed to send reminders");
      }

      if (data.message.includes("No reminders")) {
        toast("✅ No pending reminders right now.", {
          icon: "⏰",
        });
      } else {
        toast.success(data.message || "Reminders sent successfully!");
      }
    } catch (error) {
      console.error("Error sending reminders:", error);
      //   toast.error(error?.message || "Something went wrong while sending reminders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center space-y-3">
      <button
        onClick={handleSendReminders}
        disabled={loading}
        className={`px-6 py-3 rounded-lg transition-all duration-200 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send Reminders"}
      </button>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
