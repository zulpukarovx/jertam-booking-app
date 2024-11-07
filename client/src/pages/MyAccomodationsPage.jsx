import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccommodationCard from "../components/AccommodationCard";

const MyAccomodationsPage = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user-places', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch accommodations'); 
        }

        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 0.7,
      }} 
      className="pt-10"
    >
      <div>
        <Link to='add-new-hotels' className="inline-flex gap-2 bg-primary text-white px-4 py-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
          </svg>
          Add new hotels
        </Link>
      </div>
      <section
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          staggerChildren: 0.05,
        }}
        exit={{opacity: 0}} 
        className="pt-4 max-w-4xl flex flex-col gap-2"
      >
        {places && places.map((place, index) => (
          <AccommodationCard key={place._id} place={place} index={index} />
        ))}
      </section>
    </motion.div>
  )
}

export default MyAccomodationsPage;