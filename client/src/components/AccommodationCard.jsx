import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "./Image";

const AccommodationCard = ({ place, index }) => {
  return (
    <motion.div
        key={place._id}
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3, delay: index * 0.1}}
        className="bg-gray-50 p-4 rounded-lg flex flex-col xs:flex-row gap-4"
    >
        <Link to={`add-new-hotels/${place._id}`} className="h-32 sm:w-40 bg-gray-100 rounded-lg flex shrink-0 overflow-hidden">
            {place.photos && place.photos.length > 0 && (
                <Image 
                className="object-cover w-full h-full" 
                src={place.photos[0]}
                alt={place.title} 
                />
            )}
        </Link>
        <div className="relative">
            <h2>{place.title}</h2>
            <p className="text-sm mt-2 line-clamp-4">{place.description}</p>
            <span className="absolute inset-0 flex items-start justify-end opacity-0 hover:opacity-100 transition-all duration-200">
                <Link to={`add-new-hotels/${place._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </Link>
            </span>
        </div>
    </motion.div>
  )
};

export default AccommodationCard;