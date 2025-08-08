// Driver Dashboard - With Custom Scrollbar Styling
import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Play,
  User,
  MapPin,
  Calendar,
  Clock,
  BarChart,
  Shield,
  Navigation,
  MessageCircle,
  Users, // For Groups
  Hash, // For Channels
  Store, // For Market
  Search, // For search bar
  X, // For closing modals
  CheckCircle, // For submit button success state
  ArrowUp,   // For Navigation
  ArrowLeft, // For Navigation
  ArrowRight,// For Navigation
  Flag,      // For Navigation
  ChevronLeft, // For Navigation
  Send, // For search button
  Loader2, // For loading state
  XCircle, // For ending a trip
  Fuel, // Nearby gas stations
  Radar, // Speed cameras
  LocateFixed, // Recenter to user
} from "lucide-react";

// --- Custom Scrollbar Styles Component ---
const CustomScrollbarStyles = () => (
  <style>{`
    /* For Webkit-based browsers (Chrome, Safari, Edge) */
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #244A62; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #64748b; border-radius: 10px; border: 2px solid #244A62; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
    /* For Firefox */
    .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #64748b #244A62; }
    .animate-spin-slow { animation: spin 2s linear infinite; }
    /* Hide the default Leaflet routing instructions panel */
    .leaflet-routing-container { display: none !important; }
  `}</style>
);


