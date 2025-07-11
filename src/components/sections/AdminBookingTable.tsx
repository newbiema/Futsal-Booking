'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Booking {
  id: number
  name: string
  date: string
  time: string
}

const AdminBookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/booking')
      const data = await res.json()
      setBookings(data)
    }

    fetchData()
  }, [])

  return (
    <Card className="mt-8">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Daftar Booking</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jam</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.name}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell>{b.time}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminBookingTable
