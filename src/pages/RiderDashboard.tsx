import React, { useState, useRef, useEffect } from 'react';
import { History, Search, User, MapPin, Target, ChevronRight, Calendar, Users, Star, ChevronLeft, DollarSign, Wind, Bookmark, Lightbulb, X, Mail, Wifi, Snowflake, Briefcase, ChevronDown, Info, Car, MessageCircle, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Expanded Data for Uzbekistan Regions and Cities - ALL 14 REGIONS INCLUDED
const uzbekistanLocationsData = [
  { region: "Andijan Region", cities: ["Andijan", "Asaka", "Baliqchi", "Bo'ston", "Buloqboshi", "Izboskan", "Jalaquduq", "Marhamat", "Oltinko'l", "Paxtaobod", "Qo'rg'ontepa", "Shahrixon", "Ulug'nor", "Xo'jaobod"] },
  { region: "Bukhara Region", cities: ["Bukhara", "Galaosiyo", "G'ijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Qorako'l", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"] },
  { region: "Fergana Region", cities: ["Fergana", "Margilan", "Kokand", "Quvasoy", "Quva", "Rishton", "Oltiariq", "Bag'dod", "Beshariq", "Buvayda", "Dang'ara", "Furqat", "Qo'shtepa", "Toshloq", "Uchko'prik", "Yozyovon", "So'x"] },
  { region: "Jizzakh Region", cities: ["Jizzakh", "G'allaorol", "Sharof Rashidov", "Zomin", "Paxtakor", "Do'stlik", "Forish", "Mirzacho'l", "Yangiobod", "Arnasoy", "Baxmal", "Zarbdor"] },
  { region: "Kashkadarya Region", cities: ["Karshi", "Shahrisabz", "Kitob", "G'uzor", "Nishon", "Kasbi", "Chiroqchi", "Dehqonobod", "Mirishkor", "Muborak", "Qarshi", "Yakkabog'", "Koson", "Qamashi"] },
  { region: "Khorezm Region", cities: ["Urgench", "Khiva", "Shovot", "Hazorasp", "Bog'ot", "Yangiariq", "Yangibozor", "Urganch", "Tuproqqal'a", "Xonqa", "Qo'shko'pir"] },
  { region: "Namangan Region", cities: ["Namangan", "Chust", "Pop", "Kosonsoy", "Mingbuloq", "Norin", "To'raqo'rg'on", "Uchqo'rg'on", "Yangiqo'rg'on", "Chortoq"] },
  { region: "Navoiy Region", cities: ["Navoiy", "Zarafshan", "Uchquduq", "Konimex", "Nurota", "Tomdi", "Xatirchi", "Qiziltepa", "Karmana"] },
  { region: "Samarkand Region", cities: ["Samarkand", "Urgut", "Jomboy", "Ishtixon", "Kattaqo'rg'on", "Nurobod", "Oqdaryo", "Paxtachi", "Pastdarg'om", "Tayloq", "Toyloq", "Bulung'ur", "Qo'shrabot"] },
  { region: "Sirdaryo Region", cities: ["Guliston", "Yangiyer", "Shirin", "Mirzaobod", "Oqoltin", "Sayxunobod", "Sardoba", "Sirdaryo", "Xovos", "Boyovut"] },
  { region: "Surkhandarya Region", cities: ["Termez", "Denov", "Boysun", "Sherobod", "Sho'rchi", "Qumqo'rg'on", "Muzrabot", "Angor", "Bandixon", "Jarqo'rg'on", "Oltinsoy", "Sariosiyo", "Uzun"] },
  { region: "Tashkent Region", cities: ["Angren", "Chirchiq", "Olmaliq", "Bekabad", "Yangiyo'l", "Gazalkent", "Bo'ka", "Chinoz", "Oqqo'rg'on", "Parkent", "Piskent", "Qibray", "Quyichirchiq", "Yangiyo'l", "Yuqorichirchiq", "Zangiota"] },
  { region: "Tashkent City", cities: ["Tashkent", "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugbek", "Sergeli", "Shaykhontohur", "Uchtepa", "Yakkasaroy", "Yashnobod", "Yunusobod"] },
  { region: "Republic of Karakalpakstan", cities: ["Nukus", "Beruniy", "Chimboy", "Ellikqala", "Kegeyli", "Qo'ng'irot", "Qorao'zak", "Shumanay", "Taxtako'pir", "To'rtko'l", "Xo'jayli", "Amudaryo", "Bo'zatov", "Qanliko'l", "Taxiatosh"] },
];

// Helper to format date for display (e.g., "Sat Apr 23")
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Helper to format time for display (e.g., "11:45")
const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }; // 24-hour format
  return date.toLocaleTimeString('en-US', options);
};

// Helper to calculate a dummy drop-off date (e.g., next day)
const getDropOffDate = (pickupDateString) => {
  if (!pickupDateString) return '';
  const pickupDate = new Date(pickupDateString);
  pickupDate.setDate(pickupDate.getDate() + 1); // Add one day
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return pickupDate.toLocaleDateString('en-US', options);
};

// Component to render the styled car plate number
const PlateNumber = ({ plate }) => {
  if (!plate) return null;
  return (
    <div className="flex items-center bg-white border-2 border-gray-800 rounded-lg p-1 space-x-2 shadow-sm font-mono w-max select-none">
      <span className="font-bold text-xl pl-1">{plate.locationCode}</span>
      <div className="w-px h-6 bg-gray-600"></div>
      <div className="flex items-baseline space-x-1">
        <span className="font-bold text-xl">{plate.series}</span>
        <span className="text-xl font-medium tracking-tighter">{plate.serialNumber}</span>
      </div>
      <div className="flex flex-col items-center pr-1">
        {/* Uzbekistan Flag SVG */}
        <svg width="28" height="14" viewBox="0 0 900 450" className="rounded-sm border border-gray-300">
          <rect width="900" height="450" fill="#0072CE"/>
          <rect y="150" width="900" height="150" fill="#FFFFFF"/>
          <rect y="300" width="900" height="150" fill="#058B37"/>
          <rect y="157.5" width="900" height="15" fill="#CE1126"/>
          <rect y="277.5" width="900" height="15" fill="#CE1126"/>
        </svg>
        <span className="font-bold text-xs text-gray-800">UZ</span>
      </div>
    </div>
  );
};

// Custom Amazon-style mail icon
const AmazonMailLogo = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7.00005L10.2 10.1C11.2667 10.6333 12.7333 10.6333 13.8 10.1L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 14.5C8.5 13 11 13 12 14.5C13 13 15.5 13 17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Component for the tip bar
const TipBar = ({ icon, text, onClose }) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="bg-yellow-400 rounded-full p-2 mr-4">
                    {icon}
                </div>
                <p className="text-sm text-yellow-800">{text}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-yellow-200">
                <X size={20} className="text-yellow-800"/>
            </button>
        </div>
    );
};

