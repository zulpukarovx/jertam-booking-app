import { CalendarIcon } from "@radix-ui/react-icons"
import { differenceInCalendarDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { toast } from "sonner"
import { baseUrl } from "../App"

const BookingWidget = ({ place }) => {
    const {user} = useContext(UserContext);
    const [date, setDate] = useState({from: undefined, to: undefined,});
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [alertForm, setAlertForm] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if(date && date.from && date.to) {
        numberOfNights = differenceInCalendarDays(new Date(date.to), new Date(date.from));
    };
    

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingForm = {
            place: place._id,
            checkIn: date.from,
            checkOut: date.to, 
            numberOfGuests, 
            name,
            phone,
            price: numberOfNights * place.price
        };

        if (!user) {
            return toast.warning("Please log in to reserve");
        };

        for (const key in bookingForm) {
            if (bookingForm[key] === "" || bookingForm[key] === undefined || bookingForm[key] === null) {
                return setAlertForm(true);
            }
        };

        try {
            const response = await fetch(`${baseUrl}/api/bookings`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(bookingForm)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Saving a hotel failed: ${errorData.message || response.statusText}`); 
            }
            const data = await response.json();
            setRedirect(`/account/bookings/${data._id}`);
        } catch (error) {
            console.error('Error during booking:', error);
            throw error;
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

  return (
    <div className="bg-white p-4 rounded-lg">
        <div className="border-b text-center pb-1 bg-zinc-50 rounded-lg p-1">${place.price} / per night</div>
        <div className={cn("grid gap-2 my-2")}>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={`justify-between h-auto text-center font-normal 
                        text-sm p-2 ${!date && "text-muted-foreground"}`}
                >
                    <CalendarIcon />
                    {date?.from ? (
                    date.to ? (
                        <>
                            {format(date.from, "LLL dd, y")} - {" "}
                            {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(date.from, "LLL dd, y")
                    )
                    ) : (
                    <span className="text-left">Select your dates</span>
                    )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
        <div>
            <label htmlFor="guestsNum">Number of guests</label>
            <input 
                type="number" 
                id="guestsNum" 
                placeholder="2"
                value={numberOfGuests}
                onChange={e => setNumberOfGuests(e.target.value)}
            />
        </div>
        <AnimatePresence>
            {numberOfNights > 0 && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="mb-2"
                    key={1}
                >
                    <label htmlFor="name">Full name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="John Doe"
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="mobile">Phone number:</label>
                    <input 
                        type="tel" 
                        id="mobile"
                        placeholder="+Country code ..."
                        value={phone}
                        required
                        onChange={e => setPhone(e.target.value)}
                    />
                </motion.div>
            )}
            {alertForm && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="py-4 text-sm"
                    key={2}
                >
                    <span className="border flex gap-4 border-black rounded-lg py-2 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        Please fill in all the fields
                    </span>
                </motion.div>
            )}
            {numberOfNights > 0 && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="mb-2"
                >
                    {`Total: $${numberOfNights * place.price}`}
                </motion.div>
            )}
        </AnimatePresence>
        <Button
            
            onClick={handleBooking}
            className="w-full xs:w-fit mt-2"
        >
            Reserve
        </Button>
    </div>
  )
}

export default BookingWidget