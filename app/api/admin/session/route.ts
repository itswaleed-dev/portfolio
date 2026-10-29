import { NextRequest, NextResponse } from "next/server"
import {
  clearAdminSession,
  getAdminSessionFromRequest,
  isAdminSetupComplete,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  if (!isAdminSetupComplete()) {
    return NextResponse.json({ error: "MongoDB and admin credentials are not configured." }, { status: 503 })
  }

  const session = await getAdminSessionFromRequest(request)
  if (!session) return NextResponse.json({ user: null })
  return NextResponse.json({ user: { email: session.email } })
}

export async function POST(request: NextRequest) {
  if (!isAdminSetupComplete()) {
    return NextResponse.json({ error: "MongoDB and admin credentials are not configured." }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
  if (
    !body ||
    typeof body !== "object" ||
    !("email" in body) ||
    !("password" in body) ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  if (!verifyAdminCredentials(body.email, body.password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 })
  }

  const response = NextResponse.json({ user: { email: process.env.ADMIN_EMAIL } })
  setAdminSession(response, process.env.ADMIN_EMAIL!)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  clearAdminSession(response)
  return response
}
