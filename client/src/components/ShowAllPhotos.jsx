import { motion } from "framer-motion"
import Image from "../components/Image"

const ShowAllPhotos = ({place, setShowPhotos}) => {

  return (
    <motion.div 
        className="absolute bg-white inset-0 min-h-screen z-50"
        initial={{y: 200}}
        animate={{y: 0}}
        exit={{y: 200}}
        transition={{
            bounce: 0.2,
        }}
    >
        <div className=" relative mx-auto max-w-3xl p-8 grid gap-4">
            <div>
                <button 
                    onClick={() => setShowPhotos(prev => !prev)}
                    className="px-4 py-1 bg-black text-white 
                    hover:bg-gray-800 transition-all duration-200 
                    rounded-full shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {place.photos && place.photos.map(photo => (
                <div 
                    key={photo}
                >
                    <Image
                        className="object-cover"
                        src={photo}
                    />
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default ShowAllPhotos