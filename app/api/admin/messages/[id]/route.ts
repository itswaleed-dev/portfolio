import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }
  const { id } = await context.params
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid message ID." }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
  if (!body || typeof body !== "object" || !("is_read" in body) || typeof body.is_read !== "boolean") {
    return NextResponse.json({ error: "A read status is required." }, { status: 400 })
  }

  const database = await getDatabase()
  const result = await database
    .collection("contact_messages")
    .updateOne({ _id: new ObjectId(id) }, { $set: { is_read: body.is_read } })
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }
  const { id } = await context.params
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid message ID." }, { status: 400 })
  }

  const database = await getDatabase()
  const result = await database.collection("contact_messages").deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
