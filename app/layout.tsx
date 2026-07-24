import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Waleed Portfolio",
  description: "Full-Stack Developer Portfolio",
  generator: "Waleed Ahmad",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784364353/wa_vfl6x5.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784364353/wa_vfl6x5.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "https://res.cloudinary.com/do3bdamxv/image/upload/v1784364353/wa_vfl6x5.png",
        type: "image/svg+xml",
      },
    ],
    apple:"https://res.cloudinary.com/do3bdamxv/image/upload/v1784364353/wa_vfl6x5.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
