// src/components/sections/AdminBookingList.tsx
import { useState, useEffect } from 'react'

interface Booking {
  id: number
  name: string
  date: string
  time: string
}

const AdminBookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/admin')
      const data: Booking[] = await res.json()
      setBookings(data)
    }

    fetchBookings()
  }, [])

  const handleDelete = async (id: number) => {
    const res = await fetch('/api/admin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      setBookings(bookings.filter(booking => booking.id !== id))
    } else {
      alert('Terjadi kesalahan saat menghapus booking!')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Booking</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">Tanggal</th>
            <th className="px-4 py-2 text-left">Jam</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-2">{booking.name}</td>
              <td className="px-4 py-2">{booking.date}</td>
              <td className="px-4 py-2">{booking.time}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminBookingList
