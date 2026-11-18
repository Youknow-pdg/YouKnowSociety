import nodemailer, { type Transporter } from 'nodemailer';
import { CORE_CONFIG } from './config.js';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!CORE_CONFIG.smtp.pass) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: CORE_CONFIG.smtp.host,
      port: CORE_CONFIG.smtp.port,
      secure: CORE_CONFIG.smtp.secure,
      auth: {
        user: CORE_CONFIG.smtp.user,
        pass: CORE_CONFIG.smtp.pass,
      },
    });
  }
  return transporter;
}

export async function sendMailViaHostinger(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ sent: boolean; mode: 'smtp' | 'log' }> {
  const client = getTransporter();
  if (!client) {
    console.log(
      `[HostingerMail:DEV] SMTP_PASS non configuré — Email simulé vers ${options.to} | Sujet: "${options.subject}"`
    );
    return { sent: false, mode: 'log' };
  }

  await client.sendMail({
    from: CORE_CONFIG.smtp.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return { sent: true, mode: 'smtp' };
}

export async function sendVerificationEmail(params: {
  email: string;
  fullName: string;
  verificationCode: string;
}) {
  const verifyUrl = `${CORE_CONFIG.primaryDomain}/#/verify-email?token=${encodeURIComponent(
    params.verificationCode
  )}`;
  const subject = 'Vérifiez votre compte YOU KNOW GROUP';
  const text = `Bonjour ${params.fullName},\n\nVotre code de vérification YOU KNOW GROUP est : ${params.verificationCode}\nOu cliquez sur : ${verifyUrl}\n\nCe code expire dans 24 heures.\nYOU KNOW SOCIETY — Where Knowledge Meets Innovation.`;
  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0f172a;color:#f8fafc;border-radius:12px;">
      <h2 style="color:#f59e0b;margin-top:0;">YOU KNOW GROUP</h2>
      <p>Bonjour <strong>${params.fullName}</strong>,</p>
      <p>Merci de vous être inscrit sur l'écosystème <strong>YOU KNOW SOCIETY</strong> (${CORE_CONFIG.primaryDomain}).</p>
      <p>Voici votre code de vérification à usage unique :</p>
      <div style="background:#1e293b;padding:14px 20px;border-radius:8px;font-size:20px;font-weight:bold;letter-spacing:2px;text-align:center;color:#38bdf8;">
        ${params.verificationCode}
      </div>
      <p style="margin-top:18px;font-size:13px;color:#94a3b8;">
        Ce code expire dans 24 heures. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.
      </p>
    </div>
  `;

  return sendMailViaHostinger({ to: params.email, subject, text, html });
}
