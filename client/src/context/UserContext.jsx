import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!user) {
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch('http://localhost:4000/api/profile', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                    });
            
                    if (response.ok) { 
                        const data = await response.json();
                        setUser(data);
                    } 
                    } catch (error) {
                        console.error("Error fetching user info:", error); 
                    } finally {
                        setIsLoading(false); 
                    }
            }
            fetchUserInfo();
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoading}}>
            { children }
        </UserContext.Provider>
    );
}