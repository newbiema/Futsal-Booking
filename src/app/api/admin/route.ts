// src/app/api/admin/route.ts
import { NextResponse } from 'next/server';

// Menyimpan booking sementara
const bookings: { id: number; name: string; date: string; time: string }[] = [];

// GET - Mengambil daftar booking
export async function GET() {
  return NextResponse.json(bookings);
}

// POST - Menambah booking baru
export async function POST(request: Request) {
  const { name, date, time }: { name: string; date: string; time: string } = await request.json();

  if (!name || !date || !time) {
    return NextResponse.json({ message: 'Semua kolom harus diisi!' }, { status: 400 });
  }

  const newBooking = { id: Date.now(), name, date, time };
  bookings.push(newBooking);

  return NextResponse.json({ message: 'Booking berhasil ditambahkan!' }, { status: 201 });
}

// PUT - Mengupdate booking berdasarkan ID
export async function PUT(request: Request) {
  const { id, name, date, time }: { id: number; name: string; date: string; time: string } = await request.json();

  if (!id || !name || !date || !time) {
    return NextResponse.json({ message: 'Semua kolom harus diisi!' }, { status: 400 });
  }

  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Booking tidak ditemukan!' }, { status: 404 });
  }

  bookings[index] = { id, name, date, time };

  return NextResponse.json({ message: 'Booking berhasil diupdate!' }, { status: 200 });
}

// DELETE - Menghapus booking berdasarkan ID
export async function DELETE(request: Request) {
  const { id }: { id: number } = await request.json();

  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Booking tidak ditemukan!' }, { status: 404 });
  }

  bookings.splice(index, 1);

  return NextResponse.json({ message: 'Booking berhasil dihapus!' }, { status: 200 });
}
