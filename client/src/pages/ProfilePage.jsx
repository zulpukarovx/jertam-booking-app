import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { toast } from "sonner";
import ButtonDialog from "./ButtonDialog";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const {user, setUser} = useContext(UserContext);

    const logout = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/api/logout', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Logout failed: ${errorData.message || response.statusText}`); 
        }
        setRedirect(true);
        toast(`Goodbye, ${user.name}`);
        setUser(null);
      } catch (error) {
        console.error('Error during registration:', error);
        throw error; 
      }
    };

    if(redirect) {
      return <Navigate to='/' />;
    }


  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 0.5,
      }} 
      className="text-center max-w-xs pt-10"
    >
      Logged in as {user.name} ({user.email})<br />
      <ButtonDialog 
        buttonText="Log out"
        alertTitle="See you later?"
        alertDescription="👋  Just making sure you want to sign out!"
        dialogAction={logout}
      />
    </motion.div>
  )
}

export default ProfilePage