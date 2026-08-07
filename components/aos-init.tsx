"use client"

import { useEffect } from "react"
import Aos from "aos"

export function AosInit() {
  useEffect(() => {
    Aos.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 120,
    })
  }, [])

  return null
}
