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
    <section id="skills" data-aos="fade-up" className="px-4 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <div data-aos="fade-up" data-aos-delay="100" className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl">{content.heading}</h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group relative rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 sm:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className={`relative z-10 mb-4 text-xl font-bold sm:mb-6 sm:text-2xl ${category.color}`}>{category.title}</h3>
                <div className="relative z-10 flex flex-wrap gap-2 sm:gap-3">
                  {skills.map((skill, skillIdx) => {
                    const name = displaySkillName(skill.name)
                    return (
                      <span
                        key={skillIdx}
                        title={name}
                        aria-label={name}
                        className={`skill-float skill-float-${skillIdx % 6}`}
                      >
                        <span className="skill-chip flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-sm font-medium sm:px-4 sm:py-2">
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
