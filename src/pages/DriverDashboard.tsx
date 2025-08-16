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
  ArrowUp,    // For Navigation
  ArrowLeft, // For Navigation
  ArrowRight,// For Navigation
  Flag,      // For Navigation
  ChevronLeft, // For Navigation - used for back button
  Send, // For search button
  Loader2, // For loading state
  XCircle, // For ending a trip
  Fuel, // Nearby gas stations
  Radar, // Speed cameras
  LocateFixed, // Recenter to user
  Car, // Added Car icon back for Welcome component
} from "lucide-react";

// --- Custom Scrollbar Styles Component ---
const CustomScrollbarStyles = () => (
  <style>{`
    /* For Webkit-based browsers (Chrome, Safari, Edge) */
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #F8F8F8; border-radius: 10px; } /* Updated scrollbar track */
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 2px solid #F8F8F8; } /* Updated scrollbar thumb border */
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
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
  const [selectedChat, setSelectedChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState({
    1: [
      { id: "m1", sender: "Jane Doe", text: "Hey, are you available for a ride?", time: "10:30 AM" },
      { id: "m2", sender: "me", text: "Hi Jane, yes I am!", time: "10:31 AM" },
    ],
    2: [
      { id: "m3", sender: "Mike Smith", text: "Thanks for the ride last week!", time: "Yesterday" },
    ],
  });

  const messageNavItems = [
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "groups", label: "Groups", icon: Users },
    { id: "channels", label: "Channels", icon: Hash },
    { id: "market", label: "Market", icon: Store },
  ];

  const chatItems = {
    chats: [
      { id: 1, name: "Jane Doe", lastMessage: "Hey, are you available for a ride?", time: "10:30 AM", avatar: <Avatar initials="JD" bgColor="bg-purple-500" /> },
      { id: 2, name: "Mike Smith", lastMessage: "Thanks for the ride last week!", time: "Yesterday", avatar: <Avatar initials="MS" bgColor="bg-blue-500" /> },
    ],
    groups: [ { id: 101, name: "Drivers Community", lastMessage: "New update on city regulations.", time: "1 hr ago", avatar: <Avatar initials="DC" bgColor="bg-yellow-500" /> } ],
    channels: [ { id: 201, name: "Ride Alerts Official", lastMessage: "High demand in downtown area!", time: "15 min ago", avatar: <Avatar initials="RA" bgColor="bg-red-500" /> } ],
    market: [ { id: 301, name: "Special Offers", lastMessage: "Discount on car maintenance this week.", time: "2 days ago", avatar: <Avatar initials="SO" bgColor="bg-indigo-500" /> } ],
  };

  const currentTabLabel = selectedChat?.name || messageNavItems.find(item => item.id === activeMessageTab)?.label;

  const currentChats = chatItems[activeMessageTab] || [];
  const filteredChats = currentChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedChat || !draft.trim()) return;
    setConversations((prev) => {
      const msgs = prev[selectedChat.id] || [];
      return {
        ...prev,
        [selectedChat.id]: [
          ...msgs,
          { id: `${Date.now()}`, sender: "me", text: draft.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ],
      };
    });
    setDraft("");
    // Simulate quick auto-reply
    setTimeout(() => {
      setConversations((prev) => {
        const msgs = prev[selectedChat.id] || [];
        return {
          ...prev,
          [selectedChat.id]: [
            ...msgs,
            { id: `${Date.now()}-r`, sender: selectedChat.name, text: "Got it!", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          ],
        };
      });
    }, 800);
  };

  const renderList = () => (
    <div className="flex-grow overflow-y-auto custom-scrollbar">
      {filteredChats.length > 0 ? (
        <div className="space-y-1">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full flex items-center p-3 hover:bg-neutral-100 cursor-pointer transition-colors text-left"
            >
              {chat.avatar}
              <div className="ml-3 flex-grow">
                <p className="font-medium text-gray-800">{chat.name}</p>
                <p className="text-sm text-neutral-600 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-neutral-500">{chat.time}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 text-center mt-10">No messages found.</p>
      )}
    </div>
  );

  const renderChat = () => {
    const msgs = conversations[selectedChat?.id] || [];
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.sender === 'me' ? 'bg-[#E1F87E] text-[#121212]' : 'bg-neutral-100 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-3 border-t border-neutral-200 bg-white flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 rounded-lg bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]"
          />
          <button type="submit" className="p-2 rounded-lg bg-[#E1F87E] text-[#121212] hover:bg-opacity-80">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden">
      <div className="bg-white p-3 border-b border-neutral-200 flex items-center justify-between">
        {selectedChat ? (
            <>
                <button onClick={() => setSelectedChat(null)} className="text-neutral-800 hover:text-gray-900">
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">{currentTabLabel}</h2>
            </>
        ) : (
            // When no chat is selected, use a placeholder to align the search button correctly.
            <div className="w-6 h-6"></div>
        )}
        <button onClick={() => setShowSearchInput(!showSearchInput)} className="text-neutral-800 hover:text-gray-900">
            <Search className="h-6 w-6" />
        </button>
      </div>
      {showSearchInput && !selectedChat && (
        <div className="p-3 bg-white border-b border-neutral-200">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-2 rounded-lg bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      {!selectedChat && (
        <div className="flex justify-around bg-white p-2 border-b border-neutral-200">
          {messageNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMessageTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveMessageTab(item.id); setSearchQuery(""); setShowSearchInput(false); }}
                className={`flex-1 flex flex-col items-center py-2 transition-colors relative ${isActive ? "text-gray-800" : "text-neutral-500"}`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
                {isActive && (<div className="absolute bottom-0 h-0.5 w-full bg-[#E1F87E] rounded-full"></div>)}
              </button>
            );
          })}
        </div>
      )}
      {selectedChat ? renderChat() : renderList()}
    </div>
  );
};

// Expanded Data for Uzbekistan Regions and Cities - ALL 14 REGIONS INCLUDED
const uzbekistanLocations = [
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


// Location Selection Modal Component
const LocationSelectModal = ({ title, isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  }

  const filteredLocations = uzbekistanLocations.map(regionData => ({
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


// Main Post Ride Form Component
const PostRideForm = ({ onClose, onPostSuccess, onAddRide }) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [mailService, setMailService] = useState(""); // "yes", "no"
  const [freeSeats, setFreeSeats] = useState(null); // New state for free seats
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
    freeSeats !== null && // Free seats must be selected
    departureType &&
    price &&
    (departureType !== "fixed" || departureTime); // If fixed, time is also required

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newRideData = { fromLocation, toLocation, departureDate, mailService, freeSeats, departureType, departureTime, price };
      onAddRide(newRideData); // Pass the data up to the parent component
      console.log("Ride Posted:", newRideData);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        if (onPostSuccess) onPostSuccess(); // Callback to update header
      }, 1500);
    }
  };

  // Date Picker Modal Component
  const DatePickerModal = ({ isOpen, onClose, onSelectDate }) => {
    if (!isOpen) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison
    const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Select Departure Date</h2>
            <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> <X className="h-6 w-6" /> </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center text-gray-800 text-lg font-medium mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-neutral-600 text-sm mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Padding for days before the 1st of the month */}
              {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }).map((_, i) => ( <div key={`pad-${i}`} className="p-2"></div> ))}
              {dates.map(day => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                date.setHours(0, 0, 0, 0); // Normalize to start of day
                const isToday = day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                const isPast = date < today; // Compare normalized dates
                const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                return (
                  <button key={day} onClick={() => { if (!isPast) { onSelectDate(dateString); onClose(); } }} className={`p-2 rounded-full text-gray-800 text-sm font-medium ${isToday ? 'bg-neutral-100 border border-neutral-300' : 'hover:bg-neutral-100'} ${isPast ? 'text-neutral-400 cursor-not-allowed' : ''}`} disabled={isPast} >
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[90vh] flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Post a New Ride</h2>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> <X className="h-6 w-6" /> </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <div onClick={() => setShowFromModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${fromLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {fromLocation || "From where"}
              <MapPin className="h-5 w-5 text-neutral-500" />
            </div>
            <LocationSelectModal title="Select Origin" isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setFromLocation} />
          </div>
          <div>
            <div onClick={() => setShowToModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${toLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {toLocation || "To where"}
              <MapPin className="h-5 w-5 text-neutral-500" />
            </div>
            <LocationSelectModal title="Select Destination" isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setToLocation} />
          </div>
          <div>
            <div onClick={() => setShowDateModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${departureDate ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {departureDate || "Departure date"}
              <Calendar className="h-5 w-5 text-neutral-500" />
            </div>
            <DatePickerModal isOpen={showDateModal} onClose={() => setShowDateModal(false)} onSelectDate={setDepartureDate} />
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Mail Service</label>
            <div className="space-y-3">
              <button type="button" onClick={() => setMailService("yes")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "yes" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="text-left">
                  <p className="font-medium text-gray-800">Yes, I do carry Mail</p>
                  <p className="text-sm text-neutral-600">I can transport both passengers and mail packages</p>
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button type="button" onClick={() => setMailService("no")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "no" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="text-left">
                  <p className="font-medium text-gray-800">No, I do not carry Mail</p>
                  <p className="text-sm text-neutral-600">I only transport passengers, no mail service</p>
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Free Seats</label>
            <div className="flex justify-around space-x-2">
              {[1, 2, 3, 4].map((seats) => (
                <button
                  key={seats}
                  type="button"
                  onClick={() => setFreeSeats(seats)}
                  className={`flex-1 p-3 rounded-xl text-lg font-semibold transition-colors shadow
                    ${freeSeats === seats
                      ? "bg-[#E1F87E]/30 border border-[#E1F87E] text-gray-800"
                      : "bg-neutral-100 hover:bg-neutral-200 border border-transparent text-neutral-600"
                    }`}
                >
                  {seats}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Departure Type</label>
            <div className="space-y-3">
              <button type="button" onClick={() => { setDepartureType("fixed"); }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "fixed" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Fixed Departure Time</p>
                    <p className="text-sm text-neutral-600">Leave at a specific time regardless of seat availability</p>
                  </div>
                </div>
                {departureType === "fixed" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
              {departureType === "fixed" && (
                <div className="w-full p-3 bg-neutral-100 rounded-xl flex items-center border border-neutral-200 mt-2">
                  <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="flex-grow bg-transparent text-gray-800 placeholder-neutral-500 focus:outline-none" />
                  <Clock className="h-5 w-5 text-neutral-500 ml-2" />
                </div>
              )}
              <button type="button" onClick={() => { setDepartureType("when_fills"); setDepartureTime(""); }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "when_fills" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Leave When Seats Fill</p>
                    <p className="text-sm text-neutral-600">Depart as soon as all available seats are booked</p>
                  </div>
                </div>
                {departureType === "when_fills" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Price</label>
            <div className="relative">
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Enter price" className="w-full p-3 pl-10 bg-neutral-100 rounded-xl text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={price} onChange={(e) => { const value = e.target.value; if (/^[0-9]*$/.test(value)) { setPrice(value); } }} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            </div>
          </div>
          <button type="submit" disabled={!isFormValid || isSubmitted} className={`w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg ${isFormValid && !isSubmitted ? "bg-green-500 hover:bg-green-600 text-white" : isSubmitted ? "bg-green-700 text-white cursor-not-allowed" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`} >
            {isSubmitted ? ( <> <CheckCircle className="h-6 w-6 mr-2" /> Submitted! </> ) : ( "Post Ride" )}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Seat Indicator Component ---
const SeatIndicator = ({ totalSeats = 4, availableSeats }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2">
        {Array.from({ length: totalSeats }).map((_, index) => {
          const isAvailable = index < availableSeats;
          return (
            <div
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${
                isAvailable
                  ? 'bg-green-700 border-green-600'
                  : 'border-gray-400'
              }`}
            ></div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-600 mt-1">{availableSeats} seats available</p>
    </div>
  );
};


