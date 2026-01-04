import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";
import twilio from "twilio";

admin.initializeApp();

// ----- CONFIG (set via firebase functions:config:set) -----
// sendgrid.key="SG..." notify.email_to="dispatch@..." notify.email_from="no-reply@..."
// twilio.sid="..." twilio.token="..." twilio.from="+1..." notify.sms_to="+1..."
const cfg = functions.config();

function getSendgridTransport() {
  const sendgridKey = cfg.sendgrid?.key;
  if (!sendgridKey) return null;

  // SendGrid SMTP:
  // user: "apikey"
  // pass: SENDGRID_API_KEY
  return nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: { user: "apikey", pass: sendgridKey }
  });
}

function getTwilioClient() {
  const sid = cfg.twilio?.sid;
  const token = cfg.twilio?.token;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export const onNewIntake = functions.firestore
  .document("intakeRequests/{docId}")
  .onCreate(async (snap, ctx) => {
    const data = snap.data() as any;

    const id = ctx.params.docId;
    const createdAt = data.createdAt;
    const serviceType = data.serviceType;
    const urgency = data.urgency;
    const contactName = data.contactName;
    const phone = data.phone;
    const email = data.email || "";
    const address = data.serviceAddress;

    const subject = `New Intake Request (${serviceType}) — ${contactName}`;
    const bodyText =
`New intake received

ID: ${id}
Created: ${createdAt}
Service: ${serviceType}
Urgency: ${urgency}

Contact: ${contactName}
Phone: ${phone}
Email: ${email}
Address/Area: ${address}

Notes: ${data.notes || ""}

Default status: new
Priority: ${data.priority || "normal"}
AssignedTo: ${data.assignedTo || ""}
`;

    // ---- EMAIL (SendGrid SMTP) ----
    const toEmail = cfg.notify?.email_to;
    const fromEmail = cfg.notify?.email_from;

    const transport = getSendgridTransport();
    if (transport && toEmail && fromEmail) {
      await transport.sendMail({
        to: toEmail,
        from: fromEmail,
        subject,
        text: bodyText
      });
    }

    // ---- SMS (Twilio) ----
    const smsTo = cfg.notify?.sms_to;
    const smsFrom = cfg.twilio?.from;

    const tw = getTwilioClient();
    if (tw && smsTo && smsFrom) {
      const sms =
        `New intake: ${serviceType} (${urgency}) - ${contactName} ${phone}. ID ${id}`;
      await tw.messages.create({ to: smsTo, from: smsFrom, body: sms });
    }

    return;
  });
