import { motion } from 'framer-motion';
import React from 'react'

const NavigationLink = ({ isActive, icon, label }) => (
    <motion.div
      className={`py-2 px-5 gap-2 inline-flex ${isActive ? 'bg-white text-black rounded-lg shadow-md w-full' : ''}`} 
      initial={{ opacity: 0.5 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        transition: { duration: 0.2 } 
      }}
    >
      {icon}
      {label}
    </motion.div>
);

export default NavigationLink