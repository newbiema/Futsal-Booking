'use client'
import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faClock,
  faUser,
  faPhone,
  faCheckCircle,
  faSpinner,
  faFutbol
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { createBooking } from '@/services/bookingService'

interface Message {
  text: string
  type: 'success' | 'error' | ''
}

const generateTimeSlots = (startTime: string, duration: number): string[] => {
  const slots: string[] = []
  let [hour] = startTime.split(':').map(Number)

  for (let i = 0; i < duration; i++) {
    const currentHour = hour + i
    slots.push(`${currentHour.toString().padStart(2, '0')}:00`)
  }

  return slots
}

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    duration: '1'
  })

  const [message, setMessage] = useState<Message>({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [price, setPrice] = useState(0)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])

  const checkAvailability = useCallback(async () => {
    if (!formData.date) return
    try {
      const res = await fetch(`/api/admin?date=${formData.date}`)
      if (!res.ok) throw new Error('Gagal mengambil jadwal')
      const data = await res.json()

      const allSlots: string[] = []
      data.forEach((booking: any) => {
        const slots = generateTimeSlots(booking.time, parseInt(booking.duration))
        allSlots.push(...slots)
      })

      setBookedTimes(allSlots)
    } catch (err) {
      console.error(err)
    }
  }, [formData.date])

  useEffect(() => {
    checkAvailability()
  }, [checkAvailability])

  useEffect(() => {
    const times = []
    for (let i = 8; i <= 22; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`)
    }
    setAvailableTimes(times)
  }, [])

  useEffect(() => {
    if (formData.time) {
      const hour = parseInt(formData.time.split(':')[0])
      const duration = parseInt(formData.duration)
      const basePrice = hour >= 8 && hour < 17 ? 80000 : 100000
      setPrice(basePrice * duration)
    }
  }, [formData.time, formData.duration])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ text: '', type: '' })

    const { name, phone, date, time, duration } = formData
    if (!name || !phone || !date || !time || !duration) {
      setMessage({ text: 'Harap isi semua field!', type: 'error' })
      setIsSubmitting(false)
      return
    }

    try {
      await createBooking({
        name,
        phone,
        date,
        time,
        duration,
        price,
        status: 'confirmed'
      })

      setMessage({
        text: 'Booking berhasil! Kami akan menghubungi via WhatsApp.',
        type: 'success'
      })

      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        duration: '1'
      })
    } catch (err: any) {
      setMessage({
        text: err?.message || 'Gagal booking. Silakan coba lagi.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md md:max-w-2xl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FontAwesomeIcon icon={faFutbol} className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">Booking Lapangan Indoor</h2>
        </div>
        <p className="text-gray-600">Isi form berikut untuk melakukan reservasi</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-indigo-600" />
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
            placeholder="Nama anda"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faPhone} className="mr-2 text-indigo-600" />
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
            placeholder="0812-3456-7890"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-indigo-600" />
              Tanggal Booking
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-indigo-600" />
              Waktu Booking
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
              required
            >
              <option value="">Pilih Waktu</option>
              {availableTimes.map(time => {
                const slots = generateTimeSlots(time, parseInt(formData.duration))
                const isDisabled = slots.some(slot => bookedTimes.includes(slot))

                return (
                  <option key={time} value={time} disabled={isDisabled}>
                    {time} {isDisabled ? '(Tidak tersedia)' : ''}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-indigo-600" />
            Durasi (Jam)
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500"
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num.toString()}>{num} Jam</option>
            ))}
          </select>
        </div>

        {price > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-indigo-50 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-600">Total Biaya</p>
              <p className="text-lg font-bold text-indigo-700">
                {price.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
              {parseInt(formData.time?.split(':')[0] || '0') < 17
                ? "Harga Pagi/Siang"
                : "Harga Malam"}
            </div>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <FontAwesomeIcon icon={faSpinner} />
              </motion.span>
              Memproses...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCheckCircle} />
              Konfirmasi Booking
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-3 rounded-lg text-sm font-medium mt-2 ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

export default BookingSection
