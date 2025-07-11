// src/components/sections/BookingList.tsx
'use client'

import { useEffect, useState } from 'react'
import { FaUser, FaCalendarAlt, FaClock, FaTrash } from 'react-icons/fa'

interface Booking {
  id: string
  name: string
  date: string
  time: string
  field?: string
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/booking')
        const data: Booking[] = await res.json()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/booking/${id}`, { method: 'DELETE' })
      setBookings(bookings.filter(booking => booking.id !== id))
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg mt-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Daftar Booking</h2>
        <p className="text-gray-500">Belum ada booking yang tercatat</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Daftar Booking Terkini</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div 
            key={booking.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                {booking.name}
              </h3>
              <button 
                onClick={() => handleDelete(booking.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
                aria-label="Hapus booking"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{formatDate(booking.date)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2 text-blue-500" />
                <span>{booking.time}</span>
              </div>
              
              {booking.field && (
                <div className="flex items-center text-gray-600">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Lapangan {booking.field}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingList