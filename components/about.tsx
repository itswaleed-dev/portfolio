import type { PortfolioContent } from "@/lib/portfolio-content"

export function About({ content }: { content: PortfolioContent["about"] }) {
  return (
    <section id="about" data-aos="fade-up" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div data-aos="fade-right" data-aos-delay="100">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">{content.heading}</h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
