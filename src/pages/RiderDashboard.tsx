 import React, { useState, useRef, useEffect } from 'react';
import { History, Search, User, MapPin, Target, ChevronRight, Calendar, Users, Star, ChevronLeft, DollarSign, Wind, Bookmark, Lightbulb, X, Mail, Wifi, Snowflake, Briefcase, ChevronDown, Info } from 'lucide-react';

// Define Uzbekistan locations as a flat list of capital and regions
const uzbekistanLocations = [
  "Your location", // Mimicking the screenshot
  "Tashkent", // Capital
  "Tashkent Region",
  "Fergana Region",
  "Andijan Region",
  "Namangan Region",
  "Samarkand Region",
  "Bukhara Region",
  "Kashkadarya Region",
  "Surkhandarya Region",
  "Sirdaryo Region",
  "Jizzakh Region",
  "Navoiy Region",
  "Khorezm Region",
  "Republic of Karakalpakstan",
];

// Helper to format date for display (e.g., "Sat Apr 23")
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Helper to format time for display (e.g., "11:45")
const formatTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }; // 24-hour format
  return date.toLocaleTimeString('en-US', options);
};

// Helper to calculate a dummy drop-off date (e.g., next day)
const getDropOffDate = (pickupDateString: string) => {
  if (!pickupDateString) return '';
  const pickupDate = new Date(pickupDateString);
  pickupDate.setDate(pickupDate.getDate() + 1); // Add one day
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return pickupDate.toLocaleDateString('en-US', options);
};

// Dummy data for search results - now includes more details
const dummySearchResults = [
  {
    id: 1,
    driverName: 'Alisher V.',
    driverImageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AV',
    reliabilityStars: 4.5,
    carModel: 'Chevrolet Cobalt',
    carYear: 2022,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Chevrolet+Cobalt',
    plateNumber: { locationCode: '01', series: 'A', serialNumber: '123BC' },
    origin: 'Tashkent',
    originDate: '2025-08-08T11:45:00',
    destination: 'Tashkent Region',
    destinationDate: '2025-08-08T15:27:00',
    estimatedMiles: '192 mi',
    tripTime: '5h 1m',
    sitsAvailable: '2 sits',
    basePrice: 284.44,
    avgFuelPerMile: '$0.85/mi',
    serviceType: 'rider',
    specialServices: ['Wi-Fi', 'Air Conditioning'],
  },
  {
    id: 2,
    driverName: 'Botir K.',
    driverImageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=BK',
    reliabilityStars: 3.8,
    carModel: 'Lada Granta',
    carYear: 2020,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Lada+Granta',
    plateNumber: { locationCode: '30', series: 'D', serialNumber: '456EF' },
    origin: 'Fergana',
    originDate: '2025-08-09T22:30:00',
    destination: 'Samarkand Region',
    destinationDate: '2025-08-10T03:31:00',
    estimatedMiles: '350 mi',
    tripTime: '7h 30m',
    sitsAvailable: '1 sit',
    basePrice: 332.22,
    avgFuelPerMile: '$0.75/mi',
    mailPayout: '$25',
    ratePerMail: 'per mail',
    serviceType: 'mail',
    specialServices: ['Mail delivery'],
  },
  {
    id: 3,
    driverName: 'Dilshod R.',
    driverImageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=DR',
    reliabilityStars: 5.0,
    carModel: 'Kia K5',
    carYear: 2023,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Kia+K5',
    plateNumber: { locationCode: '50', series: 'G', serialNumber: '789HI' },
    origin: 'Andijan',
    originDate: '2025-08-11T16:30:00',
    destination: 'Namangan Region',
    destinationDate: '2025-08-12T05:30:00',
    estimatedMiles: 'Block',
    tripTime: '1d 13h',
    sitsAvailable: '3 sits',
    basePrice: 1514.44,
    avgFuelPerMile: '$1.10/mi',
    mailPayout: '$30',
    ratePerMail: 'per mail',
    serviceType: 'both',
    specialServices: ['Wi-Fi', 'Air Conditioning', 'Luggage space'],
  },
  {
    id: 4,
    driverName: 'Elbek S.',
    driverImageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=ES',
    reliabilityStars: 4.2,
    carModel: 'Hyundai Elantra',
    carYear: 2021,
    imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Hyundai+Elantra',
    plateNumber: { locationCode: '80', series: 'J', serialNumber: '321KL' },
    origin: 'Bukhara',
    originDate: '2025-08-13T08:00:00',
    destination: 'Khorezm Region',
    destinationDate: '2025-08-13T12:00:00',
    estimatedMiles: '400 mi',
    tripTime: '8h 0m',
    sitsAvailable: '2 sits',
    basePrice: 388.89,
    avgFuelPerMile: '$0.80/mi',
    serviceType: 'rider',
    specialServices: ['Air Conditioning'],
  },
];

