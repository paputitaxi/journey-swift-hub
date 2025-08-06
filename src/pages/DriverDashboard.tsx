// Driver Dashboard - Navigation icon updated
import { useState } from "react";
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
} from "lucide-react";

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
        {
          id: 3,
          name: "Family Group",
          lastMessage: "Dinner at 7 PM?",
          time: "Mon",
          avatar: <Avatar initials="FG" bgColor="bg-green-500" />,
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
      <div className="flex-grow overflow-y-auto">
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
    { region: "Karakalpakstan Republic", cities: ["Nukus", "Amudaryo", "Beruniy", "Bo'zatov", "Chimboy", "Ellikqal'a", "Kegeyli", "Mo'ynoq", "Qanliko'l", "Qo'ng'irot", "Qorao'zak", "Shumanay", "Taxtako'pir", "To'rtko'l", "Xo'jayli"] },
    { region: "Kashkadarya Region", cities: ["Karshi", "Chiroqchi", "Dehqonobod", "G'uzor", "Kasbi", "Kitob", "Koson", "Mirishkor", "Muborak", "Nishon", "Qamashi", "Shahrisabz", "Yakkabog'"] },
    { region: "Khorezm Region", cities: ["Urgench", "Bog'ot", "Gurlan", "Qo'shko'pir", "Shovot", "Urganch", "Xazorasp", "Xiva", "Xonqa", "Yangiariq", "Yangibozor"] },
    { region: "Namangan Region", cities: ["Namangan", "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Norin", "Pop", "To'raqo'rg'on", "Uchqo'rg'on", "Uychi", "Yangiqo'rg'on", "Davlatobod"] },
    { region: "Navoiy Region", cities: ["Navoiy", "Karmana", "Konimex", "Navbahor", "Nurota", "Qiziltepa", "Tomdi", "Uchquduq", "Xatirchi", "Zarafshon"] },
    { region: "Samarkand Region", cities: ["Samarkand", "Bulung'ur", "Ishtixon", "Jomboy", "Kattaqo'rg'on", "Narpay", "Nurobod", "Oqdaryo", "Paxtachi", "Payariq", "Qo'shrabot", "Toyloq", "Urgut"] },
    { region: "Sirdaryo Region", cities: ["Guliston", "Boyovut", "Oqoltin", "Sardoba", "Sayxunobod", "Shirin", "Sirdaryo", "Xovos", "Mirzaobod", "Yangiyer"] },
    { region: "Surkhandarya Region", cities: ["Termez", "Angor", "Boysun", "Denov", "Jarqo'rg'on", "Muzrabot", "Oltinsoy", "Qiziriq", "Qumqo'rg'on", "Sariosiyo", "Sherobod", "Sho'rchi", "Uzun"] },
    { region: "Tashkent Region", cities: ["Nurafshon", "Angren", "Bekobod", "Bo'ka", "Bo'stonliq", "Chinoz", "Ohangaron", "Oqqo'rg'on", "Parkent", "Piskent", "Qibray", "Quyichirchiq", "O'rtachirchiq", "Yangiyo'l", "Yuqorichirchiq", "Zangiota", "Olmaliq", "Chirchiq"] }
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
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
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
                  {searchTerm === "" && regionData.cities.slice(0, 3).map(city => ( // Show first 3 cities if no search
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
      console.log("Ride Posted:", {
        fromLocation,
        toLocation,
        departureDate,
        mailService,
        departureType,
        departureTime,
        price,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        onClose(); // Close the form after a short delay
        // No need to reset state here as the component will unmount
      }, 1500);
    } else {
      console.log("Form is not valid.");
    }
  };

  // Date Picker Modal Component
  const DatePickerModal = ({ isOpen, onClose, onSelectDate }) => {
    if (!isOpen) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

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
          <div className="p-4 flex-grow overflow-y-auto">
            <div className="text-center text-white text-lg font-medium mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-white/70 text-sm mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Dummy padding for days before 1st */}
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

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6">
          {/* From Where */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">From Where</label>
            <div
              onClick={() => setShowFromModal(true)}
              className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer"
            >
              {fromLocation || "Select origin"}
              <MapPin className="h-5 w-5 text-white/50" />
            </div>
            <LocationSelectModal
              title="Select Origin"
              isOpen={showFromModal}
              onClose={() => setShowFromModal(false)}
              onSelect={setFromLocation}
            />
          </div>

          {/* To Where */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">To Where</label>
            <div
              onClick={() => setShowToModal(true)}
              className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer"
            >
              {toLocation || "Select destination"}
              <MapPin className="h-5 w-5 text-white/50" />
            </div>
            <LocationSelectModal
              title="Select Destination"
              isOpen={showToModal}
              onClose={() => setShowToModal(false)}
              onSelect={setToLocation}
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Departure Date</label>
            <div
              onClick={() => setShowDateModal(true)}
              className="w-full p-3 bg-white/10 rounded-lg text-white/70 flex items-center justify-between cursor-pointer"
            >
              {departureDate || "Select date"}
              <Calendar className="h-5 w-5 text-white/50" />
            </div>
            <DatePickerModal
              isOpen={showDateModal}
              onClose={() => setShowDateModal(false)}
              onSelectDate={setDepartureDate}
            />
          </div>

          {/* Mail Service */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Mail Service</label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setMailService("yes")}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
                  ${mailService === "yes" ? "bg-green-600/30 border border-green-400" : "bg-white/10 hover:bg-white/20"}`}
              >
                <div className="text-left">
                  <p className="font-medium text-white">Yes, I do carry Mail</p>
                  <p className="text-sm text-white/70">I can transport both passengers and mail packages</p>
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button
                type="button"
                onClick={() => setMailService("no")}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
                  ${mailService === "no" ? "bg-green-600/30 border border-green-400" : "bg-white/10 hover:bg-white/20"}`}
              >
                <div className="text-left">
                  <p className="font-medium text-white">No, I do not carry Mail</p>
                  <p className="text-sm text-white/70">I only transport passengers, no mail service</p>
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button
                type="button"
                onClick={() => setMailService("mail_only")}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
                  ${mailService === "mail_only" ? "bg-blue-600/30 border border-blue-400" : "bg-white/10 hover:bg-white/20"}`}
              >
                <div className="text-left">
                  <p className="font-medium text-white">I carry Mail Only Not Riders</p>
                  <p className="text-sm text-white/70">Dedicated mail service, no passenger transport</p>
                </div>
                {mailService === "mail_only" && <CheckCircle className="h-6 w-6 text-blue-400" />}
              </button>
            </div>
          </div>

          {/* Departure Type */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Departure Type</label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => { setDepartureType("fixed"); }}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
                  ${departureType === "fixed" ? "bg-teal-600/30 border border-teal-400" : "bg-white/10 hover:bg-white/20"}`}
              >
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
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="flex-grow bg-transparent text-white placeholder-white/50 focus:outline-none"
                  />
                  <Clock className="h-5 w-5 text-white/50 ml-2" />
                </div>
              )}
              <button
                type="button"
                onClick={() => { setDepartureType("when_fills"); setDepartureTime(""); }}
                className={`w-full p-4 rounded-lg flex items-center justify-between transition-colors
                  ${departureType === "when_fills" ? "bg-teal-600/30 border border-teal-400" : "bg-white/10 hover:bg-white/20"}`}
              >
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

          {/* Price */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Price</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter price"
                className="w-full p-3 pl-10 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value)) {
                    setPrice(value);
                  }
                }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitted}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center
              ${isFormValid && !isSubmitted
                ? "bg-green-500 hover:bg-green-600 text-white"
                : isSubmitted
                ? "bg-green-700 text-white cursor-not-allowed"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="h-6 w-6 mr-2" /> Submitted!
              </>
            ) : (
              "Post Ride"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};


