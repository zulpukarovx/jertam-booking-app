import { useEffect, useState } from "react";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingDatesBadge from "../components/BookingDatesBadge";
import { motion } from "framer-motion";

const MyBookingsPage = () => {
  const [bookings, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      setBooking(data);
      setIsLoading(false);
    }
    fetchBookings();
  }, [])

  if(isLoading) {
    return <div>Loading...</div>
  }
  

  const EmptyBookingArray = () => (
    <div className="py-4">
      <h2 className="font-bold text-xl">No booked places</h2>
    </div>
  )


  return (
    <motion.section
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 0.5,
      }} 
      className="pt-8"
    >
      <div>
        {bookings && bookings.map(booking => (
          <Link
            to={booking._id}
            className="flex bg-zinc-100 rounded-lg overflow-hidden gap-4" 
            key={booking._id}
          >
            <div className="h-auto w-40 sm:w-48 bg-gray-100 rounded-lg flex shrink-0 overflow-hidden">
              <PlaceImg place={booking.place} className="w-full object-cover" />
            </div>
            <div className="py-2 grow pr-4">
              <h2 className="font-semibold">{booking.place.title}</h2>
              <div className="my-2 gap-2 leading-4 text-sm">
                <BookingDatesBadge booking={booking} className="flex-row gap-4 text-xs sm:text-sm" />       
              </div>
              <hr></hr>
              <div
                className="text-gray-600 my-1"
              >{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | Total price: ${booking.price}</div>
            </div>
          </Link>
        ))}
        {
          bookings.length === 0 && <EmptyBookingArray />
        }
      </div>
    </motion.section>
  )
}

export default MyBookingsPage;