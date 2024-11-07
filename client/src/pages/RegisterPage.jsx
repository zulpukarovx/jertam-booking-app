import { motion } from "framer-motion";
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { toast } from "sonner";
import { Button } from "@/components/ui/button"

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const sendRegistrationRequest = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
        toast.error("All fields are required.");
        return; 
    }

    try {
        setIsLoading(true);
        const response = await fetch('http://localhost:4000/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();

            if (errorData.error === "User with this email already exists") {
                toast.error("An account with this email already exists.");
            } else {
                toast.error("Registration failed. Please try again later.");
            }
            throw new Error(errorData.error || 'Registration failed');
        }

        setRedirect(true); 
        toast.success('Registration successful! Now you can log in.');
    } catch (error) {
        console.error('Error during registration:', error);
    } finally {
      setIsLoading(false);
    }
};

  if (redirect) {
    return <Navigate to="/login" />
  };
  

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
          <h1 className="text-4xl text-center mb-4 font-semibold">Sign up</h1>
          <form className="max-w-sm mx-auto" onSubmit={sendRegistrationRequest}>
              <input 
                type="text" 
                placeholder="name" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <Button disabled={isLoading} className="w-full rounded-lg">Sign up</Button>
              <div className="text-center py-2 text-gray-500 text-sm">
                Already have an account? <Link to="/login" className="text-gray-950 font-semibold underline">Sign in</Link>
              </div>
          </form>
        </section>
    </motion.main>
  )
}

export default RegisterPage