"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Users, ArrowRight, CheckCircle2, AlertCircle, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-provider"
import { fetchTeacherDashboardData } from "@/lib/api"
import { DashboardNav } from "@/components/dashboard-nav"

interface AppointmentSummary {
  upcoming: number
  completed: number
  cancelled: number
}

interface TeacherDashboardData {
  appointmentSummary: AppointmentSummary
  recentAppointments: any[]
  upcomingAppointments: any[]
  totalStudents: number
  availabilityHours: number
}

export default function TeacherDashboardPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // This would be replaced with an actual API call in a real application
        const data = await fetchTeacherDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

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
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.displayName || "Teacher"}. Here's an overview of your appointments and schedule.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData?.totalStudents === 1 ? "student" : "students"} met with
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.availabilityHours || 0}</div>
            <p className="text-xs text-muted-foreground">hours set as available this week</p>
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
                    <p className="text-sm font-medium leading-none">{appointment.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                    <p className="text-sm text-muted-foreground">{appointment.subject}</p>
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
                  You don't have any upcoming appointments scheduled.
                </p>
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
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/dashboard/students">
                <Users className="h-4 w-4" />
                View My Students
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
