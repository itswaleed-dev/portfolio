import { Binary } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { getDatabase } from "@/lib/mongodb"

const maxCvSize = 10 * 1024 * 1024
const multipartOverhead = 64 * 1024

type CvDocument = {
  _id: string
  contentType: "application/pdf"
  data: Binary
  updated_at: Date
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const contentLength = Number(request.headers.get("content-length"))
  if (Number.isFinite(contentLength) && contentLength > maxCvSize + multipartOverhead) {
    return NextResponse.json({ error: "CV must be 10 MB or smaller." }, { status: 413 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Could not read the uploaded file." }, { status: 400 })
  }

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a PDF file to upload." }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "The selected PDF is empty." }, { status: 400 })
  }
  if (file.size > maxCvSize) {
    return NextResponse.json({ error: "CV must be 10 MB or smaller." }, { status: 413 })
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "The uploaded file must be a PDF." }, { status: 400 })
  }

  const data = Buffer.from(await file.arrayBuffer())
  if (data.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return NextResponse.json({ error: "The selected file is not a valid PDF." }, { status: 400 })
  }

  const database = await getDatabase()
  await database.collection<CvDocument>("portfolio_cv").updateOne(
    { _id: "current" },
    {
      $set: {
        contentType: "application/pdf",
        data: new Binary(data),
        updated_at: new Date(),
      },
    },
    { upsert: true },
  )

  return NextResponse.json({ success: true })
}
