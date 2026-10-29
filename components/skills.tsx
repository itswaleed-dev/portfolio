"use client"

import Image from "next/image"
import type { PortfolioContent } from "@/lib/portfolio-content"

const gitIcon = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"

function displaySkillName(name: string) {
  if (name === "HTML") return "HTML5"
  if (name === "CSS") return "CSS3"
  if (name.toLowerCase() === "github") return "GitHub"
  return name
}

export function Skills({ content }: { content: PortfolioContent["skills"] }) {
  return (
    <section id="skills" data-aos="fade-up" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div data-aos="fade-up" data-aos-delay="100" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.heading}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {content.categories.map((category, idx) => {
            const skills =
              category.title.toLowerCase().includes("version control") &&
              !category.skills.some((skill) => skill.name.toLowerCase() === "git")
                ? [...category.skills, { name: "Git", icon: gitIcon }]
                : category.skills

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${idx * 100}`}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className={`text-2xl font-bold mb-6 ${category.color} relative z-10`}>{category.title}</h3>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {skills.map((skill, skillIdx) => {
                    const name = displaySkillName(skill.name)
                    return (
                      <span
                        key={skillIdx}
                        title={name}
                        aria-label={name}
                        className={`skill-float skill-float-${skillIdx % 6}`}
                      >
                        <span className="skill-chip flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium">
                          <Image
                            src={skill.icon || "/placeholder.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5"
                          />
                          {name}
                        </span>
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
