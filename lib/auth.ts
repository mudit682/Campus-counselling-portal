// This file would normally use Firebase Authentication
// For demo purposes, we'll use localStorage

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export async function signIn(email: string, password: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, any email/password combination works
  const user = {
    uid: "user123",
    email: email,
    displayName: email.split("@")[0],
    photoURL: null,
  }

  // Store in localStorage for demo
  localStorage.setItem("user", JSON.stringify(user))

  // Determine role based on email for demo purposes
  let role = "student"
  if (email.includes("teacher")) {
    role = "teacher"
  } else if (email.includes("admin")) {
    role = "admin"
  }

  localStorage.setItem("userRole", role)

  return { user, role }
}

export async function registerUser(data: RegisterData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, just return success
  // In a real app, this would create a Firebase user

  // Store the role from registration
  localStorage.setItem("userRole", data.role)

  return {
    success: true,
    message: "User registered successfully",
  }
}

export async function signOut() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  localStorage.removeItem("user")
  localStorage.removeItem("userRole")

  return true
}
