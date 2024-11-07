import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const Header = () => {

    const {user} = useContext(UserContext);

  return (
    <header className="w-full flex justify-between px-4 py-6">
        <Link to="/" className="logo font-poppins flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
            </svg>
            <span className="leading-none">jer tam<br></br>BOOKING</span>
        </Link>
        {
            user ? (
                <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 transition-all 
                hover:shadow-md shadow-gray-300 ease-in-out duration-300">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to="/account">Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link to="/account/bookings">Bookings</Link></DropdownMenuItem>
                            <DropdownMenuItem disabled>Subscription</DropdownMenuItem>
                            <DropdownMenuItem><Link to="/account/places">Accomodations</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to="account" className="flex gap-2">
                        <div className="bg-gray-400 text-white rounded-full border
                        border-gray-400 overflow-hidden cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            {user.name}
                        </div>
                    </Link>
                </div>
            ) : (<Link className="font-semibold underline" to="/login">Sign-in</Link>)
        }
    </header>
  )
}

export default Header