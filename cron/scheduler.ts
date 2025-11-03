import cron from "node-cron";
import "dotenv/config";

console.log("🕒 Reminder Scheduler started...");

// This job runs every minute — you can change to '*/5 * * * *' for every 5 minutes
cron.schedule("* * * * *", async () => {
  console.log("⏰ Running reminder job:", new Date().toLocaleString());

  try {
    // Call your Next.js API route to send reminders
    const res = await fetch("http://localhost:3000/api/send-reminders", {
      method: "POST",
    });

    const data = await res.json();
    console.log("✅ Response:", data.message || data.error);
  } catch (error) {
    console.error("❌ Error triggering reminder job:", error);
  }
});
