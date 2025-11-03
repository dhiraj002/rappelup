import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { reminders } from "@/app/db/schema";
import { eq, and, lte } from "drizzle-orm";
import { sendReminderEmail } from "@/lib/email";

export async function POST() {
  try {
    const now = new Date();

    // find pending reminders that are due
    const dueReminders = await db
      .select()
      .from(reminders)
      .where(
        and(eq(reminders.status, "pending"), lte(reminders.reminderDate, now))
      );

    if (dueReminders.length === 0) {
      return NextResponse.json({ message: "No reminders due" });
    }

    for (const r of dueReminders) {
      await sendReminderEmail(
        r.contact,
        `Reminder: ${r.name}`,
        r.note || "This is your scheduled reminder."
      );

      await db
        .update(reminders)
        .set({ status: "done" })
        .where(eq(reminders.id, r.id));
    }

    return NextResponse.json({
      message: `Sent ${dueReminders.length} reminders`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
