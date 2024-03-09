import { env } from "~/env";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

type EmailPayload = {
  subject: string;
  html: string;
  recipientName: string;
  recipientEmail: string;
};

const mailerSend = new MailerSend({
  apiKey: env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender(
  "contact@mybusinessguide.co.uk",
  "My Business Guide",
);

export const sendEmail = async (data: EmailPayload) => {
  const recipients = [new Recipient(data.recipientEmail, data.recipientName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(data.subject)
    .setHtml(data.html);

  await mailerSend.email.send(emailParams);
};
