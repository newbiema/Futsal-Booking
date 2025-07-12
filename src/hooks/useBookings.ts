// src/hooks/useBookings.ts
"use client"

import { useState, useEffect } from "react"

interface Booking {
  id: number
  name: string
  date: string
  time: string
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/admin")
      if (!response.ok) throw new Error("Failed to fetch bookings")
      const data = await response.json()
      setBookings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData: Omit<Booking, "id">) => {
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
      if (!response.ok) throw new Error("Failed to create booking")
      fetchBookings()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return false
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return { bookings, loading, error, createBooking, fetchBookings }
}