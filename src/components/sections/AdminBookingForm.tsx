// src/components/sections/AdminBookingForm.tsx
import { useState } from 'react'

interface AdminBookingFormProps {
  initialData?: {
    id: number
    name: string
    date: string
    time: string
  }
  onSubmit: () => void
}

const AdminBookingForm = ({ initialData, onSubmit }: AdminBookingFormProps) => {
  const [name, setName] = useState(initialData?.name || '')
  const [date, setDate] = useState(initialData?.date || '')
  const [time, setTime] = useState(initialData?.time || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = initialData ? 'PUT' : 'POST'
    const url = '/api/admin'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: initialData?.id, name, date, time }),
    })

    if (res.ok) {
      onSubmit()
    } else {
      alert('Terjadi kesalahan saat menyimpan data!')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit' : 'Tambah'} Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Jam</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          {initialData ? 'Update' : 'Add'} Booking
        </button>
      </form>
    </div>
  )
}

export default AdminBookingForm
