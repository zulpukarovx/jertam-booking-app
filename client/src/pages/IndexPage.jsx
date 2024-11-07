import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react"
import PlaceCard from "../components/PlaceCard";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/places/'); // Assuming API is on the same origin
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        const data = await response.json();
        setPlaces(data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, [])


  if (isLoading) {
    return <div>Loading places...</div>;
  }



  return (
    <AnimatePresence>
      <motion.section
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          type: "spring", 
          bounce: 0, 
          delayChildren: 0.3, 
          staggerChildren: 0.05, 
          duration: 0.7,
        }}
        exit={{opacity: 0}}
        className="pt-8 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8"
      >
        {places.map((place, index) => (
          <PlaceCard key={place._id} place={place} index={index} />
        ))}
      </motion.section>
    </AnimatePresence>
  )
}

export default IndexPage;