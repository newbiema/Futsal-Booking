// src/app/admin/page.tsx
'use client'

import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'
import AdminBookingList from '@/components/sections/AdminBookingList'
import AdminBookingForm from '@/components/sections/AdminBookingForm'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false)
  const pathname = usePathname()

  const handleFormSubmit = () => {
    setShowForm(false)
  }

  // Determine if we're on the add booking page
  const isAddBookingPage = pathname === '/admin/booking/add'

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - using your existing Sidebar component */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {isAddBookingPage ? 'Tambah Booking Baru' : 'Manajemen Booking'}
          </h1>
          
          {!isAddBookingPage && (
            <Link 
              href="/admin/booking/add"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
            >
              <FaPlus />
              <span>Tambah Booking</span>
            </Link>
          )}
        </div>

        {/* Conditional Content Rendering */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isAddBookingPage ? (
            <AdminBookingForm onSubmit={handleFormSubmit} />
          ) : (
            <AdminBookingList />
          )}
        </div>

        {/* Stats Cards (optional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium">Total Booking</h3>
            <p className="text-3xl font-bold mt-2">124</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium">Booking Hari Ini</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium">Pendapatan Bulan Ini</h3>
            <p className="text-3xl font-bold mt-2">Rp12.450.000</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPage