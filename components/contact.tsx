"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import type { PortfolioContent } from "@/lib/portfolio-content"

type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

const emptyForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
}

export function Contact({ content }: { content: PortfolioContent["contact"] }) {
  const [formData, setFormData] = useState<ContactForm>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState("")
  const [hasError, setHasError] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("")
    setHasError(false)

    if (formData.website) {
      setFormData(emptyForm)
      setStatus("Thanks for reaching out. Your message has been sent.")
      return
    }

    const mailtoLink = `mailto:${content.email}?subject=${encodeURIComponent(
      formData.subject || "Contact from Portfolio",
    )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`

    setIsSubmitting(true)
    let response: Response
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch {
      setIsSubmitting(false)
      setHasError(true)
      setStatus(`Your message could not be sent. Please try again or email ${content.email} directly.`)
      return
    }
    setIsSubmitting(false)

    if (response.status === 503) {
      window.location.href = mailtoLink
      return
    }

    if (!response.ok) {
      setHasError(true)
      setStatus(`Your message could not be sent. Please try again or email ${content.email} directly.`)
      return
    }

    const result: { notificationSent?: boolean } = await response.json()
    setFormData(emptyForm)
    setHasError(!result.notificationSent)
    setStatus(result.notificationSent
      ? "Thanks for reaching out. Your message has been sent."
      : "Your message was saved, but the email notification could not be delivered. Please email us directly if this is urgent.")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <section id="contact" data-aos="fade-up" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">{content.heading}</h2>
            <p className="text-muted-foreground text-lg">{content.description}</p>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary"><Mail className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href={`mailto:${content.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {content.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="150">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary"><Phone className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href={`tel:${content.phoneLink}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {content.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary"><MapPin className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">{content.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required maxLength={120} autoComplete="name" />
                  <Input name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} required maxLength={254} autoComplete="email" />
                </div>
                <Input name="subject" placeholder="Subject (optional)" value={formData.subject} onChange={handleChange} maxLength={200} />
                <Textarea name="message" placeholder="Your message" value={formData.message} onChange={handleChange} required maxLength={5000} rows={6} />
                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <Input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                  {status && <p role="status" aria-live="polite" className={hasError ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>{status}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
