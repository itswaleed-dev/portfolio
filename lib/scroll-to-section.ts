import type { MouseEvent } from "react"

function scrollToPath(pathname: string, behavior: ScrollBehavior) {
  const sectionId = pathname === "/" ? "home" : pathname.split("/").filter(Boolean).at(-1)
  const target = sectionId ? document.getElementById(sectionId) : null

  if (target) {
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : behavior,
      block: "start",
    })
  }
}

export function navigateToSection(event: MouseEvent<HTMLAnchorElement>) {
  const anchor = event.currentTarget

  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (anchor.target && anchor.target !== "_self")
  ) {
    return
  }

  const destination = new URL(anchor.href)
  const targetPath = destination.pathname
  const targetId = targetPath === "/" ? "home" : targetPath.split("/").filter(Boolean).at(-1)
  const target = targetId ? document.getElementById(targetId) : null

  if (destination.origin !== window.location.origin || !target) {
    return
  }

  event.preventDefault()

  if (window.location.pathname !== targetPath) {
    window.history.pushState(null, "", targetPath)
  }

  scrollToPath(targetPath, "smooth")
}

export function scrollToCurrentPath(behavior: ScrollBehavior = "auto") {
  scrollToPath(window.location.pathname, behavior)
}
