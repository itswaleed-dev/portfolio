import { randomUUID } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { isEmailNotificationConfigured, sendAdminNotification } from "@/lib/email-notifications"
import { getDatabase } from "@/lib/mongodb"

const visitorCookieName = "portfolio_visitor"
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type PortfolioVisit = {
  visitor_id: string
  visit_date: string
  created_at: Date
  notification_status: "sent" | "failed" | "not_configured"
}

export async function POST(request: NextRequest) {
  const existingVisitorId = request.cookies.get(visitorCookieName)?.value
  const visitorId = existingVisitorId && uuidPattern.test(existingVisitorId)
    ? existingVisitorId
    : randomUUID()
  const createdAt = new Date()
  const visitDate = createdAt.toISOString().slice(0, 10)
  const database = await getDatabase()
  const visits = database.collection<PortfolioVisit>("portfolio_visits")

  await visits.createIndex({ visitor_id: 1, visit_date: 1 }, { unique: true })
  const result = await visits.updateOne(
    { visitor_id: visitorId, visit_date: visitDate },
    {
      $setOnInsert: {
        visitor_id: visitorId,
        visit_date: visitDate,
        created_at: createdAt,
        notification_status: "not_configured",
      },
    },
    { upsert: true },
  )

  let notificationSent = false
  if (result.upsertedCount > 0) {
    let notificationStatus: PortfolioVisit["notification_status"] = "not_configured"
    if (isEmailNotificationConfigured()) {
      try {
        await sendAdminNotification({
          subject: "New portfolio visit",
          text: `Someone visited your portfolio on ${visitDate} at ${createdAt.toISOString()} (UTC).`,
        })
        notificationStatus = "sent"
        notificationSent = true
      } catch (error) {
        notificationStatus = "failed"
        console.error("Portfolio visit email notification failed.", error)
      }
    }

    await visits.updateOne(
      { visitor_id: visitorId, visit_date: visitDate },
      { $set: { notification_status: notificationStatus } },
    )
  }

  const response = NextResponse.json({
    success: true,
    notificationSent,
  })
  if (!existingVisitorId || !uuidPattern.test(existingVisitorId)) {
    response.cookies.set(visitorCookieName, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  return response
}