const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [headerTitle, setHeaderTitle] = useState("Ride");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [myRides, setMyRides] = useState([]); // State to hold posted rides

  // Function to add a new ride to the state
  const handleAddRide = (newRide) => {
    setMyRides(prevRides => [...prevRides, { ...newRide, id: Date.now() }]);
  };

  const handleBack = () => {
    if (showPostRide) {
      setShowPostRide(false);
      setHeaderTitle("Ride");
    } else if (showMessages) {
      setShowMessages(false);
      setHeaderTitle("Ride");
    } else {
      setHeaderTitle("Ride");
      setActiveTab("dashboard");
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case "dashboard":
        setHeaderTitle("Ride");
        break;
      case "my-lines":
        setHeaderTitle("My lines");
        break;
      case "profile":
        setHeaderTitle("Profile");
        break;
      default:
        setHeaderTitle("Driver");
    }
  }, [activeTab]);

  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: MapPin },
    { id: "my-lines", label: "My lines", icon: Navigation },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    if (showMessages) { return <MessageDashboard onClose={() => { setShowMessages(false); setHeaderTitle("Ride"); }} />; }
    if (showPostRide) { return <PostRideForm onClose={() => { setShowPostRide(false); setHeaderTitle("Ride"); }} onPostSuccess={() => setHeaderTitle("Ride")} onAddRide={handleAddRide} />; }

    switch (activeTab) {
      case "dashboard": return (
          <div className="p-4 space-y-4 text-gray-800 font-sans">
            <div className="text-center py-4">
              <h2 className="text-sm text-neutral-600">Total Earnings</h2>
              <p className="text-5xl font-extrabold mt-1 mb-4 text-gray-800">$0.00</p>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => { setShowPostRide(true); setHeaderTitle("New Ride"); }} >
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <Plus className="h-7 w-7 text-gray-800" />
                  </div>
                  <span className="text-xs text-neutral-600">New Ride</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105">
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <BarChart className="h-7 w-7 text-[#E1F87E]" />
                  </div>
                  <span className="text-xs text-neutral-600">Stats</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105">
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <Shield className="h-7 w-7 text-[#E1F87E]" />
                  </div>
                  <span className="text-xs text-neutral-600">Safety</span>
                </div>
              </div>
            </div>
            <h3 className="flex items-center text-sm font-semibold mb-2 text-neutral-800">
              <Calendar className="h-4 w-4 mr-2 text-neutral-700" />
              Your activity
            </h3>
            <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-lg">
              {/* This is now a static example, dynamic rides are in "My Lines" */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-green-600" /> Example Origin </div>
                  <div className="flex items-center text-gray-800 ml-6 font-medium"> <MapPin className="h-4 w-4 mr-2 text-red-600" /> Example Destination </div>
                  <div className="flex items-center text-neutral-600 mt-2"> <User className="h-4 w-4 mr-2" /> 2/4 passengers </div>
                  <div className="flex items-center text-neutral-600 mt-1"> <Calendar className="h-4 w-4 mr-2" /> 31.07.2025 <Clock className="h-4 w-4 mx-2" /> 16:15 </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-500/20 text-green-600 text-xs font-medium px-2 py-1 rounded-full"> Active </span>
                  <button className="p-1 rounded-full hover:bg-neutral-100 transition-colors"> <Plus className="h-5 w-5 mt-2 text-neutral-500 rotate-45" /> </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "my-lines": return (
        <div className="p-4 text-gray-800 font-sans space-y-4">
            {myRides.length > 0 ? (
                myRides.map(ride => (
                    <div key={ride.id} className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-center text-sm">
                             <div className="flex flex-col space-y-1">
                                <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-green-600" /> {ride.fromLocation} </div>
                                <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-red-600" /> {ride.toLocation} </div>
                                <div className="flex items-center text-neutral-600 mt-1"> <Calendar className="h-4 w-4 mr-2" /> {ride.departureDate} {ride.departureTime && <><Clock className="h-4 w-4 mx-2" /> {ride.departureTime}</>} </div>
                            </div>
                            
                            <SeatIndicator availableSeats={ride.freeSeats} />

                            <div className="flex flex-col items-end space-y-2">
                                <span className="text-xl font-bold text-gray-800">${ride.price}</span>
                                <span className="bg-green-500/20 text-green-600 text-xs font-medium px-2 py-1 rounded-full"> Active </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-xl font-bold">No Lines Posted Yet</h2>
                    <p className="text-neutral-600 mt-2">Post a new ride to see it here.</p>
                </div>
            )}
        </div>
      );
      case "profile": return ( <div className="p-4 text-gray-800 font-sans"> <h2 className="text-xl font-bold">Advanced Profile Content</h2> <p className="text-neutral-600 mt-2">Manage your account details here.</p> </div> );
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#F8F8F8] text-gray-800 flex flex-col font-sans">
      <CustomScrollbarStyles />
      <header className="bg-white p-3 border-b border-neutral-200 flex justify-between items-center z-20 shadow-lg">
        {(showPostRide || showMessages || activeTab !== "dashboard") && (
          <button onClick={handleBack} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors" >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {!(showPostRide || showMessages || activeTab !== "dashboard") && (
          <div className="w-8 h-8"></div>
        )}
        <h1 className="text-xl font-bold text-gray-800">{headerTitle}</h1>
        <button onClick={() => setShowMessages(!showMessages)} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors" >
          <MessageCircle className="h-8 w-8" />
        </button>
      </header>
      <main className="flex-grow overflow-y-auto custom-scrollbar h-full relative rounded-t-3xl overflow-hidden">
        {renderContent()}
      </main>
      {!showMessages && !showPostRide && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-10">
          <div className="flex justify-around py-2">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); }} className={`flex-1 flex flex-col items-center py-2 transition-colors ${ isActive ? "text-gray-800" : "text-neutral-500" }`} >
                  <Icon className={`h-6 w-6 mb-1 ${ isActive ? "text-[#E1F87E]" : "text-neutral-500" }`} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </footer>
      )}
    </div>
  );
};

