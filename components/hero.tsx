"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Eye, FileDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import type { PortfolioContent } from "@/lib/portfolio-content"
import { TypewriterText } from "@/components/typewriter-text"

export function Hero({ content }: { content: PortfolioContent["hero"] }) {
  return (
    <section id="home" data-aos="fade-up" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:py-24 lg:px-8">
      <div className="container relative z-10 mx-auto">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Content */}
          <div data-aos="fade-right" data-aos-delay="100" className="animate-soft-fade-up space-y-6 text-center sm:space-y-8 lg:text-left">
            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              <span className="text-primary">{content.name}</span>
            </h1>

            <h2 className="text-balance text-xl font-semibold sm:text-3xl lg:text-4xl">
              <TypewriterText />
            </h2>

            <p className="text-pretty text-base text-muted-foreground sm:text-xl">
              {content.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Button size="lg" asChild className="w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 min-[420px]:w-auto">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 min-[420px]:w-auto">
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 min-[420px]:w-auto">
                <a href="/api/cv" target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-4 w-4" />
                  View CV
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={content.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={content.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Fiverr"
              >
              <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${content.email}`}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div data-aos="fade-left" data-aos-delay="200" className="flex justify-center lg:justify-end">
            <div data-aos="zoom-in" data-aos-delay="250" className="animate-soft-float relative w-full max-w-[220px] transition-transform duration-700 ease-out hover:-translate-y-1 hover:scale-[1.01] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl aspect-square">
                <Image
                  src={content.image || "/placeholder-user.jpg"}
                  alt={content.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </a>
    </section>
  )
}
