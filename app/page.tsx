"use client";

import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="max-w-3xl text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600/20 p-3 rounded-2xl">
            <FaBell className="text-blue-400 text-4xl" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Stay on Top of Your <span className="text-blue-500">Reminders</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Simple and smart way to manage follow-ups, HR tasks, and daily to-dos.
          Schedule once, never forget again.
        </p>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push("/reminders")}
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium text-lg px-6 py-3 rounded-xl shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Subtext */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        Built with ❤️ using Next.js & Drizzle ORM
      </div>
    </div>
  );
}
