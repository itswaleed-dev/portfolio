import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"

type PortfolioVisit = {
  _id: ObjectId
  visit_date: string
  created_at: Date
  notification_status: "sent" | "failed" | "not_configured"
}

const pageSize = 10

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const requestedPage = Number(request.nextUrl.searchParams.get("page") || "1")
  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    return NextResponse.json({ error: "Page must be a positive integer." }, { status: 400 })
  }
  const search = request.nextUrl.searchParams.get("search")?.trim() ?? ""
  if (search.length > 10) {
    return NextResponse.json({ error: "Search dates using YYYY-MM-DD." }, { status: 400 })
  }

  const database = await getDatabase()
  const visits = database.collection<PortfolioVisit>("portfolio_visits")
  const today = new Date().toISOString().slice(0, 10)
  const filter = search ? { visit_date: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") } } : {}
  const [total, todayCount, matchingCount, recentVisits] = await Promise.all([
    visits.countDocuments(),
    visits.countDocuments({ visit_date: today }),
    visits.countDocuments(filter),
    visits.find(filter, { projection: { _id: 1, visit_date: 1, created_at: 1, notification_status: 1 } })
      .sort({ created_at: -1 })
      .skip((requestedPage - 1) * pageSize)
      .limit(pageSize)
      .toArray(),
  ])

  return NextResponse.json({
    total,
    today: todayCount,
    matchingCount,
    page: requestedPage,
    pageSize,
    visits: recentVisits.map((visit) => ({
      id: visit._id.toHexString(),
      visit_date: visit.visit_date,
      created_at: visit.created_at.toISOString(),
      notification_status: visit.notification_status,
    })),
  })
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const id = request.nextUrl.searchParams.get("id")
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "A valid visit ID is required." }, { status: 400 })
  }

  const database = await getDatabase()
  const result = await database
    .collection<PortfolioVisit>("portfolio_visits")
    .deleteOne({ _id: new ObjectId(id) })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Visit was not found." }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
