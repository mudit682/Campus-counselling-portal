"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  userRole: "student" | "teacher" | "admin" | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin" | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate auth state change
  useEffect(() => {
    // This would normally be a Firebase auth listener
    const checkAuth = () => {
      // For demo purposes, check if we have a user in localStorage
      const savedUser = localStorage.getItem("user")
      const savedRole = localStorage.getItem("userRole") as "student" | "teacher" | "admin" | null

      if (savedUser) {
        setUser(JSON.parse(savedUser))
        setUserRole(savedRole)
      } else {
        setUser(null)
        setUserRole(null)
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const signOut = async () => {
    // This would normally call Firebase signOut
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    setUser(null)
    setUserRole(null)

    // Redirect to home page would happen in the component
  }

  const value = {
    user,
    userRole,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
