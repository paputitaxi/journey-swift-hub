 import React, { useState, useRef, useEffect } from 'react';
import { History, Search, User, MapPin, Target, ChevronRight, Calendar, Users, Star, ChevronLeft, DollarSign, Wind, Bookmark, Lightbulb, X, Mail, Wifi, Snowflake, Briefcase, ChevronDown, Info, Car, MessageCircle, Send } from 'lucide-react';

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
  const options = { weekday: 'short' as const, month: 'short' as const, day: 'numeric' as const };
  return date.toLocaleDateString('en-US', options);
};

// Helper to format time for display (e.g., "11:45")
const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { hour: '2-digit' as const, minute: '2-digit' as const, hourCycle: 'h23' as const }; // 24-hour format
  return date.toLocaleTimeString('en-US', options);
};

// Helper to calculate a dummy drop-off date (e.g., next day)
const getDropOffDate = (pickupDateString) => {
  if (!pickupDateString) return '';
  const pickupDate = new Date(pickupDateString);
  pickupDate.setDate(pickupDate.getDate() + 1); // Add one day
  const options = { weekday: 'short' as const, month: 'short' as const, day: 'numeric' as const };
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
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

// Helper component for a simple avatar
const Avatar = ({ initials, bgColor, size = 'w-10 h-10' }) => (
  <div className={`rounded-full flex items-center justify-center text-white text-sm font-semibold ${bgColor} ${size}`} >
    {initials}
  </div>
);

// Message Dashboard component with Telegram-like UX
const MessageDashboard = ({ onClose }) => {
  const [activeMessageTab, setActiveMessageTab] = useState("chats");
  const [isSearching, setIsSearching] = useState(false);
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
    { id: "channels", label: "Channels", icon: Users },
    { id: "market", label: "Market", icon: Users },
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
      <div className="bg-white p-3 border-b border-neutral-200 flex items-center justify-between gap-2">
        {selectedChat ? (
          <>
            <button onClick={() => setSelectedChat(null)} className="text-neutral-800 hover:text-gray-900">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 flex-1 truncate">{selectedChat.name}</h2>
            <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
          </>
        ) : isSearching ? (
          <>
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-neutral-100 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E1F87E] text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="text-sm font-semibold text-gray-700 hover:text-gray-900">
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="w-6 h-6"></div> {/* Placeholder for alignment */}
            <div className="flex-1"></div> {/* Placeholder to push search icon to the right */}
            <button onClick={() => setIsSearching(true)} className="text-neutral-800 hover:text-gray-900">
              <Search className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {!selectedChat && (
        <div className="flex justify-around bg-white p-2 border-b border-neutral-200">
          {messageNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMessageTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveMessageTab(item.id); setSearchQuery(""); setIsSearching(false); }}
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
  const [showMessages, setShowMessages] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

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
    if (showMessages) {
        return <MessageDashboard onClose={() => setShowMessages(false)} />;
    }
    switch (activeTab) {
      case 'history':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ride History</h2>
            <p className="text-gray-600">Your past rides will appear here.</p>
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
                <div className="p-4 border-b border-neutral-200">
                  <h2 className="text-lg font-semibold text-gray-800 text-left mb-3">Results</h2>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                          <button onClick={() => handleSortClick('cheapest')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'cheapest' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                              <DollarSign size={16} />
                              <span>Cheapest</span>
                          </button>
                          <button onClick={() => handleSortClick('fastest')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'fastest' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                              <Wind size={16} />
                              <span>Fastest</span>
                          </button>
                           <button onClick={() => handleFilterClick('mail')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'mail' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                              {activeFilter === 'mail' ? <X size={16} /> : <AmazonMailLogo className="w-5 h-5"/>}
                              <span>Mail Only</span>
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
                </div>
                
                {tipToShow && <TipBar icon={tipContent[tipToShow].icon} text={tipContent[tipToShow].text} onClose={handleCloseTip} />}

                <div className="bg-white py-2 px-4 border-b border-neutral-200">
                    <h3 className="font-semibold text-gray-800">{stickyTitle}</h3>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto bg-[#F8F8F8]">
                <div className="p-4 space-y-4">
                    {results.map(item => (
                      <div key={item.id} onClick={() => setSelectedRide(item)} className="bg-white p-4 rounded-xl shadow-lg border border-neutral-200 text-left relative cursor-pointer hover:shadow-xl transition-shadow">
                        <button onClick={(e) => { e.stopPropagation(); handleSaveRide(item.id); }} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Bookmark size={20} className="text-gray-500 hover:text-green-600" fill={savedRides.includes(item.id) ? '#10B981' : 'none'} />
                        </button>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                          <div className="flex flex-col">
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <p className="font-semibold text-gray-800 text-base mr-2">{item.driverName}</p>
                              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(item.reliabilityStars) ? "#facc15" : "none"} stroke="#facc15" className="mr-0.5"/>)}
                              <span className="text-gray-600 text-xs ml-1">({item.reliabilityStars})</span>
                            </div>
                             <div className="flex items-center space-x-2 text-sm text-gray-800 mb-2">
                                <Car size={16} className="text-gray-600" />
                                <span>{item.carYear} {item.carModel}</span>
                            </div>
                             <PlateNumber plate={item.plateNumber} />
                          </div>
                          <div className="text-right mt-2 sm:mt-0 sm:mr-10">
                            <div className="text-2xl font-bold text-green-700 flex items-center justify-end">
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
                            {activeFilter !== 'mail' && <><span className="mx-1">•</span><Users size={16} className="text-gray-500" /><span>{item.sitsAvailable}</span></>}
                          </div>
                          <button onClick={(e) => e.stopPropagation()} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-200 shadow">Book</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
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
        {showSearchResults || selectedRide || showMessages ? (<button className="p-2 rounded-full hover:bg-neutral-100 transition-colors" onClick={() => { if(selectedRide) {setSelectedRide(null)} else if (showMessages) {setShowMessages(false)} else {setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setShowSearchResults(false); setActiveFilter(null); setActiveSort(null); } }}><ChevronLeft size={24} /></button>) : (<div className="w-10"></div>)}
        <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Rider's Dashboard</h1>
        <button onClick={() => setShowMessages(true)} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors">
            <MessageCircle className="h-8 w-8" />
        </button>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col">
        {renderContent()}
      </main>

      {pickupLocation && destinationLocation && pickupDate && !showSearchResults && (<div className="fixed bottom-20 left-0 right-0 p-4 bg-transparent z-40"><button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-xl transform hover:scale-105" onClick={() => setShowSearchResults(true)}>See my results</button></div>)}

      {!showMessages && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-around items-center h-16">
              <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'search' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => { setActiveTab('search'); setShowSearchResults(false); setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setActiveFilter(null); setActiveSort(null); setSelectedRide(null); }}><Search size={24} strokeWidth={activeTab === 'search' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'search' ? 'text-gray-800' : 'text-neutral-500'}`}>Search</span></button>
              <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'history' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => setActiveTab('history')}><History size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'history' ? 'text-gray-800' : 'text-neutral-500'}`}>History</span></button>
              <button className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 w-20 ${activeTab === 'profile' ? 'text-gray-800' : 'text-neutral-500 hover:text-gray-800'}`} onClick={() => setActiveTab('profile')}><User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${activeTab === 'profile' ? 'text-gray-800' : 'text-neutral-500'}`}>Profile</span></button>
            </div>
          </nav>
      )}
    </div>
  );
};

const AccordionItem = ({ icon, title, value, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b last:border-b-0 border-neutral-200">
            <button onClick={() => setIsOpen(!isOpen)} className="p-4 flex justify-between items-center w-full hover:bg-neutral-50">
                <div className="flex items-center space-x-3">
                    {icon}
                    <span className="font-medium text-gray-800">{title}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm truncate max-w-[120px]">{value}</span>
                    <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-neutral-50 text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

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
        <div className="flex flex-col h-full bg-[#F8F8F8]">
            <div className="bg-white text-gray-800 p-4 flex-shrink-0 border-b border-neutral-200">
                 <div className="flex items-center">
                    <button onClick={onBack} className="mr-3 text-gray-600 hover:text-gray-800"><ChevronLeft size={24} /></button>
                    <img src={ride.imageUrl} alt={ride.carModel} className="w-24 h-16 object-cover rounded-md mr-4"/>
                    <div className="flex items-stretch w-full">
                        <div className="relative flex flex-col justify-between items-center mr-4 shrink-0">
                            <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 bg-neutral-300 rounded-full"></div>
                            <MapPin size={20} className="text-green-600 bg-white z-10" />
                            <Target size={20} className="text-red-600 bg-white z-10" />
                        </div>
                        <div className="flex flex-col justify-between w-full">
                            <div className="mb-2">
                                <p className="font-semibold text-gray-800 text-lg">{ride.origin}</p>
                                <p className="text-neutral-600 text-sm">{formatDate(ride.originDate)} {formatTime(ride.originDate)}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">{ride.destination}</p>
                                <p className="text-neutral-600 text-sm">{formatDate(ride.destinationDate)} {formatTime(ride.destinationDate)}</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between text-sm p-2 bg-red-100 rounded-lg">
                        <span className="text-red-800">Simulate Unreliable Rider:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={isUnreliable} onChange={onToggleReliability} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800">About the trip</h2>
                    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
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
                                <hr className="my-2 border-neutral-200"/>
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
                                        <Car size={16} className="text-gray-600" />
                                        <span>{ride.carYear} {ride.carModel}</span>
                                    </div>
                                    <div className="mt-2"><PlateNumber plate={ride.plateNumber}/></div>
                                </div>
                            </div>
                        </AccordionItem>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white border-t border-neutral-200 flex-shrink-0 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div>
                    <p className="text-2xl font-bold text-gray-800">${finalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{ride.ratePerMail || ride.avgFuelPerMile}</p>
                </div>
                <button className="bg-green-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-lg">Book</button>
            </div>
        </div>
    );
};

export default App;