// Helper component for a simple avatar
const Avatar = ({ initials, bgColor }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${bgColor}`} >
    {initials}
  </div>
);

// Message Dashboard component with Telegram-like UX
const MessageDashboard = ({ onClose }) => {
  const [activeMessageTab, setActiveMessageTab] = useState("chats");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messageNavItems = [
    { id: "chats", label: "Chats", icon: MessageCircle }, { id: "groups", label: "Groups", icon: Users }, { id: "channels", label: "Channels", icon: Hash }, { id: "market", label: "Market", icon: Store },
  ];

  const currentTabLabel = messageNavItems.find(item => item.id === activeMessageTab)?.label;

  const renderMessageContent = () => {
    const chatItems = {
      chats: [ { id: 1, name: "Jane Doe", lastMessage: "Hey, are you available for a ride?", time: "10:30 AM", avatar: <Avatar initials="JD" bgColor="bg-purple-500" /> }, { id: 2, name: "Mike Smith", lastMessage: "Thanks for the ride last week!", time: "Yesterday", avatar: <Avatar initials="MS" bgColor="bg-blue-500" /> }, ],
      groups: [ { id: 1, name: "Drivers Community", lastMessage: "New update on city regulations.", time: "1 hr ago", avatar: <Avatar initials="DC" bgColor="bg-yellow-500" /> }, ],
      channels: [ { id: 1, name: "Ride Alerts Official", lastMessage: "High demand in downtown area!", time: "15 min ago", avatar: <Avatar initials="RA" bgColor="bg-red-500" /> }, ],
      market: [ { id: 1, name: "Special Offers", lastMessage: "Discount on car maintenance this week.", time: "2 days ago", avatar: <Avatar initials="SO" bgColor="bg-indigo-500" /> }, ],
    };
    const currentChats = chatItems[activeMessageTab] || [];
    const filteredChats = currentChats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {filteredChats.length > 0 ? (
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <div key={chat.id} className="flex items-center p-3 hover:bg-white/10 cursor-pointer transition-colors" >
                {chat.avatar}
                <div className="ml-3 flex-grow">
                  <p className="font-medium text-white">{chat.name}</p>
                  <p className="text-sm text-white/70 truncate">{chat.lastMessage}</p>
                </div>
                <span className="text-xs text-white/50">{chat.time}</span>
              </div>
            ))}
          </div>
        ) : ( <p className="text-white/50 text-center mt-10">No messages found.</p> )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#244A62]">
      <div className="bg-[#244A62] p-3 border-b border-white/10 flex items-center justify-between">
        <button onClick={onClose} className="text-white/80 hover:text-white">
            <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold text-white">{currentTabLabel}</h2>
        <button onClick={() => setShowSearchInput(!showSearchInput)} className="text-white/80 hover:text-white" >
          <Search className="h-6 w-6" />
        </button>
      </div>
      {showSearchInput && (
        <div className="p-3 bg-[#244A62] border-b border-white/10">
          <input type="text" placeholder="Search messages..." className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      )}
      <div className="flex justify-around bg-[#244A62] p-2 border-b border-white/10">
        {messageNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMessageTab === item.id;
          return (
            <button key={item.id} onClick={() => { setActiveMessageTab(item.id); setSearchQuery(""); setShowSearchInput(false); }} className={`flex-1 flex flex-col items-center py-2 transition-colors relative ${isActive ? "text-white" : "text-white/50"}`} >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {isActive && (<div className="absolute bottom-0 h-0.5 w-full bg-white rounded-full"></div>)}
            </button>
          );
        })}
      </div>
      {renderMessageContent()}
    </div>
  );
};

// Expanded Data for Uzbekistan Regions and Cities
const uzbekistanLocations = [
    { region: "Tashkent City", cities: ["Tashkent", "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugbek", "Sergeli", "Shaykhontohur", "Uchtepa", "Yakkasaroy", "Yashnobod", "Yunusobod"] },
    { region: "Andijan Region", cities: ["Andijan", "Asaka", "Baliqchi", "Bo'ston", "Buloqboshi", "Izboskan", "Jalaquduq", "Marhamat", "Oltinko'l", "Paxtaobod", "Qo'rg'ontepa", "Shahrixon", "Ulug'nor", "Xo'jaobod"] },
    { region: "Bukhara Region", cities: ["Bukhara", "Galaosiyo", "G'ijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Qorako'l", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"] },
    { region: "Fergana Region", cities: ["Fergana", "Bag'dod", "Beshariq", "Buvayda", "Dang'ara", "Farg'ona", "Furqat", "O'zbekiston", "Oltiariq", "Qo'shtepa", "Quva", "Rishton", "So'x", "Toshloq", "Uchko'prik", "Yozyovon", "Quvasoy", "Marg'ilon", "Qo'qon"] },
    { region: "Jizzakh Region", cities: ["Jizzakh", "Arnasoy", "Baxmal", "Do'stlik", "Forish", "G'allaorol", "Mirzacho'l", "Paxtakor", "Yangiobod", "Zafarobod", "Zarbdor", "Zomin"] },
];


// Location Selection Modal Component
const LocationSelectModal = ({ title, isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleClose = () => {
    setSelectedRegion(null);
    setSearchTerm("");
    onClose();
  }

  const filteredRegions = uzbekistanLocations.filter(regionData =>
    regionData.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCities = selectedRegion
    ? selectedRegion.cities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#244A62] rounded-lg shadow-lg w-full max-w-md h-[80vh] flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={handleClose} className="text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
            <input type="text" placeholder="Search for a city or region..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {selectedRegion ? (
            <>
              <button onClick={() => setSelectedRegion(null)} className="text-white/70 hover:text-white text-sm mb-2 flex items-center" >
                <span className="mr-2">&larr;</span> Back to Regions
              </button>
              <h3 className="text-md font-semibold text-white mb-2">{selectedRegion.region}</h3>
              {filteredCities.length > 0 ? (
                filteredCities.map(city => (
                  <button key={city} onClick={() => { onSelect(city); handleClose(); }} className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-md text-white" >
                    {city}
                  </button>
                ))
              ) : ( <p className="text-white/50 text-center">No cities found.</p> )}
            </>
          ) : (
            filteredRegions.length > 0 ? (
              filteredRegions.map(regionData => (
                <div key={regionData.region}>
                  <button onClick={() => setSelectedRegion(regionData)} className="w-full text-left p-3 font-semibold text-white hover:bg-white/10 rounded-md" >
                    {regionData.region}
                  </button>
                  {searchTerm === "" && regionData.cities.slice(0, 3).map(city => (
                    <button key={city} onClick={() => { onSelect(city); handleClose(); }} className="w-full text-left pl-6 py-2 text-white/70 hover:bg-white/5 rounded-md text-sm" >
                      {city}
                    </button>
                  ))}
                </div>
              ))
            ) : ( <p className="text-white/50 text-center">No regions found.</p> )
          )}
        </div>
      </div>
    </div>
  );
};


// Main Post Ride Form Component
const PostRideForm = ({ onClose }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [mailService, setMailService] = useState(""); // "yes", "no", "mail_only"
  const [departureType, setDepartureType] = useState(""); // "fixed", "when_fills"
  const [departureTime, setDepartureTime] = useState(""); // Only for fixed departure
  const [price, setPrice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false); // For date picker modal

  // Simple validation for submit button
  const isFormValid =
    fromLocation &&
    toLocation &&
    departureDate &&
    mailService &&
    departureType &&
    price &&
    (departureType !== "fixed" || departureTime); // If fixed, time is also required

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Ride Posted:", { fromLocation, toLocation, departureDate, mailService, departureType, departureTime, price });
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  // Date Picker Modal Component
  const DatePickerModal = ({ isOpen, onClose, onSelectDate }) => {
    if (!isOpen) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-[#244A62] rounded-lg shadow-lg w-full max-w-md flex flex-col">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Select Departure Date</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white"> <X className="h-6 w-6" /> </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center text-white text-lg font-medium mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-white/70 text-sm mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }).map((_, i) => ( <div key={`pad-${i}`} className="p-2"></div> ))}
              {dates.map(day => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                const isToday = day === today.getDate();
                const isPast = date < today;
                const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                return (
                  <button key={day} onClick={() => { onSelectDate(dateString); onClose(); }} className={`p-2 rounded-full text-white text-sm font-medium ${isToday ? 'bg-white/20 border border-white' : 'hover:bg-white/10'} ${isPast ? 'text-white/30 cursor-not-allowed' : ''}`} disabled={isPast} >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4">
      <div className="bg-[#244A62] rounded-lg shadow-lg w-full max-w-md h-[90vh] flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Post a New Ride</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white"> <X className="h-6 w-6" /> </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">From Where</label>
            <div onClick={() => setShowFromModal(true)} className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer" >
              {fromLocation || "Select origin"}
              <MapPin className="h-5 w-5 text-white/50" />
            </div>
            <LocationSelectModal title="Select Origin" isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setFromLocation} />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">To Where</label>
            <div onClick={() => setShowToModal(true)} className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer" >
              {toLocation || "Select destination"}
              <MapPin className="h-5 w-5 text-white/50" />
            </div>
            <LocationSelectModal title="Select Destination" isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setToLocation} />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Departure Date</label>
            <div onClick={() => setShowDateModal(true)} className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer" >
              {departureDate || "Select date"}
              <Calendar className="h-5 w-5 text-white/50" />
            </div>
            <DatePickerModal isOpen={showDateModal} onClose={() => setShowDateModal(false)} onSelectDate={setDepartureDate} />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Mail Service</label>
            <div className="space-y-3">
              <button type="button" onClick={() => setMailService("yes")} className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${mailService === "yes" ? "bg-green-600/30 border border-green-400" : "bg-white/10 hover:bg-white/20"}`} >
                <div className="text-left">
                  <p className="font-medium text-white">Yes, I do carry Mail</p>
                  <p className="text-sm text-white/70">I can transport both passengers and mail packages</p>
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button type="button" onClick={() => setMailService("no")} className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${mailService === "no" ? "bg-green-600/30 border border-green-400" : "bg-white/10 hover:bg-white/20"}`} >
                <div className="text-left">
                  <p className="font-medium text-white">No, I do not carry Mail</p>
                  <p className="text-sm text-white/70">I only transport passengers, no mail service</p>
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button type="button" onClick={() => setMailService("mail_only")} className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${mailService === "mail_only" ? "bg-blue-600/30 border border-blue-400" : "bg-white/10 hover:bg-white/20"}`} >
                <div className="text-left">
                  <p className="font-medium text-white">I carry Mail Only Not Riders</p>
                  <p className="text-sm text-white/70">Dedicated mail service, no passenger transport</p>
                </div>
                {mailService === "mail_only" && <CheckCircle className="h-6 w-6 text-blue-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Departure Type</label>
            <div className="space-y-3">
              <button type="button" onClick={() => { setDepartureType("fixed"); }} className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${departureType === "fixed" ? "bg-teal-600/30 border border-teal-400" : "bg-white/10 hover:bg-white/20"}`} >
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-white">Fixed Departure Time</p>
                    <p className="text-sm text-white/70">Leave at a specific time regardless of seat availability</p>
                  </div>
                </div>
                {departureType === "fixed" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
              {departureType === "fixed" && (
                <div className="w-full p-3 bg-white/10 rounded-lg flex items-center">
                  <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="flex-grow bg-transparent text-white placeholder-white/50 focus:outline-none" />
                  <Clock className="h-5 w-5 text-white/50 ml-2" />
                </div>
              )}
              <button type="button" onClick={() => { setDepartureType("when_fills"); setDepartureTime(""); }} className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors ${departureType === "when_fills" ? "bg-teal-600/30 border border-teal-400" : "bg-white/10 hover:bg-white/20"}`} >
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-white">Leave When Seats Fill</p>
                    <p className="text-sm text-white/70">Depart as soon as all available seats are booked</p>
                  </div>
                </div>
                {departureType === "when_fills" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Price</label>
            <div className="relative">
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Enter price" className="w-full p-3 pl-10 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50" value={price} onChange={(e) => { const value = e.target.value; if (/^[0-9]*$/.test(value)) { setPrice(value); } }} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
            </div>
          </div>
          <button type="submit" disabled={!isFormValid || isSubmitted} className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center ${isFormValid && !isSubmitted ? "bg-green-500 hover:bg-green-600 text-white" : isSubmitted ? "bg-green-700 text-white cursor-not-allowed" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`} >
            {isSubmitted ? ( <> <CheckCircle className="h-6 w-6 mr-2" /> Submitted! </> ) : ( "Post Ride" )}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- New, Advanced Navigation View Component ---
const NavigationView = ({ onClose }) => {
  const [origin, setOrigin] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [destInput, setDestInput] = useState("");
  const [destCoords, setDestCoords] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [summary, setSummary] = useState({ distance: 0, time: 0 });
  const [stepIndex, setStepIndex] = useState(0);
  const [layers, setLayers] = useState({ drivers: false, gas: false, market: false, radar: false });
  const [recenterTick, setRecenterTick] = useState(0);

  // --- Helper Functions ---
  const formatDistance = (m) => {
    if (m === undefined || m === null) return "";
    if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
    return `${Math.round(m)} m`;
  };
  const formatTime = (s) => {
    if (s === undefined || s === null) return "";
    const min = Math.round(s / 60);
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  // --- Dynamic Icon for Current Step ---
  const CurrentIcon = (() => {
    const t = instructions[stepIndex]?.text?.toLowerCase() || "";
    if (t.includes("left")) return ArrowLeft;
    if (t.includes("right")) return ArrowRight;
    if (t.includes("destination") || t.includes("arrive")) return Flag;
    return ArrowUp;
  })();
  
  // --- Calculate Trip Progress ---
  const initialDistance = summary.distance;
  const distanceCovered = instructions.slice(0, stepIndex).reduce((acc, curr) => acc + curr.distance, 0);
  const tripProgress = initialDistance > 0 ? (distanceCovered / initialDistance) * 100 : 0;

  // --- Effects ---
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by this browser.");
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setOrigin({ lat: latitude, lng: longitude });
        if (geoError) setGeoError(null);
      },
      (err) => {
        if (err.code === 1) setGeoError("Geolocation permission denied. Enable it in your browser settings.");
        else setGeoError("Could not retrieve location.");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [geoError]);

  useEffect(() => {
    if (!isNavigating || instructions.length === 0 || stepIndex >= instructions.length - 1) return;
    const timeout = setTimeout(() => setStepIndex((i) => i + 1), 6000); // Simulate progress every 6 seconds
    return () => clearTimeout(timeout);
  }, [isNavigating, stepIndex, instructions]);
  
  useEffect(() => { setIsRouting(isNavigating); }, [isNavigating]);

  // --- Action Handlers ---
  const geocodeDestination = async () => {
    if (!destInput.trim()) return;
    if (!origin) {
      setGeoError("Waiting for your current location...");
      return;
    }
    setIsGeocoding(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destInput)}&limit=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      if (!data?.length) throw new Error("Destination not found.");
      const { lat, lon, display_name } = data[0];
      setDestCoords({ lat: parseFloat(lat), lng: parseFloat(lon), name: display_name });
      setIsNavigating(true);
      setStepIndex(0);
    } catch (e) {
      setGeoError(e.message || "Geocoding failed. Try another address.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const endTrip = () => {
    setIsNavigating(false);
    setDestCoords(null);
    setInstructions([]);
    setSummary({ distance: 0, time: 0 });
    setStepIndex(0);
  };
  
  const handleRouteFound = ({ instructions, summary }) => {
    setIsRouting(false);
    setInstructions(instructions);
    setSummary({ distance: summary.totalDistance, time: summary.totalTime });
    setStepIndex(0);
  };

  // --- Map Component (Internal) ---
  const MapComponent = ({ origin, destinationCoords, navigating, onRouteFound, showLayers, recenterTrigger }) => {
    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const routingRef = useRef(null);
    const gasLayerRef = useRef(null);
    const marketLayerRef = useRef(null);
    const radarLayerRef = useRef(null);
    const driversLayerRef = useRef(null);

    // Corrected promise syntax for plain JS
    const ensureLeaflet = () => new Promise((resolve) => {
      const ready = () =>
        typeof window !== 'undefined' && window.L && window.L.Routing;
      if (ready()) return resolve();
      const i = setInterval(() => {
        if (ready()) {
          clearInterval(i);
          resolve();
        }
      }, 100);
    });

    useEffect(() => {
      let mounted = true;
      (async () => {
        await ensureLeaflet();
        if (!mounted || !window.L) return;
        if (!mapRef.current) {
          const map = window.L.map('leaflet-map', { zoomControl: false, attributionControl: false });
          mapRef.current = map;
          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap & CARTO' }).addTo(map);
          if (origin) map.setView([origin.lat, origin.lng], 14);
          gasLayerRef.current = window.L.layerGroup().addTo(map);
          marketLayerRef.current = window.L.layerGroup().addTo(map);
          radarLayerRef.current = window.L.layerGroup().addTo(map);
          driversLayerRef.current = window.L.layerGroup().addTo(map);
        }
      })();
      return () => { mounted = false; };
    }, []);

    useEffect(() => {
      (async () => {
        await ensureLeaflet();
        const L = window.L; const map = mapRef.current; if (!map || !origin) return;
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.circleMarker([origin.lat, origin.lng], { radius: 8, color: '#34d399', weight: 3, fillColor: '#34d399', fillOpacity: 0.9 }).addTo(map);
        } else userMarkerRef.current.setLatLng([origin.lat, origin.lng]);
        if (!navigating) map.setView([origin.lat, origin.lng], 14);
      })();
    }, [origin, navigating]);

    useEffect(() => {
      if (!recenterTrigger || !origin || !mapRef.current) return;
      mapRef.current.setView([origin.lat, origin.lng], 15, { animate: true });
    }, [recenterTrigger]);

    useEffect(() => {
      (async () => {
        await ensureLeaflet();
        const L = window.L; const map = mapRef.current; if (!map) return;
        if (routingRef.current) { routingRef.current.setWaypoints([]); map.removeControl(routingRef.current); routingRef.current = null; }
        if (navigating && origin && destinationCoords) {
          const ctrl = L.Routing.control({
            waypoints: [L.latLng(origin.lat, origin.lng), L.latLng(destinationCoords.lat, destinationCoords.lng)],
            routeWhileDragging: false, addWaypoints: false, show: false, fitSelectedRoutes: true,
            lineOptions: { styles: [{ color: '#3b82f6', opacity: 0.95, weight: 6 }] },
            createMarker: (_i, wp) => L.marker(wp.latLng, { opacity: 0.9 })
          }).addTo(map);
          routingRef.current = ctrl;
          ctrl.on('routesfound', function(e) {
            const r = e.routes?.[0];
            if (!r) return;
            const instr = (r.instructions || []).map((it) => ({ text: it.text, distance: it.distance, time: it.time }));
            onRouteFound({ instructions: instr, summary: r.summary });
          });
        }
      })();
    }, [navigating, origin?.lat, origin?.lng, destinationCoords?.lat, destinationCoords?.lng]);

    const fetchAndAddPOIs = async (layerRef, query, color) => {
        await ensureLeaflet();
        const L = window.L;
        const map = mapRef.current;
        if (!map || !layerRef.current) return;
        layerRef.current.clearLayers();

        try {
            const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(`[out:json];${query}(around:2000,${origin.lat},${origin.lng});out center;`)}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Overpass request failed');
            const data = await res.json();
            data.elements.forEach((el) => {
                const lat = el.lat || el.center?.lat;
                const lon = el.lon || el.center?.lon;
                if (lat && lon) {
                    L.circleMarker([lat, lon], { radius: 6, color, weight: 2, fillColor: color, fillOpacity: 0.85 }).addTo(layerRef.current);
                }
            });
        } catch (e) {
            console.error("POI Fetch Error:", e);
        }
    };

    useEffect(() => { if (showLayers.gas && origin) fetchAndAddPOIs(gasLayerRef, 'node["amenity"="fuel"]', '#f59e0b'); else gasLayerRef.current?.clearLayers(); }, [showLayers.gas, origin]);
    useEffect(() => { if (showLayers.market && origin) fetchAndAddPOIs(marketLayerRef, '(node["shop"="supermarket"];node["amenity"="marketplace"];)', '#3b82f6'); else marketLayerRef.current?.clearLayers(); }, [showLayers.market, origin]);
    useEffect(() => { if (showLayers.radar && origin) fetchAndAddPOIs(radarLayerRef, 'node["highway"="speed_camera"]', '#ef4444'); else radarLayerRef.current?.clearLayers(); }, [showLayers.radar, origin]);
    
    useEffect(() => {
        (async () => {
            await ensureLeaflet();
            if (!driversLayerRef.current || !origin) return;
            driversLayerRef.current.clearLayers();
            if (showLayers.drivers) {
                for (let i = 0; i < 10; i++) {
                    const lat = origin.lat + (Math.random() - 0.5) * 0.008;
                    const lng = origin.lng + (Math.random() - 0.5) * 0.008;
                    window.L.circleMarker([lat, lng], { radius: 7, color: '#22c55e', weight: 2, fillColor: '#22c55e', fillOpacity: 0.85 }).addTo(driversLayerRef.current);
                }
            }
        })();
    }, [showLayers.drivers, origin]);

    return <div id="leaflet-map" className="absolute inset-0" />;
  };

  return (
    <div className="relative h-full w-full text-white">
      <MapComponent origin={origin} destinationCoords={destCoords} navigating={isNavigating} onRouteFound={handleRouteFound} showLayers={layers} recenterTrigger={recenterTick} />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"> <ChevronLeft className="h-6 w-6" /> </button>
        <div className="text-center">
            {isNavigating && destCoords?.name && <p className="text-sm text-white/80 truncate max-w-[60vw]">To: {destCoords.name}</p>}
        </div>
        <div className="w-10 h-10"/>
      </header>

      {/* Side Controls */}
      <aside className="absolute right-4 top-24 z-10 flex flex-col space-y-2">
        <button onClick={() => setLayers((s) => ({ ...s, drivers: !s.drivers }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 transition-all ${layers.drivers ? 'ring-2 ring-white/50 bg-black/60' : ''}`} aria-label="Toggle drivers nearby"> <Users className="h-5 w-5" /> </button>
        <button onClick={() => setLayers((s) => ({ ...s, gas: !s.gas }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 transition-all ${layers.gas ? 'ring-2 ring-white/50 bg-black/60' : ''}`} aria-label="Toggle gas stations nearby"> <Fuel className="h-5 w-5" /> </button>
        <button onClick={() => setLayers((s) => ({ ...s, market: !s.market }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 transition-all ${layers.market ? 'ring-2 ring-white/50 bg-black/60' : ''}`} aria-label="Toggle markets nearby"> <Store className="h-5 w-5" /> </button>
        <button onClick={() => setLayers((s) => ({ ...s, radar: !s.radar }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 transition-all ${layers.radar ? 'ring-2 ring-white/50 bg-black/60' : ''}`} aria-label="Toggle speed cameras"> <Radar className="h-5 w-5" /> </button>
      </aside>
      
      {/* Recenter Button */}
      <div className="absolute left-4 bottom-32 z-10">
        <button onClick={() => setRecenterTick((n) => n + 1)} className="p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50" aria-label="Recenter on me"> <LocateFixed className="h-5 w-5" /> </button>
      </div>

      {/* Bottom Panels */}
      {!isNavigating ? (
        // Search Panel
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10">
            <h2 className="text-lg font-semibold mb-3">Where to?</h2>
            <div className="flex gap-2">
              <input value={destInput} onChange={(e) => setDestInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && geocodeDestination()} placeholder="Enter address or place" className="w-full p-3 bg-slate-700/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isGeocoding} />
              <button onClick={geocodeDestination} className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors" disabled={!origin || !destInput || isGeocoding}>
                {isGeocoding ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
              </button>
            </div>
            {geoError && <p className="text-red-400 text-sm mt-3">{geoError}</p>}
            {!geoError && !origin && <p className="text-amber-400 text-sm mt-3 flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Acquiring current location...</p>}
            {!geoError && origin && <p className="text-emerald-400 text-sm mt-3">Ready to navigate.</p>}
          </div>
        </section>
      ) : (
        // Navigation Panel
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10 space-y-4">
            {/* Progress Bar */}
            <div className="w-full bg-slate-600 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${tripProgress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            {/* Instruction */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-xl"> <CurrentIcon className="h-8 w-8 text-white" /> </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{formatDistance(instructions[stepIndex]?.distance)}</h3>
                <p className="text-white/80 leading-snug">{instructions[stepIndex]?.text || 'Starting navigation...'}</p>
              </div>
              {isRouting && <Loader2 className="h-6 w-6 animate-spin text-white/70" />}
            </div>
             {/* Summary & End Button */}
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                 <p className="text-white/60 text-sm">
                    {formatDistance(summary.distance)} • ETA {formatTime(summary.time)}
                 </p>
                 <button onClick={endTrip} className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors">
                    <XCircle className="h-5 w-5" />
                    End
                 </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};


const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: MapPin },
    { id: "navigation", label: "Navigation", icon: Navigation },
    { id: "videos", label: "Videos", icon: Play },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    if (showMessages) { return <MessageDashboard onClose={() => setShowMessages(false)} />; }
    switch (activeTab) {
      case "dashboard": return (
          <div className="p-4 space-y-4 text-white">
            <div className="text-center py-4">
              <h2 className="text-sm opacity-80">Total Earnings</h2>
              <p className="text-4xl font-bold mt-1 mb-4">$0.00</p>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowPostRide(true)} >
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">New Ride</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Navigation className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">My lines</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <BarChart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">Stats</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">Safety</span>
                </div>
              </div>
            </div>
            <h3 className="flex items-center text-sm font-semibold mb-2 opacity-80">
              <Calendar className="h-4 w-4 mr-2" />
              Your activity
            </h3>
            <div className="p-4 bg-white/10 border-0 rounded-lg space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <div className="flex items-center text-white"> <MapPin className="h-4 w-4 mr-2 text-green-400" /> Ggg </div>
                  <div className="flex items-center text-white ml-6"> <MapPin className="h-4 w-4 mr-2 text-red-400" /> Ttgt </div>
                  <div className="flex items-center text-white/80 mt-2"> <User className="h-4 w-4 mr-2" /> 2/4 passengers </div>
                  <div className="flex items-center text-white/80 mt-1"> <Calendar className="h-4 w-4 mr-2" /> 31.07.2025 <Clock className="h-4 w-4 mx-2" /> 16:15 </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-full"> Active </span>
                  <button> <Plus className="h-5 w-5 mt-2 opacity-60 rotate-45" /> </button>
                </div>
              </div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between items-center text-sm opacity-60">
                <div className="flex flex-col">
                  <div className="flex items-center text-white"> <MapPin className="h-4 w-4 mr-2" /> wfwewrf </div>
                  <div className="flex items-center text-white ml-6"> <MapPin className="h-4 w-4 mr-2" /> fwewfw </div>
                </div>
                <div className="text-xs">24.07.2025</div>
              </div>
            </div>
          </div>
        );
      case "navigation": return <NavigationView onClose={() => setActiveTab("dashboard")} />;
      case "videos": return ( <div className="p-4 text-white"> <h2 className="text-xl font-bold">Video Feed Content</h2> </div> );
      case "profile": return ( <div className="p-4 text-white"> <h2 className="text-xl font-bold">Advanced Profile Content</h2> </div> );
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#244A62] text-white flex flex-col">
      <CustomScrollbarStyles />
      {activeTab !== 'navigation' && (
        <header className="bg-[#244A62] p-3 border-b border-white/10 flex justify-between items-center z-20">
          <h1 className="text-lg font-medium">Driver</h1>
          <button onClick={() => setShowMessages(!showMessages)} className="text-white/80 hover:text-white transition-colors" >
            <MessageCircle className="h-8 w-8" />
          </button>
        </header>
      )}
      <main className="flex-grow overflow-y-auto custom-scrollbar h-full relative"> {renderContent()} </main>
      {activeTab !== 'navigation' && !showMessages && !showPostRide && (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#244A62] border-t border-white/10 shadow-lg z-10">
          <div className="flex justify-around">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); }} className={`flex-1 flex flex-col items-center py-3 transition-colors ${ isActive ? "text-white" : "text-white/50" }`} >
                  <Icon className={`h-6 w-6 ${ isActive ? "text-white" : "text-white/50" }`} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </footer>
      )}
      {showPostRide && <PostRideForm onClose={() => setShowPostRide(false)} />}
    </div>
  );
};

export default DriverDashboard;
