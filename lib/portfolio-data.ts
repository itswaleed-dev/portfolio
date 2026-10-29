import {
  defaultPortfolioContent,
  portfolioContentSchema,
  type PortfolioContent,
} from "@/lib/portfolio-content"
import { MongoServerSelectionError } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

type PortfolioDocument = {
  _id: string
  content: unknown
  updated_at: Date
}

export async function loadPortfolioContent(): Promise<PortfolioContent> {
  if (!process.env.MONGODB_URI) {
    return defaultPortfolioContent
  }

  let saved: PortfolioDocument | null

  try {
    const database = await getDatabase()

    saved = await database
      .collection<PortfolioDocument>("portfolio_content")
      .findOne({ _id: "main" })
  } catch (error) {
    if (!(error instanceof MongoServerSelectionError)) {
      throw error
    }

    console.error(
      "MongoDB is unavailable; serving the built-in portfolio content.",
      error
    )

    return defaultPortfolioContent
  }

  if (!saved) {
    return defaultPortfolioContent
  }

  const result = portfolioContentSchema.safeParse(saved.content)

  if (!result.success) {
    console.error(
      "Portfolio content validation failed:",
      JSON.stringify(result.error.issues, null, 2)
    )

    console.error(
      "Saved portfolio content:",
      JSON.stringify(saved.content, null, 2)
    )

    throw new Error(
      "Saved portfolio content is invalid. Check the terminal for validation details."
    )
  }

  return result.data
}