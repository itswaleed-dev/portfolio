"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="home" data-aos="fade-up" className="relative px-10 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div data-aos="fade-right" data-aos-delay="100" className="space-y-8 text-center lg:text-left animate-soft-fade-up">
            

            <h1 className="text-5xl mt-20 sm:text-6xl lg:text-7xl font-bold text-balance">
              <span className="text-primary">Waleed Ahmad</span>
              <br />
              Developer
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
             Full-Stack-Developer with 1+ years of experience building scalable web applications using React.js, Next.js, Node.js, MongoDB, and PostgreSQL. Skilled in developing responsive user interfaces, RESTful APIs, and end-to-end solutions. Experienced with Jira for agile project management and mentoring frontend interns in React.js and modern frontend development.

            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
                <a href="#projects">View Projects</a>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://github.com/itswaleed-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/waleed-ahmad-192598405/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Fiverr"
              >
              <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:waleedcoderz@gmail.com"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div data-aos="fade-left" data-aos-delay="200" className="flex justify-center lg:justify-end">
            <div data-aos="zoom-in" data-aos-delay="250" className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] transition-transform duration-700 ease-out hover:-translate-y-1 hover:scale-[1.01] animate-soft-float">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl aspect-square">
                <Image
                  src="https://res.cloudinary.com/do3bdamxv/image/upload/v1784204196/ChatGPT_Image_Jul_16_2026_05_14_20_PM_wgjuaw.png"
                  alt="Waleed Ahmad"
                  width={400}
                  height={400}
                  className="w-full h-[125%] object-fill"
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
