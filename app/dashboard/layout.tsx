"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { CalendarClock, Calendar, Clock, Users, Settings, LogOut, Menu, X, Bell, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-provider"

interface SidebarNavProps {
  isOpen: boolean
  links: {
    href: string
    label: string
    icon: React.ReactNode
  }[]
}

function SidebarNav({ isOpen, links }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1 px-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
            pathname === link.href ? "bg-muted font-medium text-primary" : "text-muted-foreground"
          }`}
        >
          {link.icon}
          <span className={`${isOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"} transition-all`}>
            {link.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, userRole, signOut } = useAuth()

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const studentLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/appointments",
      label: "My Appointments",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/dashboard/book",
      label: "Book Appointment",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      href: "/dashboard/teachers",
      label: "Teachers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  const teacherLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/appointments",
      label: "My Appointments",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/dashboard/availability",
      label: "Manage Availability",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  const adminLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/users",
      label: "Manage Users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/appointments",
      label: "All Appointments",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  const links = userRole === "teacher" ? teacherLinks : userRole === "admin" ? adminLinks : studentLinks

  // Only show sidebar for admin users
  const showSidebar = userRole === "admin"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className={showSidebar ? "md:hidden" : "hidden"}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <CalendarClock className="h-6 w-6" />
                <span>CCP</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="py-4">
              <SidebarNav isOpen={true} links={links} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CalendarClock className="h-6 w-6" />
            <span className="hidden md:inline">CCP</span>
          </Link>
          {showSidebar && (
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          )}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={user?.displayName || "User"} />
            <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        {showSidebar && (
          <aside
            className={`fixed inset-y-0 left-0 z-20 mt-16 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-[calc(100vh-4rem)] flex-col">
              <div className="flex-1 overflow-auto py-4">
                <SidebarNav isOpen={isOpen} links={links} />
              </div>
              <div className="border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                  <span className={`${isOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"} transition-all`}>
                    Log out
                  </span>
                </Button>
              </div>
            </div>
          </aside>
        )}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${showSidebar && isOpen ? "md:ml-64" : "md:ml-0"}`}
        >
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
