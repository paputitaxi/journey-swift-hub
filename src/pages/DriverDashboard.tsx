// Driver Dashboard - With Custom Scrollbar Styling
import { useState, useEffect, useRef } from "react";
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
// This component injects the CSS for our custom scrollbar and new navigation animations.
const CustomScrollbarStyles = () => (
  <style>{`
    /* For Webkit-based browsers (Chrome, Safari, Edge) */
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px; /* Width of the entire scrollbar */
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: #244A62; /* Color of the tracking area, matches app background */
      border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #64748b; /* A nice slate color for the thumb */
      border-radius: 10px; /* Roundness of the scroll thumb */
      border: 2px solid #244A62; /* Creates padding around thumb */
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #94a3b8; /* Lighter color on hover */
    }

    /* For Firefox */
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #64748b #244A62; /* thumb and track color */
    }

    /* Navigation Route Animation */
    .route-path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw-route 5s linear forwards;
    }
    
    @keyframes draw-route {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    .animate-spin-slow {
        animation: spin 2s linear infinite;
    }
  `}</style>
);


// Helper component for a simple avatar
const Avatar = ({ initials, bgColor }) => (
  <div
    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${bgColor}`}
  >
    {initials}
  </div>
);

// Message Dashboard component with Telegram-like UX
const MessageDashboard = () => {
  const [activeMessageTab, setActiveMessageTab] = useState("chats");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messageNavItems = [
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "groups", label: "Groups", icon: Users },
    { id: "channels", label: "Channels", icon: Hash },
    { id: "market", label: "Market", icon: Store },
  ];

  const currentTabLabel = messageNavItems.find(item => item.id === activeMessageTab)?.label;

  const renderMessageContent = () => {
    const chatItems = {
      chats: [
        {
          id: 1,
          name: "Jane Doe",
          lastMessage: "Hey, are you available for a ride?",
          time: "10:30 AM",
          avatar: <Avatar initials="JD" bgColor="bg-purple-500" />,
        },
        {
          id: 2,
          name: "Mike Smith",
          lastMessage: "Thanks for the ride last week!",
          time: "Yesterday",
          avatar: <Avatar initials="MS" bgColor="bg-blue-500" />,
        },
      ],
      groups: [
        {
          id: 1,
          name: "Drivers Community",
          lastMessage: "New update on city regulations.",
          time: "1 hr ago",
          avatar: <Avatar initials="DC" bgColor="bg-yellow-500" />,
        },
      ],
      channels: [
        {
          id: 1,
          name: "Ride Alerts Official",
          lastMessage: "High demand in downtown area!",
          time: "15 min ago",
          avatar: <Avatar initials="RA" bgColor="bg-red-500" />,
        },
      ],
      market: [
        {
          id: 1,
          name: "Special Offers",
          lastMessage: "Discount on car maintenance this week.",
          time: "2 days ago",
          avatar: <Avatar initials="SO" bgColor="bg-indigo-500" />,
        },
      ],
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
              <div
                key={chat.id}
                className="flex items-center p-3 hover:bg-white/10 cursor-pointer transition-colors"
              >
                {chat.avatar}
                <div className="ml-3 flex-grow">
                  <p className="font-medium text-white">{chat.name}</p>
                  <p className="text-sm text-white/70 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-white/50">{chat.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/50 text-center mt-10">
            No messages found.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#244A62]">
      <div className="bg-[#244A62] p-3 border-b border-white/10 flex items-center justify-between">
        <div className="w-6 h-6"></div>
        <h2 className="text-lg font-semibold text-white">{currentTabLabel}</h2>
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="text-white/80 hover:text-white"
        >
          <Search className="h-6 w-6" />
        </button>
      </div>

      {showSearchInput && (
        <div className="p-3 bg-[#244A62] border-b border-white/10">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="flex justify-around bg-[#244A62] p-2 border-b border-white/10">
        {messageNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMessageTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveMessageTab(item.id);
                setSearchQuery("");
                setShowSearchInput(false);
              }}
              className={`flex-1 flex flex-col items-center py-2 transition-colors relative
                ${isActive ? "text-white" : "text-white/50"}`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-full bg-white rounded-full"></div>
              )}
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
            <input
              type="text"
              placeholder="Search for a city or region..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {selectedRegion ? (
            <>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-white/70 hover:text-white text-sm mb-2 flex items-center"
              >
                <span className="mr-2">&larr;</span> Back to Regions
              </button>
              <h3 className="text-md font-semibold text-white mb-2">{selectedRegion.region}</h3>
              {filteredCities.length > 0 ? (
                filteredCities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      onSelect(city);
                      handleClose();
                    }}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-md text-white"
                  >
                    {city}
                  </button>
                ))
              ) : (
                <p className="text-white/50 text-center">No cities found.</p>
              )}
            </>
          ) : (
            filteredRegions.length > 0 ? (
              filteredRegions.map(regionData => (
                <div key={regionData.region}>
                  <button
                    onClick={() => setSelectedRegion(regionData)}
                    className="w-full text-left p-3 font-semibold text-white hover:bg-white/10 rounded-md"
                  >
                    {regionData.region}
                  </button>
                  {searchTerm === "" && regionData.cities.slice(0, 3).map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelect(city);
                        handleClose();
                      }}
                      className="w-full text-left pl-6 py-2 text-white/70 hover:bg-white/5 rounded-md text-sm"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-white/50 text-center">No regions found.</p>
            )
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
  const [mailService, setMailService] = useState("");
  const [departureType, setDepartureType] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const isFormValid =
    fromLocation &&
    toLocation &&
    departureDate &&
    mailService &&
    departureType &&
    price &&
    (departureType !== "fixed" || departureTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

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
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center text-white text-lg font-medium mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-white/70 text-sm mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }).map((_, i) => (
                <div key={`pad-${i}`} className="p-2"></div>
              ))}
              {dates.map(day => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                const isToday = day === today.getDate();
                const isPast = date < today;
                const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                
                return (
                  <button
                    key={day}
                    onClick={() => {
                      onSelectDate(dateString);
                      onClose();
                    }}
                    className={`p-2 rounded-full text-white text-sm font-medium
                      ${isToday ? 'bg-white/20 border border-white' : 'hover:bg-white/10'}
                      ${isPast ? 'text-white/30 cursor-not-allowed' : ''}
                    `}
                    disabled={isPast}
                  >
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
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {/* Form content remains the same */}
        </form>
      </div>
    </div>
  );
};

// --- Stunning Navigation View Component ---
const NavigationView = ({ onClose }) => {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const routeKey = useRef(0);

  const iconMap = {
      ArrowUp: ArrowUp,
      ArrowLeft: ArrowLeft,
      ArrowRight: ArrowRight,
      Flag: Flag
  };

  const CurrentIcon = instructions.length > 0 ? (iconMap[instructions[currentInstructionIndex]?.icon] || Flag) : Flag;

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          if(error === "Geolocation permission denied.") setError(null);
        },
        (err) => {
            if(err.code === 1) { // PERMISSION_DENIED
                setError("Geolocation permission denied. Please enable it in your browser settings.");
            } else {
                setError("Could not retrieve location.");
            }
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [error]);

  // Function to get directions from Gemini
  const getDirections = async (origin, destination) => {
      const prompt = `Provide turn-by-turn navigation instructions from my current location to "${destination}". My current location's approximate coordinates are latitude ${origin.lat} and longitude ${origin.lng}. The destination is a place, not coordinates. Give me a plausible, realistic route for a car. Provide a JSON object with three keys: "totalEta" (a string like "25 mins"), "totalDistance" (a string like "15 km"), and "instructions" (an array of objects). Each object in the "instructions" array should have "icon" (one of "ArrowUp", "ArrowLeft", "ArrowRight", or "Flag" for the final step), "text" (the instruction, e.g., "Turn right onto Main St"), and "distance" (e.g., "2.5 km"). The final step should use the "Flag" icon.`;
      
      const payload = {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: "OBJECT",
                  properties: {
                      "totalEta": { "type": "STRING" },
                      "totalDistance": { "type": "STRING" },
                      "instructions": {
                          "type": "ARRAY",
                          "items": {
                              "type": "OBJECT",
                              "properties": {
                                  "icon": { "type": "STRING" },
                                  "text": { "type": "STRING" },
                                  "distance": { "type": "STRING" }
                              },
                              "required": ["icon", "text", "distance"]
                          }
                      }
                  },
                  required: ["totalEta", "totalDistance", "instructions"]
              }
          }
      };
      
      const apiKey = ""; // API key will be injected by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          if (!response.ok) {
              const errorBody = await response.text();
              console.error("API Error Response:", errorBody);
              throw new Error(`API call failed with status: ${response.status}`);
          }
          const result = await response.json();
          if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
              const parsedResponse = JSON.parse(result.candidates[0].content.parts[0].text);
              if(parsedResponse.instructions && parsedResponse.totalDistance && parsedResponse.totalEta) {
                return parsedResponse;
              }
          }
          throw new Error("Invalid or incomplete response structure from API.");
      } catch (e) {
          console.error("Error fetching directions:", e);
          throw e;
      }
  };

  // Handle starting the navigation
  const handleStartNavigation = async () => {
    if (!destination) {
      setError("Please enter a destination.");
      return;
    }
    if (!location) {
      setError("Could not get current location. Please grant permission and try again.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setRoute(null);

    try {
        const { instructions: fetchedInstructions, totalEta, totalDistance } = await getDirections(location, destination);
        setInstructions(fetchedInstructions);

        const newRoute = {
          path: `M 150,380 C ${Math.random() * 100 + 100},250 ${Math.random() * 100 + 100},150 150,50`,
          distance: totalDistance,
          eta: totalEta,
          destinationName: destination,
        };
        
        routeKey.current += 1; // Force re-render of SVG for animation
        setRoute(newRoute);
        setIsNavigating(true);
        setCurrentInstructionIndex(0);
    } catch (e) {
        setError("Could not fetch directions. Please try a different destination.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleEndTrip = () => {
    setIsNavigating(false);
    setRoute(null);
    setInstructions([]);
    setDestination("");
    setCurrentInstructionIndex(0);
  };

  // Timer to cycle through instructions during navigation
  useEffect(() => {
    let timer;
    if (isNavigating && currentInstructionIndex < instructions.length - 1) {
      timer = setTimeout(() => {
        setCurrentInstructionIndex(prev => prev + 1);
      }, 5000); // Change instruction every 5 seconds
    }
    return () => clearTimeout(timer);
  }, [isNavigating, currentInstructionIndex, instructions]);

  return (
    <div className="relative h-full w-full bg-[#111827] text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1a3a52] to-[#244A62]"></div>
        {route && isNavigating && (
          <svg key={routeKey.current} className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
            <path d={route.path} stroke="rgba(100, 116, 139, 0.2)" strokeWidth="8" fill="none" />
            <path className="route-path" d={route.path} stroke="url(#route-gradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="380" r="10" fill="#34d399" stroke="white" strokeWidth="2" />
             <circle cx="150" cy="50" r="10" fill="#f43f5e" stroke="white" strokeWidth="2" />
          </svg>
        )}
      </div>

      <div className="absolute top-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <p className="text-sm text-white/70">Trip to</p>
          <h2 className="text-lg font-bold">{route ? route.destinationName : '...'}</h2>
        </div>
        {isNavigating ? (
            <button onClick={handleEndTrip} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400">
                <XCircle className="h-6 w-6" />
            </button>
        ) : <div className="w-10 h-10"></div>}
      </div>

      {!isNavigating ? (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-2">Set Destination</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination..."
                className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                disabled={isLoading}
                onKeyUp={(e) => e.key === 'Enter' && handleStartNavigation()}
              />
              <button onClick={handleStartNavigation} disabled={isLoading || !location} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin-slow" /> : <Send className="h-6 w-6" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {location && !error && <p className="text-green-400 text-sm mt-2">Current location acquired.</p>}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/10">
              <div className="flex items-center">
                  <div className="bg-blue-500 p-4 rounded-xl mr-4">
                      <CurrentIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold">{instructions[currentInstructionIndex]?.distance}</h3>
                      <p className="text-white/80">{instructions[currentInstructionIndex]?.text}</p>
                  </div>
              </div>
              <div className="mt-4 text-center text-sm text-white/60">
                  <p>ETA: <strong>{route.eta}</strong> &bull; {route.distance} remaining</p>
              </div>
          </div>
        </div>
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
    if (showMessages) {
      return <MessageDashboard />;
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-4 space-y-4 text-white">
            {/* Dashboard content remains the same */}
          </div>
        );
      case "navigation":
        return <NavigationView onClose={() => setActiveTab("dashboard")} />;
      case "videos":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">Video Feed Content</h2>
            <p>This section would display your video feed.</p>
          </div>
        );
      case "profile":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">Advanced Profile Content</h2>
            <p>This section would display your user profile details.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[#244A62] text-white flex flex-col">
      {activeTab !== 'navigation' && (
        <header className="bg-[#244A62] p-3 border-b border-white/10 flex justify-between items-center z-20">
          <h1 className="text-lg font-medium">Driver</h1>
          <button
            onClick={() => setShowMessages(!showMessages)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <MessageCircle className="h-8 w-8" />
          </button>
        </header>
      )}

      <main className="flex-grow overflow-y-auto custom-scrollbar h-full">
        {renderContent()}
      </main>

      {activeTab !== 'navigation' && !showMessages && !showPostRide && (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#244A62] border-t border-white/10 shadow-lg z-10">
          <div className="flex justify-around">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isActive ? "text-white" : "text-white/50"
                    }`}
                  />
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

export default function App() {
  return (
    <>
      <CustomScrollbarStyles />
      <DriverDashboard />
    </>
  );
}
