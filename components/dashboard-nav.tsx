"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Clock, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-provider"

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()
  const { userRole, signOut } = useAuth()

  const studentLinks: NavLink[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    // {
    //   href: "/dashboard/appointments",
    //   label: "My Appointments",
    //   icon: <Calendar className="h-4 w-4" />,
    // },
    {
      href: "/dashboard/book",
      label: "Book Appointment",
      icon: <Clock className="h-4 w-4" />,
    },
    // {
    //   href: "/dashboard/teachers",
    //   label: "Teachers",
    //   icon: <Users className="h-4 w-4" />,
    // },
    // {
    //   href: "/dashboard/settings",
    //   label: "Settings",
    //   icon: <Settings className="h-4 w-4" />,
    // },
  ]

  const teacherLinks: NavLink[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    // {
    //   href: "/dashboard/appointments",
    //   label: "My Appointments",
    //   icon: <Calendar className="h-4 w-4" />,
    // },
    {
      href: "/dashboard/availability",
      label: "Manage Availability",
      icon: <Clock className="h-4 w-4" />,
    },
    // {
    //   href: "/dashboard/students",
    //   label: "Students",
    //   icon: <Users className="h-4 w-4" />,
    // },
    // {
    //   href: "/dashboard/settings",
    //   label: "Settings",
    //   icon: <Settings className="h-4 w-4" />,
    // },
  ]

  // Only show for student and teacher roles
  if (userRole === "admin") return null

  const links = userRole === "teacher" ? teacherLinks : studentLinks

  return (
    <div className="mb-8 border-b pb-4">
      <nav className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href ? "default" : "outline"}
            size="sm"
            asChild
            className="gap-2"
          >
            <Link href={link.href}>
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
        <Button variant="outline" size="sm" className="gap-2 ml-auto" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </nav>
    </div>
  )
}
