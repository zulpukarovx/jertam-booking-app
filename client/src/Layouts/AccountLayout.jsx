import { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import NavigationLink from "../components/NavigationLink";

export const AccountLayout = () => {
  const { user, isLoading } = useContext(UserContext);

  if(isLoading) {
    return "Loading...";
  }
  
  if(!isLoading && !user) {
    return <Navigate to={'/'} replace />;
  }

  const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
  );
  
  const BookingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
    </svg>
  );
  
  const PlacesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
      <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
    </svg>
  );
  


  return (
    <motion.div
      layout
      className="px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <nav className="w-full sm:w-fit bg-zinc-100 inline-flex flex-col sm:flex-row mt-8 gap-2 rounded-lg p-1">
        <NavLink to="." end>
          {({ isActive }) => (
            <NavigationLink 
              isActive={isActive} 
              icon={<ProfileIcon />} 
              label="My Profile" 
            />
          )}
        </NavLink>
        <NavLink to="bookings">
          {({ isActive }) => (
            <NavigationLink
              isActive={isActive}
              icon={<BookingsIcon />}
              label="My Bookings"
            />
          )}
        </NavLink>
        <NavLink to="places">
          {({ isActive }) => (
            <NavigationLink
              isActive={isActive}
              icon={<PlacesIcon />}
              label="My Accommodations"
            />
          )}
        </NavLink>
      </nav>
      <Outlet /> 
    </motion.div>
  );
};



