import { useState } from "react";
import Image from "./Image";
import { baseUrl } from "../App";

const PhotoUploader = ({addeddPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState('');


    const addPhotoByLink = async (e) => {
        e.preventDefault();
        if(!photoLink) {
            return
        }
        try {
            const response = await fetch(baseUrl + '/api/upload-by-link', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ link: photoLink })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Uploading photo by link failed: ${errorData.message || response.statusText}`); 
            }

            const data = await response.json();
            onChange(prev => ([...prev, data]));
            setPhotoLink('');
        } catch (error) {
            console.error('Error during uploading:', error);
            throw error; 
        }
    }
    const uploadPhoto = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('photos', files[i]);
        }
        try {
          const response = await fetch(baseUrl + '/api/upload', {
              method: "POST",
              body: formData
          })
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`Failed uploading a photo: ${errorData.message || response.statusText}`); 
          }
          const data = await response.json();
          onChange(prev => ([...prev, ...data]));
        } catch (error) {
          console.error('Error during uploading:', error);
          throw error; 
        }
    }

    const removePhoto = (e, item) => {
        e.preventDefault();
        onChange([...addeddPhotos.filter(photo => photo !== item)]);
    }

    const selectAsMainPhoto = (e, item) => {
        e.preventDefault();
        onChange([item, ...addeddPhotos.filter(photo => photo !== item)])
    } 


  return (
    <>
        <label htmlFor="photo">Photo</label>
        <div className="flex gap-2 py-2">
        <input 
            className="w-full border py-2 px-3 rounded-lg" 
            type="url" id="photo" name="photo" 
            placeholder="Add photos using url" 
            value={photoLink}
            onChange={e => setPhotoLink(e.target.value)}
        />
        <button onClick={addPhotoByLink} className="text-sm py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-400 hover:text-white duration-200 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
            </svg>
        </button>
        </div>
        <div className="py-2 grid grid-cols-2 md:grid-cols-3 gap-4">

        {addeddPhotos && addeddPhotos.map(photo => (
            <div className="transition-all duration-200 h-32 relative rounded-lg overflow-hidden" key={photo}>
                <Image src={photo} className="w-full h-full object-cover" />
                <button onClick={(e) => removePhoto(e, photo)} className="absolute p-1 bg-white rounded-full 
                bg-opacity-70 bottom-2 right-2 z-10 hover:bg-opacity-100 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <button 
                className="absolute p-2 text-white inset-0 flex 
                items-end justify-start opacity-0 hover:opacity-100 
                group-hover:opacity-100 transition-all duration-200"
                onClick={(e) => selectAsMainPhoto(e, photo)}
                >
                    {photo === addeddPhotos[0] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    )}
                </button>
            </div>
        )) }

        <label className={`${addeddPhotos.length > 0 ? "h-32" : ""} p-4 border text-sm flex gap-2 items-center bg-transparent rounded-lg
        transition-all duration-200 hover:shadow-md`}>
            <input type="file" className="hidden" multiple onChange={uploadPhoto}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            Upload from device
        </label>
        </div>
    </>
  )
}

export default PhotoUploader