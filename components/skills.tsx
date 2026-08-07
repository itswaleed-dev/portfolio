"use client"

import Image from "next/image"

const skillCategories = [
  {
    title: "Frontend",
    color: "text-white",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  
  {
    title: "Backend",
    color: "text-white",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
  },
  {
    title: "Database",
    color: "text-white",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    title: "Version Control",
    color: "text-white",
    skills: [
      { name: "Github", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/3840px-Octicons-mark-github.svg.png" },
      { name: "Bitbucket", icon: "https://www.svgrepo.com/show/331312/bitbucket.svg" },
    ],
  },{
    title: "Project Management & Collaboration",
    color: "text-white",
    skills: [
      { name: "Jira", icon: "https://cdn.iconscout.com/icon/free/png-256/free-jira-icon-svg-download-png-1912014.png" },
      { name: "Agile Methodology", icon: "https://cdn-icons-png.flaticon.com/512/3967/3967015.png" },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" data-aos="fade-up" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div data-aos="fade-up" data-aos-delay="100" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={`${idx * 100}`}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className={`text-2xl font-bold mb-6 ${category.color} relative z-10`}>{category.title}</h3>
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-4 py-2 rounded-full bg-background/80 border border-border/50 text-sm font-medium hover:scale-110 hover:border-cyan-500/50 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <Image
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
