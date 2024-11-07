
const Perks = ({selected, onChange}) => {
    
    const handleCheckbox = (e) => {
        const { checked, name } = e.target;
        onChange(prevSelected => {
            if (checked) {
              return prevSelected.includes(name) ? prevSelected : [...prevSelected, name]; 
            } else {
              return prevSelected.filter(selectedName => selectedName !== name);
            }
          });
    }

  return (
    <>
        <label htmlFor="wifi" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckbox} id="wifi"/>
            <span>Wifi</span>
        </label>
        <label htmlFor="parking" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheckbox} id="parking" />
            <span>Free parking</span>
        </label>
        <label htmlFor="tv" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCheckbox} id="tv" />
            <span>TV</span>
        </label>
        <label htmlFor="pets" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCheckbox} id="pets" />
            <span>Pets</span>
        </label>
        <label htmlFor="view" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('view')} name="view" onChange={handleCheckbox} id="view" />
            <span>Awesome view</span>
        </label>
        <label htmlFor="charger" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" checked={selected.includes('charger')} name="charger" onChange={handleCheckbox} id="charger" />
            <span>EV charger</span>
        </label>
    </>
  )
}

export default Perks