const CalendarView = ({ onDayClick, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date('2025-08-25'));
  
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
  
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startDay });
  
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border mt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <div className="flex space-x-2">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></button>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => <div key={day}>{day}</div>)}
          {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
          {days.map(day => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
            return (
              <button
                key={day}
                onClick={() => onDayClick(date)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-green-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
// --- Custom Scrollbar Styles Component ---
const CustomScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #F8F8F8; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 2px solid #F8F8F8; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
  `}</style>
);

// Component to visually represent seat availability
const SeatAvailability = ({ count }) => {
  const seatCount = parseInt(count) || 0;
  if (seatCount === 0) return null;

  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        {[...Array(seatCount)].map((_, i) => (
          <User key={i} size={28} className="text-green-600 bg-green-100 p-1.5 rounded-full" />
        ))}
      </div>
      <div className="ml-2 text-left">
        <span className="text-lg font-bold text-gray-800">{seatCount}</span>
        <p className="text-xs text-gray-600 -mt-1 leading-tight">available seats</p>
      </div>
    </div>
  );
};

// Location Selection Modal Component
const LocationSelectModal = ({ title, isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  }

  const filteredLocations = uzbekistanLocationsData.map(regionData => ({
    ...regionData,
    cities: regionData.cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(regionData => regionData.cities.length > 0 || regionData.region.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[80vh] flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={handleClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" />
            <input type="text" placeholder="Search for a city or region..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredLocations.length > 0 ? (
            filteredLocations.map(regionData => (
              <div key={regionData.region}>
                <h3 className="w-full text-left p-3 font-semibold text-gray-800 select-none">
                  {regionData.region}
                </h3>
                {regionData.cities.map(city => (
                  <button key={city} onClick={() => { onSelect(city); handleClose(); }} className="w-full text-left pl-6 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg text-sm transition-colors" >
                    {city}
                  </button>
                ))}
              </div>
            ))
          ) : ( <p className="text-neutral-500 text-center mt-10">No regions or cities found.</p> )}
        </div>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null); // 'saved', 'recommended', 'mail'
  const [activeSort, setActiveSort] = useState(null); // 'by_seat', 'by_time'
  const [seatsNeeded, setSeatsNeeded] = useState(null);
  const [savedRides, setSavedRides] = useState([]);
  const [firstUse, setFirstUse] = useState({ by_seat: true, by_time: true, saved: true, recommended: true, mail: true });
  const [tipToShow, setTipToShow] = useState(null);
  const [dismissedTips, setDismissedTips] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isUnreliableRider, setIsUnreliableRider] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [rides, setRides] = useState([]);
  const [isLoadingRides, setIsLoadingRides] = useState(false);

  // Fetch rides from database with optional filters
  const fetchRides = async () => {
    console.log('RiderDashboard - Starting fetchRides with filters:', { pickupLocation, destinationLocation, pickupDate });
    setIsLoadingRides(true);
    try {
      let query = supabase
        .from('rides')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      // More flexible location matching - check for partial matches in both directions
      if (pickupLocation && destinationLocation) {
        // Priority search: exact route match first, then partial matches
        console.log('RiderDashboard - Searching for route:', pickupLocation, '→', destinationLocation);
        query = query.or(`and(departure_location.ilike.%${pickupLocation}%,destination_location.ilike.%${destinationLocation}%),and(departure_location.ilike.%${destinationLocation}%,destination_location.ilike.%${pickupLocation}%)`);
      } else if (pickupLocation) {
        query = query.or(`departure_location.ilike.%${pickupLocation}%,destination_location.ilike.%${pickupLocation}%`);
      } else if (destinationLocation) {
        query = query.or(`departure_location.ilike.%${destinationLocation}%,destination_location.ilike.%${destinationLocation}%`);
      }

      // Date filter is optional for broader results
      if (pickupDate) {
        query = query.eq('departure_date', pickupDate);
      }

      console.log('RiderDashboard - About to execute query with route matching');
      const { data, error } = await query;

      console.log('RiderDashboard - Query response:', { data, error, count: data?.length });

      if (error) {
        console.error('Error fetching rides:', error);
        toast({ title: 'Error', description: 'Failed to fetch rides. Please try again.', variant: 'destructive' });
        return;
      }

      const transformedRides = data?.map(ride => {
        console.log('RiderDashboard - Transforming ride:', ride);
        return {
          id: ride.id,
          driverName: ride.username || 'Driver',
          driverImageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=' + (ride.username ? ride.username[0]?.toUpperCase() : 'D'),
          reliabilityStars: 4.0,
          carModel: 'Car',
          carYear: 2022,
          imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Car',
          plateNumber: { locationCode: '01', series: 'A', serialNumber: '123BC' },
          origin: ride.departure_location,
          originDate: ride.departure_date + (ride.departure_time ? 'T' + ride.departure_time : 'T09:00:00'),
          destination: ride.destination_location,
          destinationDate: ride.departure_date + 'T18:00:00',
          estimatedMiles: '200 mi',
          tripTime: '4h 0m',
          sitsAvailable: (ride.available_seats || 4) + ' sits',
          basePrice: ride.ride_price || 100,
          avgFuelPerMile: '$0.75/mi',
          serviceType: ride.mail_option === 'no' ? 'rider' : ride.mail_option === 'mailOnly' ? 'mail' : 'both',
          specialServices: ride.mail_option !== 'no' ? ['Mail delivery'] : ['Air Conditioning'],
          mailPayout: ride.mail_price ? '$' + ride.mail_price : null,
          ratePerMail: 'per mail',
        };
      }) || [];

      console.log('RiderDashboard - Transformed rides:', transformedRides);
      setRides(transformedRides);

      if (transformedRides.length === 0) {
        toast({ title: 'No rides found', description: 'No active rides match your search criteria.' });
      } else {
        toast({ title: 'Rides loaded', description: `Found ${transformedRides.length} available ride(s).` });
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      toast({ title: 'Error', description: 'Failed to fetch rides. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoadingRides(false);
    }
  };

  // Realtime: refresh results when rides change
  useEffect(() => {
    const channel = supabase
      .channel('rides-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rides' }, () => {
        if (showSearchResults) fetchRides();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [showSearchResults, pickupLocation, destinationLocation, pickupDate]);

  // Search for rides
  const handleSearch = () => {
    fetchRides();
    setShowSearchResults(true);
  };

  const handleFilterClick = (filterType) => {
    const newFilter = activeFilter === filterType ? null : filterType;
    setActiveFilter(newFilter);

    if (newFilter && firstUse[filterType] && !dismissedTips.includes(filterType)) {
      setTipToShow(filterType);
    } else {
      setTipToShow(null);
    }
  };

  const handleSortClick = (sortType) => {
    const newSort = activeSort === sortType ? null : sortType;
    setActiveSort(newSort);

    if (newSort && firstUse[sortType] && !dismissedTips.includes(sortType)) {
      setTipToShow(sortType);
    } else {
        setTipToShow(null);
    }
  };

  const handleSeatsNeededClick = (numSeats) => {
    setSeatsNeeded(prev => prev === numSeats ? null : numSeats);
  };
  
  const handleCloseTip = () => {
    if (tipToShow) {
      setDismissedTips(prev => [...prev, tipToShow]);
      setFirstUse(prev => ({ ...prev, [tipToShow]: false }));
      setTipToShow(null);
    }
  };

  const handleSaveRide = (rideId) => {
    setSavedRides(prevSaved =>
      prevSaved.includes(rideId)
        ? prevSaved.filter(id => id !== rideId)
        : [...prevSaved, rideId]
    );
  };

  const calculatePayout = (basePrice) => {
      const discount = basePrice * 0.10;
      return isUnreliableRider ? basePrice : basePrice - discount;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ride History</h2>
            <p className="text-gray-600">Your past rides will appear here.</p>
          </div>
        );
      case 'search':
        if (showSearchResults) {
          let results = [...rides];

          // Apply location filtering
          if (pickupLocation) {
            results = results.filter(ride => 
              ride.origin.toLowerCase().includes(pickupLocation.toLowerCase())
            );
          }
          
          if (destinationLocation) {
            results = results.filter(ride => 
              ride.destination.toLowerCase().includes(destinationLocation.toLowerCase())
            );
          }

          if (activeFilter === 'saved') {
            results = results.filter(ride => savedRides.includes(ride.id));
          } else if (activeFilter === 'recommended') {
            results = results.filter(ride => ride.reliabilityStars >= 4.5);
          } else if (activeFilter === 'mail') {
            results = results.filter(ride => ride.serviceType === 'mail' || ride.serviceType === 'both');
          }
          
          if (seatsNeeded) {
            results = results.filter(ride => {
                const availableSeats = parseInt(ride.sitsAvailable) || 0;
                return availableSeats >= seatsNeeded;
            });
          }

          if (activeSort === 'by_time') {
            results.sort((a, b) => new Date(a.originDate).getTime() - new Date(b.originDate).getTime());
          } else if (activeSort === 'by_seat') {
            results.sort((a, b) => {
                const seatsA = parseInt(a.sitsAvailable) || 0;
                const seatsB = parseInt(b.sitsAvailable) || 0;
                return seatsB - seatsA; // Sort by most seats available
            });
          }
          
          const tipContent = {
              by_time: { icon: <History size={20} className="text-white"/>, text: "The ride will start at the scheduled time, regardless of seat availability." },
              by_seat: { icon: <Users size={20} className="text-white"/>, text: "The driver departs once all seats are filled." },
              saved: { icon: <Bookmark size={20} className="text-white"/>, text: "Showing only the rides you have saved." },
              recommended: { icon: <Lightbulb size={20} className="text-white"/>, text: "Showing recommended rides based on driver ratings and your history." },
              mail: { icon: <AmazonMailLogo className="text-white"/>, text: "Showing rides that can also deliver mail. Mail should not be more than 5 kg." },
          };
          
          let stickyTitle = "All Available Rides";
          if(activeFilter === 'recommended') stickyTitle = "Recommended for you";
          else if(activeFilter === 'saved') stickyTitle = "Saved Rides";
          else if(activeFilter === 'mail') stickyTitle = "Mail Delivery";
          else if(activeSort === 'by_seat') stickyTitle = "Sorted by: Seat";
          else if(activeSort === 'by_time') stickyTitle = "Sorted by: Time";

          return (
            <div className="flex flex-col h-full">
              {isLoadingRides ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-2 border-border border-t-primary rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading rides...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-shrink-0 bg-white shadow-sm z-10">
                    <div className="p-4 border-b border-neutral-200">
                      <h2 className="text-lg font-semibold text-gray-800 text-left mb-3">Results</h2>
                      <div className="flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <div className="flex items-center space-x-2 flex-wrap gap-2">
                                  <button onClick={() => handleSortClick('by_seat')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'by_seat' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      <Users size={16} />
                                      <span>By seat</span>
                                  </button>
                                  <button onClick={() => handleSortClick('by_time')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'by_time' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      <History size={16} />
                                      <span>By time</span>
                                  </button>
                                   <button onClick={() => handleFilterClick('mail')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'mail' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      {activeFilter === 'mail' ? <X size={16} /> : <AmazonMailLogo className="w-5 h-5"/>}
                                      <span>With mail option</span>
                                  </button>
                              </div>

                              <div className="flex items-center space-x-2">
                                  <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                                  <button onClick={() => handleFilterClick('saved')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'saved' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      {activeFilter === 'saved' ? <X size={16} /> : <Bookmark size={16} />}
                                      <span>Saved</span>
                                  </button>
                                   <button onClick={() => handleFilterClick('recommended')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'recommended' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      {activeFilter === 'recommended' ? <X size={16} /> : <Lightbulb size={16} />}
                                      <span>Recommended</span>
                                  </button>
                              </div>
                          </div>
                          <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-700">Seats Needed:</span>
                              {[1, 2, 3, 4].map(num => (
                                  <button key={num} onClick={() => handleSeatsNeededClick(num)} className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${seatsNeeded === num ? 'bg-green-500 text-white' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                      {num}
                                  </button>
                              ))}
                          </div>
                      </div>
                    </div>
                    
                    {tipToShow && <TipBar icon={tipContent[tipToShow].icon} text={tipContent[tipToShow].text} onClose={handleCloseTip} />}

                    <div className="bg-white py-2 px-4 border-b border-neutral-200">
                        <h3 className="font-semibold text-gray-800">{stickyTitle}</h3>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto bg-[#F8F8F8]">
                    <div className="p-4 space-y-4">
                        {results.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg border border-neutral-200 text-left relative cursor-pointer hover:shadow-xl transition-shadow">
                            <button onClick={(e) => { e.stopPropagation(); handleSaveRide(item.id); }} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <Bookmark size={20} className="text-gray-500 hover:text-green-600" fill={savedRides.includes(item.id) ? '#10B981' : 'none'} />
                            </button>
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                              <div className="flex flex-col">
                                <div className="flex items-center mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                        <User size={24} className="text-gray-600" />
                                    </div>
                                    <p className="font-semibold text-gray-800 text-lg">{item.driverName}</p>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-800 mb-2">
                                    <Car size={16} className="text-gray-600" />
                                    <span>{item.carYear} {item.carModel}</span>
                                </div>
                                <PlateNumber plate={item.plateNumber} />
                              </div>
                              <div className="text-right mt-2 sm:mt-0 sm:mr-10">
                                <div className="text-2xl font-bold text-green-700 flex items-center justify-end">
                                    {activeFilter === 'mail' ? item.mailPayout : `$${calculatePayout(item.basePrice).toFixed(2)}`}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {activeFilter === 'mail' ? item.ratePerMail : item.avgFuelPerMile}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-stretch mt-4">
                                <div className="relative flex flex-col justify-between items-center mr-4 shrink-0">
                                    <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 bg-gray-300 rounded-full"></div>
                                    <MapPin size={20} className="text-green-600 bg-white z-10" />
                                    <Target size={20} className="text-red-600 bg-white z-10" />
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                    <div className="mb-4">
                                        <p className="font-semibold text-gray-800 text-base">{item.origin}</p>
                                        <p className="text-gray-600 text-sm">{formatDate(item.originDate)} {formatTime(item.originDate)}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-base">{item.destination}</p>
                                        <p className="text-gray-600 text-sm">{formatDate(item.destinationDate)} {formatTime(item.destinationDate)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-gray-700 text-sm mt-3">
                                <div className="flex items-center space-x-2">
                                    <span>{item.estimatedMiles}</span><span className="mx-1">•</span><span>{item.tripTime}</span>
                                </div>
                                <SeatAvailability count={item.sitsAvailable} />
                                <button onClick={(e) => e.stopPropagation()} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-200 shadow">Book</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        } else {
          // Display initial location/date selection form
          return (
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Find Your Next Ride</h2>
              <p className="text-md text-gray-600 mb-6">Select your pickup and destination locations.</p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200 space-y-4">
                
                <div onClick={() => setShowFromModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${pickupLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
                    <span>{pickupLocation || "Origin"}</span>
                    <MapPin className="h-5 w-5 text-neutral-500" />
                </div>
                <LocationSelectModal title="Select Origin" isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setPickupLocation} />

                <div onClick={() => setShowToModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${destinationLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
                    <span>{destinationLocation || "Destination"}</span>
                    <Target className="h-5 w-5 text-neutral-500" />
                </div>
                <LocationSelectModal title="Select Destination" isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setDestinationLocation} />
                
                <div className="relative text-left">
                   <button onClick={() => setShowCalendar(!showCalendar)} className="w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border text-gray-800 font-semibold border-green-700">
                        <span>{pickupDate ? formatDate(pickupDate) : 'Select a date'}</span>
                        <Calendar className="h-5 w-5 text-neutral-500" />
                    </button>
                    {showCalendar && <CalendarView selectedDate={pickupDate} onDayClick={(date) => { setPickupDate(date.toISOString().split('T')[0]); setShowCalendar(false);}}/>}
                </div>
              </div>
              <p className="mt-6 text-gray-700 font-medium">Ready to hit the road? Let's find your perfect ride!</p>
            </div>
          );
        }
      case 'profile':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Profile</h2>
            <p className="text-gray-600">Your profile details will appear here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] font-sans antialiased">
      <CustomScrollbarStyles />
      <header className="bg-white text-gray-800 p-3 flex items-center justify-between shadow-md border-b border-neutral-200 z-20 relative">
        {showSearchResults ? (<button className="p-2 rounded-full hover:bg-neutral-100 transition-colors" onClick={() => { setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setShowSearchResults(false); setActiveFilter(null); setActiveSort(null); setSeatsNeeded(null); }}><ChevronLeft size={24} /></button>) : (<div className="w-10"></div>)}
        <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Rider's Dashboard</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col">
        {renderContent()}
      </main>

      {pickupLocation && destinationLocation && pickupDate && !showSearchResults && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-transparent z-40">
          <button 
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none" 
            onClick={handleSearch} 
            disabled={isLoadingRides}
          >
            {isLoadingRides ? "Searching..." : "See my results"}
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center h-16">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'search' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => { setActiveTab('search'); setShowSearchResults(false); setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setActiveFilter(null); setActiveSort(null); setSeatsNeeded(null); }}><Search size={24} strokeWidth={activeTab === 'search' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'search' ? 'text-gray-800' : 'text-neutral-500'}`}>Search</span></button>
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'history' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => setActiveTab('history')}><History size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'history' ? 'text-gray-800' : 'text-neutral-500'}`}>History</span></button>
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'profile' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => setActiveTab('profile')}><User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'profile' ? 'text-gray-800' : 'text-neutral-500'}`}>Profile</span></button>
        </div>
      </nav>
    </div>
  );
};

export default App;