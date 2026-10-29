import { Github, Mail,Linkedin } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function Footer({
  content,
}: {
  content: PortfolioContent["footer"] & Pick<PortfolioContent["hero"], "email" | "github" | "linkedin">
}) {
  return (
    <footer data-aos="fade-up" className="bg-background/50 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href={content.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition duration-200 hover:-translate-y-0.5"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
                href={content.linkedin}

              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition duration-200 hover:-translate-y-0.5"
              aria-label="Fiverr"
            >
              <Linkedin className="h-5 w-5" />

            </a>
            <a
              href={`mailto:${content.email}`}
              className="p-2 hover:text-primary transition duration-200 hover:-translate-y-0.5"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <p className="px-2 text-center text-sm text-muted-foreground sm:text-base">
            {content.tagline}
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {content.copyrightName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
 