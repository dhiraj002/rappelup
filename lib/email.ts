// lib/email.ts
import * as Brevo from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) throw new Error("Missing BREVO_API_KEY in env");

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

export async function sendReminderEmail(
  to: string,
  subject: string,
  html: string
) {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || "RappelUp",
      email: process.env.BREVO_SENDER_EMAIL || "no-reply@brevo.io",
    };
    sendSmtpEmail.to = [{ email: to }];

    // // optional: track opens/clicks
    // sendSmtpEmail.trackOpens = true;
    // sendSmtpEmail.trackClicks = true;

    const resp = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Brevo sendTransacEmail response:", resp);
    return resp;
  } catch (err) {
    console.error("Brevo send error:", err);
    throw err; // rethrow so caller can handle
  }
}
