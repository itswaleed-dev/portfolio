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
    github: "https://github.com/itswaleed-dev/myStore-ecommerce",
    demo: "https://mystore-wa.vercel.app/",
  },{
    title: "Paper making Web App",
    description:
      "Using Next.js and MongoDB for backend and vercel base deployment ",
    tags: [" Next", "REST API ","Tailwind CSS", "Vercel"],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1785742461/Screenshot_2026-08-03_123120_f25zej.png",
      github: "https://github.com/itswaleed-dev/paperSite",
    demo: "https://paper-site-neon.vercel.app/",
  },
  {
    title: "Weather Web App",
    description:
      "Using Next.js and WeatherApi ",
    tags: [" Next", "Api Integration","Tailwind CSS", "Vercel "],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784368366/Screenshot_2026-07-18_145153_gbplkm.png",
      github: "https://github.com/itswaleed-dev/myweather",
    demo: "https://myweather-wa.vercel.app/",
  },

  {
    title: "Blink Web App like tiktok",
    description:
      "Using Next.js and vercel base deployment ",
    tags: [" Next", "vercel","Tailwind CSS", "mongoDB", "React Hook", "Api Integration"],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784980189/Screenshot_2026-07-25_164720_lqluxx.png",
      github: "https://github.com/itswaleed-dev/tiktok-blink",
    demo: "https://blink-wa.vercel.app/",
  },
  
  {
    title: "Inventory Management System",
    description: "Inventory management system with user authentication, CRUD operations, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "MongoDb", "Hooks"],
    image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1785740853/Screenshot_2026-08-03_120409_wxgthv.png",
    github: "https://github.com/itswaleed-dev/shaniShop",
    demo: "https://shani-shop.vercel.app/dashboard",
  },
]

export function Projects() {
  return (
    <section id="projects" data-aos="fade-up" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl  font-bold mb-4 text-balance">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Recent work showcasing my development expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 80}`}
                className="group overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 animate-soft-fade-up"
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
