// src/app/admin/bookings/components/booking-table.tsx
'use client'

import { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '@/services/bookingService';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { BookingForm } from './booking-form';
// Tambahkan di bagian import
import { Booking } from '@/types/booking';

export function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus booking ini?')) return;
    
    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {editingBooking && (
        <BookingForm 
          initialData={editingBooking}
          onSuccess={() => {
            setEditingBooking(null);
            fetchBookings();
          }}
          onCancel={() => setEditingBooking(null)}
        />
      )}

      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
              <th className="px-6 py-3 text-left">Waktu</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">{booking.name}</td>
                <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4">{booking.time}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingBooking(booking)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}