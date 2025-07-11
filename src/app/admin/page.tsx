'use client'

import AdminBookingTable from '@/components/sections/AdminBookingTable'

const AdminPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <AdminBookingTable />
    </div>
  )
}

export default AdminPage