// Helper function to parse trip time string into minutes for sorting
const parseTripTimeToMinutes = (timeString) => {
    let totalMinutes = 0;
    const daysMatch = timeString.match(/(\d+)\s*d/);
    const hoursMatch = timeString.match(/(\d+)\s*h/);
    const minutesMatch = timeString.match(/(\d+)\s*m/);

    if (daysMatch) totalMinutes += parseInt(daysMatch[1]) * 24 * 60;
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1]);
    return totalMinutes;
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

const CheapestIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#005f73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CalendarView = ({ onDayClick, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
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
          <h3 className="font-semibold text-lg text-[#005f73]">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
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
                  isSelected ? 'bg-[#005f73] text-white' : 'hover:bg-gray-100'
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
  

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null); // 'saved', 'recommended', 'mail'
  const [activeSort, setActiveSort] = useState(null); // 'cheapest', 'fastest'
  const [savedRides, setSavedRides] = useState([]);
  const [firstUse, setFirstUse] = useState({ cheapest: true, fastest: true, saved: true, recommended: true, mail: true });
  const [tipToShow, setTipToShow] = useState(null);
  const [dismissedTips, setDismissedTips] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isUnreliableRider, setIsUnreliableRider] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);


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
            {/* ... history content ... */}
          </div>
        );
      case 'search':
        if (selectedRide) {
            return <TripDetails ride={selectedRide} onBack={() => setSelectedRide(null)} isUnreliable={isUnreliableRider} onToggleReliability={() => setIsUnreliableRider(p => !p)} />;
        }
        if (showSearchResults) {
          let results = [...dummySearchResults];

          if (activeFilter === 'saved') {
            results = results.filter(ride => savedRides.includes(ride.id));
          } else if (activeFilter === 'recommended') {
            results = results.filter(ride => ride.reliabilityStars >= 4.5);
          } else if (activeFilter === 'mail') {
            results = results.filter(ride => ride.serviceType === 'mail' || ride.serviceType === 'both');
          }

          const cheapestRideId = results.length > 0 ? results.reduce((prev, curr) => (calculatePayout(prev.basePrice) < calculatePayout(curr.basePrice) ? prev : curr)).id : null;
          
          if (activeSort === 'cheapest') {
            results.sort((a, b) => {
                const priceA = activeFilter === 'mail' ? parseInt(a.mailPayout?.replace('$', '') || '99999') : calculatePayout(a.basePrice);
                const priceB = activeFilter === 'mail' ? parseInt(b.mailPayout?.replace('$', '') || '99999') : calculatePayout(b.basePrice);
                return priceA - priceB;
            });
          } else if (activeSort === 'fastest') {
            results.sort((a, b) => parseTripTimeToMinutes(a.tripTime) - parseTripTimeToMinutes(b.tripTime));
          }
          
          const tipContent = {
              cheapest: { icon: <DollarSign size={20} className="text-white"/>, text: "Now sorting rides from the lowest to the highest price." },
              fastest: { icon: <Wind size={20} className="text-white"/>, text: "Now sorting rides by the shortest trip duration." },
              saved: { icon: <Bookmark size={20} className="text-white"/>, text: "Showing only the rides you have saved." },
              recommended: { icon: <Lightbulb size={20} className="text-white"/>, text: "Showing recommended rides based on driver ratings and your history." },
              mail: { icon: <AmazonMailLogo className="text-white"/>, text: "Showing rides that can also deliver mail. Mail should not be more than 5 kg." },
          };
          
          let stickyTitle = "All Available Rides";
          if(activeFilter === 'recommended') stickyTitle = "Recommended for you";
          else if(activeFilter === 'saved') stickyTitle = "Saved Rides";
          else if(activeFilter === 'mail') stickyTitle = "Mail Delivery";
          else if(activeSort === 'cheapest') stickyTitle = "Sorted by: Cheapest";
          else if(activeSort === 'fastest') stickyTitle = "Sorted by: Fastest";


          return (
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 bg-white shadow-sm z-10">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 text-left mb-3">Results</h2>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                          <button onClick={() => handleSortClick('cheapest')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'cheapest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                              <DollarSign size={16} />
                              <span>Cheapest</span>
                          </button>
                          <button onClick={() => handleSortClick('fastest')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'fastest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                              <Wind size={16} />
                              <span>Fastest</span>
                          </button>
                           <button onClick={() => handleFilterClick('mail')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'mail' ? 'bg-blue-100 text-blue-700 border border-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                              {activeFilter === 'mail' ? <X size={16} /> : <AmazonMailLogo className="w-5 h-5"/>}
                              <span>Mail Only</span>
                          </button>
                      </div>

                      <div className="flex items-center space-x-2">
                          <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                          <button onClick={() => handleFilterClick('saved')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'saved' ? 'bg-blue-100 text-blue-700 border border-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                              {activeFilter === 'saved' ? <X size={16} /> : <Bookmark size={16} />}
                              <span>Saved</span>
                          </button>
                           <button onClick={() => handleFilterClick('recommended')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'recommended' ? 'bg-blue-100 text-blue-700 border border-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                              {activeFilter === 'recommended' ? <X size={16} /> : <Lightbulb size={16} />}
                              <span>Recommended</span>
                          </button>
                      </div>
                  </div>
                </div>
                
                {tipToShow && <TipBar icon={tipContent[tipToShow].icon} text={tipContent[tipToShow].text} onClose={handleCloseTip} />}

                <div className="bg-white py-2 px-4 border-b">
                    <h3 className="font-semibold text-gray-800">{stickyTitle}</h3>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto bg-gray-100">
                <div className="p-4 space-y-4">
                    {results.map(item => (
                      <div key={item.id} onClick={() => setSelectedRide(item)} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-left relative cursor-pointer hover:shadow-md transition-shadow">
                        <button onClick={(e) => { e.stopPropagation(); handleSaveRide(item.id); }} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Bookmark size={20} className="text-gray-500 hover:text-blue-600" fill={savedRides.includes(item.id) ? '#2563eb' : 'none'} />
                        </button>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                          <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <p className="font-semibold text-gray-800 text-base mr-2">{item.driverName}</p>
                              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(item.reliabilityStars) ? "#facc15" : "none"} stroke="#facc15" className="mr-0.5"/>)}
                              <span className="text-gray-600 text-xs ml-1">({item.reliabilityStars})</span>
                            </div>
                             <div className="flex items-center space-x-2 text-sm text-gray-800 mb-2">
                                <CarIcon model={item.carModel} />
                                <span>{item.carYear} {item.carModel}</span>
                            </div>
                             <PlateNumber plate={item.plateNumber} />
                          </div>
                          <div className="text-right mt-2 sm:mt-0 sm:mr-10">
                            <div className="text-2xl font-bold text-[#005f73] flex items-center justify-end">
                                {item.id === cheapestRideId && <CheapestIcon />}
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
                                <MapPin size={20} className="text-[#005f73] bg-white z-10" />
                                <Target size={20} className="text-[#005f73] bg-white z-10" />
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
                            {activeFilter !== 'mail' && <><span className="mx-1">•</span><Users size={16} className="text-gray-500" /><span>{item.sitsAvailable}</span></>}
                          </div>
                          <button onClick={(e) => e.stopPropagation()} className="bg-[#005f73] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#007a8d] transition duration-200">Book</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        } else if (pickupLocation && destinationLocation && pickupDate) {
          // Display "Your Selected Route" confirmation
          return (
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Selected Route</h2>
              <p className="text-md text-gray-600 mb-6">Confirm your journey details below.</p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-center mb-6 py-4 px-2 border border-gray-300 rounded-lg">
                  <div className="flex flex-col items-center text-left flex-1 min-w-0">
                    <span className="text-sm text-gray-500 mb-1">From</span>
                    <p className="font-semibold text-gray-800 text-base truncate">{pickupLocation}</p>
                    <p className="text-sm text-gray-600 mt-1">{formatDate(pickupDate)}</p>
                  </div>
                  <ChevronRight size={24} className="text-gray-500 mx-4 flex-shrink-0" />
                  <div className="flex flex-col items-center text-right flex-1 min-w-0">
                    <span className="text-sm text-gray-500 mb-1">To</span>
                    <p className="font-semibold text-gray-800 text-base truncate">{destinationLocation}</p>
                    <p className="text-sm text-gray-600 mt-1">{getDropOffDate(pickupDate)}</p>
                  </div>
                </div>
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-md mb-4" onClick={() => { setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setShowSearchResults(false); setActiveFilter(null); }}>Change Locations & Date</button>
              </div>
              <p className="mt-6 text-gray-700 font-medium">Ready to hit the road? Let's find your perfect ride!</p>
            </div>
          );
        } else {
          // Display initial location/date selection form
          return (
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Find Your Next Ride</h2>
              <p className="text-md text-gray-600 mb-6">Select your pickup and destination locations.</p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="relative mb-4 text-left">
                  <label htmlFor="pickup-location" className="block text-gray-700 text-sm font-medium mb-1">Origin</label>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 mt-2" size={20} />
                  <select id="pickup-location" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 shadow-sm appearance-none bg-white text-gray-700 text-base" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                    <option value="" disabled className="text-gray-400">Search by city or domicile</option>
                    {uzbekistanLocations.map((location, index) => <option key={index} value={location}>{location}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-1/2 -translate-y-1/2 mt-2"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg></div>
                </div>
                <div className="relative mb-4 text-left">
                  <label htmlFor="destination-location" className="block text-gray-700 text-sm font-medium mb-1">Destination</label>
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 mt-2" size={20} />
                  <select id="destination-location" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 shadow-sm appearance-none bg-white text-gray-700 text-base" value={destinationLocation} onChange={(e) => setDestinationLocation(e.target.value)}>
                    <option value="" disabled className="text-gray-400">Search by city or domicile</option>
                    {uzbekistanLocations.map((location, index) => <option key={index} value={location}>{location}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-1/2 -translate-y-1/2 mt-2"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg></div>
                </div>
                <div className="relative mb-6 text-left">
                  <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-medium mb-1">Pickup Date</label>
                   <button onClick={() => setShowCalendar(!showCalendar)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 shadow-sm bg-white text-gray-700 text-base text-left">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        {pickupDate ? formatDate(pickupDate) : 'Select a date'}
                    </button>
                    {showCalendar && <CalendarView selectedDate={pickupDate} onDayClick={(date) => { setPickupDate(date); setShowCalendar(false);}}/>}
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
            {/* ... profile content ... */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans antialiased">
      <header className="bg-[#005f73] text-white p-4 flex items-center justify-between shadow-md">
        {showSearchResults || selectedRide ? (<button className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors" onClick={() => { if(selectedRide) {setSelectedRide(null)} else {setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setShowSearchResults(false); setActiveFilter(null); setActiveSort(null); } }}><ChevronLeft size={24} /></button>) : (<div className="w-8"></div>)}
        <h1 className="text-xl font-semibold">Rider's Dashboard</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col">
        {renderContent()}
      </main>

      {pickupLocation && destinationLocation && pickupDate && !showSearchResults && (<div className="fixed bottom-20 left-0 right-0 p-4 bg-transparent z-40"><button className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-xl transform hover:scale-105" onClick={() => setShowSearchResults(true)}>See my results</button></div>)}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-50">
        <div className="flex justify-around items-center h-16">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${activeTab === 'search' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => { setActiveTab('search'); setShowSearchResults(false); setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setActiveFilter(null); setActiveSort(null); setSelectedRide(null); }}><Search size={24} strokeWidth={2} /><span className="text-xs mt-1">Search</span></button>
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${activeTab === 'history' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('history')}><History size={24} strokeWidth={2} /><span className="text-xs mt-1">History</span></button>
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('profile')}><User size={24} strokeWidth={2} /><span className="text-xs mt-1">Profile</span></button>
        </div>
      </nav>
    </div>
  );
};

const AccordionItem = ({ icon, title, value, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b last:border-b-0">
            <button onClick={() => setIsOpen(!isOpen)} className="p-4 flex justify-between items-center w-full hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                    {icon}
                    <span className="font-medium">{title}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm truncate max-w-[120px]">{value}</span>
                    <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-50 text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

const CarIcon = ({ model }) => {
    if (model === 'Chevrolet Cobalt') {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 8.5H4.5C3.94772 8.5 3.5 8.94772 3.5 9.5V15.5C3.5 16.0523 3.94772 16.5 4.5 16.5H19.5C20.0523 16.5 20.5 16.0523 20.5 15.5V9.5C20.5 8.94772 20.0523 8.5 19.5 8.5Z" stroke="#4A5568" strokeWidth="1.5"/>
                <path d="M7 8.5L9 6.5H15L17 8.5" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7.5" cy="16.5" r="1" fill="#4A5568"/>
                <circle cx="16.5" cy="16.5" r="1" fill="#4A5568"/>
            </svg>
        );
    }
    return <Briefcase className="text-gray-600" />;
}

const SpecialService = ({ service }) => {
    const iconMap = {
        'Wi-Fi': <Wifi size={16} className="mr-2"/>,
        'Air Conditioning': <Snowflake size={16} className="mr-2"/>,
        'Mail delivery': <Mail size={16} className="mr-2"/>,
        'Luggage space': <Briefcase size={16} className="mr-2"/>
    }
    return <div className="flex items-center">{iconMap[service] || <Star size={16} className="mr-2"/>} {service}</div>
}


const TripDetails = ({ ride, isUnreliable, onToggleReliability, onBack }) => {
    const discount = ride.basePrice * 0.10;
    const finalPrice = isUnreliable ? ride.basePrice : ride.basePrice - discount;

    return (
        <div className="flex flex-col h-full">
            <div className="bg-[#005f73] text-white p-4 flex-shrink-0">
                 <div className="flex items-center">
                    <button onClick={onBack} className="mr-3 text-white/90 hover:text-white"><ChevronLeft size={24} /></button>
                    <img src={ride.imageUrl} alt={ride.carModel} className="w-24 h-16 object-cover rounded-md mr-4"/>
                    <div className="flex items-stretch w-full">
                        <div className="relative flex flex-col justify-between items-center mr-4 shrink-0">
                            <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 bg-gray-400 rounded-full"></div>
                            <MapPin size={20} className="text-white bg-[#005f73] z-10" />
                            <Target size={20} className="text-white bg-[#005f73] z-10" />
                        </div>
                        <div className="flex flex-col justify-between w-full">
                            <div className="mb-2">
                                <p className="font-semibold text-white text-lg">{ride.origin}</p>
                                <p className="text-gray-300 text-sm">{formatDate(ride.originDate)} {formatTime(ride.originDate)}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white text-lg">{ride.destination}</p>
                                <p className="text-gray-300 text-sm">{formatDate(ride.destinationDate)} {formatTime(ride.destinationDate)}</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-100">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between text-sm p-2 bg-red-100 rounded-lg">
                        <span>Simulate Unreliable Rider:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={isUnreliable} onChange={onToggleReliability} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">About the trip</h2>
                    <div className="bg-white rounded-lg shadow-sm border">
                        <AccordionItem icon={<DollarSign className="text-gray-600" />} title="Payout (est.)" value={`$${finalPrice.toFixed(2)}`}>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Base Fare:</span><span>${ride.basePrice.toFixed(2)}</span></div>
                                <div className="flex justify-between items-center">
                                    <span className={isUnreliable ? 'line-through text-gray-400' : ''}>Reliability Discount (10%):</span>
                                    <span className={isUnreliable ? 'line-through text-gray-400' : 'text-green-600'}>-${discount.toFixed(2)}</span>
                                </div>
                                {isUnreliable && (
                                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md flex items-start space-x-2">
                                        <Info size={14} className="mt-0.5 flex-shrink-0"/>
                                        <span>Your discount was removed due to a previous no-show. Be reliable on your next trip to reinstate it.</span>
                                    </div>
                                )}
                                <hr className="my-2"/>
                                <div className="flex justify-between font-bold"><span>Final Price:</span><span>${finalPrice.toFixed(2)}</span></div>
                                <div className="flex justify-between text-xs text-gray-500 pt-2"><span>Avg. Fuel Cost/Mile:</span><span>{ride.avgFuelPerMile}</span></div>
                            </div>
                        </AccordionItem>
                         <AccordionItem icon={<Users className="text-gray-600" />} title="Special services" value="">
                            {ride.specialServices.map(service => <SpecialService key={service} service={service} />)}
                        </AccordionItem>
                         <AccordionItem icon={<User className="text-gray-600" />} title="Driver & Car" value="">
                            <div className="flex space-x-4">
                                <img src={ride.driverImageUrl} alt={ride.driverName} className="w-20 h-20 object-cover rounded-full"/>
                                <div>
                                    <p className="font-semibold">{ride.driverName}</p>
                                    <div className="flex items-center text-sm text-gray-600">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(ride.reliabilityStars) ? "#facc15" : "none"} stroke="#facc15" className="mr-0.5"/>)}
                                        ({ride.reliabilityStars})
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-800">
                                        <CarIcon model={ride.carModel} />
                                        <span>{ride.carYear} {ride.carModel}</span>
                                    </div>
                                    <div className="mt-2"><PlateNumber plate={ride.plateNumber}/></div>
                                </div>
                            </div>
                        </AccordionItem>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white border-t flex-shrink-0 flex justify-between items-center">
                <div>
                    <p className="text-2xl font-bold">${finalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{ride.ratePerMail || ride.avgFuelPerMile}</p>
                </div>
                <button className="bg-[#005f73] text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#007a8d] transition-colors">Book</button>
            </div>
        </div>
    );
};

export default App;
