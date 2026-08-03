"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github,  Linkedin ,Mail } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 200, 255, 0.3)"
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="home" className="relative px-10 min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-8 animate-fade-up text-center lg:text-left">
            

            <h1 className="text-5xl mt-20 sm:text-6xl lg:text-7xl font-bold text-balance">
              <span className="text-primary">Waleed Ahmad</span>
              <br />
              Developer
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
             Full-Stack-Developer with 1+ years of experience building scalable web applications using React.js, Next.js, Node.js, MongoDB, and PostgreSQL. Skilled in developing responsive user interfaces, RESTful APIs, and end-to-end solutions. Experienced with Jira for agile project management and mentoring frontend interns in React.js and modern frontend development.

            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
          <div className="flex justify-center lg:justify-end animate-fade-up">
            <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl aspect-square">
                <Image
                  src="https://res.cloudinary.com/do3bdamxv/image/upload/v1784204196/ChatGPT_Image_Jul_16_2026_05_14_20_PM_wgjuaw.png"
                  alt="Waleed Ahmad"
                  width={400}
                  height={400}
                  className="w-full h-[125%]  object-fill "
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
