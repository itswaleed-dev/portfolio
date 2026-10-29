import { z } from "zod"

const requiredTextSchema = z.string().trim().min(1, "Required")
const requiredListSchema = z.array(requiredTextSchema).min(1, "Add at least one item")

const skillSchema = z.object({
  name: z.string(),
  icon: z.string(),
})

const skillCategorySchema = z.object({
  title: z.string(),
  color: z.string(),
  skills: z.array(skillSchema),
})

const experienceSchema = z.object({
  title: requiredTextSchema,
  company: requiredTextSchema,
  period: requiredTextSchema,
  description: requiredTextSchema,
  achievements: requiredListSchema,
})

const projectSchema = z.object({
  title: requiredTextSchema,
  description: requiredTextSchema,
  tags: requiredListSchema,
  image: requiredTextSchema,
  github: requiredTextSchema,
  demo: requiredTextSchema,
})

export const portfolioContentSchema = z.object({
  hero: z.object({
    name: z.string(),
    role: z.string(),
    description: z.string(),
    image: z.string(),
    github: z.string(),
    linkedin: z.string(),
    email: z.string(),
  }),
  about: z.object({
    heading: z.string(),
    paragraphs: z.array(z.string()),
  }),
  skills: z.object({
    heading: z.string(),
    description: z.string(),
    categories: z.array(skillCategorySchema),
  }),
  experience: z.object({
    heading: z.string(),
    description: z.string(),
    items: z.array(experienceSchema),
  }),
  projects: z.object({
    heading: z.string(),
    description: z.string(),
    items: z.array(projectSchema),
  }),
  contact: z.object({
    heading: z.string(),
    description: z.string(),
    email: z.string(),
    phone: z.string(),
    phoneLink: z.string(),
    location: z.string(),
  }),
  footer: z.object({
    tagline: z.string(),
    copyrightName: z.string(),
  }),
})

export type PortfolioContent = z.infer<typeof portfolioContentSchema>

