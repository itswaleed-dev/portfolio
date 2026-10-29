"use client"

import { useState } from "react"
import { Briefcase, Calendar } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

export function Experience({ content }: { content: PortfolioContent["experience"] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" data-aos="fade-up" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">{content.heading}</h2>
            <p className="text-muted-foreground text-lg">{content.description}</p>
          </div>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

            <div className="space-y-16">
              {content.items.map((exp, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="relative pl-14 group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[7px] top-0 w-[25px] h-[25px] rounded-full border-4 border-background transition-all duration-300 ${
                      hoveredIndex === index
                        ? "bg-primary scale-[1.6] shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                        : "bg-primary/70 scale-100 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                    }`}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}
                  </div>

                  {/* Connecting line from dot to card */}
                  <div
                    className={`absolute left-[16px] top-[9px] w-0 h-[2px] transition-all duration-300 ${
                      hoveredIndex === index ? "bg-primary" : "bg-primary/30"
                    }`}
                  />

                  {/* Experience card */}
                  <div
                    className={`bg-card border rounded-xl p-6 md:p-8 transition-all duration-300 ${
                      hoveredIndex === index
                        ? "border-primary shadow-[0_0_30px_rgba(6,182,212,0.25)] translate-x-2"
                        : "border-border shadow-md"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Title and meta info */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 text-balance">{exp.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-primary">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-semibold">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                      {/* Achievements */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-semibold text-primary">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5 text-lg leading-none">•</span>
                              <span className="leading-relaxed flex-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
