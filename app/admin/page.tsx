import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | Waleed Portfolio",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminDashboard />
}
