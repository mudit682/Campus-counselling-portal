"use client"

import { useState } from "react"
import { Search, Calendar, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bookAppointment } from "@/lib/api"
import { DashboardNav } from "@/components/dashboard-nav"

// Mock data for teachers
const teachers = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    department: "Computer Science",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviewCount: 124,
    availableDates: ["2024-05-15", "2024-05-16", "2024-05-17", "2024-05-18", "2024-05-19"],
    bio: "Professor of Computer Science specializing in artificial intelligence and machine learning. Over 15 years of teaching experience.",
  },
  {
    id: "2",
    name: "Prof. Michael Johnson",
    department: "Mathematics",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    reviewCount: 98,
    availableDates: ["2024-05-14", "2024-05-15", "2024-05-18", "2024-05-20"],
    bio: "Mathematics professor with expertise in calculus, linear algebra, and statistics. Known for clear explanations of complex concepts.",
  },
  {
    id: "3",
    name: "Dr. Sarah Williams",
    department: "Physics",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviewCount: 156,
    availableDates: ["2024-05-16", "2024-05-17", "2024-05-19", "2024-05-21"],
    bio: "Physics professor specializing in quantum mechanics and theoretical physics. Published researcher with industry experience.",
  },
  {
    id: "4",
    name: "Prof. Robert Chen",
    department: "Business",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviewCount: 112,
    availableDates: ["2024-05-14", "2024-05-16", "2024-05-18", "2024-05-20"],
    bio: "Business professor with MBA and PhD in Management. Former executive with expertise in entrepreneurship and marketing.",
  },
  {
    id: "5",
    name: "Dr. Emily Davis",
    department: "Psychology",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviewCount: 135,
    availableDates: ["2024-05-15", "2024-05-17", "2024-05-19", "2024-05-21"],
    bio: "Clinical psychologist with research focus on cognitive behavioral therapy and student mental health.",
  },
]

// Mock data for appointment types
const appointmentTypes = [
  {
    id: "academic",
    label: "Academic Advising",
    description: "Get guidance on your academic path and course selection",
  },
  { id: "project", label: "Project Discussion", description: "Discuss your project ideas, progress, or challenges" },
  { id: "research", label: "Research Guidance", description: "Get help with research methodology or paper reviews" },
  { id: "career", label: "Career Counseling", description: "Discuss career options, internships, or job applications" },
]

// Mock data for time slots
const generateTimeSlots = (teacherId: string, date: string) => {
  // In a real app, this would come from an API based on teacher availability
  const baseSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  // Randomly remove some slots to simulate availability
  return baseSlots.filter(() => Math.random() > 0.3)
}

export default function BookAppointmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  // Form state
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [appointmentType, setAppointmentType] = useState<string>("academic")
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => format(addDays(new Date(), i + 1), "yyyy-MM-dd"))

  // Available time slots based on selected teacher and date
  const timeSlots = selectedTeacher && selectedDate ? generateTimeSlots(selectedTeacher, selectedDate) : []

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedTeacherData = teachers.find((t) => t.id === selectedTeacher)

  const handleSelectTeacher = (teacherId: string) => {
    setSelectedTeacher(teacherId)
    setSelectedDate(null)
    setSelectedTime(null)
    setStep(2)
  }

  const handleSelectDate = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setStep(3)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
    setStep(4)
  }

  const handleBookAppointment = async () => {
    if (!selectedTeacher || !selectedDate || !selectedTime || !appointmentType) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please complete all required fields before booking.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to book the appointment
      await bookAppointment({
        teacherId: selectedTeacher,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        notes: appointmentNotes,
      })

      toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${selectedTeacherData?.name} on ${format(new Date(selectedDate), "PPP")} at ${selectedTime} has been confirmed.`,
      })

      // Reset form and go back to step 1
      setSelectedTeacher(null)
      setSelectedDate(null)
      setSelectedTime(null)
      setAppointmentType("academic")
      setAppointmentNotes("")
      setStep(1)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "There was an error booking your appointment. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <DashboardNav />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule a meeting with a teacher based on mutual availability.</p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              step >= 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground",
            )}
          >
            1
          </div>
          <div className={cn("h-1 w-8 sm:w-16", step >= 2 ? "bg-primary" : "bg-muted")} />
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              step >= 2
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground",
            )}
          >
            2
          </div>
          <div className={cn("h-1 w-8 sm:w-16", step >= 3 ? "bg-primary" : "bg-muted")} />
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              step >= 3
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground",
            )}
          >
            3
          </div>
          <div className={cn("h-1 w-8 sm:w-16", step >= 4 ? "bg-primary" : "bg-muted")} />
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              step >= 4
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted bg-muted text-muted-foreground",
            )}
          >
            4
          </div>
        </div>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search by Teacher</TabsTrigger>
          <TabsTrigger value="availability">Search by Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          {step === 1 && (
            <>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by teacher name or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTeachers.map((teacher) => (
                  <Card
                    key={teacher.id}
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary",
                      selectedTeacher === teacher.id && "border-primary",
                    )}
                    onClick={() => handleSelectTeacher(teacher.id)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <img
                        src={teacher.image || "/placeholder.svg"}
                        alt={teacher.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-base">{teacher.name}</CardTitle>
                        <CardDescription>{teacher.department}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
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
                          <span className="ml-1 text-sm text-muted-foreground">({teacher.reviewCount})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{teacher.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {step === 2 && selectedTeacherData && (
            <Card>
              <CardHeader>
                <CardTitle>Select a Date</CardTitle>
                <CardDescription>
                  Choose an available date for your appointment with {selectedTeacherData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {selectedTeacherData.availableDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      className="h-20 flex flex-col gap-1"
                      onClick={() => handleSelectDate(date)}
                    >
                      <span className="text-xs">{format(new Date(date), "EEE")}</span>
                      <span className="text-lg font-bold">{format(new Date(date), "d")}</span>
                      <span className="text-xs">{format(new Date(date), "MMM")}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && selectedTeacherData && selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>Select a Time</CardTitle>
                <CardDescription>
                  Choose an available time slot on {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="h-12"
                      onClick={() => handleSelectTime(time)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && selectedTeacherData && selectedDate && selectedTime && (
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Complete your appointment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img
                      src={selectedTeacherData.image || "/placeholder.svg"}
                      alt={selectedTeacherData.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedTeacherData.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTeacherData.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}</div>
                      <div className="text-sm text-muted-foreground">{selectedTime}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Appointment Type</Label>
                    <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="grid gap-2 pt-2">
                      {appointmentTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Label htmlFor={type.id} className="flex flex-col">
                            <span className="font-medium">{type.label}</span>
                            <span className="text-sm text-muted-foreground">{type.description}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any specific topics or questions you'd like to discuss..."
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleBookAppointment} disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Booking..."
                  ) : (
                    <>
                      Book Appointment
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Search by Availability</CardTitle>
              <CardDescription>Find available teachers based on your preferred date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select your preferred time</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a date and time to see which teachers are available.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Date</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {format(new Date(date), "EEEE, MMMM d, yyyy")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="01:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="02:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="03:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="04:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4">
                  <Search className="mr-2 h-4 w-4" />
                  Find Available Teachers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
