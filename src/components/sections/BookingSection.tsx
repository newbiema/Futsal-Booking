// src/components/sections/BookingSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faUser, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

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
  
  // Generate available times (8:00 - 22:00 every hour)
  useEffect(() => {
    const times = []
    for (let i = 8; i <= 22; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`)
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

  return (
    <section id="booking" className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Booking <span className="text-indigo-600">Lapangan Futsal</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Harga spesial pagi/siang (08:00-17:00): Rp80.000 (indoor), Rp100.000 (outdoor)
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Booking Form */}
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit}>
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'error' 
                      ? 'bg-red-50 text-red-700' 
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor HP/WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0812-3456-7890"
                      required
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                        required
                      >
                        <option value="">Pilih Jam</option>
                        {availableTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durasi (Jam)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num.toString()}>{num} Jam</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipe Lapangan
                    </label>
                    <select
                      name="courtType"
                      value={formData.courtType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="indoor">Indoor {getPricePeriod()}</option>
                      <option value="outdoor">Outdoor {getPricePeriod()}</option>
                      <option value="vip">VIP (Rp120.000-150.000)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-300/50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Konfirmasi Booking
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="md:w-1/3 bg-indigo-600 text-white p-8">
              <h3 className="text-xl font-bold mb-6">Ringkasan Booking</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-indigo-100">Tipe Lapangan:</span>
                  <span className="font-medium">
                    {formData.courtType === 'indoor' ? 'Indoor' : 
                     formData.courtType === 'outdoor' ? 'Outdoor' : 'VIP'}
                  </span>
                </div>
                
                {formData.date && (
                  <div className="flex justify-between">
                    <span className="text-indigo-100">Tanggal:</span>
                    <span className="font-medium">
                      {new Date(formData.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                
                {formData.time && (
                  <div className="flex justify-between">
                    <span className="text-indigo-100">Jam:</span>
                    <span className="font-medium">
                      {formData.time} - {formData.duration} jam
                      {getPricePeriod()}
                    </span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-indigo-400">
                  <div className="flex justify-between font-bold">
                    <span>Total Biaya:</span>
                    <span>
                      {price > 0 ? `Rp${price.toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-700/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Informasi Harga:</h4>
                <ul className="text-sm space-y-2 text-indigo-100">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>Pagi/Siang (08:00-17:00):</strong> Rp80.000 (indoor), Rp100.000 (outdoor)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingSection