// src/components/layout/Header.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faHome, faCalendarAlt, faTrophy, faPhoneAlt, faUser, faBars, faTimes, faLock } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for shadow effect
      setScrolled(window.scrollY > 10)
      
      // Section detection logic
      const sections = ['home', 'features', 'pricing', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`sticky top-0 z-50 font-poppins transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-900 hover:text-gray-700 transition-colors flex items-center space-x-2 md:space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
            >
              <div className="p-2 rounded-lg bg-indigo-600 transform hover:scale-105 transition-transform">
                <FontAwesomeIcon icon={faFutbol} className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">FutsalPro</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => scrollToSection('home')}
              className={`px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center rounded-lg ${
                activeSection === 'home'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className={`px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center rounded-lg ${
                activeSection === 'features'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FontAwesomeIcon icon={faTrophy} className="mr-2" />
              Facilities
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center rounded-lg ${
                activeSection === 'pricing'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center rounded-lg ${
                activeSection === 'testimonials'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center rounded-lg ${
                activeSection === 'contact'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
              Contact
            </button>
            <Link
              href="/admin"
              className="ml-2 px-4 lg:px-6 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md flex items-center transform hover:scale-105 transition-transform"
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Login Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Main menu"
            >
              <FontAwesomeIcon 
                icon={mobileMenuOpen ? faTimes : faBars} 
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white shadow-lg">
          <button
            onClick={() => scrollToSection('home')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors ${
              activeSection === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-3 w-5 text-center" />
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors ${
              activeSection === 'features' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faTrophy} className="mr-3 w-5 text-center" />
            Facilities
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors ${
              activeSection === 'pricing' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 w-5 text-center" />
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors ${
              activeSection === 'testimonials' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-3 w-5 text-center" />
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection('kontak')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium flex items-center transition-colors ${
              activeSection === 'contact' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-3 w-5 text-center" />
            Contact
          </button>
          <div className="px-3 pt-2">
            <Link
              href="/booking"
              className="block w-full text-center px-4 py-3 rounded-full bg-indigo-600 text-white text-base font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header