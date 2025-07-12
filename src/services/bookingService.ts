// src/services/bookingService.ts
import { Booking } from '@/types/booking';
const API_URL = '/api/admin';


export const getBookings = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Gagal mengambil data booking');
  return response.json();
};

export const createBooking = async (bookingData: Omit<Booking, 'id'>) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error('Gagal membuat booking');
  return response.json();
};

export const updateBooking = async (id: number, bookingData: Omit<Booking, 'id'>) => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...bookingData }),
  });
  if (!response.ok) throw new Error('Gagal memperbarui booking');
  return response.json();
};

export const deleteBooking = async (id: number) => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Gagal menghapus booking');
  return response.json();
};