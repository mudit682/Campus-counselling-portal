"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Mock data for appointments
const appointments = [
  {
    id: "appt1",
    studentName: "Alex Johnson",
    studentId: "SID12345",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Prof. Sarah Williams",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-04-25",
    time: "10:00 AM - 11:00 AM",
    status: "completed",
    subject: "Project Discussion",
    course: "Computer Science 101",
    notes: "Discussed project requirements and timeline",
  },
  {
    id: "appt2",
    studentName: "Maria Garcia",
    studentId: "SID67890",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Dr. Robert Chen",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-04-26",
    time: "2:00 PM - 3:00 PM",
    status: "confirmed",
    subject: "Thesis Review",
    course: "Advanced Research Methods",
    notes: "Initial review of thesis outline and research methodology",
  },
  {
    id: "appt3",
    studentName: "John Davis",
    studentId: "SID54321",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Prof. James Wilson",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-04-29",
    time: "11:00 AM - 12:00 PM",
    status: "confirmed",
    subject: "Career Guidance",
    course: "Professional Development",
    notes: "Discuss career options and industry connections",
  },
  {
    id: "appt4",
    studentName: "Sarah Wilson",
    studentId: "SID98765",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Prof. Sarah Williams",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-05-02",
    time: "9:00 AM - 10:00 AM",
    status: "pending",
    subject: "Assignment Help",
    course: "Data Structures",
    notes: "Help with complex algorithm implementation",
  },
  {
    id: "appt5",
    studentName: "Michael Brown",
    studentId: "SID24680",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Dr. Robert Chen",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-05-03",
    time: "1:00 PM - 2:00 PM",
    status: "cancelled",
    subject: "Research Discussion",
    course: "Advanced Topics in AI",
    notes: "Cancelled due to scheduling conflict",
  },
  {
    id: "appt6",
    studentName: "Emily Taylor",
    studentId: "SID13579",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Prof. James Wilson",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-05-05",
    time: "3:00 PM - 4:00 PM",
    status: "confirmed",
    subject: "Project Feedback",
    course: "Software Engineering",
    notes: "Provide feedback on project progress and next steps",
  },
  {
    id: "appt7",
    studentName: "David Lee",
    studentId: "SID97531",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Prof. Sarah Williams",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-05-06",
    time: "10:00 AM - 11:00 AM",
    status: "confirmed",
    subject: "Exam Preparation",
    course: "Computer Science 101",
    notes: "Review for upcoming final exam",
  },
  {
    id: "appt8",
    studentName: "Jennifer Kim",
    studentId: "SID86420",
    studentImage: "/placeholder.svg?height=40&width=40",
    teacherName: "Dr. Robert Chen",
    teacherImage: "/placeholder.svg?height=40&width=40",
    date: "2024-05-07",
    time: "2:00 PM - 3:00 PM",
    status: "pending",
    subject: "Research Proposal",
    course: "Data Science",
    notes: "Discuss research proposal and methodology",
  },
]

export default function AllAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 5

  // Filter appointments based on search query, status, and date
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.course.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    const matchesDate = !dateFilter || appointment.date === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesDate
  })

  // Paginate appointments
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  const handleExportAppointments = () => {
    toast({
      title: "Export started",
      description: "Appointment data export has been initiated.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Appointments</h1>
          <p className="text-muted-foreground">View and manage all appointments in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportAppointments}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-[250px]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[180px] justify-start text-left font-normal",
                          !dateFilter && "text-muted-foreground",
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                      {dateFilter && (
                        <div className="flex items-center justify-center p-2 border-t">
                          <Button variant="ghost" size="sm" onClick={() => setDateFilter(undefined)}>
                            Clear
                          </Button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Table */}
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Student</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Teacher</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Subject</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAppointments.length > 0 ? (
                      paginatedAppointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={appointment.studentImage || "/placeholder.svg"}
                                  alt={appointment.studentName}
                                />
                                <AvatarFallback>{appointment.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{appointment.studentName}</p>
                                <p className="text-sm text-muted-foreground">{appointment.studentId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={appointment.teacherImage || "/placeholder.svg"}
                                  alt={appointment.teacherName}
                                />
                                <AvatarFallback>{appointment.teacherName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{appointment.teacherName}</p>
                                <p className="text-sm text-muted-foreground">{appointment.course}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{appointment.subject}</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{appointment.time}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(appointment.status)}
                              {getStatusBadge(appointment.status)}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/appointments/${appointment.id}`}>View details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Cancel appointment</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {paginatedAppointments.length} of {filteredAppointments.length} appointments
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View all upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Upcoming appointments will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Appointments</CardTitle>
              <CardDescription>View all completed appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Completed appointments will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Appointments</CardTitle>
              <CardDescription>View all cancelled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cancelled appointments will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
