// src/components/layout/Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/bookingfutsal" },
    { icon: <FaInstagram />, url: "https://instagram.com/bookingfutsal" },
    { icon: <FaTwitter />, url: "https://twitter.com/bookingfutsal" }
  ]

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "Jl. Futsal No. 123, Kota Anda" },
    { icon: <FaPhone />, text: "(021) 1234-5678" },
    { icon: <FaEnvelope />, text: "info@bookingfutsal.com" }
  ]

  return (
<footer className="bg-gradient-to-b from-blue-800 to-blue-900 text-white">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Tentang Kami */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-5 text-blue-100">Booking Futsal</h3>
        <p className="text-blue-200 leading-relaxed">
          Platform booking lapangan futsal terbaik dengan fasilitas lengkap dan harga terjangkau untuk pengalaman bermain terbaik.
        </p>
      </div>

      {/* Kontak */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-5 text-blue-100">Hubungi Kami</h3>
        <ul className="space-y-3">
          {contactInfo.map((item, index) => (
            <li key={index} className="flex items-center justify-center md:justify-start">
              <span className="mr-3 text-blue-300 text-xl">{item.icon}</span>
              <span className="text-blue-200 hover:text-white transition-colors duration-200">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sosial Media */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-5 text-blue-100">Ikuti Kami</h3>
        <div className="flex justify-center md:justify-start space-x-5">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white text-3xl transition-all duration-300 transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-blue-700 mt-12 pt-8 text-center">
      <p className="text-blue-300">
        &copy; {currentYear} Booking Futsal. All rights reserved.
      </p>
      <div className="mt-4 flex justify-center space-x-6">
        <a href="/privacy" className="text-blue-300 hover:text-white transition-colors duration-300 text-sm font-medium">
          Kebijakan Privasi
        </a>
        <a href="/terms" className="text-blue-300 hover:text-white transition-colors duration-300 text-sm font-medium">
          Syarat & Ketentuan
        </a>
        <a href="/faq" className="text-blue-300 hover:text-white transition-colors duration-300 text-sm font-medium">
          FAQ
        </a>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer