// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/admin" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/booking" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Daftar Booking
          </Link>
        </li>
        <li>
          <Link href="/admin/booking/add" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Tambah Booking
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
