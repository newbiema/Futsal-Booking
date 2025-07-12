// src/app/page.tsx
'use client'

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import GallerySection from '@/components/sections/GallerySection';
import Footer from '@/components/layout/Footer'
import BookingList from '@/components/sections/BookingList';
// import Button from '@/components/ui/Button'


const LandingPage = () => {
  return (
    <div className="bg-gray-50 font-poppins min-h-screen flex flex-col">
      <div id='navbar'><Navbar /></div>
      <div id='hero'><HeroSection/></div>
      <div id='galeri'><GallerySection/></div>
      <div id='booking'><BookingList/></div>
      <div id='kontak'><Footer/></div>

    </div>
  )
}

export default LandingPage
