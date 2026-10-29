import { NextRequest, NextResponse } from "next/server"
import type { Binary } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

type CvDocument = {
  _id: string
  contentType: string
  data: Binary
}

export async function GET(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.redirect(new URL("/cv.pdf", request.url))
  }

  const database = await getDatabase()
  const cv = await database
    .collection<CvDocument>("portfolio_cv")
    .findOne({ _id: "current" })

  if (!cv) {
    return NextResponse.redirect(new URL("/cv.pdf", request.url))
  }

  const disposition = request.nextUrl.searchParams.has("download") ? "attachment" : "inline"
  const storedData = cv.data.value()
  const responseBody = new ArrayBuffer(storedData.byteLength)
  new Uint8Array(responseBody).set(storedData)
  return new NextResponse(responseBody, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `${disposition}; filename="Waleed-Ahmad-CV.pdf"`,
      "Content-Type": "application/pdf",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
