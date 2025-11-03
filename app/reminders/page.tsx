"use client";
import { useState } from "react";
import { Reminder } from "@/types/reminder";
import AddReminderForm from "./AddReminderForm";
import RemindersList from "./RemindersList";
// import { ReminderCard } from "./ReminderCard";

export default function RemindersPage() {
  // const [reminders, setReminders] = useState<Reminder[]>([
  //   {
  //     id: "1",
  //     name: "Priya Sharma",
  //     contact: "priya.sharma@spigems.com",
  //     note: "Follow up about interview feedback email.",
  //     reminderType: "email",
  //     reminderDate: new Date("2025-11-02T10:00:00"),
  //     status: "pending",
  //     createdAt: new Date(),
  //   },
  // ]);

  // const addReminder = (newReminder: Reminder) => {
  //   setReminders((prev) => [newReminder, ...prev]);
  // };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Reminders</h1>
        <AddReminderForm />
        <RemindersList />
      </div>
    </div>
  );
}
