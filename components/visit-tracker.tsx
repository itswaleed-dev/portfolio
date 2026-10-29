"use client"

import { useEffect } from "react"

export function VisitTracker() {
  useEffect(() => {
    fetch("/api/visits", { method: "POST", keepalive: true })
      .then((response) => {
        if (!response.ok) throw new Error("Portfolio visit could not be recorded.")
      })
      .catch((error: unknown) => {
        console.error("Portfolio visit tracking failed.", error)
      })
  }, [])

  return null
}
