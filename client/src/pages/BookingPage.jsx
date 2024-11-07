import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import { differenceInCalendarDays, format } from "date-fns";
import BookingDatesBadge from "../components/BookingDatesBadge";
import ShowAllPhotos from "../components/ShowAllPhotos";

const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    const [showPhotos, setShowPhotos] = useState(false);

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
          const foundBooking = data.find(({_id}) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking)
          }
        }
        fetchBookings();
    }, [])

    if (!booking) return (<div>Loading...</div>)

      if (showPhotos) return (
        <ShowAllPhotos 
            place={booking.place}
            setShowPhotos={setShowPhotos}
        />
    )

  return (
    <section className="py-8 max-w-5xl mx-auto">
        <div className="p-4 border border-black rounded-lg mb-4">
            <h1 className="text-2xl leading-4">{booking.place.title}</h1>
            <AddressLink className="mt-2">{booking.place.address}</AddressLink>
        </div>
        <div className="bg-zinc-100 p-4 mb-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Booking information</h2>
            <BookingDatesBadge booking={booking} className="gap-4 text-sm" />
            <div
                className="bg-white py-2 px-4 border border-black rounded-lg inline-flex mt-4 text-sm md:text-md"
            >{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights | Total price: ${booking.price}</div>
        </div>
        <div 
            className="relative"
        >
            <div className="grid gap-2 grid-cols-[2fr_1fr] place-items-stretch">
                <div
                    onClick={() => setShowPhotos(prev => !prev)}
                    className="aspect-square flex rounded-lg overflow-hidden cursor-pointer"
                >
                    {booking.place.photos &&
                    (<img 
                        className="object-cover w-full"
                        src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                    />)}
                </div>
                <div className="grid gap-2">
                    {booking.place.photos && booking.place.photos.slice(1, 3).map(photo => (
                        <div
                            onClick={() => setShowPhotos(prev => !prev)}
                            key={photo}
                            className="aspect-square flex rounded-lg overflow-hidden cursor-pointer"
                        >
                            <img 
                                className="object-cover w-full"
                                src={`http://localhost:4000/uploads/${photo}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button 
                onClick={() => setShowPhotos(prev => !prev)}
                className="absolute px-3 pl-4 gap-1 text-sm flex items-center bottom-2 right-2 bg-white py-1 rounded-2xl
                hover:shadow-md hover:bg-opacity-100 shadow-gray-700 bg-opacity-70 transition-all duration-200"
            >
                More photos
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </span>
            </button>
        </div>
    </section>
  )
}

export default BookingPage