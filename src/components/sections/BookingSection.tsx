// src/components/sections/BookingSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCalendarAlt, 
  faClock, 
  faUser, 
  faPhone, 
  faCheckCircle, 
  faSpinner,
  faFutbol,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    duration: '1',
    courtType: 'indoor'
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [price, setPrice] = useState(0)
  const [activeTab, setActiveTab] = useState('booking')
  
  // Generate available times (8:00 - 22:00 every hour)
  useEffect(() => {
    const times = []
    for (let i = 8; i <= 22; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`)
      if (i !== 22) times.push(`${i.toString().padStart(2, '0')}:30`)
    }
    setAvailableTimes(times)
  }, [])

  // Calculate price based on time and court type
  useEffect(() => {
    if (formData.time) {
      const hour = parseInt(formData.time.split(':')[0])
      const duration = parseInt(formData.duration)
      
      let basePrice = 0
      
      // Determine base price based on time
      if (hour >= 8 && hour < 17) { // 8AM - 5PM
        basePrice = formData.courtType === 'indoor' ? 80000 : 100000
      } else { // 5PM - 10PM
        basePrice = formData.courtType === 'indoor' ? 100000 : 120000
      }
      
      // VIP price is always higher
      if (formData.courtType === 'vip') {
        basePrice = hour >= 8 && hour < 17 ? 120000 : 150000
      }
      
      setPrice(basePrice * duration)
    }
  }, [formData.time, formData.duration, formData.courtType])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ text: '', type: '' })

    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setMessage({ text: 'Harap isi semua field yang wajib!', type: 'error' })
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage({ 
        text: 'Booking berhasil! Kami akan menghubungi via WhatsApp untuk konfirmasi.', 
        type: 'success' 
      })
      
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        duration: '1',
        courtType: 'indoor'
      })
    } catch (error) {
      setMessage({ 
        text: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami di 08123456789.', 
        type: 'error' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPricePeriod = () => {
    if (!formData.time) return ''
    const hour = parseInt(formData.time.split(':')[0])
    return hour >= 8 && hour < 17 ? ' (Harga Pagi/Siang)' : ' (Harga Malam)'
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  return (
    <section id="booking" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Booking <span className="text-indigo-600">Lapangan Futsal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Nikmati pengalaman bermain futsal terbaik dengan fasilitas premium
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('booking')}
              className={`flex-1 py-4 font-medium text-sm md:text-base transition-colors ${
                activeTab === 'booking' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Booking Lapangan
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex-1 py-4 font-medium text-sm md:text-base transition-colors ${
                activeTab === 'pricing' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              Info Harga
            </button>
          </div>

          <div className="md:flex">
            {/* Booking Form */}
            <div className={`md:w-2/3 p-6 md:p-8 ${activeTab !== 'booking' && 'hidden'}`}>
              <form onSubmit={handleSubmit}>
                <AnimatePresence>
                  {message.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mb-6 p-4 rounded-lg ${
                        message.type === 'error' 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="0812-3456-7890"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Date Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Booking <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Time Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jam Mulai <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                      </div>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                        required
                      >
                        <option value="">Pilih Jam</option>
                        {availableTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  {/* Duration Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durasi (Jam)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num.toString()}>{num} Jam</option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Court Type Field */}
                  <motion.div 
                    className="col-span-2 md:col-span-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipe Lapangan
                    </label>
                    <select
                      name="courtType"
                      value={formData.courtType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    >
                      <option value="indoor">Indoor {getPricePeriod()}</option>
                      <option value="outdoor">Outdoor {getPricePeriod()}</option>
                      <option value="vip">VIP {getPricePeriod()}</option>
                    </select>
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        Konfirmasi Booking
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </form>
            </div>

            {/* Pricing Info Tab */}
            <div className={`p-6 md:p-8 ${activeTab !== 'pricing' && 'hidden'}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Harga</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FontAwesomeIcon icon={faFutbol} className="text-blue-600 text-xl" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-800">Lapangan Indoor</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600">Pagi/Siang (08:00-17:00)</span>
                      <span className="font-semibold">Rp80.000/jam</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span className="text-gray-600">Malam (17:00-22:00)</span>
                      <span className="font-semibold">Rp100.000/jam</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <FontAwesomeIcon icon={faFutbol} className="text-indigo-600 text-xl" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-800">Lapangan Outdoor</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-indigo-100">
                      <span className="text-gray-600">Pagi/Siang (08:00-17:00)</span>
                      <span className="font-semibold">Rp100.000/jam</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span className="text-gray-600">Malam (17:00-22:00)</span>
                      <span className="font-semibold">Rp120.000/jam</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FontAwesomeIcon icon={faFutbol} className="text-purple-600 text-xl" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-800">Lapangan VIP</h4>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between py-2 border-b border-purple-100">
                      <span className="text-gray-600">Pagi/Siang (08:00-17:00)</span>
                      <span className="font-semibold">Rp120.000/jam</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span className="text-gray-600">Malam (17:00-22:00)</span>
                      <span className="font-semibold">Rp150.000/jam</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h4 className="font-bold text-yellow-800 mb-3">Promo Spesial!</h4>
                <ul className="text-yellow-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Diskon 10% untuk booking 3 jam atau lebih</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Gratis minuman untuk setiap booking di atas jam 8 malam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Paket grup (5+ orang) dapat harga khusus</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Booking Summary */}
            <div className={`md:w-1/3 bg-gradient-to-b from-indigo-600 to-blue-700 text-white p-6 md:p-8 ${activeTab !== 'booking' && 'hidden'}`}>
              <h3 className="text-xl font-bold mb-6">Ringkasan Booking</h3>
              
              <div className="space-y-4 mb-8">
                {formData.courtType && (
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-100">Tipe Lapangan:</span>
                    <span className="font-medium bg-white/10 px-3 py-1 rounded-full text-sm">
                      {formData.courtType === 'indoor' ? 'Indoor' : 
                       formData.courtType === 'outdoor' ? 'Outdoor' : 'VIP'}
                    </span>
                  </div>
                )}
                
                {formData.date && (
                  <div className="flex justify-between">
                    <span className="text-indigo-100">Tanggal:</span>
                    <span className="font-medium">
                      {formatDate(formData.date)}
                    </span>
                  </div>
                )}
                
                {formData.time && (
                  <div className="flex justify-between">
                    <span className="text-indigo-100">Jam:</span>
                    <span className="font-medium">
                      {formData.time} ({formData.duration} jam)
                    </span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-indigo-400">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Biaya:</span>
                    <span className="bg-white/20 px-4 py-2 rounded-lg">
                      {price > 0 ? `Rp${price.toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h4 className="font-bold mb-3 text-indigo-100">Ketentuan:</h4>
                <ul className="text-sm space-y-2 text-indigo-100">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Pembayaran dilakukan saat kedatangan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Booking dapat dibatalkan maksimal 3 jam sebelumnya</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Datang 15 menit sebelum waktu booking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingSection