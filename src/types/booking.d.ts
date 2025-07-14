// src/types/booking.d.ts
export interface Booking {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}
