import { Wifi, PlugZap, MountainSnow, Tv, PawPrint, CircleParking} from 'lucide-react';

const perkIcons = {
  wifi: Wifi,
  parking: CircleParking,
  charger: PlugZap,
  view: MountainSnow, 
  tv: Tv,
  pets: PawPrint,
};

const perkDesc = {
    wifi: 'High-speed Wi-Fi',
    parking: 'Free parking available for guests',
    charger: 'EV charging stations available',
    view: 'Stunning views from the room',
    tv: 'Flat-screen TV with cable channels',
    pets: 'Pets are welcome',
};

const HotelPerks = ({ perks, className }) => {
  return (
    <div className={className}>
      {perks.map((perk) => {
        const Icon = perkIcons[perk];
        const description = perkDesc[perk];
        return (
          <div key={perk} className="flex items-center gap-4 py-2">
            <Icon />
            <span className='text-sm'>{description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HotelPerks;