// src/components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaPlusCircle, 
  FaUsers, 
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'
import { useState } from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const menuItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <FaTachometerAlt className="text-lg" />
    },
    {
      path: '/admin/booking',
      name: 'Daftar Booking',
      icon: <FaCalendarAlt className="text-lg" />
    },
    {
      path: '/admin/booking/add',
      name: 'Tambah Booking',
      icon: <FaPlusCircle className="text-lg" />
    },
    {
      path: '/admin/users',
      name: 'Manajemen User',
      icon: <FaUsers className="text-lg" />
    },
    {
      path: '/admin/settings',
      name: 'Pengaturan',
      icon: <FaCog className="text-lg" />
    }
  ]

  return (
    <div 
      className={`h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute -right-3 top-6 bg-gray-700 text-white p-1 rounded-full shadow-md hover:bg-indigo-600 transition-all ${hovered ? 'opacity-100' : 'opacity-0'} z-10`}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Logo/Brand */}
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        {collapsed ? (
          <div className="text-2xl font-bold text-indigo-400">FP</div>
        ) : (
          <h2 className="text-xl font-bold text-white">
            <span className="text-indigo-400">Futsal</span>Pro
          </h2>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-2 p-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              href={item.path}
              className={`flex items-center p-3 rounded-lg transition-all ${pathname === item.path ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <Link 
          href="/logout" 
          className="flex items-center p-3 rounded-lg hover:bg-gray-700 text-gray-300 transition-all"
        >
          <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
            <FaSignOutAlt className="text-lg" />
          </span>
          {!collapsed && (
            <span className="font-medium">Logout</span>
          )}
        </Link>
      </div>

      {/* Collapsed Tooltips */}
      {collapsed && hovered && (
        <div className="absolute left-full ml-2 bg-gray-800 text-white text-sm rounded-md shadow-lg py-1 z-20">
          {menuItems.map((item) => (
            <div key={item.path} className="px-3 py-2 whitespace-nowrap">
              {item.name}
            </div>
          ))}
          <div className="px-3 py-2 whitespace-nowrap">Logout</div>
        </div>
      )}
    </div>
  )
}

export default Sidebar