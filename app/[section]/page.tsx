import { notFound } from "next/navigation"
import { PortfolioPage } from "@/components/portfolio-page"

const sectionPaths = ["about", "skills", "projects", "experience", "contact"]

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params

  if (!sectionPaths.includes(section)) {
    notFound()
  }

  return <PortfolioPage />
}
