import { Github, Mail,Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/itswaleed-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
                href="https://www.linkedin.com/in/waleed-ahmad-192598405/"

              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors"
              aria-label="Fiverr"
            >
              <Linkedin className="h-5 w-5" />

            </a>
            <a
              href="mailto:waleedcoderz@gmail.com"
              className="p-2 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <p className="text-muted-foreground text-center">
            Beginner Full Stack Developer | Building Projects & Learning Every Day
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Waleed Ahmad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
