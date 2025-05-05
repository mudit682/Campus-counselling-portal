"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  UserPlus,
  Download,
  Trash2,
  Edit,
  Mail,
  School,
  GraduationCap,
  ShieldCheck,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for users
const users = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    role: "student",
    department: "Computer Science",
    status: "active",
    lastActive: "2024-04-25T10:30:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user2",
    name: "Prof. Sarah Williams",
    email: "s.williams@university.edu",
    role: "teacher",
    department: "Computer Science",
    status: "active",
    lastActive: "2024-04-25T09:45:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user3",
    name: "Michael Brown",
    email: "m.brown@university.edu",
    role: "student",
    department: "Engineering",
    status: "inactive",
    lastActive: "2024-04-20T14:15:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user4",
    name: "Dr. Robert Chen",
    email: "r.chen@university.edu",
    role: "teacher",
    department: "Data Science",
    status: "active",
    lastActive: "2024-04-24T16:20:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user5",
    name: "Emily Davis",
    email: "e.davis@university.edu",
    role: "student",
    department: "Business",
    status: "active",
    lastActive: "2024-04-23T11:10:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user6",
    name: "James Wilson",
    email: "j.wilson@university.edu",
    role: "teacher",
    department: "Psychology",
    status: "active",
    lastActive: "2024-04-24T15:00:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user7",
    name: "Lisa Garcia",
    email: "l.garcia@university.edu",
    role: "student",
    department: "Arts",
    status: "active",
    lastActive: "2024-04-22T09:30:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user8",
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin",
    department: "IT Services",
    status: "active",
    lastActive: "2024-04-25T08:45:00Z",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const itemsPerPage = 5

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Paginate users
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }

  const handleDeleteUser = () => {
    if (userToDelete) {
      // In a real app, this would make an API call to delete the user
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      })
      setUserToDelete(null)
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return

    // In a real app, this would make an API call to perform the bulk action
    toast({
      title: `${action} successful`,
      description: `${action} performed on ${selectedUsers.length} users.`,
    })

    setSelectedUsers([])
  }

  const handleExportUsers = () => {
    toast({
      title: "Export started",
      description: "User data export has been initiated.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage all users in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/admin/users/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-[250px]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="teacher">Teachers</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span>User</span>
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Department</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Last Active</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              {user.role === "student" && (
                                <>
                                  <GraduationCap className="h-4 w-4 text-blue-500" />
                                  <span>Student</span>
                                </>
                              )}
                              {user.role === "teacher" && (
                                <>
                                  <School className="h-4 w-4 text-green-500" />
                                  <span>Teacher</span>
                                </>
                              )}
                              {user.role === "admin" && (
                                <>
                                  <ShieldCheck className="h-4 w-4 text-purple-500" />
                                  <span>Admin</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle">{user.department}</td>
                          <td className="p-4 align-middle">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{new Date(user.lastActive).toLocaleDateString()}</td>
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
                                  <Link href={`/dashboard/admin/users/${user.id}`}>View details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/users/${user.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit user
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => setUserToDelete(user.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete user
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {paginatedUsers.length} of {filteredUsers.length} users
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

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="bg-muted/80 fixed bottom-0 left-0 right-0 p-4 shadow-lg">
              <div className="container mx-auto flex items-center justify-between">
                <span className="font-medium">{selectedUsers.length} users selected</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => handleBulkAction("Email sent")}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Selected
                  </Button>
                  <Button variant="outline" onClick={() => handleBulkAction("Status updated")}>
                    Update Status
                  </Button>
                  <Button variant="destructive" onClick={() => handleBulkAction("Users deleted")}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Student management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>Manage teacher accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Teacher management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Manage administrator accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Administrator management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete User Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
