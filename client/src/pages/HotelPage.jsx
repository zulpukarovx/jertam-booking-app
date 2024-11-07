import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget";
import { AnimatePresence, motion } from "framer-motion";
import AddressLink from "../components/AddressLink";
import ShowAllPhotos from "../components/ShowAllPhotos";
import Image from "../components/Image";
import HotelPerks from "../components/HotelPerks";
import { baseUrl } from "../App";



const HotelPage = () => {
    
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPhotos, setShowPhotos] = useState(false);
    

    useEffect(() => {
        if (!id) {
            return
        }
        const fetchPlace = async () =>  {
            try {
                const response = await fetch(`${baseUrl}/api/place/${id}`);
                const data = await response.json();
                setPlace(data)
            } catch (error) {
                throw new error;
                console.log(error)
            } finally {setIsLoading(false)}
        }
        fetchPlace();
    }, [id])

    if (!place) return (<div>Loading...</div>)

    if (showPhotos) return (
        <ShowAllPhotos 
            place={place}
            setShowPhotos={setShowPhotos}
        />
    )

  return (
    <AnimatePresence>
    <motion.section
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 0.7,
        }}
        className="py-8 bg-gray-100 px-4 md:px-12 lg:px-24 max-w-5xl mx-auto"
    >
        <h1 className="text-2xl md:text-3xl">{place.title}</h1>
        <AddressLink className="my-2">{place.address}</AddressLink>
        <div 
            className="relative"
        >
            <div className="grid gap-2 grid-cols-[2fr_1fr] place-items-stretch">
                <div
                    onClick={() => setShowPhotos(prev => !prev)}
                    className="aspect-square flex rounded-lg overflow-hidden cursor-pointer"
                >
                    {place.photos &&
                    (<Image 
                        className="object-cover w-full"
                        src={place.photos[0]}
                    />)}
                </div>
                <div className="grid gap-2">
                    {place.photos && place.photos.slice(1, 3).map(photo => (
                        <div
                            onClick={() => setShowPhotos(prev => !prev)}
                            key={photo}
                            className="aspect-square flex rounded-lg overflow-hidden cursor-pointer"
                        >
                            <Image 
                                className="object-cover w-full"
                                src={photo} 
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
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr] gap-4">
            <div className="text-sm">
                <div className="mb-3">
                    <h1 className="font-bold text-xl mb-2">About this place</h1>
                    <p className="text-sm leading-4">{place.description}</p>
                </div>
                Check-in: <b>{place.checkIn}</b> <br />
                Check-out: <b>{place.checkOut}</b> <br />
                Max Guests: <b>{place.maxGuests}</b>
            </div>
            <BookingWidget place={place} />
        </div>
        <div className="text-sm text-gray-700 leading-4 bg-white
        p-4 rounded-lg">
            <h2 className="font-bold text-xl mb-2">Extra info</h2>
            {place.extraInfo}
        </div>
        <div className="bg-white p-4 rounded-lg mt-4">
            <h3 className="font-bold text-xl mb-2">What this place offers</h3>
            {place.perks && place.perks.length > 0 && 
            <HotelPerks perks={place.perks} className="grid gap-x-3 grid-cols-1 xs:grid-cols-2" />}
        </div>
    </motion.section>
    </AnimatePresence>
  )
}

export default HotelPage