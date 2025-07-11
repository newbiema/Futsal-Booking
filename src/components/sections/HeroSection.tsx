// src/components/sections/Hero.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendarAlt, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(1)
  const images = [
    "images/hero1.jpeg",
    "images/hero2.jpeg",

  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev % 3) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 animate-float1"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float2"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-float3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full mb-4">
              <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
              <span className="text-sm font-medium">Booking Lapangan #1 di Indonesia</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sewa <span className="text-indigo-600">Lapangan Futsal</span> Mudah & Cepat
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Booking lapangan futsal premium dalam beberapa klik saja. Nikmati kemudahan reservasi, ketersediaan real-time, dan konfirmasi instan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link 
                href="/booking" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-300 flex items-center justify-center transform hover:scale-105"
              >
                Booking Sekarang <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
              </Link>
              
              <button 
                onClick={() => document.getElementById('galeri')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg hover:shadow-gray-200 flex items-center justify-center transform hover:scale-105"
              >
                Lihat Fasilitas <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600" />
                </div>
                <span className="text-gray-700 font-medium">100+ Lapangan</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600" />
                </div>
                <span className="text-gray-700 font-medium">Buka 24 Jam</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600" />
                </div>
                <span className="text-gray-700 font-medium">Konfirmasi Instan</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative mt-8 md:mt-0">
            <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Image slider */}
              <div className="relative w-full h-full">
                {images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentImage === idx+1 ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${img})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-indigo-600/30"></div>
                  </div>
                ))}
              </div>
              
              {/* Image indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx+1)}
                    className={`w-3 h-3 rounded-full ${currentImage === idx+1 ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Gambar ${idx+1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-indigo-100 rounded-full -z-10 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-200 rounded-full -z-10 animate-pulse delay-300"></div>
            
            {/* Floating badge */}
            <div className="absolute -right-4 top-1/4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center transform rotate-3">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xs" />
              </div>
              <span className="text-sm font-medium text-gray-700">4.9/5 (2.500+ review)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(20px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

export default Hero