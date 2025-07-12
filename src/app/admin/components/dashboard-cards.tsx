// src/app/admin/components/dashboard-cards.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, Users, Calendar, Clock } from "lucide-react"

export function DashboardCards() {
  // Data dummy - bisa diganti dengan data dari API
  const stats = [
    { title: "Total Bookings", value: "124", icon: <Calendar className="h-4 w-4" /> },
    { title: "Active Users", value: "56", icon: <Users className="h-4 w-4" /> },
    { title: "Upcoming", value: "18", icon: <Clock className="h-4 w-4" /> },
    { title: "Activities", value: "89", icon: <Activity className="h-4 w-4" /> },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}