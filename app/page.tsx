import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"
import { VisitTracker } from "@/components/visit-tracker"
import { loadPortfolioContent } from "@/lib/portfolio-data"

export const dynamic = "force-dynamic"

export default async function Home() {
  const content = await loadPortfolioContent()

  return (
    <main className="min-h-screen">
      <VisitTracker />
      <Navigation />
      <Hero content={content.hero} />
      <About content={content.about} />
      <Skills content={content.skills} />
      <Projects content={content.projects} />
      <Experience content={content.experience} />
      <Contact content={content.contact} />
      <WhatsAppButton />
      <Footer content={{ ...content.footer, email: content.hero.email, github: content.hero.github, linkedin: content.hero.linkedin }} />
    </main>
  )
}
