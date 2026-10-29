"use client"

import type { PointerEvent } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

function handleCardPointerMove(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return

  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height

  card.style.setProperty("--project-rotate-x", `${(0.5 - y) * 8}deg`)
  card.style.setProperty("--project-rotate-y", `${(x - 0.5) * 8}deg`)
  card.style.setProperty("--project-shine-x", `${x * 100}%`)
  card.style.setProperty("--project-shine-y", `${y * 100}%`)
}

function resetCardPointer(card: HTMLDivElement) {
  card.style.setProperty("--project-rotate-x", "0deg")
  card.style.setProperty("--project-rotate-y", "0deg")
}

export function Projects({ content }: { content: PortfolioContent["projects"] }) {
  return (
    <section id="projects" data-aos="fade-up" className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100" className="mb-10 text-center sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">{content.heading}</h2>
            <p className="text-base text-muted-foreground sm:text-lg">{content.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((project, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 80}`}
                className="project-card-reveal"
              >
                <Card
                  className="project-card group h-full overflow-hidden"
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={(event) => resetCardPointer(event.currentTarget)}
                >
                  <div className="project-card-shine relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="project-card-image aspect-video w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <CardHeader className="project-card-content">
                    <CardTitle className="project-card-title text-xl">{project.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="project-card-content">
                    <p className="project-card-description mb-4 leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="project-card-tag rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="project-card-content mt-auto gap-3">
                    <Button className="project-card-button" variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button className="project-card-button" size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
