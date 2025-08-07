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
  // Geolocation & navigation state
  const [origin, setOrigin] = useState<any>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const [destInput, setDestInput] = useState("");
  const [destCoords, setDestCoords] = useState<any>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const [instructions, setInstructions] = useState<any[]>([]); // {text, distance, time}
  const [summary, setSummary] = useState<{ distance: number; time: number }>({ distance: 0, time: 0 });
  const [stepIndex, setStepIndex] = useState(0);

  const [layers, setLayers] = useState({ drivers: false, gas: false, market: false, radar: false });
  const [recenterTick, setRecenterTick] = useState(0);

  // Formatters
  const formatDistance = (m?: number) => {
    if (m === undefined || m === null) return "";
    if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
    return `${Math.round(m)} m`;
  };
  const formatTime = (s?: number) => {
    if (s === undefined || s === null) return "";
    const min = Math.round(s / 60);
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  // Choose icon based on instruction text
  const CurrentIcon = (() => {
    const t = instructions[stepIndex]?.text?.toLowerCase() || "";
    if (t.includes("left")) return ArrowLeft;
    if (t.includes("right")) return ArrowRight;
    if (t.includes("destination") || t.includes("arrive")) return Flag;
    return ArrowUp;
  })();

  // Watch geolocation
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

  // Simulate progression through steps
  useEffect(() => {
    if (!isNavigating || instructions.length === 0) return;
    if (stepIndex >= instructions.length - 1) return;
    const timeout = setTimeout(() => setStepIndex((i) => i + 1), 6000);
    return () => clearTimeout(timeout);
  }, [isNavigating, stepIndex, instructions]);

  // Geocode destination via Nominatim
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
    } catch (e: any) {
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

  // Map child component encapsulating Leaflet
  const MapComponent = ({ origin, destinationCoords, navigating, onRouteFound, showLayers, recenterTrigger }:{
    origin: any;
    destinationCoords: any;
    navigating: boolean;
    onRouteFound: (p:{instructions:any[]; summary:{totalDistance:number; totalTime:number}})=>void;
    showLayers: {drivers:boolean; gas:boolean; market:boolean; radar:boolean};
    recenterTrigger: number;
  }) => {
    const mapRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);
    const routingRef = useRef<any>(null);

    const gasLayerRef = useRef<any>(null);
    const marketLayerRef = useRef<any>(null);
    const radarLayerRef = useRef<any>(null);
    const driversLayerRef = useRef<any>(null);

    // Load CDN assets if needed and ensure L & L.Routing exist
    const ensureLeaflet = () => new Promise<void>((resolve) => {
      const ready = () => (window as any).L && (window as any).L.Routing;
      if (ready()) return resolve();
      const i = setInterval(() => { if (ready()) { clearInterval(i); resolve(); } }, 100);
    });

    useEffect(() => {
      let mounted = true;
      (async () => {
        await ensureLeaflet();
        if (!mounted) return;
        const L = (window as any).L;
        if (!mapRef.current) {
          const map = L.map('leaflet-map', { zoomControl: false, attributionControl: false });
          mapRef.current = map;
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap & CARTO' }).addTo(map);
          if (origin) map.setView([origin.lat, origin.lng], 14);
          // Layer groups
          gasLayerRef.current = L.layerGroup().addTo(map);
          marketLayerRef.current = L.layerGroup().addTo(map);
          radarLayerRef.current = L.layerGroup().addTo(map);
          driversLayerRef.current = L.layerGroup().addTo(map);
        }
      })();
      return () => { mounted = false; };
    }, []);

    // Update user marker and follow
    useEffect(() => {
      (async () => {
        await ensureLeaflet();
        const L = (window as any).L; const map = mapRef.current; if (!map || !origin) return;
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.circleMarker([origin.lat, origin.lng], { radius: 8, color: '#34d399', weight: 3, fillColor: '#34d399', fillOpacity: 0.9 }).addTo(map);
        } else userMarkerRef.current.setLatLng([origin.lat, origin.lng]);
        if (!navigating) map.setView([origin.lat, origin.lng], 14);
      })();
    }, [origin, navigating]);

    // Recenter trigger
    useEffect(() => {
      if (!recenterTrigger || !origin || !mapRef.current) return;
      mapRef.current.setView([origin.lat, origin.lng], 15, { animate: true });
    }, [recenterTrigger]);

    // Build route when navigating
    useEffect(() => {
      (async () => {
        await ensureLeaflet();
        const L = (window as any).L; const map = mapRef.current; if (!map) return;
        if (routingRef.current) { routingRef.current.setWaypoints([]); map.removeControl(routingRef.current); routingRef.current = null; }
        if (navigating && origin && destinationCoords) {
          const ctrl = L.Routing.control({
            waypoints: [L.latLng(origin.lat, origin.lng), L.latLng(destinationCoords.lat, destinationCoords.lng)],
            routeWhileDragging: false,
            addWaypoints: false,
            show: false,
            fitSelectedRoutes: true,
            lineOptions: { styles: [{ color: '#3b82f6', opacity: 0.95, weight: 6 }] },
            createMarker: (_i: number, wp: any) => L.marker(wp.latLng, { opacity: 0.9 })
          }).addTo(map);
          routingRef.current = ctrl;
          ctrl.on('routesfound', function(e: any) {
            const r = e.routes?.[0];
            if (!r) return;
            const instr = (r.instructions || []).map((it: any) => ({ text: it.text, distance: it.distance, time: it.time }));
            onRouteFound({ instructions: instr, summary: r.summary });
          });
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigating, origin?.lat, origin?.lng, destinationCoords?.lat, destinationCoords?.lng]);

    // Helpers for Overpass
    const clearLayer = (ref: any) => { if (ref.current) ref.current.clearLayers(); };
    const fetchOverpass = async (query: string) => {
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const res = await fetch(url); if (!res.ok) throw new Error('Overpass request failed'); return res.json();
    };
    const addPOIs = (ref: any, elements: any[], color: string) => {
      const L = (window as any).L; const group = ref.current; const map = mapRef.current; if (!group || !map) return;
      elements.forEach((el: any) => { const lat = el.lat || el.center?.lat; const lon = el.lon || el.center?.lon; if (lat && lon) L.circleMarker([lat, lon], { radius: 6, color, weight: 2, fillColor: color, fillOpacity: 0.85 }).addTo(group); });
    };

    // Drivers nearby (simulated around origin)
    useEffect(() => {
      (async () => {
        await ensureLeaflet(); const map = mapRef.current; if (!map) return;
        clearLayer(driversLayerRef); if (!showLayers.drivers || !origin) return;
        const L = (window as any).L; const group = driversLayerRef.current; const N = 10; const R = 0.008; // ~800m
        for (let i = 0; i < N; i++) { const lat = origin.lat + (Math.random() - 0.5) * R; const lng = origin.lng + (Math.random() - 0.5) * R; L.circleMarker([lat, lng], { radius: 7, color: '#22c55e', weight: 2, fillColor: '#22c55e', fillOpacity: 0.85 }).addTo(group); }
      })();
    }, [showLayers.drivers, origin?.lat, origin?.lng]);

    // Gas stations
    useEffect(() => {
      (async () => {
        await ensureLeaflet(); const map = mapRef.current; if (!map) return;
        clearLayer(gasLayerRef); if (!showLayers.gas || !origin) return;
        const query = `[out:json];node(around:2000,${origin.lat},${origin.lng})["amenity"="fuel"];out center;`;
        try { const data = await fetchOverpass(query); addPOIs(gasLayerRef, data.elements || [], '#f59e0b'); } catch (e) {}
      })();
    }, [showLayers.gas, origin?.lat, origin?.lng]);

    // Markets
    useEffect(() => {
      (async () => {
        await ensureLeaflet(); const map = mapRef.current; if (!map) return;
        clearLayer(marketLayerRef); if (!showLayers.market || !origin) return;
        const query = `[out:json];(node(around:2000,${origin.lat},${origin.lng})["shop"="supermarket"];node(around:2000,${origin.lat},${origin.lng})["amenity"="marketplace"];);out center;`;
        try { const data = await fetchOverpass(query); addPOIs(marketLayerRef, data.elements || [], '#3b82f6'); } catch (e) {}
      })();
    }, [showLayers.market, origin?.lat, origin?.lng]);

    // Speed cameras (radar)
    useEffect(() => {
      (async () => {
        await ensureLeaflet(); const map = mapRef.current; if (!map) return;
        clearLayer(radarLayerRef); if (!showLayers.radar || !origin) return;
        const query = `[out:json];node(around:3000,${origin.lat},${origin.lng})["highway"="speed_camera"];out center;`;
        try { const data = await fetchOverpass(query); addPOIs(radarLayerRef, data.elements || [], '#ef4444'); } catch (e) {}
      })();
    }, [showLayers.radar, origin?.lat, origin?.lng]);

    return <div id="leaflet-map" className="absolute inset-0" />;
  };

  const handleRouteFound = ({ instructions, summary }:{instructions:any[]; summary:{totalDistance:number; totalTime:number}}) => {
    setIsRouting(false);
    setInstructions(instructions);
    setSummary({ distance: summary.totalDistance, time: summary.totalTime });
    setStepIndex(0);
  };

  useEffect(() => { setIsRouting(isNavigating); }, [isNavigating]);

  return (
    <div className="relative h-full w-full text-white">
      {/* Hide default LRM panel */}
      <style>{`.leaflet-routing-container{display:none!important}`}</style>

      {/* Map background */}
      <MapComponent
        origin={origin}
        destinationCoords={destCoords}
        navigating={isNavigating}
        onRouteFound={handleRouteFound}
        showLayers={layers}
        recenterTrigger={recenterTick}
      />

      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-md flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Driver Navigation</h1>
          {destCoords?.name && <p className="text-xs text-white/70 truncate max-w-[60vw]">To: {destCoords.name}</p>}
        </div>
        {isNavigating ? (
          <button onClick={endTrip} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400">
            <XCircle className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-10 h-10"/>
        )}
      </header>

      {/* Right tools panel */}
      <aside className="absolute right-4 top-24 z-10 space-y-2">
        <button onClick={() => setLayers((s) => ({ ...s, drivers: !s.drivers }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 ${layers.drivers ? 'ring-2 ring-white/50' : ''}`} aria-label="Toggle drivers nearby">
          <Users className="h-5 w-5" />
        </button>
        <button onClick={() => setLayers((s) => ({ ...s, gas: !s.gas }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 ${layers.gas ? 'ring-2 ring-white/50' : ''}`} aria-label="Toggle gas stations nearby">
          <Fuel className="h-5 w-5" />
        </button>
        <button onClick={() => setLayers((s) => ({ ...s, market: !s.market }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 ${layers.market ? 'ring-2 ring-white/50' : ''}`} aria-label="Toggle markets nearby">
          <Store className="h-5 w-5" />
        </button>
        <button onClick={() => setLayers((s) => ({ ...s, radar: !s.radar }))} className={`p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50 ${layers.radar ? 'ring-2 ring-white/50' : ''}`} aria-label="Toggle speed cameras">
          <Radar className="h-5 w-5" />
        </button>
      </aside>

      {/* Recenter */}
      <div className="absolute left-4 bottom-32 z-10">
        <button onClick={() => setRecenterTick((n) => n + 1)} className="p-3 rounded-xl backdrop-blur bg-black/40 border border-white/10 hover:bg-black/50" aria-label="Recenter on me">
          <LocateFixed className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom panel */}
      {!isNavigating ? (
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10">
            <h2 className="text-base font-semibold mb-2">Set destination</h2>
            <div className="flex gap-2">
              <input
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && geocodeDestination()}
                placeholder="Enter address or place"
                className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                disabled={isGeocoding}
              />
              <button onClick={geocodeDestination} className="p-3 rounded-lg bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90 disabled:opacity-60" disabled={!origin || !destInput || isGeocoding}>
                {isGeocoding ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </div>
            {geoError && <p className="text-red-400 text-sm mt-2">{geoError}</p>}
            {!geoError && origin && <p className="text-emerald-400 text-sm mt-2">Current location acquired.</p>}
          </div>
        </section>
      ) : (
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10">
            <div className="flex items-start gap-4">
              <div className="bg-[hsl(var(--accent))] p-3 rounded-xl">
                <CurrentIcon className="h-7 w-7 text-[hsl(var(--accent-foreground))]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{formatDistance(instructions[stepIndex]?.distance)}</h3>
                <p className="text-white/80 leading-snug">{instructions[stepIndex]?.text || 'Starting navigation...'}</p>
                <p className="text-white/60 text-sm mt-2">Total: {formatDistance(summary.distance)} • ETA {formatTime(summary.time)}</p>
              </div>
              {isRouting && <Loader2 className="h-6 w-6 animate-spin" />}
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
