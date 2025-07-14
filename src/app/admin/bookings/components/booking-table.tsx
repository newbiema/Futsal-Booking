// src/app/admin/bookings/components/booking-table.tsx
'use client'

import { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '@/services/bookingService';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { BookingForm } from './booking-form';
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

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  const statusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

      <div className="rounded-md border overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No. HP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Waktu</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durasi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Harga</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.duration} jam</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatPrice(booking.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
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
