import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "./Image";


const PlaceCard = ({ place, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay for stagger effect
    >
      <Link to={`/place/${place._id}`} className="bg-gray-200 rounded-lg overflow-hidden aspect-square flex mb-2">
        {place.photos && place.photos.length > 0 && (
          <Image
            className="object-cover w-full"
            src={place.photos[0]}
            alt={`Photo of ${place.title}`}
          />
        )}
      </Link>
      <h2 className="text-sm truncate">{place.title}</h2>
      <h3 className="text-xs text-gray-400 leading-3">{place.address}</h3>
      <div className="text-xs mt-1 text-gray-600">
        <span className="font-bold">${place.price}</span> per night
      </div>
    </motion.div>
);

export default PlaceCard