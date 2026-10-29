import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { isEmailNotificationConfigured, sendAdminNotification } from "@/lib/email-notifications"
import { getDatabase } from "@/lib/mongodb"

const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(200),
  message: z.string().trim().min(1).max(5000),
})

export async function POST(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "Contact storage is not configured." }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid contact message." }, { status: 400 })
  }

  if ("website" in body && typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true })
  }

  const parsed = contactMessageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the contact form fields." }, { status: 400 })
  }

  const database = await getDatabase()
  const messages = database.collection("contact_messages")
  const result = await messages.insertOne({
    ...parsed.data,
    is_read: false,
    created_at: new Date(),
    notification_status: "not_configured",
  })

  let notificationSent = false
  let notificationStatus: "sent" | "failed" | "not_configured" = "not_configured"
  if (isEmailNotificationConfigured()) {
    try {
      await sendAdminNotification({
        subject: "New portfolio contact message",
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Subject: ${parsed.data.subject || "(not provided)"}`,
          "",
          "Message:",
          parsed.data.message,
        ].join("\n"),
        replyTo: parsed.data.email,
      })
      notificationSent = true
      notificationStatus = "sent"
    } catch (error) {
      notificationStatus = "failed"
      console.error("Contact message email notification failed.", error)
    }
  }

  await messages.updateOne(
    { _id: result.insertedId },
    { $set: { notification_status: notificationStatus } },
  )
  return NextResponse.json({ success: true, notificationSent }, { status: 201 })
}
