"use client";

import { useState } from "react";
import { Reminder } from "@/types/reminder";
import toast from "react-hot-toast";
import SendReminderBtn from "./SendReminderBtn";

export default function AddReminderForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Reminder>>({
    name: "",
    contact: "",
    note: "",
    reminderType: "email",
    reminderDate: new Date(),
    status: "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.reminderDate)
      return toast.error("Please fill all required fields!");

    setLoading(true);
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save reminder");

      toast.success("Reminder added successfully!");
      setForm({
        name: "",
        contact: "",
        note: "",
        reminderType: "email",
        reminderDate: new Date(),
        status: "pending",
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">Schedule New Reminder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-400">Name*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-400">Contact*</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Email or phone"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-400">Note</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Add an optional note"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Reminder Type
          </label>
          <select
            name="reminderType"
            value={form.reminderType}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
          >
            <option value="email">Email 📧</option>
            <option value="call">Call 📞</option>
            <option value="message">Message 💬</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Reminder Date*
          </label>
          <input
            type="datetime-local"
            name="reminderDate"
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg disabled:opacity-70"
          >
            {loading ? "Adding..." : "Add Reminder"}
          </button>
        </div>
        <SendReminderBtn />
      </div>
    </form>
  );
}
