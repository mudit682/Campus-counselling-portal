"use client"

import { useState } from "react"
import { Database, RefreshCw, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export default function SystemSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "UniSchedule",
    siteDescription: "University Appointment Booking System",
    contactEmail: "support@unischedule.edu",
    maxAppointmentsPerDay: "10",
    defaultAppointmentDuration: "60",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    reminderTime: "24",
    adminAlerts: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    sessionTimeout: "30",
    loginAttempts: "5",
  })

  // Integration settings
  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: true,
    outlookCalendar: false,
    smsProvider: "twilio",
  })

  const handleGeneralSettingChange = (field: string, value: string) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    })
  }

  const handleNotificationSettingChange = (field: string, value: boolean | string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value,
    })
  }

  const handleSecuritySettingChange = (field: string, value: boolean | string) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value,
    })
  }

  const handleIntegrationSettingChange = (field: string, value: boolean | string) => {
    setIntegrationSettings({
      ...integrationSettings,
      [field]: value,
    })
  }

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call to save settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleResetSettings = () => {
    // In a real app, this would reset to default values from the server
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure and manage system-wide settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={generalSettings.siteName}
                    onChange={(e) => handleGeneralSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => handleGeneralSettingChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => handleGeneralSettingChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <h3 className="text-lg font-medium">Appointment Settings</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="max-appointments">Maximum Appointments Per Day</Label>
                  <Input
                    id="max-appointments"
                    type="number"
                    value={generalSettings.maxAppointmentsPerDay}
                    onChange={(e) => handleGeneralSettingChange("maxAppointmentsPerDay", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of appointments a teacher can have per day
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-duration">Default Appointment Duration (minutes)</Label>
                  <Input
                    id="default-duration"
                    type="number"
                    value={generalSettings.defaultAppointmentDuration}
                    onChange={(e) => handleGeneralSettingChange("defaultAppointmentDuration", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Default duration for new appointments</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for appointments and system events
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send SMS notifications for appointments and system events
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationSettingChange("smsNotifications", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders before scheduled appointments</p>
                </div>
                <Switch
                  id="appointment-reminders"
                  checked={notificationSettings.appointmentReminders}
                  onCheckedChange={(checked) => handleNotificationSettingChange("appointmentReminders", checked)}
                />
              </div>

              {notificationSettings.appointmentReminders && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="reminder-time">Reminder Time (hours before appointment)</Label>
                  <Input
                    id="reminder-time"
                    type="number"
                    value={notificationSettings.reminderTime}
                    onChange={(e) => handleNotificationSettingChange("reminderTime", e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="admin-alerts">Admin Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send alerts to administrators for important system events
                  </p>
                </div>
                <Switch
                  id="admin-alerts"
                  checked={notificationSettings.adminAlerts}
                  onCheckedChange={(checked) => handleNotificationSettingChange("adminAlerts", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require two-factor authentication for all users</p>
                </div>
                <Switch
                  id="two-factor-auth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecuritySettingChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input
                  id="password-expiry"
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => handleSecuritySettingChange("passwordExpiry", e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Number of days before users are required to change their password (0 for never)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSecuritySettingChange("sessionTimeout", e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Time of inactivity before a user is automatically logged out
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                <Input
                  id="login-attempts"
                  type="number"
                  value={securitySettings.loginAttempts}
                  onChange={(e) => handleSecuritySettingChange("loginAttempts", e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Number of failed login attempts before account is temporarily locked
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure third-party service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="google-calendar">Google Calendar</Label>
                  <p className="text-sm text-muted-foreground">Sync appointments with Google Calendar</p>
                </div>
                <Switch
                  id="google-calendar"
                  checked={integrationSettings.googleCalendar}
                  onCheckedChange={(checked) => handleIntegrationSettingChange("googleCalendar", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="outlook-calendar">Outlook Calendar</Label>
                  <p className="text-sm text-muted-foreground">Sync appointments with Outlook Calendar</p>
                </div>
                <Switch
                  id="outlook-calendar"
                  checked={integrationSettings.outlookCalendar}
                  onCheckedChange={(checked) => handleIntegrationSettingChange("outlookCalendar", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <Select
                  value={integrationSettings.smsProvider}
                  onValueChange={(value) => handleIntegrationSettingChange("smsProvider", value)}
                >
                  <SelectTrigger id="sms-provider" className="max-w-xs">
                    <SelectValue placeholder="Select SMS provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="nexmo">Nexmo</SelectItem>
                    <SelectItem value="messagebird">MessageBird</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Provider for sending SMS notifications</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="Enter API key" className="max-w-md" />
                <p className="text-xs text-muted-foreground">API key for the selected SMS provider</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetSettings}>
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>Manage system maintenance tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Database Management</h3>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Backup Database
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Optimize Database
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Cache Management</h3>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button variant="outline" className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Clear System Cache
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Rebuild Indexes
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Database Size</span>
                      <span className="font-medium">245 MB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Users</span>
                      <span className="font-medium">1,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Appointments</span>
                      <span className="font-medium">3,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Backup</span>
                      <span className="font-medium">April 24, 2024 (2 days ago)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Maintenance Mode</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the system in maintenance mode (only admins can access)
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
