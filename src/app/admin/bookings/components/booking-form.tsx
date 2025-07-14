// src/app/admin/bookings/components/booking-form.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createBooking, updateBooking } from '@/services/bookingService'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Booking } from '@/types/booking'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'

// Define price structure
const PRICES = {
  morning: 80000, // 8:00 - 16:30
  evening: 100000 // 17:00 - 22:00
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama minimal 2 karakter' }),
  phone: z.string().min(10, { message: 'Nomor WhatsApp minimal 10 digit' }).regex(/^[0-9]+$/, {
    message: 'Hanya angka yang diperbolehkan'
  }),
  date: z.string().min(1, { message: 'Tanggal harus diisi' }),
  time: z.string().min(1, { message: 'Waktu harus diisi' }),
  duration: z.string().min(1, { message: 'Durasi harus dipilih' }),
})

export function BookingForm({
  initialData,
  onSuccess,
  onCancel,
}: {
  initialData?: Booking | null
  onSuccess: () => void
  onCancel: () => void
}) {
  const [price, setPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      phone: '',
      date: '',
      time: '',
      duration: '1',
    },
  })

  // Calculate price when time or duration changes
  useEffect(() => {
    const time = form.watch('time')
    const duration = form.watch('duration')

    if (time && duration) {
      const hour = parseInt(time.split(':')[0])
      const isMorning = hour >= 8 && hour < 17
      const basePrice = isMorning ? PRICES.morning : PRICES.evening
      setPrice(basePrice * parseInt(duration))
    }
  }, [form.watch('time'), form.watch('duration')])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      const bookingData = {
        ...values,
        price,
        status: 'confirmed'
      }

      if (initialData) {
        await updateBooking(initialData.id, bookingData)
      } else {
        await createBooking(bookingData)
      }
      onSuccess()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate time options from 8:00 to 22:00
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 8; hour <= 22; hour++) {
      options.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour !== 22) {
        options.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    return options
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? 'Edit Booking' : 'Tambah Booking Baru'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Customer</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="081234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Booking</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Field */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Booking</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateTimeOptions().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration Field */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durasi (Jam)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Jam
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Price Display */}
          {price > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Biaya</p>
                  <p className="text-xl font-bold text-blue-700">
                    {formatCurrency(price)}
                  </p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {form.watch('time') && parseInt(form.watch('time').split(':')[0]) < 17
                    ? "Harga Pagi/Siang"
                    : "Harga Malam"}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {initialData ? 'Menyimpan...' : 'Menambahkan...'}
                </>
              ) : (
                initialData ? 'Update Booking' : 'Tambah Booking'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}