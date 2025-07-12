// src/app/admin/bookings/components/booking-form.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createBooking, updateBooking } from '@/services/bookingService';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// Tambahkan di bagian import
import { Booking } from '@/types/booking';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama minimal 2 karakter' }),
  date: z.string().min(1, { message: 'Tanggal harus diisi' }),
  time: z.string().min(1, { message: 'Waktu harus diisi' }),
});

export function BookingForm({
  initialData,
  onSuccess,
  onCancel,
}: {
  initialData?: Booking | null;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      date: '',
      time: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await updateBooking(initialData.id, values);
      } else {
        await createBooking(values);
      }
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan');
    }
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Booking</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Tambah'} Booking
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}