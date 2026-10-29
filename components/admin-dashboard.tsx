"use client"

import { useCallback, useEffect, useState } from "react"
import type { FormEvent } from "react"
import {
  ArrowLeft,
  BarChart3,
  Check,
  ChevronRight,
  Eye,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  arrayItemDefaults,
  defaultPortfolioContent,
  portfolioContentSchema,
  type PortfolioContent,
} from "@/lib/portfolio-content"

type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
  notification_status: "sent" | "failed" | "not_configured"
}

type VisitStats = {
  total: number
  today: number
  visits: {
    visit_date: string
    created_at: string
    notification_status: "sent" | "failed" | "not_configured"
  }[]
}

const sections: { id: keyof PortfolioContent | "overview" | "messages" | "visits"; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact details" },
  { id: "footer", label: "Footer" },
  { id: "visits", label: "Portfolio visits" },
  { id: "messages", label: "Messages" },
]

function labelFor(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .replace(/Github/g, "GitHub")
    .replace(/Linkedin/g, "LinkedIn")
}

function isRequiredItemField(path: string[]) {
  return (
    (path[0] === "experience" || path[0] === "projects") &&
    path[1] === "items" &&
    path.length >= 4
  )
}

function isRequiredFieldComplete(value: unknown) {
  if (typeof value === "string") return value.trim().length > 0
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  )
}

function getRequiredFieldsMessage(
  issues: { path: (string | number)[]; message: string }[],
  section: string,
) {
  const fieldsByItem = new Map<number, string[]>()

  for (const issue of issues) {
    if (issue.path[0] !== section || issue.path[1] !== "items" || typeof issue.path[2] !== "number") {
      continue
    }

    const field = issue.path.slice(3).find((part): part is string => typeof part === "string")
    if (!field) continue

    const itemNumber = issue.path[2] + 1
    const fieldLabel = labelFor(field)
    const detail = issue.message === "Required" ? fieldLabel : `${fieldLabel} (${issue.message})`
    fieldsByItem.set(itemNumber, [...(fieldsByItem.get(itemNumber) ?? []), detail])
  }

  if (fieldsByItem.size === 0) return null

  const sectionLabel = labelFor(section)
  const missingFields = [...fieldsByItem.entries()]
    .map(([itemNumber, fields]) => `${sectionLabel} ${itemNumber}: ${fields.join(", ")}`)
    .join("; ")
  return `Please complete required fields: ${missingFields}.`
}

function setAtPath(value: unknown, path: string[], nextValue: unknown): unknown {
  if (path.length === 0) return nextValue
  const [head, ...tail] = path

  if (Array.isArray(value)) {
    const index = Number(head)
    return value.map((item, currentIndex) =>
      currentIndex === index ? setAtPath(item, tail, nextValue) : item,
    )
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    return { ...record, [head]: setAtPath(record[head], tail, nextValue) }
  }

  return value
}

function cloneDefault(path: string[]) {
  const normalizedPath = path.filter((part) => !/^\d+$/.test(part)).join(".")
  const item = arrayItemDefaults[normalizedPath]
  return item === undefined ? "" : structuredClone(item)
}

