import nodemailer from "nodemailer"

const notificationEmail = "waleedcoderz@gmail.com"

function getSmtpConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT)
  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !password) {
    return null
  }

  return {
    host,
    port,
    user,
    password,
    from: process.env.SMTP_FROM || user,
  }
}

export function isEmailNotificationConfigured() {
  return getSmtpConfig() !== null
}

export async function sendAdminNotification({
  subject,
  text,
  replyTo,
}: {
  subject: string
  text: string
  replyTo?: string
}) {
  const config = getSmtpConfig()
  if (!config) throw new Error("SMTP email notification settings are not configured.")

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.password,
    },
  })

  await transporter.sendMail({
    from: config.from,
    to: notificationEmail,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  })
}
