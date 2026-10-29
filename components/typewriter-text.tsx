"use client"

import { useEffect, useState } from "react"

const phrases = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Freelancer",
  "React.js Developer",
]

export function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState(phrases[0])
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIndex]

    if (!isDeleting && text === phrase) {
      const timeout = window.setTimeout(() => setIsDeleting(true), 1400)
      return () => window.clearTimeout(timeout)
    }

    if (isDeleting && text === "") {
      setIsDeleting(false)
      setPhraseIndex((current) => (current + 1) % phrases.length)
      return
    }

    const timeout = window.setTimeout(() => {
      setText(phrase.slice(0, text.length + (isDeleting ? -1 : 1)))
    }, isDeleting ? 45 : 85)

    return () => window.clearTimeout(timeout)
  }, [isDeleting, phraseIndex, text])

  return (
    <span aria-label={phrases[phraseIndex]}>
      <span aria-hidden="true">
        {text}
        <span className="ml-1 inline-block animate-pulse text-primary">|</span>
      </span>
    </span>
  )
}