function EditorField({
  label,
  path,
  value,
  onChange,
}: {
  label: string
  path: string[]
  value: unknown
  onChange: (path: string[], value: unknown) => void
}) {
  const normalizedPath = path.filter((part) => !/^\d+$/.test(part)).join(".")
  const isRequired = isRequiredItemField(path)
  const isComplete = isRequired && isRequiredFieldComplete(value)

  if (typeof value === "string") {
    const isMultiline = value.length > 100 || /description|paragraphs|message|tagline/i.test(label)
    return (
      <label className="block space-y-2">
        <span className="flex items-center justify-between gap-2 text-sm font-medium">
          <span>
            {label}{isRequired && !isComplete && <span className="text-destructive"> (required)</span>}
          </span>
          {isComplete && <Check aria-label={`${label} complete`} className="size-4 shrink-0 text-emerald-500" />}
        </span>
        {isMultiline ? (
          <Textarea
            value={value}
            rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))}
            required={isRequired}
            onChange={(event) => onChange(path, event.target.value)}
          />
        ) : (
          <Input
            value={value}
            required={isRequired}
            onChange={(event) => onChange(path, event.target.value)}
          />
        )}
      </label>
    )
  }

  if (Array.isArray(value)) {
    const emptyArrayContainsStrings = value.length === 0 && typeof cloneDefault(path) === "string"
    if (value.every((item) => typeof item === "string") || emptyArrayContainsStrings) {
      return (
        <div className="space-y-2">
          <label className="block space-y-2">
            <span className="flex items-center justify-between gap-2 text-sm font-medium">
              <span>
                {label}{isRequired && !isComplete && <span className="text-destructive"> (required)</span>}
              </span>
              {isComplete && <Check aria-label={`${label} complete`} className="size-4 shrink-0 text-emerald-500" />}
            </span>
            <Textarea
              value={(value as string[]).join("\n")}
              rows={Math.max(3, Math.min(8, value.length + 1))}
              required={isRequired}
              onChange={(event) =>
                onChange(path, event.target.value.split("\n").filter((item) => item.trim().length > 0))
              }
            />
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange(path, [...value, ""])}
          >
            <Plus /> Add {label.toLowerCase().replace(/s$/, "")}
          </Button>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{label}</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange(path, [...value, cloneDefault(path)])}
          >
            <Plus /> Add
          </Button>
        </div>
        {value.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
        {value.toReversed().map((item, index) => (
          <Card key={`${normalizedPath}-${index}`} className="bg-background/60">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{label.replace(/s$/, "")} {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${label.replace(/s$/, "")} ${index + 1}`}
                  onClick={() => onChange(path, value.toReversed().filter((_, itemIndex) => itemIndex !== index))}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
              <EditorField
                label={label.replace(/s$/, "")}
                path={[...path, String(index)]}
                value={item}
                onChange={onChange}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {entries.map(([key, child]) => (
          <div key={key} className={Array.isArray(child) || (typeof child === "string" && child.length > 100) ? "md:col-span-2" : ""}>
            <EditorField
              label={labelFor(key)}
              path={[...path, key]}
              value={child}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function AdminDashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [activeSection, setActiveSection] = useState<keyof PortfolioContent | "overview" | "messages" | "visits">("overview")
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [visits, setVisits] = useState<VisitStats | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isConfigured, setIsConfigured] = useState(true)

  const isAdmin = user !== null

  const showStatus = (message: string, error = false) => {
    setStatus(message)
    setIsError(error)
  }

  useEffect(() => {
    let active = true
    fetch("/api/admin/session")
      .then(async (response) => {
        const result: { error?: string; user?: { email: string } | null } = await response.json()
        if (response.status === 503) {
          if (active) setIsConfigured(false)
          return
        }
        if (!response.ok) throw new Error(result.error || "Could not check the admin session.")
        if (active) setUser(result.user ?? null)
      })
      .catch((error: unknown) => {
        if (active) showStatus(error instanceof Error ? error.message : "Could not check the admin session.", true)
      })
      .finally(() => {
        if (!active) return
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!isAdmin) return

    let active = true
    fetch("/api/admin/content")
      .then(async (response) => {
        const result: { error?: string; content?: unknown } = await response.json()
        if (!response.ok) throw new Error(result.error || "Could not load saved content.")
        return result.content
      })
      .then((savedContent) => {
        if (!active) return
        const parsed = portfolioContentSchema.safeParse(savedContent)
        if (!parsed.success) {
          showStatus("Saved content is invalid. Review it before saving.", true)
          return
        }
        setContent(parsed.data)
      })
      .catch((error: unknown) => {
        if (active) showStatus(error instanceof Error ? error.message : "Could not load saved content.", true)
      })

    return () => {
      active = false
    }
  }, [isAdmin])

  const loadMessages = useCallback(async () => {
    if (!isAdmin) return
    try {
      const response = await fetch("/api/admin/messages")
      const result: { error?: string; messages?: ContactMessage[] } = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load messages.")
      setMessages(result.messages ?? [])
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not load messages.", true)
    }
  }, [isAdmin])

  const loadVisits = useCallback(async () => {
    if (!isAdmin) return
    try {
      const response = await fetch("/api/admin/visits")
      const result: { error?: string; total?: number; today?: number; visits?: VisitStats["visits"] } = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not load portfolio visits.")
      setVisits({
        total: result.total ?? 0,
        today: result.today ?? 0,
        visits: result.visits ?? [],
      })
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not load portfolio visits.", true)
    }
  }, [isAdmin])

  useEffect(() => {
    if (activeSection === "messages") void loadMessages()
  }, [activeSection, loadMessages])

  useEffect(() => {
    if (activeSection === "visits") void loadVisits()
  }, [activeSection, loadVisits])

  useEffect(() => {
    if (activeSection === "overview") {
      void loadVisits()
      void loadMessages()
    }
  }, [activeSection, loadMessages, loadVisits])

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus("")
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const result: { error?: string; user?: { email: string } } = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not sign in.")
      setUser(result.user ?? null)
      setPassword("")
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not sign in.", true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = portfolioContentSchema.safeParse(content)
    if (!parsed.success) {
      const requiredFieldsMessage = getRequiredFieldsMessage(parsed.error.issues, activeSection)
      showStatus(
        requiredFieldsMessage ??
          `Please check the content fields: ${parsed.error.issues[0]?.path.join(".") || "invalid content"}.`,
        true,
      )
      return
    }

    setIsSaving(true)
    setStatus("")
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: parsed.data }),
      })
      const result: { error?: string } = await response.json()
      if (!response.ok) throw new Error(result.error || "Changes could not be saved.")
      showStatus("Changes saved. Your public portfolio is updated.")
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Changes could not be saved.", true)
    } finally {
      setIsSaving(false)
    }
  }

  const updateMessage = async (message: ContactMessage, nextRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: nextRead }),
      })
      const result: { error?: string } = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not update message.")
      setMessages((current) => current.map((item) => item.id === message.id ? { ...item, is_read: nextRead } : item))
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not update message.", true)
    }
  }

  const deleteMessage = async (message: ContactMessage) => {
    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, { method: "DELETE" })
      const result: { error?: string } = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not delete message.")
      setMessages((current) => current.filter((item) => item.id !== message.id))
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not delete message.", true)
    }
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" })
      if (!response.ok) throw new Error("Could not sign out.")
      setUser(null)
      setActiveSection("hero")
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Could not sign out.", true)
    }
  }

  if (!isConfigured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6">
        <Card className="w-full">
          <CardHeader><CardTitle>Admin setup required</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Configure <code>MONGODB_URI</code>, <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code>, and a 32-character <code>ADMIN_SESSION_SECRET</code>, then restart the app.</p>
            <Link className="text-primary underline" href="/">Return to portfolio</Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isLoading) {
    return <main className="grid min-h-screen place-items-center text-muted-foreground">Loading admin dashboard...</main>
  }

  if (!user || !isAdmin) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.65_0.2_195/0.14),transparent_55%)]" />
        <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border-white/10 bg-card/90 shadow-2xl shadow-black/20 backdrop-blur">
          <CardHeader className="space-y-6 px-8 pt-8">
            <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
            <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <ShieldCheck className="size-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">Sign in to manage your portfolio and view its activity.</p>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSignIn} className="space-y-5">
              <label className="block space-y-2 text-sm font-medium">
                Email address
                <Input className="h-11 bg-background/60" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="block space-y-2 text-sm font-medium">
                Password
                <Input className="h-11 bg-background/60" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
              {status && <p role="alert" className="text-sm text-destructive">{status}</p>}
              <Button className="h-11 w-full" type="submit">Sign in to dashboard <ChevronRight /></Button>
            </form>
            <p className="mt-6 text-center text-xs text-muted-foreground">Secure administrator access</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  const selectedSection = sections.find((section) => section.id === activeSection)
  const unreadCount = messages.filter((message) => !message.is_read).length
  const sectionIcons = {
    overview: LayoutDashboard,
    hero: Sparkles,
    about: FileText,
    skills: BarChart3,
    experience: FileText,
    projects: FileText,
    contact: Mail,
    footer: FileText,
    visits: Eye,
    messages: Inbox,
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r bg-card/40 px-4 py-6 md:flex">
          <Link href="/" className="mb-9 flex items-center gap-3 px-2">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Waleed Portfolio</span>
              <span className="block text-xs text-muted-foreground">Admin workspace</span>
            </span>
          </Link>
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
          <nav aria-label="Admin dashboard" className="space-y-1">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id]
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setStatus("")
                    setActiveSection(section.id)
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary ring-1 ring-inset ring-primary/15"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="flex-1">{section.label}</span>
                  {section.id === "messages" && unreadCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">{unreadCount}</span>
                  )}
                </button>
              )
            })}
          </nav>
          <div className="mt-auto space-y-2 border-t pt-4">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted/70 hover:text-foreground">
              <ExternalLink className="size-4" /> View live portfolio
            </Link>
            <button type="button" onClick={() => void handleSignOut()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b bg-background/85 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="md:hidden">Portfolio Admin</span>
                  <span className="hidden md:inline">Workspace</span>
                  <ChevronRight className="size-3" />
                  <span className="truncate text-foreground">{selectedSection?.label}</span>
                </div>
                <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">{activeSection === "overview" ? "Dashboard overview" : selectedSection?.label}</h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 sm:flex">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground">Admin session active</span>
                </div>
                <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
                  {(user.email[0] || "A").toUpperCase()}
                </div>
                <Button className="md:hidden" size="icon" variant="outline" aria-label="Sign out" onClick={() => void handleSignOut()}><LogOut /></Button>
              </div>
            </div>
          </header>

          <div className="border-b px-4 py-3 md:hidden">
            <nav aria-label="Admin sections" className="flex gap-2 overflow-x-auto">
              {sections.map((section) => {
                const Icon = sectionIcons[section.id]
                return (
                  <Button
                    key={section.id}
                    size="sm"
                    variant={activeSection === section.id ? "default" : "outline"}
                    onClick={() => {
                      setStatus("")
                      setActiveSection(section.id)
                    }}
                  >
                    <Icon /> {section.label}
                    {section.id === "messages" && unreadCount > 0 && <span className="rounded-full bg-background/20 px-1.5 text-xs">{unreadCount}</span>}
                  </Button>
                )
              })}
            </nav>
          </div>

          <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          {activeSection === "overview" ? (
            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your portfolio.</p>
                  <p className="mt-2 text-xs text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <Button variant="outline" onClick={() => { void loadVisits(); void loadMessages() }}><RefreshCw /> Refresh data</Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Total visits", value: visits?.total ?? 0, note: "Unique daily browsers", Icon: Eye, tint: "text-sky-400 bg-sky-400/10" },
                  { label: "Visits today", value: visits?.today ?? 0, note: "Since midnight", Icon: BarChart3, tint: "text-violet-400 bg-violet-400/10" },
                  { label: "Messages", value: messages.length, note: "Contact form submissions", Icon: Mail, tint: "text-amber-400 bg-amber-400/10" },
                  { label: "Unread messages", value: unreadCount, note: unreadCount ? "Waiting for your reply" : "Inbox is all caught up", Icon: Inbox, tint: "text-emerald-400 bg-emerald-400/10" },
                ].map(({ label, value, note, Icon, tint }) => (
                  <Card key={label} className="rounded-xl border-white/[0.07] bg-card/70 shadow-sm transition hover:border-primary/20">
                    <CardContent className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight">{value.toLocaleString()}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
                      </div>
                      <span className={`grid size-10 place-items-center rounded-xl ${tint}`}><Icon className="size-5" /></span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                <Card className="rounded-xl border-white/[0.07] bg-card/70">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-base">Recent messages</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">Latest notes from your contact form</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveSection("messages")}>View inbox <ChevronRight /></Button>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {messages.length === 0 ? (
                      <div className="rounded-lg border border-dashed px-4 py-10 text-center">
                        <Inbox className="mx-auto size-8 text-muted-foreground/50" />
                        <p className="mt-3 text-sm font-medium">No messages yet</p>
                        <p className="mt-1 text-xs text-muted-foreground">New contact form submissions will appear here.</p>
                      </div>
                    ) : messages.slice(0, 5).map((message) => (
                      <button key={message.id} type="button" onClick={() => setActiveSection("messages")} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-muted/50">
                        <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${message.is_read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                          {message.name.slice(0, 1).toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium">{message.name}</span>
                            {!message.is_read && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">{message.subject || message.message}</span>
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">{new Date(message.created_at).toLocaleDateString()}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-white/[0.07] bg-card/70">
                  <CardHeader>
                    <CardTitle className="text-base">Quick actions</CardTitle>
                    <p className="text-sm text-muted-foreground">Manage your portfolio workspace</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <button type="button" onClick={() => setActiveSection("hero")} className="flex w-full items-center gap-3 rounded-lg border bg-background/40 p-3 text-left transition hover:border-primary/30 hover:bg-muted/50">
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Sparkles className="size-4" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium">Edit portfolio content</span><span className="block text-xs text-muted-foreground">Update sections and profile details</span></span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                    <button type="button" onClick={() => setActiveSection("visits")} className="flex w-full items-center gap-3 rounded-lg border bg-background/40 p-3 text-left transition hover:border-primary/30 hover:bg-muted/50">
                      <span className="grid size-9 place-items-center rounded-lg bg-violet-400/10 text-violet-400"><BarChart3 className="size-4" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium">View visitor activity</span><span className="block text-xs text-muted-foreground">See your portfolio visit history</span></span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                    <Link href="/" className="flex items-center gap-3 rounded-lg border bg-background/40 p-3 transition hover:border-primary/30 hover:bg-muted/50">
                      <span className="grid size-9 place-items-center rounded-lg bg-emerald-400/10 text-emerald-400"><ExternalLink className="size-4" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-sm font-medium">Open live portfolio</span><span className="block text-xs text-muted-foreground">Preview your public website</span></span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              {status && <p role="status" className={isError ? "text-sm text-destructive" : "text-sm text-emerald-500"}>{status}</p>}
            </section>
          ) : activeSection === "visits" ? (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Portfolio visits</h2>
                <p className="text-sm text-muted-foreground">Unique browsers recorded per day. No IP addresses or personal visitor details are stored.</p>
              </div>
              <Button variant="outline" onClick={() => void loadVisits()}>Refresh</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Recorded visits</CardTitle></CardHeader>
                <CardContent className="text-3xl font-bold">{visits?.total ?? 0}</CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle></CardHeader>
                <CardContent className="text-3xl font-bold">{visits?.today ?? 0}</CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader><CardTitle>Recent visits</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {!visits?.visits.length ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No portfolio visits recorded yet.</p>
                ) : visits.visits.map((visit) => (
                  <div key={`${visit.visit_date}-${visit.created_at}`} className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-sm">{new Date(visit.created_at).toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">
                      {visit.notification_status === "sent"
                        ? "Email sent"
                        : visit.notification_status === "failed"
                          ? "Email failed"
                          : "Email not configured"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            {status && <p role="status" className={isError ? "text-sm text-destructive" : "text-sm text-emerald-500"}>{status}</p>}
          </section>
        ) : activeSection === "messages" ? (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Contact messages</h2>
                <p className="text-sm text-muted-foreground">{messages.length} total · {unreadCount} unread</p>
              </div>
              <Button variant="outline" onClick={() => void loadMessages()}>Refresh</Button>
            </div>
            {messages.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No contact messages yet.</CardContent></Card>
            ) : messages.map((message) => (
              <Card key={message.id} className={message.is_read ? "" : "border-primary/50"}>
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{message.name}</h3>
                        {!message.is_read && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">New</span>}
                      </div>
                      <a href={`mailto:${message.email}`} className="text-sm text-primary hover:underline">{message.email}</a>
                      <p className="mt-1 text-xs text-muted-foreground">{new Date(message.created_at).toLocaleString()}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {message.notification_status === "sent"
                          ? "Email notification sent"
                          : message.notification_status === "failed"
                            ? "Email notification failed"
                            : "Email notifications are not configured"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || "Your message"}`)}`}>
                          <ExternalLink /> Reply
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Delete message" onClick={() => void deleteMessage(message)}>
                        <Trash2 className="text-destructive" />
                      </Button>
                    </div>
                  </div>
                  {message.subject && <p className="font-medium">{message.subject}</p>}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{message.message}</p>
                  <Button variant="ghost" size="sm" onClick={() => void updateMessage(message, !message.is_read)}>
                    {message.is_read ? <><Inbox /> Mark unread</> : <><Check /> Mark read</>}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedSection?.label} content</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Edit text and links. Lists use one item per line; add or remove cards for projects, skills, and experience.
                </p>
              </CardHeader>
              <CardContent>
                <EditorField
                  label={selectedSection?.label ?? "Content"}
                  path={[activeSection]}
                  value={content[activeSection]}
                  onChange={(path, nextValue) =>
                    setContent((current) => setAtPath(current, path, nextValue) as PortfolioContent)
                  }
                />
              </CardContent>
            </Card>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : <><Save /> Save changes</>}</Button>
              {status && <p role="status" aria-live="polite" className={isError ? "text-sm text-destructive" : "text-sm text-emerald-500"}>{status}</p>}
            </div>
          </form>
        )}
        {activeSection === "messages" && status && (
          <p role="status" className={isError ? "mt-4 text-sm text-destructive" : "mt-4 text-sm text-emerald-500"}>{status}</p>
        )}
          </div>
        </div>
      </div>
    </main>
  )
}
