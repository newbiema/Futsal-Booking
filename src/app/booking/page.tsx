// src/app/booking/page.tsx
import BookingSection from '@/components/sections/BookingSection'
import BookingList from '@/components/sections/BookingList'

const BookingPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <BookingSection />  {/* Form untuk booking */}
      <BookingList />     {/* Menampilkan daftar booking */}
    </div>
  )
}

export default BookingPage