// --- Main App component to simulate routing for the Welcome and DriverDashboard ---
const App = () => {
  const [currentPage, setCurrentPage] = useState("welcome");

  const navigate = (path) => {
      if (path === "/rider-dashboard") {
        setCurrentPage("rider-dashboard");
      } else if (path === "/driver-dashboard") {
        setCurrentPage("driver-dashboard");
      } else {
        setCurrentPage("welcome");
      }
    };

  const Welcome = () => {
    const [selectedType, setSelectedType] = useState(null);
    
    const onTelegramAuth = (user) => {
      console.log("Telegram Auth User:", user);
      if (user.username && user.username.toLowerCase().includes("driver")) {
        navigate("/driver-dashboard");
      } else {
        navigate("/rider-dashboard");
      }
    };

    useEffect(() => {
      const scriptId = "telegram-login-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", "YOUR_BOT_USERNAME");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-onauth", "onTelegramAuthCallback");
        script.setAttribute("data-request-access", "write");
        script.async = true;
        
        const container = document.getElementById("telegram-login-widget-container");
        if(container) {
            container.appendChild(script);
        }

        window.onTelegramAuthCallback = onTelegramAuth;

        return () => {
          delete window.onTelegramAuthCallback;
          if (container && script.parentNode === container) {
             container.removeChild(script);
          }
        };
      }
    }, []);


    const handleRoleSelect = (role) => {
      setSelectedType(role);
      setTimeout(() => {
        if (role === "rider") {
          navigate("/rider-dashboard");
        } else if (role === "driver") {
          navigate("/driver-dashboard");
        }
      }, 300);
    };

    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="text-center max-w-xl mx-auto space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-neutral-200">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Welcome
            </h1>
            <p className="text-lg text-neutral-600">
              Choose your role to get started. Find rides or offer a spot in your car.
            </p>
          </div>

          <div className="py-4">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Or Login with Telegram</h3>
            <div id="telegram-login-widget-container" className="flex justify-center">
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              (Note: Replace 'YOUR_BOT_USERNAME' in the code with your actual Telegram bot username.)
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleRoleSelect("rider")}
              className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#E1F87E]/50
                ${selectedType === "rider"
                  ? "bg-[#E1F87E] border-[#E1F87E] text-[#121212] shadow-md"
                  : "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-[#E1F87E]/20"
                }`}
            >
              <Users className={`h-7 w-7 mr-3 ${selectedType === "rider" ? "text-[#121212]" : "text-[#E1F87E]"}`} />
              <span className="font-semibold text-xl">I'm a Rider</span>
            </button>

            <button
              onClick={() => handleRoleSelect("driver")}
              className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#E1F87E]/50
                ${selectedType === "driver"
                  ? "bg-[#E1F87E] border-[#E1F87E] text-[#121212] shadow-md"
                  : "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-[#E1F87E]/20"
                }`}
            >
              <Car className={`h-7 w-7 mr-3 ${selectedType === "driver" ? "text-[#121212]" : "text-[#E1F87E]"}`} />
              <span className="font-semibold text-xl">I'm a Driver</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RiderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#E1F87E]/20 to-neutral-200 flex items-center justify-center p-4 font-sans">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">Rider Dashboard</h2>
        <p className="text-lg text-neutral-600">Welcome, Rider! Find your next ride here.</p>
        <button
          onClick={() => navigate("/")} 
          className="mt-6 px-6 py-3 bg-[#E1F87E] text-[#121212] rounded-xl shadow-md hover:bg-opacity-80 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  switch (currentPage) {
    case "rider-dashboard":
      return <RiderDashboard />;
    case "driver-dashboard":
      return <DriverDashboard />;
    case "welcome":
    default:
      return <Welcome />;
  }
};

export default App;
