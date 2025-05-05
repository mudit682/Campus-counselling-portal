"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Users, ArrowRight, CheckCircle2, XCircle, AlertCircle, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { fetchDashboardData } from "@/lib/api"
import { DashboardNav } from "@/components/dashboard-nav"

interface AppointmentSummary {
  upcoming: number
  completed: number
  cancelled: number
}

interface DashboardData {
  appointmentSummary: AppointmentSummary
  recentAppointments: any[]
  upcomingAppointments: any[]
}

export default function DashboardPage() {
  const { userRole } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData(userRole)
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [userRole])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <CalendarClock className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardNav />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {userRole} dashboard. Here's an overview of your appointments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.appointmentSummary.upcoming || 0}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.appointmentSummary.upcoming === 1 ? "appointment" : "appointments"} scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.appointmentSummary.completed || 0}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.appointmentSummary.completed === 1 ? "appointment" : "appointments"} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.appointmentSummary.cancelled || 0}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.appointmentSummary.cancelled === 1 ? "appointment" : "appointments"} cancelled
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData?.upcomingAppointments && dashboardData.upcomingAppointments.length > 0 ? (
              dashboardData.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userRole === "student" ? appointment.teacherName : appointment.studentName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {appointment.status === "confirmed" ? (
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Confirmed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No upcoming appointments</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {userRole === "student"
                    ? "Book an appointment with a teacher to get started."
                    : "You don't have any upcoming appointments scheduled."}
                </p>
                {userRole === "student" && (
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/book">Book Appointment</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/dashboard/appointments" className="flex items-center justify-center gap-1">
                View all appointments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRole === "student" ? (
              <>
                <Button asChild className="w-full justify-start gap-2">
                  <Link href="/dashboard/book">
                    <Calendar className="h-4 w-4" />
                    Book New Appointment
                  </Link>
                </Button>
                {/* <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/dashboard/teachers">
                    <Users className="h-4 w-4" />
                    Browse Teachers
                  </Link>
                </Button> */}
              </>
            ) : userRole === "teacher" ? (
              <>
                <Button asChild className="w-full justify-start gap-2">
                  <Link href="/dashboard/availability">
                    <Clock className="h-4 w-4" />
                    Manage Availability
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/dashboard/appointments">
                    <Calendar className="h-4 w-4" />
                    View All Appointments
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full justify-start gap-2">
                  <Link href="/dashboard/users">
                    <Users className="h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/dashboard/analytics">
                    <Calendar className="h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
