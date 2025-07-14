// src/app/api/admin/route.ts
import { NextResponse } from 'next/server';

// Interface untuk struktur data booking
interface Booking {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Menyimpan booking sementara (sebagai pengganti database)
const bookings: Booking[] = [];

// GET - Mengambil daftar booking
export async function GET() {
  return NextResponse.json(bookings);
}

// POST - Menambah booking baru
export async function POST(request: Request) {
  const data: Omit<Booking, 'id' | 'status'> & { duration: string } = await request.json();
  
  // Validasi data
  if (!data.name || !data.phone || !data.date || !data.time || !data.duration) {
    return NextResponse.json(
      { message: 'Semua kolom harus diisi!' }, 
      { status: 400 }
    );
  }

  // Hitung harga berdasarkan waktu booking
  const hour = parseInt(data.time.split(':')[0]);
  const duration = parseInt(data.duration);
  const isMorning = hour >= 8 && hour < 17;
  const basePrice = isMorning ? 80000 : 100000;
  const price = basePrice * duration;

  const newBooking: Booking = {
    id: Date.now(),
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    duration: duration,
    price: price,
    status: 'confirmed'
  };

  bookings.push(newBooking);

  return NextResponse.json(
    { 
      message: 'Booking berhasil ditambahkan!',
      booking: newBooking 
    },
    { status: 201 }
  );
}

// PUT - Mengupdate booking
export async function PUT(request: Request) {
  const data: Partial<Booking> & { id: number; duration?: string } = await request.json();

  if (!data.id) {
    return NextResponse.json(
      { message: 'ID booking harus disertakan!' },
      { status: 400 }
    );
  }

  const index = bookings.findIndex(booking => booking.id === data.id);
  if (index === -1) {
    return NextResponse.json(
      { message: 'Booking tidak ditemukan!' },
      { status: 404 }
    );
  }

  // Update data booking
  const updatedBooking = {
    ...bookings[index],
    ...data,
    duration: data.duration ? parseInt(data.duration) : bookings[index].duration
  };

  // Hitung ulang harga jika waktu atau durasi berubah
  if (data.time || data.duration) {
    const hour = parseInt(updatedBooking.time.split(':')[0]);
    const isMorning = hour >= 8 && hour < 17;
    const basePrice = isMorning ? 80000 : 100000;
    updatedBooking.price = basePrice * updatedBooking.duration;
  }

  bookings[index] = updatedBooking;

  return NextResponse.json(
    { 
      message: 'Booking berhasil diupdate!',
      booking: updatedBooking 
    },
    { status: 200 }
  );
}

// DELETE - Menghapus booking
export async function DELETE(request: Request) {
  const { id }: { id: number } = await request.json();

  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) {
    return NextResponse.json(
      { message: 'Booking tidak ditemukan!' },
      { status: 404 }
    );
  }

  bookings.splice(index, 1);

  return NextResponse.json(
    { message: 'Booking berhasil dihapus!' },
    { status: 200 }
  );
}