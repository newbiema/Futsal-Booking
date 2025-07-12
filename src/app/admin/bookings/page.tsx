// src/app/admin/bookings/page.tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BookingTable } from './components/booking-table';
import { BookingForm } from './components/booking-form'; // Tambahkan ini

export default function BookingsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Booking</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Booking
        </Button>
      </div>

      {showForm && (
        <BookingForm 
          onSuccess={() => {
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <BookingTable />
    </div>
  );
}