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

const logoUrl =
  "https://res.cloudinary.com/do3bdamxv/image/upload/v1793268641/Neon_Aqua_WA_Monogram-removebg-preview_cnip5s.png"

export const metadata: Metadata = {
  title: "Waleed Ahmad | Portfolio",
  description:
    "Waleed Ahmad — Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL.",
  generator: "Waleed Ahmad",

  icons: {
    icon: [
      {
        url: logoUrl,
        type: "image/png",
        sizes: "320x320",
      },
      {
        url: logoUrl,
        type: "image/png",
        sizes: "1920x1920",
      },
    ],
    shortcut: [{ url: logoUrl, type: "image/png" }],
    apple: [{ url: logoUrl, type: "image/png" }],
  },

  openGraph: {
    title: "Waleed Ahmad | Portfolio",
    description: "Full Stack Developer Portfolio",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="relative min-h-screen font-sans antialiased"
      >
        <AnimatedBackground />
        <AosInit />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
