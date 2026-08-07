import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "aos/dist/aos.css"
import "./globals.css"
import { AosInit } from "@/components/aos-init"
import { AnimatedBackground } from "@/components/animated-background"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Waleed Portfolio",
  description: "Full-Stack Developer Portfolio",
  generator: "Waleed Ahmad",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784895027/LOGO_WA_yhzafh.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784895027/LOGO_WA_yhzafh.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784895027/LOGO_WA_yhzafh.png",
        type: "image/svg+xml",
      },
    ],
    apple:"https://res.cloudinary.com/do3bdamxv/image/upload/v1784895027/LOGO_WA_yhzafh.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className="relative min-h-screen font-sans antialiased">
        <AnimatedBackground />
        <AosInit />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
