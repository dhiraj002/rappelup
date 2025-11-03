"use client";

import { useEffect, useState } from "react";
import { Reminder } from "@/types/reminder";
import toast from "react-hot-toast";

export default function RemindersList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch("/api/reminders");
        if (!res.ok) throw new Error("Failed to fetch reminders");

        const data = await res.json();
        setReminders(data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load reminders");
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Loading reminders...
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No reminders scheduled yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white">
              {reminder.name}
            </h3>
            <StatusBadge status={reminder.status} />
          </div>

          <p className="text-gray-400 text-sm mb-2">
            📞 <span className="font-medium">{reminder.contact}</span>
          </p>

          <p className="text-gray-400 text-sm mb-2">
            ⏰{" "}
            {new Date(reminder.reminderDate).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          <p className="text-gray-400 text-sm mb-3">
            📝 {reminder.note || "No note added"}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Type: {reminder.reminderType}</span>
            <span className="text-gray-500 text-xs">
              {new Date(reminder.createdAt!).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "done"
      ? "bg-green-600"
      : status === "missed"
      ? "bg-red-600"
      : "bg-yellow-500";

  return (
    <span
      className={`${color} text-xs font-medium px-2 py-1 rounded-lg text-white`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
