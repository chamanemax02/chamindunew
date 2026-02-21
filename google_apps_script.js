/**
 * CHAMINDU OFFICE - NOTIFICATION SYSTEM (GAS)
 * This script handles dual-email notifications for:
 * 1. Verification Emails (OTP/Login)
 * 2. Contact Inquiries (To Admin & Confirmation to User)
 * 3. Service Orders (To Admin & Confirmation to User)
 */

const ADMIN_EMAIL = "ransikachamindu43@gmail.com";
const PRIMARY_COLOR = "#00ffa3";
const DARK_BG = "#050505";
const CARD_BG = "#0f0f0f";

function doGet(e) {
    return response({ status: "success", message: "✅ Chamindu's Notification System is LIVE!" });
}

function doPost(e) {
    try {
        const data = e.parameter;
        const type = data.type;

        if (type === 'Verification') {
            return sendVerificationEmail(data.email, data.code);
        } else if (type === 'Contact') {
            return handleContactFlow(data.name, data.email, data.message);
        } else if (type === 'Order') {
            return handleOrderFlow(data.name, data.email, data.contact, data.services, data.details);
        }

        return response({ status: "error", message: "Invalid Request Type" });
    } catch (err) {
        return response({ status: "error", message: err.toString() });
    }
}

function sendVerificationEmail(email, code) {
    const subject = "🔐 Security Access Code - CHAMINDU.SITE";
    const htmlBody = createEmailTemplate(
        "Security Verification",
        `Someone is attempting to sign in to the Admin Dashboard. Use the code below to verify your identity.`,
        `<div style="font-size: 32px; font-weight: 900; color: ${PRIMARY_COLOR}; letter-spacing: 10px; padding: 20px; background: rgba(0,255,163,0.05); border-radius: 15px; margin: 30px 0;">${code}</div>`,
        "This code will expire in 10 minutes. If you didn't request this, please ignore this email."
    );

    MailApp.sendEmail({ to: email, subject: subject, htmlBody: htmlBody });
    return response({ status: "success", message: "Verification email sent." });
}

function handleContactFlow(name, email, message) {
    // 1. Send to Admin
    const adminSubject = `📩 New Inquiry: ${name}`;
    const adminBody = createEmailTemplate(
        "New Contact Message",
        `You have received a new inquiry from your portfolio website.`,
        `<div style="text-align: left; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 15px;">
      <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0;"><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    </div>`,
        "Reply directly to this email to contact the sender."
    );
    MailApp.sendEmail({ to: ADMIN_EMAIL, subject: adminSubject, htmlBody: adminBody, replyTo: email });

    // 2. Send 'Thank You' to User
    const userSubject = `👋 Thanks for reaching out, ${name.split(' ')[0]}!`;
    const userBody = createEmailTemplate(
        "Message Received",
        `Hi ${name}, thank you for contacting me. I've received your message and will get back to you within 24 hours.`,
        `<div style="padding: 20px; background: rgba(0,255,163,0.02); border-radius: 15px; border: 1px dashed ${PRIMARY_COLOR}; text-align: center; margin: 20px 0;">
          <p style="color: ${PRIMARY_COLOR}; font-weight: 800; font-size: 1.1rem; margin:0;">I'll be in touch soon!</p>
        </div>`,
        "This is an automated confirmation. Please do not reply directly to this email."
    );
    MailApp.sendEmail({ to: email, subject: userSubject, htmlBody: userBody });

    return response({ status: "success", message: "Dual contact emails sent." });
}

function handleOrderFlow(name, email, contact, services, details) {
    // 1. Send to Admin
    const adminSubject = `🚀 NEW PROJECT ORDER: ${name}`;
    const adminBody = createEmailTemplate(
        "Project Order Received",
        `A new service request has been submitted through the project portal.`,
        `<div style="text-align: left; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 15px;">
      <p style="margin: 0 0 10px 0;"><strong>Client:</strong> ${name}</p>
      <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0 0 10px 0;"><strong>Contact:</strong> ${contact}</p>
      <p style="margin: 0 0 10px 0;"><strong>Services:</strong> <span style="color: ${PRIMARY_COLOR}; font-weight: 800;">${services}</span></p>
      <p style="margin: 0;"><strong>Details:</strong><br>${details.replace(/\n/g, '<br>')}</p>
    </div>`,
        "Please check the Admin Dashboard to manage this order."
    );
    MailApp.sendEmail({ to: ADMIN_EMAIL, subject: adminSubject, htmlBody: adminBody, replyTo: email });

    // 2. Send Confirmation to User
    const userSubject = `✨ Order Confirmation - ${name.split(' ')[0]}`;
    const userBody = createEmailTemplate(
        "Order Confirmed",
        `Thank you for your project request! I have received your order for ${services}.`,
        `<div style="text-align: left; padding: 25px; background: rgba(0,255,163,0.03); border-radius: 20px; border: 1px solid rgba(0,255,163,0.1);">
          <h3 style="color: ${PRIMARY_COLOR}; margin: 0 0 15px 0; font-size: 18px;">What happens next?</h3>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #ccc;">1. I will review your requirements.</p>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #ccc;">2. I'll contact you via WhatsApp/Email to discuss pricing.</p>
          <p style="margin: 0; font-size: 14px; color: #ccc;">3. We'll kick off the project once finalized!</p>
        </div>`,
        "Looking forward to working with you!"
    );
    MailApp.sendEmail({ to: email, subject: userSubject, htmlBody: userBody });

    return response({ status: "success", message: "Dual order emails sent." });
}

function createEmailTemplate(title, subtitle, content, footer) {
    return `
    <div style="background-color: ${DARK_BG}; color: #fff; font-family: 'Inter', Helvetica, Arial, sans-serif; padding: 60px 10px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: ${CARD_BG}; border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; padding: 50px 30px; text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.8);">
        <img src="https://ransikachamindu43.github.io/portfolio/profil.png" alt="Logo" style="width: 80px; height: 80px; border-radius: 20px; margin-bottom: 30px; border: 2px solid ${PRIMARY_COLOR};">
        <h1 style="font-size: 32px; font-weight: 900; margin: 0; color: #fff; letter-spacing: -1px;">${title}</h1>
        <p style="color: #888; font-size: 16px; margin: 20px 0 40px 0; line-height: 1.6;">${subtitle}</p>
        ${content}
        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.05);">
          <p style="color: #666; font-size: 13px; line-height: 1.6; margin: 0;">
            ${footer}<br>
            <span style="color: #444;">© 2026 CHAMINDU OFFICE. Design & Development.</span>
          </p>
          <div style="margin-top: 20px;">
            <a href="https://ransikachamindu43.github.io/portfolio/" style="color: ${PRIMARY_COLOR}; text-decoration: none; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Visit Website</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function response(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
