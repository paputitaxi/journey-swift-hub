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
} from "lucide"; // Changed to 'lucide' as per standard usage

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
                <p className="font-medium text-gray-800">{chat.name}</p> {/* Updated text color */}
                <p className="text-sm text-neutral-600 truncate">{chat.lastMessage}</p> {/* Updated text color */}
              </div>
              <span className="text-xs text-neutral-500">{chat.time}</span> {/* Updated text color */}
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
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.sender === 'me' ? 'bg-[#E1F87E] text-[#121212]' : 'bg-neutral-100 text-gray-800'}`}> {/* Updated sent message bubble background and text */}
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-3 border-t border-neutral-200 bg-white flex items-center gap-2"> {/* Updated background and border */}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 rounded-lg bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" // Updated background, text, placeholder, focus ring
          />
          <button type="submit" className="p-2 rounded-lg bg-[#E1F87E] text-[#121212] hover:bg-opacity-80"> {/* Updated send button */}
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl overflow-hidden"> {/* Updated background */}
      <div className="bg-white p-3 border-b border-neutral-200 flex items-center justify-between"> {/* Updated background and border */}
        <button onClick={() => { if (selectedChat) setSelectedChat(null); else onClose(); }} className="text-neutral-800 hover:text-gray-900"> {/* Updated text color */}
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{currentTabLabel}</h2> {/* Updated text color */}
        <button onClick={() => setShowSearchInput(!showSearchInput)} className="text-neutral-800 hover:text-gray-900"> {/* Updated text color */}
          <Search className="h-6 w-6" />
        </button>
      </div>
      {showSearchInput && !selectedChat && (
        <div className="p-3 bg-white border-b border-neutral-200"> {/* Updated background and border */}
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-2 rounded-lg bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" // Updated background, text, placeholder, focus ring
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      {!selectedChat && (
        <div className="flex justify-around bg-white p-2 border-b border-neutral-200"> {/* Updated background and border */}
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
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[80vh] flex flex-col"> {/* Updated background */}
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center"> {/* Updated border */}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2> {/* Updated text color */}
          <button onClick={handleClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> {/* Updated text color and hover */}
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 border-b border-neutral-200"> {/* Updated border */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 h-5 w-5" /> {/* Updated text color */}
            <input type="text" placeholder="Search for a city or region..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {/* Updated background, text, placeholder, focus ring */}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredLocations.length > 0 ? (
            filteredLocations.map(regionData => (
              <div key={regionData.region}>
                {/* Region is now a non-clickable header */}
                <h3 className="w-full text-left p-3 font-semibold text-gray-800 select-none"> {/* Removed onClick, added select-none */}
                  {regionData.region}
                </h3>
                {regionData.cities.map(city => (
                  <button key={city} onClick={() => { onSelect(city); handleClose(); }} className="w-full text-left pl-6 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg text-sm transition-colors" > {/* Updated text and hover colors */}
                    {city}
                  </button>
                ))}
              </div>
            ))
          ) : ( <p className="text-neutral-500 text-center mt-10">No regions or cities found.</p> )} {/* Updated text color */}
        </div>
      </div>
    </div>
  );
};


// Main Post Ride Form Component
const PostRideForm = ({ onClose, onPostSuccess }) => {
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
      console.log("Ride Posted:", { fromLocation, toLocation, departureDate, mailService, freeSeats, departureType, departureTime, price });
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
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col"> {/* Updated background */}
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center"> {/* Updated border */}
            <h2 className="text-lg font-semibold text-gray-800">Select Departure Date</h2> {/* Updated text color */}
            <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> <X className="h-6 w-6" /> </button> {/* Updated text color and hover */}
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center text-gray-800 text-lg font-medium mb-4">{currentMonth}</div> {/* Updated text color */}
            <div className="grid grid-cols-7 gap-2 text-center text-neutral-600 text-sm mb-2"> {/* Updated text color */}
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
                  <button key={day} onClick={() => { if (!isPast) { onSelectDate(dateString); onClose(); } }} className={`p-2 rounded-full text-gray-800 text-sm font-medium ${isToday ? 'bg-neutral-100 border border-neutral-300' : 'hover:bg-neutral-100'} ${isPast ? 'text-neutral-400 cursor-not-allowed' : ''}`} disabled={isPast} > {/* Updated text and background colors */}
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
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[90vh] flex flex-col"> {/* Updated background */}
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center"> {/* Updated border */}
          <h2 className="text-lg font-semibold text-gray-800">Post a New Ride</h2> {/* Updated text color */}
          <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> <X className="h-6 w-6" /> </button> {/* Updated text color and hover */}
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">From Where</label> {/* Updated text color */}
            <div onClick={() => setShowFromModal(true)} className="w-full p-3 bg-neutral-100 rounded-xl text-neutral-600 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" > {/* Updated background, text, focus ring */}
              {fromLocation || "Select origin"}
              <MapPin className="h-5 w-5 text-neutral-500" /> {/* Updated text color */}
            </div>
            <LocationSelectModal title="Select Origin" isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setFromLocation} />
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">To Where</label> {/* Updated text color */}
            <div onClick={() => setShowToModal(true)} className="w-full p-3 bg-neutral-100 rounded-xl text-neutral-600 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" > {/* Updated background, text, focus ring */}
              {toLocation || "Select destination"}
              <MapPin className="h-5 w-5 text-neutral-500" /> {/* Updated text color */}
            </div>
            <LocationSelectModal title="Select Destination" isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setToLocation} />
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Departure Date</label> {/* Updated text color */}
            <div onClick={() => setShowDateModal(true)} className="w-full p-3 bg-neutral-100 rounded-xl text-neutral-600 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" > {/* Updated background, text, focus ring */}
              {departureDate || "Select date"}
              <Calendar className="h-5 w-5 text-neutral-500" /> {/* Updated text color */}
            </div>
            <DatePickerModal isOpen={showDateModal} onClose={() => setShowDateModal(false)} onSelectDate={setDepartureDate} />
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Mail Service</label> {/* Updated text color */}
            <div className="space-y-3">
              <button type="button" onClick={() => setMailService("yes")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "yes" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} > {/* Updated background and hover */}
                <div className="text-left">
                  <p className="font-medium text-gray-800">Yes, I do carry Mail</p> {/* Updated text color */}
                  <p className="text-sm text-neutral-600">I can transport both passengers and mail packages</p> {/* Updated text color */}
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button type="button" onClick={() => setMailService("no")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "no" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} > {/* Updated to green for selection, not red */}
                <div className="text-left">
                  <p className="font-medium text-gray-800">No, I do not carry Mail</p> {/* Updated text color */}
                  <p className="text-sm text-neutral-600">I only transport passengers, no mail service</p> {/* Updated text color */}
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-green-400" />} {/* Updated to green icon */}
              </button>
              {/* Removed "I carry Mail Only Not Riders" button */}
            </div>
          </div>

          {/* New Free Seats Section */}
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
            <label className="block text-neutral-800 text-sm font-medium mb-2">Departure Type</label> {/* Updated text color */}
            <div className="space-y-3">
              <button type="button" onClick={() => { setDepartureType("fixed"); }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "fixed" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} > {/* Updated background and hover */}
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Fixed Departure Time</p> {/* Updated text color */}
                    <p className="text-sm text-neutral-600">Leave at a specific time regardless of seat availability</p> {/* Updated text color */}
                  </div>
                </div>
                {departureType === "fixed" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
              {departureType === "fixed" && (
                <div className="w-full p-3 bg-neutral-100 rounded-xl flex items-center border border-neutral-200 mt-2"> {/* Updated background and border */}
                  <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="flex-grow bg-transparent text-gray-800 placeholder-neutral-500 focus:outline-none" /> {/* Updated text and placeholder */}
                  <Clock className="h-5 w-5 text-neutral-500 ml-2" /> {/* Updated text color */}
                </div>
              )}
              <button type="button" onClick={() => { setDepartureType("when_fills"); setDepartureTime(""); }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "when_fills" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} > {/* Updated background and hover */}
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Leave When Seats Fill</p> {/* Updated text color */}
                    <p className="text-sm text-neutral-600">Depart as soon as all available seats are booked</p> {/* Updated text color */}
                  </div>
                </div>
                {departureType === "when_fills" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">Price</label> {/* Updated text color */}
            <div className="relative">
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Enter price" className="w-full p-3 pl-10 bg-neutral-100 rounded-xl text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={price} onChange={(e) => { const value = e.target.value; if (/^[0-9]*$/.test(value)) { setPrice(value); } }} /> {/* Updated background, text, placeholder, focus ring */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span> {/* Updated text color */}
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

// --- New, Advanced Navigation View Component ---
// This component is currently not used in the main App rendering due to previous user request
// but its styling has been updated for consistency if it were to be re-introduced.
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

    // Ensure Leaflet & LRM are loaded
    const ensureLeaflet = () => new Promise<void>((resolve) => {
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
          // Using a light basemap for consistency
          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap & CARTO' }).addTo(map);
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
    <div className="relative h-full w-full text-gray-800 font-sans"> {/* Changed text color for light background */}
      <MapComponent origin={origin} destinationCoords={destCoords} navigating={isNavigating} onRouteFound={handleRouteFound} showLayers={layers} recenterTrigger={recenterTick} />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between z-10">
        <button onClick={onClose} className="p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"> <ChevronLeft className="h-6 w-6 text-white" /> </button> {/* Ensure icon is visible on dark gradient */}
        <div className="text-center">
            {isNavigating && destCoords?.name && <p className="text-sm text-white/80 truncate max-w-[60vw]">To: {destCoords.name}</p>}
        </div>
        <div className="w-10 h-10"/> {/* Placeholder for alignment */}
      </header>

      {/* Side Controls */}
      <aside className="absolute right-4 top-24 z-10 flex flex-col space-y-2">
        <button onClick={() => setLayers((s) => ({ ...s, drivers: !s.drivers }))} className={`p-3 rounded-xl backdrop-blur bg-white/40 border border-neutral-200 hover:bg-white/50 transition-all shadow-md ${layers.drivers ? 'ring-2 ring-neutral-300 bg-white/60' : ''}`} aria-label="Toggle drivers nearby"> <Users className="h-5 w-5 text-gray-800" /> </button> {/* Updated background, border, text */}
        <button onClick={() => setLayers((s) => ({ ...s, gas: !s.gas }))} className={`p-3 rounded-xl backdrop-blur bg-white/40 border border-neutral-200 hover:bg-white/50 transition-all shadow-md ${layers.gas ? 'ring-2 ring-neutral-300 bg-white/60' : ''}`} aria-label="Toggle gas stations nearby"> <Fuel className="h-5 w-5 text-gray-800" /> </button> {/* Updated background, border, text */}
        <button onClick={() => setLayers((s) => ({ ...s, market: !s.market }))} className={`p-3 rounded-xl backdrop-blur bg-white/40 border border-neutral-200 hover:bg-white/50 transition-all shadow-md ${layers.market ? 'ring-2 ring-neutral-300 bg-white/60' : ''}`} aria-label="Toggle markets nearby"> <Store className="h-5 w-5 text-gray-800" /> </button> {/* Updated background, border, text */}
        <button onClick={() => setLayers((s) => ({ ...s, radar: !s.radar }))} className={`p-3 rounded-xl backdrop-blur bg-white/40 border border-neutral-200 hover:bg-white/50 transition-all shadow-md ${layers.radar ? 'ring-2 ring-neutral-300 bg-white/60' : ''}`} aria-label="Toggle speed cameras"> <Radar className="h-5 w-5 text-gray-800" /> </button> {/* Updated background, border, text */}
      </aside>
      
      {/* Recenter Button */}
      <div className="absolute left-4 bottom-32 z-10">
        <button onClick={() => setRecenterTick((n) => n + 1)} className="p-3 rounded-xl backdrop-blur bg-white/40 border border-neutral-200 hover:bg-white/50 shadow-md" aria-label="Recenter on me"> <LocateFixed className="h-5 w-5 text-gray-800" /> </button> {/* Updated background, border, text */}
      </div>

      {/* Bottom Panels */}
      {!isNavigating ? (
        // Search Panel
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-neutral-200"> {/* Updated background and border */}
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Where to?</h2> {/* Updated text color */}
            <div className="flex gap-2">
              <input value={destInput} onChange={(e) => setDestInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && geocodeDestination()} placeholder="Enter address or place" className="w-full p-3 bg-neutral-100 rounded-lg text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#E1F87E]" disabled={isGeocoding} /> {/* Updated background, text, placeholder, focus ring */}
              <button onClick={geocodeDestination} className="p-3 rounded-lg bg-[#E1F87E] text-[#121212] hover:bg-opacity-80 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors shadow-md" disabled={!origin || !destInput || isGeocoding}>
                {isGeocoding ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
              </button>
            </div>
            {geoError && <p className="text-red-600 text-sm mt-3">{geoError}</p>} {/* Updated text color */}
            {!geoError && !origin && <p className="text-amber-600 text-sm mt-3 flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Acquiring current location...</p>} {/* Updated text color */}
            {!geoError && origin && <p className="text-emerald-600 text-sm mt-3">Ready to navigate.</p>} {/* Updated text color */}
          </div>
        </section>
      ) : (
        // Navigation Panel
        <section className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-neutral-200"> {/* Updated background and border */}
            {/* Instruction */}
            <div className="flex items-center gap-4">
              <div className="bg-[#E1F87E] p-3 rounded-xl shadow-md"> <CurrentIcon className="h-8 w-8 text-[#121212]" /> </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800">{formatDistance(instructions[stepIndex]?.distance)}</h3> {/* Updated text color */}
                <p className="text-neutral-700 leading-snug">{instructions[stepIndex]?.text || 'Starting navigation...'}</p> {/* Updated text color */}
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Previous step" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 disabled:opacity-40 shadow-sm" disabled={stepIndex <= 0}> {/* Updated background and border */}
                  <ArrowLeft className="h-5 w-5 text-gray-800" /> {/* Updated text color */}
                </button>
                <button aria-label="Next step" onClick={() => setStepIndex((i) => Math.min(instructions.length - 1, i + 1))} className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 disabled:opacity-40 shadow-sm" disabled={stepIndex >= instructions.length - 1}> {/* Updated background and border */}
                  <ArrowRight className="h-5 w-5 text-gray-800" /> {/* Updated text color */}
                </button>
                {isRouting && <Loader2 className="h-6 w-6 animate-spin text-neutral-600" />} {/* Updated text color */}
              </div>
            </div>
              {/* Summary & End Button */}
            <div className="flex justify-between items-center pt-2 border-t border-neutral-200"> {/* Updated border */}
                <p className="text-neutral-600 text-sm"> {/* Updated text color */}
                  {formatDistance(summary.distance)} • ETA {formatTime(summary.time)}
                </p>
                <button onClick={endTrip} className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-600 transition-colors shadow-sm"> {/* Updated text color */}
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
  const [headerTitle, setHeaderTitle] = useState("Ride"); // State for dynamic header title
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  // Function to handle back button logic
  const handleBack = () => {
    if (showPostRide) {
      setShowPostRide(false);
      setHeaderTitle("Ride"); // Go back to "Ride" when closing PostRide
    } else if (showMessages) {
      setShowMessages(false);
      setHeaderTitle("Ride"); // Go back to "Ride" when closing Messages
    } else {
      // Handle actual navigation back if this were a real router setup
      // For this mock, we'll just set it back to "Ride"
      setHeaderTitle("Ride");
      setActiveTab("dashboard");
    }
  };

  // Update header title when activeTab changes
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
    { id: "my-lines", label: "My lines", icon: Navigation }, // Moved My lines to bottom nav
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    if (showMessages) { return <MessageDashboard onClose={() => { setShowMessages(false); setHeaderTitle("Ride"); }} />; }
    if (showPostRide) { return <PostRideForm onClose={() => { setShowPostRide(false); setHeaderTitle("Ride"); }} onPostSuccess={() => setHeaderTitle("Ride")} />; }

    switch (activeTab) {
      case "dashboard": return (
          <div className="p-4 space-y-4 text-gray-800 font-sans">
            <div className="text-center py-4">
              <h2 className="text-sm text-neutral-600">Total Earnings</h2>
              <p className="text-5xl font-extrabold mt-1 mb-4 text-gray-800">$0.00</p>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => { setShowPostRide(true); setHeaderTitle("New Ride"); }} > {/* Update header on click */}
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <Plus className="h-7 w-7 text-gray-800" />
                  </div>
                  <span className="text-xs text-neutral-600">New Ride</span>
                </div>
                {/* My lines moved to bottom nav */}
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
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-green-600" /> Ggg </div>
                  <div className="flex items-center text-gray-800 ml-6 font-medium"> <MapPin className="h-4 w-4 mr-2 text-red-600" /> Ttgt </div>
                  <div className="flex items-center text-neutral-600 mt-2"> <User className="h-4 w-4 mr-2" /> 2/4 passengers </div>
                  <div className="flex items-center text-neutral-600 mt-1"> <Calendar className="h-4 w-4 mr-2" /> 31.07.2025 <Clock className="h-4 w-4 mx-2" /> 16:15 </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-500/20 text-green-600 text-xs font-medium px-2 py-1 rounded-full"> Active </span>
                  <button className="p-1 rounded-full hover:bg-neutral-100 transition-colors"> <Plus className="h-5 w-5 mt-2 text-neutral-500 rotate-45" /> </button>
                </div>
              </div>
              <div className="h-px bg-neutral-200 my-3" />
              <div className="flex justify-between items-center text-sm text-neutral-600">
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2" /> wfwewrf </div>
                  <div className="flex items-center text-gray-800 ml-6 font-medium"> <MapPin className="h-4 w-4 mr-2" /> fwewfw </div>
                </div>
                <div className="text-xs">24.07.2025</div>
              </div>
            </div>
          </div>
        );
      case "my-lines": return ( <div className="p-4 text-gray-800 font-sans"> <h2 className="text-xl font-bold">My Lines Content</h2> <p className="text-neutral-600 mt-2">Manage your saved routes and lines here.</p> </div> );
      case "profile": return ( <div className="p-4 text-gray-800 font-sans"> <h2 className="text-xl font-bold">Advanced Profile Content</h2> <p className="text-neutral-600 mt-2">Manage your account details here.</p> </div> );
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#F8F8F8] text-gray-800 flex flex-col font-sans">
      <CustomScrollbarStyles />
      {/* Header is always visible unless PostRide or Messages modals are open */}
      <header className="bg-white p-3 border-b border-neutral-200 flex justify-between items-center z-20 shadow-lg">
        {/* Back button logic */}
        {(showPostRide || showMessages || activeTab !== "dashboard") && (
          <button onClick={handleBack} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors" >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {/* Placeholder for alignment if no back button */}
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
      {/* Footer is always visible unless PostRide or Messages modals are open */}
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

  // Mocking react-router-dom's useNavigate for demonstration purposes
  const useNavigate = () => {
    return (path) => {
      if (path === "/rider-dashboard") {
        setCurrentPage("rider-dashboard");
      } else if (path === "/driver-dashboard") {
        setCurrentPage("driver-dashboard");
      } else {
        setCurrentPage("welcome");
      }
    };
  };

  // The Welcome component to choose a role, styled like Back Market's mobile UI
  const Welcome = () => {
    const [selectedType, setSelectedType] = useState(null);
    const navigate = useNavigate();

    // Function to handle Telegram authentication callback
    const onTelegramAuth = (user) => {
      console.log("Telegram Auth User:", user);
      // Simulate role assignment based on Telegram user data
      // In a real app, you'd likely have a backend to manage user roles
      if (user.username && user.username.toLowerCase().includes("driver")) {
        navigate("/driver-dashboard");
      } else {
        navigate("/rider-dashboard");
      }
    };

    useEffect(() => {
      // Dynamically load the Telegram Login Widget script
      const scriptId = "telegram-login-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", "YOUR_BOT_USERNAME"); // Replace with your bot's username
        script.setAttribute("data-size", "large");
        script.setAttribute("data-onauth", "onTelegramAuthCallback"); // Global callback function
        script.setAttribute("data-request-access", "write");
        script.async = true;
        document.body.appendChild(script);

        // Make the onTelegramAuth function globally accessible for the widget
        window.onTelegramAuthCallback = onTelegramAuth;

        return () => {
          // Clean up the global function when component unmounts
          delete window.onTelegramAuthCallback;
          // Optionally remove the script if needed, though often left for performance
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
      }, 300); // Small delay for visual feedback
    };

    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="text-center max-w-xl mx-auto space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-neutral-200">
          {/* Main Header and Description */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Welcome
            </h1>
            <p className="text-lg text-neutral-600">
              Choose your role to get started. Find rides or offer a spot in your car.
            </p>
          </div>

          {/* Telegram Login Widget Container */}
          <div className="py-4">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Or Login with Telegram</h3>
            <div id="telegram-login-widget-container" className="flex justify-center">
              {/* The Telegram widget will render here */}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              (Note: Replace 'YOUR_BOT_USERNAME' in the code with your actual Telegram bot username.)
            </p>
          </div>

          {/* Role Selection Buttons */}
          <div className="flex flex-col gap-4">
            {/* Rider Button */}
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

            {/* Driver Button */}
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

  // Mock components for the dashboards
  const RiderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#E1F87E]/20 to-neutral-200 flex items-center justify-center p-4 font-sans">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">Rider Dashboard</h2>
        <p className="text-lg text-neutral-600">Welcome, Rider! Find your next ride here.</p>
        <button
          onClick={() => window.location.reload()} // Simple reload to go back to Welcome
          className="mt-6 px-6 py-3 bg-[#E1F87E] text-[#121212] rounded-xl shadow-md hover:bg-opacity-80 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  // Override the global useNavigate for the Welcome component to use this App's state
  React.useEffect(() => {
    // This is a simplified way to ensure the mock useNavigate controls this App's state.
    // Normally, react-router-dom handles navigation directly.
    window.tempNavigate = useNavigate();
  }, []);

  // Render the appropriate component based on currentPage state
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
