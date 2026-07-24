"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const mailtoLink = `mailto:waleedcoderz@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Contact from Portfolio",
    )}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`

    // Use a temporary anchor element to trigger mailto
    const link = document.createElement("a")
    link.href = mailtoLink
    link.click()

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance ">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">Have a project in mind? Let's work together</p>
          </div>

          <div className="grid  sm:grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:waleedcoderz@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      waleedcoderz@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+923296013379"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      0329 6013379
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">Pakistan</p>
                  </div>
                </CardContent>
              </Card>

            
          </div>
        </div>
      </div>
    </section>
  )
}