export const defaultPortfolioContent: PortfolioContent = {
  hero: {
    name: "Waleed Ahmad",
    role: "Developer",
    description:
      "Full-Stack-Developer with 1+ years of experience building scalable web applications using React.js, Next.js, Node.js, MongoDB, and PostgreSQL. Skilled in developing responsive user interfaces, RESTful APIs, and end-to-end solutions. Experienced with Jira for agile project management and mentoring frontend interns in React.js and modern frontend development.",
    image:
      "https://res.cloudinary.com/do3bdamxv/image/upload/v1784204196/ChatGPT_Image_Jul_16_2026_05_14_20_PM_wgjuaw.png",
    github: "https://github.com/itswaleed-dev",
    linkedin: "https://www.linkedin.com/in/waleed-ahmad-192598405/",
    email: "waleedcoderz@gmail.com",
  },
  about: {
    heading: "About Me",
    paragraphs: [
      "Passionate Full-Stack Developer with a strong academic foundation, having completed Intermediate in Computer Science (ICS) and currently pursuing a Bachelor of Science in Computer Science (BSCS). My educational journey has strengthened my understanding of programming, software engineering, algorithms, databases, and modern web development principles.",
      "I specialize in building modern, responsive, and scalable web applications using React.js, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL. I have hands-on experience developing intuitive user interfaces, secure RESTful APIs, and efficient database solutions while writing clean, maintainable, and reusable code that follows industry best practices.",
      "I am committed to continuous learning and professional growth, constantly exploring new technologies and improving my technical skills. With strong analytical thinking and problem-solving abilities, I enjoy transforming ideas into reliable, high-performance digital solutions that deliver exceptional user experiences and meet real-world business needs.",
    ],
  },
  skills: {
    heading: "Skills & Technologies",
    description: "A comprehensive toolkit for building modern web applications",
    categories: [
      {
        title: "Frontend",
        color: "text-white",
        skills: [
          { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
          { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
          { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
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
          { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
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
      },
      {
        title: "Project Management & Collaboration",
        color: "text-white",
        skills: [
          { name: "Jira", icon: "https://cdn.iconscout.com/icon/free/png-256/free-jira-icon-svg-download-png-1912014.png" },
          { name: "Agile Methodology", icon: "https://cdn-icons-png.flaticon.com/512/3967/3967015.png" },
        ],
      },
    ],
  },
  experience: {
    heading: "Work Experience",
    description: "Professional journey in software development",
    items: [
      {
        title: "Full-Stack Developer",
        company: "DevInsta Company",
        period: "| 2025 – Present",
        description:
          "Developed and maintained a full-stack medical web application using React.js, Next.js, Node.js, Express.js, and MongoDB. Managed both frontend and backend development, built responsive user interfaces, developed secure RESTful APIs, integrated database functionality, and implemented new features while ensuring application performance, scalability, and maintainability.",
        achievements: [
          "Developed responsive and user-friendly interfaces using React.js, Next.js, and Tailwind CSS, improving the overall user experience.",
          "Designed and implemented secure RESTful APIs with Node.js and Express.js for seamless frontend-backend communication.",
          "Integrated MongoDB for efficient data management and optimized database queries to improve application performance.",
        ],
      },
      {
        title: "Programming Instructor",
        company: "Live Coder | Lahore, Pakistan",
        period: "| 2025 – Present",
        description:
          "Mentored aspiring developers in modern web development by delivering practical training in frontend and backend technologies. Conducted hands-on coding sessions, provided code reviews, guided students through real-world projects, and promoted clean coding practices while helping them build scalable web applications using the MERN stack.",
        achievements: [
          "Mentored and aspiring students in HTML5, CSS3, JavaScript (ES6+), React.js, Node.js, Express.js, and MongoDB.",
          "Conducted hands-on coding sessions, code reviews, and one-on-one technical mentoring to strengthen students' problem-solving skills.",
          "Designed structured learning materials and practical assignments to improve students' understanding of frontend and backend development.",
        ],
      },
    ],
  },
  projects: {
    heading: "Featured Projects",
    description: "Recent work showcasing my development expertise",
    items: [
      {
        title: "E-Commerce Platform",
        description: "A full-stack MERN e-commerce application with payment integration, user authentication .",
        tags: ["Next", "Tailwind CSS", "MongoDB", "React Hook"],
        image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784363602/Screenshot_2026-07-18_133140_eashig.png",
        github: "https://github.com/itswaleed-dev/myStore-ecommerce",
        demo: "https://mystore-wa.vercel.app/",
      },
      {
        title: "Paper making Web App",
        description: "Using Next.js and MongoDB for backend and vercel base deployment ",
        tags: [" Next", "REST API ", "Tailwind CSS", "Vercel"],
        image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1785742461/Screenshot_2026-08-03_123120_f25zej.png",
        github: "https://github.com/itswaleed-dev/paperSite",
        demo: "https://paper-site-neon.vercel.app/",
      },
      {
        title: "Weather Web App",
        description: "Using Next.js and WeatherApi ",
        tags: [" Next", "Api Integration", "Tailwind CSS", "Vercel "],
        image: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784368366/Screenshot_2026-07-18_145153_gbplkm.png",
        github: "https://github.com/itswaleed-dev/myweather",
        demo: "https://myweather-wa.vercel.app/",
      },
      {
        title: "Blink Web App like tiktok",
        description: "Using Next.js and vercel base deployment ",
        tags: [" Next", "vercel", "Tailwind CSS", "mongoDB", "React Hook", "Api Integration"],
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
    ],
  },
  contact: {
    heading: "Get In Touch",
    description: "Have a project in mind? Let's work together",
    email: "waleedcoderz@gmail.com",
    phone: "0329 6013379",
    phoneLink: "+923296013379",
    location: "Pakistan",
  },
  footer: {
    tagline: "Full-Stack Developer | Building Projects & Learning Every Day",
    copyrightName: "Waleed Ahmad",
  },
}

export const arrayItemDefaults: Record<string, unknown> = {
  "about.paragraphs": "",
  "skills.categories": { title: "New category", color: "text-white", skills: [] },
  "skills.categories.skills": { name: "New skill", icon: "" },
  "experience.items": {
    title: "New role",
    company: "",
    period: "",
    description: "",
    achievements: [],
  },
  "experience.items.achievements": "",
  "projects.items": {
    title: "New project",
    description: "",
    tags: [],
    image: "",
    github: "",
    demo: "",
  },
  "projects.items.tags": "",
}
