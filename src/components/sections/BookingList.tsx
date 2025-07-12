// src/components/sections/AdminBookingList.tsx
'use client'

import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

interface Booking {
  id: number;
  name: string;
  date: string;
  time: string;
}

const AdminBookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format tanggal menjadi lebih mudah dibaca
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Fetch data booking dari API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/admin');
        if (!response.ok) {
          throw new Error('Gagal mengambil data booking');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Daftar Booking</h2>
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Memuat data booking...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Daftar Booking</h2>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Daftar Booking Terkini</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Belum ada booking tersedia</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <li key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                          <FiUser className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{booking.name}</h3>
                          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                              <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              <p>{formatDate(booking.date)}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                              <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              <p>{booking.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminBookingList;