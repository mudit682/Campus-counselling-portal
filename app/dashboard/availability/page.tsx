"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { DashboardNav } from "@/components/dashboard-nav"

// Mock data for availability slots
const initialTimeSlots = [
  {
    id: "1",
    day: new Date(2024, 4, 15),
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    id: "2",
    day: new Date(2024, 4, 16),
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "3",
    day: new Date(2024, 4, 17),
    startTime: "10:00",
    endTime: "15:00",
  },
]

export default function AvailabilityPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const { toast } = useToast()

  const handleAddTimeSlot = () => {
    if (!date || !startTime || !endTime) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a date, start time, and end time.",
      })
      return
    }

    if (startTime >= endTime) {
      toast({
        variant: "destructive",
        title: "Invalid time range",
        description: "End time must be after start time.",
      })
      return
    }

    const newTimeSlot = {
      id: Date.now().toString(),
      day: date,
      startTime,
      endTime,
    }

    setTimeSlots([...timeSlots, newTimeSlot])
    setDate(undefined)
    setStartTime("")
    setEndTime("")

    toast({
      title: "Availability added",
      description: `Added availability for ${format(date, "PPP")} from ${startTime} to ${endTime}.`,
    })
  }

  const handleDeleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
    toast({
      title: "Availability removed",
      description: "The availability slot has been removed.",
    })
  }

  const handleSaveAvailability = () => {
    // In a real app, this would make an API call to save the availability
    toast({
      title: "Availability saved",
      description: "Your availability has been saved successfully.",
    })
  }

  // Generate time options from 8:00 to 20:00 in 30-minute intervals
  const timeOptions = []
  for (let hour = 8; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }
  timeOptions.push("20:00") // Add 8:00 PM

  return (
    <div className="space-y-8">
      <DashboardNav />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Availability</h1>
        <p className="text-muted-foreground">Set your available time slots for student appointments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Availability</CardTitle>
            <CardDescription>Select a date and time range when you're available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="grid w-full gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddTimeSlot} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Time Slot
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Availability</CardTitle>
            <CardDescription>Manage your current availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{format(slot.day, "PPP")}</p>
                        <p className="text-sm text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTimeSlot(slot.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No availability set</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add time slots when you're available for appointments.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAvailability} className="w-full" variant="default">
              <Save className="mr-2 h-4 w-4" />
              Save Availability
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
