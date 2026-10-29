import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"

const cookieName = "portfolio_admin_session"
const sessionDurationSeconds = 60 * 60 * 12

type AdminSession = {
  email: string
  expiresAt: number
}

function isAdminConfigured() {
  return Boolean(
    process.env.MONGODB_URI &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32,
  )
}

function signature(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.")
  return createHmac("sha256", secret).update(value).digest("base64url")
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function isAdminSetupComplete() {
  return isAdminConfigured()
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL
  const configuredPassword = process.env.ADMIN_PASSWORD
  if (!configuredEmail || !configuredPassword) return false
  return (
    safeEqual(email.trim().toLowerCase(), configuredEmail.trim().toLowerCase()) &&
    safeEqual(password, configuredPassword)
  )
}

export function setAdminSession(response: NextResponse, email: string) {
  const payload: AdminSession = {
    email,
    expiresAt: Date.now() + sessionDurationSeconds * 1000,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const token = `${encodedPayload}.${signature(encodedPayload)}`

  response.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionDurationSeconds,
  })
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
}

function readSession(token: string | undefined): AdminSession | null {
  if (!token) return null
  const [encodedPayload, providedSignature, extra] = token.split(".")
  if (!encodedPayload || !providedSignature || extra) return null

  const expectedSignature = signature(encodedPayload)
  if (!safeEqual(providedSignature, expectedSignature)) return null

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as AdminSession
    if (
      typeof payload.email !== "string" ||
      payload.email !== process.env.ADMIN_EMAIL ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Date.now()
    ) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  if (!isAdminConfigured()) return null
  return readSession(request.cookies.get(cookieName)?.value)
}

export async function getAdminSession() {
  if (!isAdminConfigured()) return null
  const cookieStore = await cookies()
  return readSession(cookieStore.get(cookieName)?.value)
}

export async function requireAdmin(request: NextRequest) {
  return getAdminSessionFromRequest(request)
}
