import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"
import {
  defaultPortfolioContent,
  portfolioContentSchema,
} from "@/lib/portfolio-content"

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const database = await getDatabase()
  const contentCollection = database.collection<{ _id: string; content: unknown }>("portfolio_content")
  const saved = await contentCollection.findOne({ _id: "main" })
  if (!saved) return NextResponse.json({ content: defaultPortfolioContent })

  const parsed = portfolioContentSchema.safeParse(saved.content)
  if (!parsed.success) {
    return NextResponse.json({ error: "Saved portfolio content is invalid." }, { status: 500 })
  }
  return NextResponse.json({ content: parsed.data })
}

export async function PUT(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }
  const parsed = portfolioContentSchema.safeParse(
    body && typeof body === "object" && "content" in body ? body.content : undefined,
  )
  if (!parsed.success) {
    return NextResponse.json({ error: "Portfolio content is invalid." }, { status: 400 })
  }

  const database = await getDatabase()
  await database.collection<{ _id: string; content: unknown }>("portfolio_content").updateOne(
    { _id: "main" },
    { $set: { content: parsed.data, updated_at: new Date() } },
    { upsert: true },
  )
  return NextResponse.json({ success: true })
}
