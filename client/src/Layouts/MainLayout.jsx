import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { motion } from "framer-motion"

const MainLayout = () => {
  const { isLoading } = useContext(UserContext);

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col min-h-screen">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Header />
          <Outlet />
        </motion.main>
      )}
    </div>
  );
};

export default MainLayout;