import { useEffect, useState } from "react";
import Perks from "../components/Perks"
import { Link, Navigate, useParams } from "react-router-dom";
import PhotoUploader from "../components/PhotoUploader";
import { baseUrl } from "../App";


const AddNewHotels = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
      if (!id) {
          return
      }
      const fetchPlaces = async () =>  {
          try {
              const response = await fetch(`${baseUrl}/api/user-places/${id}`, {
                  method: "GET",
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include',
              });
              const data = await response.json();
              setTitle(data.title);
              setAddress(data.address);
              setAddedPhotos(data.photos);
              setDescription(data.description);
              setPerks(data.perks);
              setExtraInfo(data.extraInfo);
              setCheckIn(data.checkIn);
              setCheckOut(data.checkOut);
              setMaxGuests(data.maxGuests);
              setPrice(data.price)
          } catch (error) {
            throw new error;
            console.log(error)
          }
      }
      fetchPlaces();
    }, [id])

    const savePlace = async (e) => {
      e.preventDefault();
      const hotelForm = {
        title, 
        address, 
        addedPhotos, 
        description, 
        perks,
        extraInfo,
        checkIn,
        checkOut, 
        maxGuests,
        price,
      }
      if (id) {
        try {
          const response = await fetch(baseUrl + '/api/places', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {id, ...hotelForm} ),
            credentials: 'include'
          })
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Saving a hotel failed: ${errorData.message || response.statusText}`); 
          }
          const data = await response.json();
          setRedirect(true)
          return data
        } catch (error) {
          console.error('Error during saving:', error);
          throw error;
        }
      } else {
        try {
          const response = await fetch(baseUrl + '/api/places', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( hotelForm ),
            credentials: 'include'
          })
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Saving a hotel failed: ${errorData.message || response.statusText}`); 
          }
          const data = await response.json();
          setRedirect(true)
          return data
        } catch (error) {
          console.error('Error during saving:', error);
          throw error;
        }
      }
    }

    if (redirect) {
      return <Navigate to="/account/places" />
    }


  return (
    <section className="pt-10">
        <div className="max-w-xl">
          <Link to='/account/places' className="go-back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
            Back
          </Link>
          <div className="pt-4">
            <form onSubmit={savePlace}>
              <label htmlFor="title">Title</label>
              <input 
                type="text" name="title"
                required
                id="title" 
                placeholder="Example: short and catchy"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <label htmlFor="address">Address</label>
              <input 
                type="text" name="address" 
                required
                id="address" 
                placeholder="Address to this place"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <PhotoUploader addeddPhotos={addedPhotos} onChange={setAddedPhotos} />
              <label htmlFor="description">Description</label>
              <textarea
                name="description" 
                required
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <span htmlFor="perks">Perks</span>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
                <Perks selected={perks} onChange={setPerks} />
              </div>
              <label htmlFor="extrainfo">Extra info</label>
              <textarea 
                name="extrainfo" 
                id="extrainfo"
                value={extraInfo}
                onChange={e => setExtraInfo(e.target.value)}
              />
              <h2 className="font-semibold">Check in & out times</h2>
              <p className="text-gray-500 text-xs">add check in and out times, remember to consider window between the guests</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-3">
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="checkin">Check in time</label>
                  <input 
                    type="text"
                    required
                    id="checkin" 
                    placeholder="14:00" 
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="checkout">Check out time</label>
                  <input 
                    type="text"
                    required
                    id="checkout" 
                    placeholder="11:00" 
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="guestnum">Max guests</label>
                  <input 
                    type="number" 
                    required
                    id="guestnum" 
                    placeholder="4" 
                    value={maxGuests}
                    onChange={e => setMaxGuests(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-sm" htmlFor="ppnight">Price per night</label>
                  <input 
                    type="number" 
                    required
                    id="ppnight" 
                    placeholder="199" 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <button className="bg-primary w-full text-white px-4 py-2 rounded-2xl">Save</button>
            </form>
          </div>
        </div>
    </section>
  )
}

export default AddNewHotels