const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: MapPin },
    { id: "Navigation", label: "Navigation", icon: Navigation },
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
            <div className="text-center py-4">
              <h2 className="text-sm opacity-80">Total Earnings</h2>
              <p className="text-4xl font-bold mt-1 mb-4">$0.00</p>
              <div className="flex justify-around items-center">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setShowPostRide(true)}
                >
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
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-2 text-green-400" /> Ggg
                  </div>
                  <div className="flex items-center text-white ml-6">
                    <MapPin className="h-4 w-4 mr-2 text-red-400" /> Ttgt
                  </div>
                  <div className="flex items-center text-white/80 mt-2">
                    <User className="h-4 w-4 mr-2" /> 2/4 passengers
                  </div>
                  <div className="flex items-center text-white/80 mt-1">
                    <Calendar className="h-4 w-4 mr-2" /> 31.07.2025
                    <Clock className="h-4 w-4 mx-2" /> 16:15
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                  <button>
                    <Plus className="h-5 w-5 mt-2 opacity-60 rotate-45" />
                  </button>
                </div>
              </div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between items-center text-sm opacity-60">
                <div className="flex flex-col">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-2" /> wfwewrf
                  </div>
                  <div className="flex items-center text-white ml-6">
                    <MapPin className="h-4 w-4 mr-2" /> fwewfw
                  </div>
                </div>
                <div className="text-xs">24.07.2025</div>
              </div>
            </div>
          </div>
        );
      case "lanes":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">My Lines Content</h2>
            <p>This section would display your saved routes or "lines".</p>
          </div>
        );
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
      <header className="bg-[#244A62] p-3 border-b border-white/10 flex justify-between items-center z-20">
        <h1 className="text-lg font-medium">Driver</h1>
        <button
          onClick={() => setShowMessages(!showMessages)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      </header>

      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>

      {!showMessages && !showPostRide && (
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

      {/* Post Ride Form Modal */}
      {showPostRide && <PostRideForm onClose={() => setShowPostRide(false)} />}
    </div>
  );
};

// Renamed the main component to App for convention
export default function App() {
  return <DriverDashboard />;
}
