"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Users,
  CalendarClock,
  Settings,
  ArrowRight,
  UserPlus,
  School,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for admin dashboard
const adminStats = {
  totalUsers: 1250,
  activeUsers: 980,
  totalTeachers: 85,
  totalStudents: 1165,
  totalAppointments: 3240,
  completedAppointments: 2850,
  cancelledAppointments: 390,
  appointmentCompletionRate: 88,
  newUsersThisMonth: 120,
  averageAppointmentsPerDay: 45,
}

const recentActivity = [
  {
    id: "act1",
    type: "user_registered",
    user: "Emily Johnson",
    userType: "Student",
    userImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2024-04-25T10:30:00Z",
    details: "New student registration",
  },
  {
    id: "act2",
    type: "appointment_created",
    user: "Alex Davis",
    userType: "Student",
    userImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2024-04-25T09:45:00Z",
    details: "Booked appointment with Prof. Williams",
  },
  {
    id: "act3",
    type: "appointment_cancelled",
    user: "Prof. Sarah Miller",
    userType: "Teacher",
    userImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2024-04-25T09:15:00Z",
    details: "Cancelled appointment with Michael Brown",
  },
  {
    id: "act4",
    type: "user_registered",
    user: "Dr. Robert Chen",
    userType: "Teacher",
    userImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2024-04-24T16:20:00Z",
    details: "New teacher registration",
  },
  {
    id: "act5",
    type: "appointment_completed",
    user: "Prof. James Wilson",
    userType: "Teacher",
    userImage: "/placeholder.svg?height=40&width=40",
    timestamp: "2024-04-24T15:00:00Z",
    details: "Completed appointment with Lisa Garcia",
  },
]

const topTeachers = [
  {
    id: "teacher1",
    name: "Prof. Williams",
    department: "Computer Science",
    image: "/placeholder.svg?height=40&width=40",
    appointmentsCount: 145,
    rating: 4.9,
  },
  {
    id: "teacher2",
    name: "Dr. Martinez",
    department: "Engineering",
    image: "/placeholder.svg?height=40&width=40",
    appointmentsCount: 132,
    rating: 4.8,
  },
  {
    id: "teacher3",
    name: "Prof. Johnson",
    department: "Business",
    image: "/placeholder.svg?height=40&width=40",
    appointmentsCount: 128,
    rating: 4.7,
  },
  {
    id: "teacher4",
    name: "Dr. Thompson",
    department: "Psychology",
    image: "/placeholder.svg?height=40&width=40",
    appointmentsCount: 115,
    rating: 4.8,
  },
]

const recentIssues = [
  {
    id: "issue1",
    title: "Calendar Sync Error",
    status: "open",
    priority: "high",
    reportedBy: "Prof. Williams",
    timestamp: "2024-04-24T14:30:00Z",
    description: "Google Calendar sync is failing for some appointments",
  },
  {
    id: "issue2",
    title: "Email Notifications Delayed",
    status: "investigating",
    priority: "medium",
    reportedBy: "System Monitor",
    timestamp: "2024-04-24T10:15:00Z",
    description: "Email notifications are being delayed by approximately 15 minutes",
  },
  {
    id: "issue3",
    title: "Student Profile Image Upload",
    status: "resolved",
    priority: "low",
    reportedBy: "Alex Davis",
    timestamp: "2024-04-23T16:45:00Z",
    description: "Unable to upload profile images larger than 2MB",
  },
]

