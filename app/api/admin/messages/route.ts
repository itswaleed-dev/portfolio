import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"

type ContactMessageDocument = {
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: Date
  notification_status?: "sent" | "failed" | "not_configured"
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const database = await getDatabase()
  const messages = await database
    .collection<ContactMessageDocument>("contact_messages")
    .find()
    .sort({ created_at: -1 })
    .limit(500)
    .toArray()

  return NextResponse.json({
    messages: messages.map((message) => ({
      id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      is_read: message.is_read,
      created_at: message.created_at.toISOString(),
      notification_status: message.notification_status ?? "not_configured",
    })),
  })
}
