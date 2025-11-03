import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Table: reminders
export const reminders = pgTable("reminders", {
  id: uuid("id").defaultRandom().primaryKey(), // unique id for each reminder

  name: text("name").notNull(), // HR name or person to contact
  contact: text("contact").notNull(), // email or phone number
  note: text("note"), // optional note or message

  reminderType: text("reminder_type").notNull(), // "email", "call", "message"
  reminderDate: timestamp("reminder_date", { mode: "date" }).notNull(),

  status: text("status").default("pending").notNull(), // "pending", "done", "missed"

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
