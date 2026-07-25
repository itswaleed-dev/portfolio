"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack MERN e-commerce application with payment integration, user authentication .",
    tags: ["Next", "Tailwind CSS", "MongoDB", "React Hook"],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784363602/Screenshot_2026-07-18_133140_eashig.png",
    github: "https://github.com/waleedcoder786/myStore-ecommerce",
    demo: "https://mystore-wa.vercel.app/",
  },
  {
    title: "Weather Web App",
    description:
      "Using Next.js and WeatherApi ",
    tags: [" Next", "Api Integration","Tailwind CSS", "Vercel "],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784368366/Screenshot_2026-07-18_145153_gbplkm.png",
      github: "https://github.com/waleedcoder786/myweather",
    demo: "https://myweather-wa.vercel.app/",
  },
  {
    title: "Blink Web App like tiktok",
    description:
      "Using Next.js and vercel base deployment ",
    tags: [" Next", "vercel","Tailwind CSS", "mongoDB", "React Hook", "Api Integration"],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784980189/Screenshot_2026-07-25_164720_lqluxx.png",
      github: "https://github.com/waleedcoder786/tiktok-blink",
    demo: "https://blink-wa.vercel.app/",
  },
  
  {
    title: "Task Management System",
    description: "Collaborative project management tool with kanban boards, team collaboration, and progress tracking.",
    tags: ["React", "Tailwind CSS", "Express", "SQL"],
    image: "/project-management-dashboard.png",
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl  font-bold mb-4 text-balance">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Recent work showcasing my development expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-68 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
