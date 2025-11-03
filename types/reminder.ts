export interface Reminder {
  id: string;
  name: string;
  contact: string;
  note?: string;
  reminderType: "email" | "call" | "message";
  reminderDate: Date;
  status: "pending" | "done" | "missed";
  createdAt?: Date;
}
