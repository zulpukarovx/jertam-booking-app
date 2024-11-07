import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { baseUrl } from "../App";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(UserContext);

  const sendRequestLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(prev => !prev);
      const response = await fetch(baseUrl + '/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json(); 
          if (errorData.error === 'User not found') {
              toast.error('User not found. Please check your email.');
          } else if (errorData.error === 'Incorrect password') {
              toast.error('Incorrect password. Please try again.'); 
          } else {
              toast.error('Login failed. Please try again later.'); 
          }
          throw new Error(errorData.error || 'Login failed'); 
      };
      const data = await response.json();
      setUser(data);
      toast.success(`Hi ${data.name}, nice to see you again!`);
      setRedirect(true);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <motion.main
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 0.7,
      }} 
      className="mt-4 flex grow items-center justify-around"
    >
        <section className="mb-64">
          <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
          <form className="max-w-sm mx-auto" onSubmit={sendRequestLogin}>
              <input 
                type="email"
                required 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <input 
                type="password" 
                placeholder="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)} />
              <button disabled={isLoading} className="login-btn">Login</button>
              <div className="text-center py-2 text-gray-500 text-sm">
                Don't have an account yet? <Link to="/sign-up" className="text-gray-950 font-semibold underline">Sign up now</Link>
              </div>
          </form>
        </section>
    </motion.main>
  )
}

export default LoginPage