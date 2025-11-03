import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { reminders } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allReminders = await db.select().from(reminders);
    return NextResponse.json(allReminders);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch reminders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newReminder = await db
      .insert(reminders)
      .values({
        name: body.name,
        contact: body.contact,
        note: body.note,
        reminderType: body.reminderType,
        reminderDate: new Date(body.reminderDate),
        status: "pending",
      })
      .returning();

    return NextResponse.json(newReminder[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create reminder" },
      { status: 500 }
    );
  }
}
