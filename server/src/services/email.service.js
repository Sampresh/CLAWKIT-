import { env } from '../config/env.js';
import { mailer } from '../config/mailer.js';
import { escapeHtml } from '../lib/escapeHtml.js';
import { logger } from '../utils/logger.js';

async function send({ to, subject, html, text, replyTo }) {
  if (!mailer) {
    logger.info(`[email:dev] to=${to} subject="${subject}"\n${text}`);
    return;
  }
  await mailer.sendMail({
    from: `"${env.smtp.fromName}" <${env.smtp.fromEmail}>`,
    to,
    replyTo,
    subject,
    html,
    text,
  });
}

export function sendPasswordResetEmail(to, token) {
  const url = `${env.clientUrl}/reset-password?token=${encodeURIComponent(token)}`;
  return send({
    to,
    subject: 'Reset your CLAWKIT admin password',
    text: `Use this link to reset your password (valid for 30 minutes):\n${url}\n\nIf you didn't request this, ignore this email.`,
    html: `<p>Use this link to reset your password (valid for 30 minutes):</p>
<p><a href="${escapeHtml(url)}">Reset password</a></p>
<p>If you didn't request this, ignore this email.</p>`,
  });
}

export function sendContactNotification(msg) {
  if (!env.adminEmail) return Promise.resolve();
  const rows = [
    ['Name', msg.name],
    ['Email', msg.email],
    ['Topic', msg.topic],
    ['Dog', msg.dogName || '—'],
  ];
  return send({
    to: env.adminEmail,
    replyTo: msg.email,
    subject: `[CLAWKIT] New ${msg.topic} message from ${msg.name}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${msg.message}`,
    html: `${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join('')}
<p style="white-space:pre-wrap">${escapeHtml(msg.message)}</p>`,
  });
}