// Monthly appointment data for chart
const monthlyData = [
  { month: "Jan", appointments: 210, completed: 185, cancelled: 25 },
  { month: "Feb", appointments: 240, completed: 215, cancelled: 25 },
  { month: "Mar", appointments: 280, completed: 250, cancelled: 30 },
  { month: "Apr", appointments: 320, completed: 290, cancelled: 30 },
  { month: "May", appointments: 350, completed: 310, cancelled: 40 },
  { month: "Jun", appointments: 310, completed: 275, cancelled: 35 },
  { month: "Jul", appointments: 290, completed: 260, cancelled: 30 },
  { month: "Aug", appointments: 240, completed: 210, cancelled: 30 },
  { month: "Sep", appointments: 320, completed: 280, cancelled: 40 },
  { month: "Oct", appointments: 350, completed: 310, cancelled: 40 },
  { month: "Nov", appointments: 380, completed: 340, cancelled: 40 },
  { month: "Dec", appointments: 300, completed: 260, cancelled: 40 },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("week")
  const [isExporting, setIsExporting] = useState(false)

  const handleExportData = () => {
    setIsExporting(true)

    // Simulate API call for data export
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "The data has been exported successfully.",
      })
      setIsExporting(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.displayName || "Administrator"}. Here's an overview of the system.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportData} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-green-500 mr-1">+{adminStats.newUsersThisMonth}</span> new this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalAppointments}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-green-500">{adminStats.completedAppointments} completed</span>
              <span>|</span>
              <span className="text-red-500">{adminStats.cancelledAppointments} cancelled</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.appointmentCompletionRate}%</div>
            <Progress value={adminStats.appointmentCompletionRate} className="h-1 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Appointments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.averageAppointmentsPerDay}</div>
            <p className="text-xs text-muted-foreground">Average per day</p>
          </CardContent>
        </Card>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Appointments</CardTitle>
            <CardDescription>Appointment trends over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              {/* This would be a chart component in a real implementation */}
              <div className="flex h-full items-end gap-2">
                {monthlyData.map((month) => (
                  <div key={month.month} className="relative flex w-full flex-col items-center">
                    <div className="flex h-full w-full flex-col justify-end gap-1">
                      <div
                        className="w-full bg-red-200"
                        style={{ height: `${(month.cancelled / month.appointments) * 100}%` }}
                      ></div>
                      <div
                        className="w-full bg-primary/80"
                        style={{ height: `${(month.completed / month.appointments) * 100}%` }}
                      ></div>
                    </div>
                    <span className="absolute -bottom-6 text-xs">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                  <span className="text-xs">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-200"></div>
                  <span className="text-xs">Cancelled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of system users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span>Teachers</span>
                </div>
                <div className="font-medium">{adminStats.totalTeachers}</div>
              </div>
              <Progress value={(adminStats.totalTeachers / adminStats.totalUsers) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Students</span>
                </div>
                <div className="font-medium">{adminStats.totalStudents}</div>
              </div>
              <Progress value={(adminStats.totalStudents / adminStats.totalUsers) * 100} className="h-2" />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Active Users</span>
                <span>{Math.round((adminStats.activeUsers / adminStats.totalUsers) * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>API Status</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Service</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  Degraded
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Calendar Sync</span>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  Issues
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Last Updated</span>
                <span>5 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="teachers">Top Teachers</TabsTrigger>
          <TabsTrigger value="issues">System Issues</TabsTrigger>
        </TabsList>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <Avatar>
                      <AvatarImage src={activity.userImage || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{activity.user}</p>
                        <Badge variant="outline">{activity.userType}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                    {activity.type === "user_registered" && (
                      <Badge className="bg-green-100 text-green-800">New User</Badge>
                    )}
                    {activity.type === "appointment_created" && (
                      <Badge className="bg-blue-100 text-blue-800">New Appointment</Badge>
                    )}
                    {activity.type === "appointment_cancelled" && (
                      <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
                    )}
                    {activity.type === "appointment_completed" && (
                      <Badge className="bg-purple-100 text-purple-800">Completed</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/admin/activity">
                  View All Activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Teachers Tab */}
        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Teachers</CardTitle>
              <CardDescription>Teachers with the most appointments and highest ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{teacher.appointmentsCount} appointments</p>
                        <div className="flex justify-end mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={i < Math.floor(teacher.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={`h-4 w-4 ${
                                i < Math.floor(teacher.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/admin/teachers">
                  View All Teachers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Issues</CardTitle>
              <CardDescription>Recent issues and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {issue.status === "open" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {issue.status === "investigating" && <Clock className="h-4 w-4 text-yellow-500" />}
                        {issue.status === "resolved" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        <p className="font-medium">{issue.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            issue.priority === "high"
                              ? "bg-red-50 text-red-700"
                              : issue.priority === "medium"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-blue-50 text-blue-700"
                          }
                        >
                          {issue.priority} priority
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            issue.status === "open"
                              ? "bg-red-50 text-red-700"
                              : issue.status === "investigating"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-green-50 text-green-700"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Reported by: {issue.reportedBy}</span>
                      <span>{new Date(issue.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/dashboard/admin/issues">
                  View All Issues
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/admin/users/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New User
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/dashboard/admin/reports">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Reports
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-l-2 border-yellow-500 pl-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Email Service Degraded</p>
                  <p className="text-sm text-muted-foreground">
                    Email notifications are experiencing delays. Our team is investigating.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Posted 45 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-green-500 pl-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">System Update Completed</p>
                  <p className="text-sm text-muted-foreground">
                    The scheduled maintenance has been completed successfully.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Posted 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-blue-500 pl-3">
                <CalendarClock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Upcoming Maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance on May 15, 2024 from 2:00 AM to 4:00 AM UTC.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Posted 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
