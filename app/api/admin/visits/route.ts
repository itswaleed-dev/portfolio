import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"

type PortfolioVisit = {
  visit_date: string
  created_at: Date
  notification_status: "sent" | "failed" | "not_configured"
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const database = await getDatabase()
  const visits = database.collection<PortfolioVisit>("portfolio_visits")
  const today = new Date().toISOString().slice(0, 10)
  const [total, todayCount, recentVisits] = await Promise.all([
    visits.countDocuments(),
    visits.countDocuments({ visit_date: today }),
    visits.find({}, { projection: { _id: 0, visit_date: 1, created_at: 1, notification_status: 1 } })
      .sort({ created_at: -1 })
      .limit(100)
      .toArray(),
  ])

  return NextResponse.json({
    total,
    today: todayCount,
    visits: recentVisits.map((visit) => ({
      visit_date: visit.visit_date,
      created_at: visit.created_at.toISOString(),
      notification_status: visit.notification_status,
    })),
  })
}
