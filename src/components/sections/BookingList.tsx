// src/components/sections/BookingList.tsx
'use client'  // Menandakan ini adalah Client Component

import { useEffect, useState } from 'react'

// Definisikan tipe Booking
interface Booking {
  name: string
  date: string
  time: string
}

const BookingList = () => {
  // Ganti any[] menjadi Booking[]
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/booking')
      const data: Booking[] = await res.json() // Tipe data di sini juga Booking[]
      setBookings(data)
    }

    fetchBookings()
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Booking</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Jam</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{booking.name}</td>
              <td className="px-4 py-2">{booking.date}</td>
              <td className="px-4 py-2">{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingList
