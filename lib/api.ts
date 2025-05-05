// This file would normally contain API calls to your backend
// For demo purposes, we'll return mock data

export async function fetchDashboardData(userRole: string | null) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data for dashboard
  return {
    appointmentSummary: {
      upcoming: 3,
      completed: 12,
      cancelled: 1,
    },
    recentAppointments: [
      {
        id: "appt1",
        studentName: "Alex Johnson",
        teacherName: "Dr. Jane Smith",
        date: "2024-04-25",
        time: "10:00 AM",
        status: "confirmed",
        subject: "Project Discussion",
      },
      {
        id: "appt2",
        studentName: "Maria Garcia",
        teacherName: "Prof. Michael Johnson",
        date: "2024-04-26",
        time: "2:00 PM",
        status: "pending",
        subject: "Thesis Review",
      },
    ],
    upcomingAppointments: [
      {
        id: "appt1",
        studentName: "Alex Johnson",
        teacherName: "Dr. Jane Smith",
        date: "2024-04-25",
        time: "10:00 AM",
        status: "confirmed",
        subject: "Project Discussion",
      },
      {
        id: "appt2",
        studentName: "Maria Garcia",
        teacherName: "Prof. Michael Johnson",
        date: "2024-04-26",
        time: "2:00 PM",
        status: "pending",
        subject: "Thesis Review",
      },
      {
        id: "appt3",
        studentName: "John Davis",
        teacherName: "Dr. Sarah Williams",
        date: "2024-04-29",
        time: "11:00 AM",
        status: "confirmed",
        subject: "Research Guidance",
      },
    ],
  }
}

export async function fetchTeacherDashboardData() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data for teacher dashboard
  return {
    appointmentSummary: {
      upcoming: 5,
      completed: 24,
      cancelled: 2,
    },
    totalStudents: 18,
    availabilityHours: 15,
    upcomingAppointments: [
      {
        id: "appt1",
        studentName: "Alex Johnson",
        date: "2024-04-25",
        time: "10:00 AM",
        status: "confirmed",
        subject: "Project Discussion",
      },
      {
        id: "appt2",
        studentName: "Maria Garcia",
        date: "2024-04-26",
        time: "2:00 PM",
        status: "pending",
        subject: "Thesis Review",
      },
      {
        id: "appt3",
        studentName: "John Davis",
        date: "2024-04-29",
        time: "11:00 AM",
        status: "confirmed",
        subject: "Research Guidance",
      },
      {
        id: "appt4",
        studentName: "Emily Wilson",
        date: "2024-04-30",
        time: "3:00 PM",
        status: "confirmed",
        subject: "Exam Preparation",
      },
    ],
    recentAppointments: [
      {
        id: "appt5",
        studentName: "David Lee",
        date: "2024-04-22",
        time: "1:00 PM",
        status: "completed",
        subject: "Career Guidance",
      },
      {
        id: "appt6",
        studentName: "Sarah Miller",
        date: "2024-04-21",
        time: "11:30 AM",
        status: "completed",
        subject: "Assignment Review",
      },
    ],
  }
}

interface BookAppointmentData {
  teacherId: string
  date: string
  time: string
  type: string
  notes?: string
}

export async function bookAppointment(data: BookAppointmentData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, this would make an API call to book the appointment
  console.log("Booking appointment with data:", data)

  // Return a mock response
  return {
    success: true,
    appointmentId: "appt" + Math.floor(Math.random() * 1000),
    message: "Appointment booked successfully",
  }
}
