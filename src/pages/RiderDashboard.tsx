import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Search, User, MapPin, Target, ChevronRight, Calendar, Users, Star, ChevronLeft, DollarSign, Wind, Bookmark, Lightbulb, X, Mail, Wifi, Snowflake, Briefcase, ChevronDown, Info, Car, MessageCircle, Send, Plus, Minus, Globe } from 'lucide-react';

const translations = {
  en: {
    findYourNextRide: "Find Your Next Ride",
    selectPickupAndDestination: "Select your pickup and destination locations.",
    origin: "Origin",
    destination: "Destination",
    selectADate: "Select a date",
    howManySeats: "How many seats?",
    continue: "Continue",
    search: "Search",
    history: "History",
    profile: "Profile",
    results: "Results",
    bySeat: "By seat",
    byTime: "By time",
    withMailOption: "With mail option",
    saved: "Saved",
    recommended: "Recommended",
    seatsNeeded: "Seats Needed:",
    allAvailableRides: "All Available Rides",
    recommendedForYou: "Recommended for you",
    savedRides: "Saved Rides",
    mailDelivery: "Mail Delivery",
    sortedBySeat: "Sorted by: Seat",
    sortedByTime: "Sorted by: Time",
    rideHistory: "Ride History",
    pastRidesAppearHere: "Your past rides will appear here.",
    bookedOn: "Booked on:",
    seatsUnit: "seat(s)",
    language: "Language",
    goToDriverAccount: "Go to Driver Account",
    memberSince: "Member since 2024",
    selectOrigin: "Select Origin",
    selectDestination: "Select Destination",
    support: "Support",
    selectLanguage: "Select Language",
  },
  uz: {
    findYourNextRide: "Keyingi Sayohatni Toping",
    selectPickupAndDestination: "Boshlanish va borish manzillarini tanlang.",
    origin: "Boshlanish",
    destination: "Manzil",
    selectADate: "Sanani tanlang",
    howManySeats: "Nechta o'rindiq?",
    continue: "Davom etish",
    search: "Qidirish",
    history: "Tarix",
    profile: "Profil",
    results: "Natijalar",
    bySeat: "O'rindiq bo'yicha",
    byTime: "Vaqt bo'yicha",
    withMailOption: "Pochta bilan",
    saved: "Saqlangan",
    recommended: "Tavsiya etilgan",
    seatsNeeded: "Kerakli o'rindiqlar:",
    allAvailableRides: "Barcha Mavjud Sayohatlar",
    recommendedForYou: "Siz uchun tavsiya etilgan",
    savedRides: "Saqlangan Sayohatlar",
    mailDelivery: "Pochta Yetkazish",
    sortedBySeat: "Saralash: O'rindiq",
    sortedByTime: "Saralash: Vaqt",
    rideHistory: "Sayohatlar Tarixi",
    pastRidesAppearHere: "O'tgan sayohatlaringiz shu yerda paydo bo'ladi.",
    bookedOn: "Band qilingan sana:",
    seatsUnit: "o'rindiq",
    language: "Til",
    goToDriverAccount: "Haydovchi Akkountiga O'tish",
    memberSince: "2024 yildan beri a'zo",
    selectOrigin: "Boshlanish Manzilini Tanlang",
    selectDestination: "Borish Manzilini Tanlang",
    support: "Yordam",
    selectLanguage: "Tilni Tanlang",
  },
  ru: {
    findYourNextRide: "Найти следующую поездку",
    selectPickupAndDestination: "Выберите места отправления и назначения.",
    origin: "Откуда",
    destination: "Куда",
    selectADate: "Выберите дату",
    howManySeats: "Сколько мест?",
    continue: "Продолжить",
    search: "Поиск",
    history: "История",
    profile: "Профиль",
    results: "Результаты",
    bySeat: "По местам",
    byTime: "По времени",
    withMailOption: "С почтой",
    saved: "Сохраненные",
    recommended: "Рекомендуемые",
    seatsNeeded: "Нужно мест:",
    allAvailableRides: "Все доступные поездки",
    recommendedForYou: "Рекомендовано для вас",
    savedRides: "Сохраненные поездки",
    mailDelivery: "Доставка почты",
    sortedBySeat: "Сортировка: Места",
    sortedByTime: "Сортировка: Время",
    rideHistory: "История поездок",
    pastRidesAppearHere: "Ваши прошлые поездки появятся здесь.",
    bookedOn: "Забронировано:",
    seatsUnit: "мест(а)",
    language: "Язык",
    goToDriverAccount: "Перейти в аккаунт водителя",
    memberSince: "Участник с 2024 года",
    selectOrigin: "Выберите место отправления",
    selectDestination: "Выберите место назначения",
    support: "Поддержка",
    selectLanguage: "Выберите язык",
  },
};

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

// Initial dummy data for search results
const initialDummySearchResults = [
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
    originDate: '2025-08-26T09:00:00',
    destination: 'Tashkent Region',
    destinationDate: '2025-08-26T13:00:00',
    estimatedMiles: '192 mi',
    tripTime: '4h 0m',
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
    originDate: '2025-08-27T14:00:00',
    destination: 'Samarkand Region',
    destinationDate: '2025-08-27T21:30:00',
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
    originDate: '2025-08-28T10:00:00',
    destination: 'Namangan Region',
    destinationDate: '2025-08-29T23:00:00',
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
    originDate: '2025-08-29T08:30:00',
    destination: 'Khorezm Region',
    destinationDate: '2025-08-29T16:30:00',
    estimatedMiles: '400 mi',
    tripTime: '8h 0m',
    sitsAvailable: '4 sits',
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

// --- Custom Scrollbar Styles Component ---
const CustomScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #F8F8F8; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 2px solid #F8F8F8; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
  `}</style>
);

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
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
  
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startDay });
  
    return (
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-center items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-800">{currentDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
            {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
            {days.map(day => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
                const isPast = date < today;
                return (
                <button
                    key={day}
                    onClick={() => onDayClick(date)}
                    disabled={isPast}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isPast ? 'text-gray-400 cursor-not-allowed' :
                        isSelected ? 'bg-gray-200 text-gray-900 font-semibold' : 'hover:bg-gray-100'
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

const CalendarModal = ({ isOpen, onClose, onDayClick, selectedDate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Select Departure Date</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                        <X size={20} />
                    </button>
                </div>
                <CalendarView onDayClick={onDayClick} selectedDate={selectedDate} />
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

const BookingModal = ({ isOpen, onClose, ride, onConfirmBooking }) => {
  if (!isOpen) return null;

  const maxSeats = parseInt(ride.sitsAvailable) || 1;
  const [seats, setSeats] = useState(1);
  
  const handleConfirm = () => {
    onConfirmBooking(ride, seats);
  };

  const incrementSeats = () => {
    setSeats(prev => Math.min(prev + 1, maxSeats));
  };

  const decrementSeats = () => {
    setSeats(prev => Math.max(1, prev - 1));
  };

  const totalPrice = (ride.basePrice * seats).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Confirm Your Booking</h2>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
            <div>
                <p className="text-sm text-gray-500">You are booking a ride from</p>
                <p className="font-semibold text-lg text-gray-800">{ride.origin} to {ride.destination}</p>
                <p className="text-sm text-gray-600">{formatDate(ride.originDate)} at {formatTime(ride.originDate)}</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Seats to book:</span>
                <div className="flex items-center space-x-4">
                    <button onClick={decrementSeats} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={seats <= 1}><Minus size={16}/></button>
                    <span className="text-xl font-bold w-8 text-center">{seats}</span>
                    <button onClick={incrementSeats} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={seats >= maxSeats}><Plus size={16}/></button>
                </div>
            </div>
            <div className="flex justify-between items-baseline pt-4 border-t">
                <span className="font-semibold text-lg text-gray-800">Total Price:</span>
                <span className="font-bold text-2xl text-green-600">${totalPrice}</span>
            </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-3xl">
            <button onClick={handleConfirm} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-lg">
                Confirm Booking
            </button>
        </div>
      </div>
    </div>
  );
};

const LanguageSelectModal = ({ isOpen, onClose, onSelect, currentLanguage, t }) => {
  if (!isOpen) return null;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Oʻzbekcha' },
    { code: 'ru', name: 'Русский' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{t.selectLanguage}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { onSelect(lang.code); onClose(); }}
              className={`w-full text-left p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors ${currentLanguage === lang.code ? 'font-semibold text-green-600' : 'text-gray-800'}`}
            >
              <span>{lang.name}</span>
              {currentLanguage === lang.code && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  const navigate = useNavigate();
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
  const [rideHistory, setRideHistory] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [rideToBook, setRideToBook] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  // Use the initial dummy data directly, as Supabase is not available in this environment.
  const [availableRides, setAvailableRides] = useState(initialDummySearchResults);

  const t = translations[language];

  const handleBookClick = (ride) => {
    setRideToBook(ride);
    setIsBooking(true);
  };
  
  const handleCardClick = (ride) => {
      setSelectedRide(ride);
  }

  const handleConfirmBooking = (bookedRide, seats) => {
    const newBooking = { ...bookedRide, seatsBooked: seats, bookingDate: new Date().toISOString() };
    setRideHistory(prev => [newBooking, ...prev]);
    // Simulate booking by removing the ride from the available list
    setAvailableRides(prev => prev.filter(r => r.id !== bookedRide.id));
    
    setIsBooking(false);
    setRideToBook(null);
    setSelectedRide(null); // Go back to the search results after booking
    
    // A simple confirmation alert. In a real app, use a toast notification.
    console.log(`Booking confirmed for ${seats} seat(s) on ride #${bookedRide.id}!`);
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
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.rideHistory}</h2>
            {rideHistory.length > 0 ? (
              <div className="space-y-4">
                {rideHistory.map(ride => (
                  <div key={`${ride.id}-${ride.bookingDate}`} className="bg-white p-4 rounded-xl shadow-lg border">
                       <div className="flex justify-between items-start">
                           <div>
                               <p className="font-semibold text-lg">{ride.origin} to {ride.destination}</p>
                               <p className="text-sm text-gray-600">{t.bookedOn} {formatDate(ride.bookingDate)}</p>
                           </div>
                           <div className="text-right">
                               <p className="font-bold text-lg text-green-600">${(ride.basePrice * ride.seatsBooked).toFixed(2)}</p>
                               <p className="text-sm text-gray-600">{ride.seatsBooked} {t.seatsUnit}</p>
                           </div>
                       </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-10">{t.pastRidesAppearHere}</p>
            )}
          </div>
        );
      case 'search':
        if (selectedRide) {
            return <TripDetails ride={selectedRide} onBack={() => setSelectedRide(null)} onBook={handleBookClick} isUnreliable={isUnreliableRider} onToggleReliability={() => setIsUnreliableRider(p => !p)} />;
        }
        if (showSearchResults) {
          let results = [...availableRides];

          // Filtering logic
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

          // Sorting logic
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
          
          let stickyTitle = t.allAvailableRides;
          if(activeFilter === 'recommended') stickyTitle = t.recommendedForYou;
          else if(activeFilter === 'saved') stickyTitle = t.savedRides;
          else if(activeFilter === 'mail') stickyTitle = t.mailDelivery;
          else if(activeSort === 'by_seat') stickyTitle = t.sortedBySeat;
          else if(activeSort === 'by_time') stickyTitle = t.sortedByTime;


          return (
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 bg-white shadow-sm z-10">
                <div className="p-4 border-b border-neutral-200">
                  <div className="flex items-center mb-3">
                    <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors -ml-2 mr-2" onClick={() => { setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setShowSearchResults(false); setActiveFilter(null); setActiveSort(null); setSeatsNeeded(null); }}><ChevronLeft size={24} /></button>
                    <h2 className="text-lg font-semibold text-gray-800 text-left">{t.results}</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center space-x-2 flex-wrap gap-2">
                              <button onClick={() => handleSortClick('by_seat')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'by_seat' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                  <Users size={16} />
                                  <span>{t.bySeat}</span>
                              </button>
                              <button onClick={() => handleSortClick('by_time')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === 'by_time' ? 'bg-[#E1F87E] text-gray-800' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                  <History size={16} />
                                  <span>{t.byTime}</span>
                              </button>
                               <button onClick={() => handleFilterClick('mail')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'mail' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                  {activeFilter === 'mail' ? <X size={16} /> : <AmazonMailLogo className="w-5 h-5"/>}
                                  <span>{t.withMailOption}</span>
                              </button>
                          </div>

                          <div className="flex items-center space-x-2">
                              <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                              <button onClick={() => handleFilterClick('saved')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'saved' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                  {activeFilter === 'saved' ? <X size={16} /> : <Bookmark size={16} />}
                                  <span>{t.saved}</span>
                              </button>
                               <button onClick={() => handleFilterClick('recommended')} className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === 'recommended' ? 'bg-green-100 text-green-700 border border-green-600' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                  {activeFilter === 'recommended' ? <X size={16} /> : <Lightbulb size={16} />}
                                  <span>{t.recommended}</span>
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-700">{t.seatsNeeded}</span>
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
                      <div key={item.id} onClick={() => handleCardClick(item)} className="bg-white p-4 rounded-xl shadow-lg border border-neutral-200 text-left cursor-pointer hover:shadow-xl transition-shadow">
                        <div className="space-y-3">
                          {/* Driver Name */}
                          <div className="flex items-center">
                            <img src={item.driverImageUrl} alt={item.driverName} className="w-8 h-8 rounded-full object-cover mr-3" />
                            <p className="font-semibold text-gray-800 text-lg">{item.driverName}</p>
                          </div>

                          {/* Route */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 flex-1">
                              <MapPin size={16} className="text-green-600" />
                              <span className="text-gray-800 font-medium">{item.origin}</span>
                            </div>
                            <div className="text-gray-400">→</div>
                            <div className="flex items-center space-x-2 flex-1">
                              <Target size={16} className="text-red-600" />
                              <span className="text-gray-800 font-medium">{item.destination}</span>
                            </div>
                          </div>

                          {/* Date and Time */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} className="text-gray-600" />
                              <span className="text-gray-700">{formatDate(item.originDate)}</span>
                              <span className="text-gray-700">at {formatTime(item.originDate)}</span>
                            </div>
                          </div>

                          {/* Seats and Price */}
                          <div className="flex items-center justify-between text-sm pt-2 border-t mt-2">
                            <div className="flex items-center space-x-4">
                                { (item.serviceType === 'mail' || item.serviceType === 'both') && (
                                    <div className="flex items-center space-x-1 text-blue-600">
                                        <Mail size={16} />
                                        <span>Mail: {item.mailPayout}</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-1 text-gray-600">
                                    <Users size={16} />
                                    <span>{item.sitsAvailable}</span>
                                </div>
                            </div>
                            <div className="text-xl font-bold text-green-600">
                                ${item.basePrice.toFixed(2)}
                            </div>
                          </div>
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
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{t.findYourNextRide}</h2>
              <p className="text-md text-gray-600 mb-6">{t.selectPickupAndDestination}</p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-200 space-y-4">
                
                <div onClick={() => setShowFromModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${pickupLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
                    <span>{pickupLocation || t.origin}</span>
                    <MapPin className="h-5 w-5 text-neutral-500" />
                </div>
                <LocationSelectModal title={t.selectOrigin} isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setPickupLocation} />

                <div onClick={() => setShowToModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${destinationLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
                    <span>{destinationLocation || t.destination}</span>
                    <Target className="h-5 w-5 text-neutral-500" />
                </div>
                <LocationSelectModal title={t.selectDestination} isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setDestinationLocation} />
                
                <div className="relative text-left">
                   <button onClick={() => setShowCalendar(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${pickupDate ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`}>
                        <span>{pickupDate ? formatDate(pickupDate) : t.selectADate}</span>
                        <Calendar className="h-5 w-5 text-neutral-500" />
                    </button>
                </div>
                
                <div className="pt-4 border-t border-neutral-200">
                    <p className="text-left font-semibold text-gray-700 mb-2">{t.howManySeats}</p>
                    <div className="flex items-center justify-center space-x-4">
                        {[1, 2, 3, 4].map(num => (
                            <button key={num} onClick={() => handleSeatsNeededClick(num)} className={`w-12 h-12 rounded-full text-md font-semibold transition-colors flex items-center justify-center ${seatsNeeded === num ? 'bg-green-500 text-white' : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'}`}>
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

              </div>
            </div>
          );
        }
      case 'profile':
        return (
          <div className="p-6 bg-gray-50 h-full">
            <div className="text-center mb-8">
                <img src="https://placehold.co/100x100/E2E8F0/4A5568?text=JD" alt="User" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"/>
                <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
                <p className="text-sm text-gray-600">{t.memberSince}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                <button onClick={() => navigate('/driver-dashboard')} className="w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors">
                    <Car size={22} className="text-gray-600 mr-4"/>
                    <span className="flex-grow font-semibold text-gray-700">{t.goToDriverAccount}</span>
                    <ChevronRight size={20} className="text-gray-400"/>
                </button>

                <button onClick={() => setShowLanguageModal(true)} className="w-full text-left p-4 flex items-center border-t border-neutral-200 hover:bg-gray-50 transition-colors">
                    <Globe size={22} className="text-gray-600 mr-4"/>
                    <span className="flex-grow font-semibold text-gray-700">{t.language}</span>
                    <span className="text-gray-600 mr-2">{language.toUpperCase()}</span>
                    <ChevronRight size={20} className="text-gray-400"/>
                </button>

                <button className="w-full text-left p-4 flex items-center border-t border-neutral-200 hover:bg-gray-50 transition-colors">
                    <MessageCircle size={22} className="text-gray-600 mr-4"/>
                    <span className="flex-grow font-semibold text-gray-700">{t.support}</span>
                    <ChevronRight size={20} className="text-gray-400"/>
                </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] font-sans antialiased">
      <CustomScrollbarStyles />

      {!selectedRide && (
        <header className="flex-shrink-0 bg-white p-4 flex items-center justify-between shadow-sm z-20">
          <span className="font-semibold text-gray-800">+998 90 123 45 67</span>
          <button onClick={() => setActiveTab('profile')} className="p-2 rounded-full hover:bg-gray-100">
            <User size={24} className="text-gray-700" />
          </button>
        </header>
      )}

      <main className="flex-grow overflow-hidden flex flex-col">
        {renderContent()}
      </main>

      {!selectedRide && !showSearchResults && activeTab === 'search' && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-transparent z-40">
          <button 
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 shadow-xl transform hover:scale-105 ${
              pickupLocation && destinationLocation && pickupDate && seatsNeeded
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`} 
            onClick={() => setShowSearchResults(true)}
            disabled={!(pickupLocation && destinationLocation && pickupDate && seatsNeeded)}
          >
            {t.continue}
          </button>
        </div>
      )}

      {!selectedRide && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white p-2.5 z-50 border-t border-neutral-200">
          <div className="bg-neutral-100 rounded-full flex items-center p-1 max-w-sm mx-auto">
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-full flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === 'search' ? 'bg-white shadow text-gray-800' : 'text-neutral-500'}`}
              onClick={() => { setActiveTab('search'); setShowSearchResults(false); setPickupLocation(''); setDestinationLocation(''); setPickupDate(''); setActiveFilter(null); setActiveSort(null); setSelectedRide(null); setSeatsNeeded(null); }}>
                <Search size={20} />
                <span>{t.search}</span>
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-full flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === 'history' ? 'bg-white shadow text-gray-800' : 'text-neutral-500'}`}
              onClick={() => setActiveTab('history')}>
                <History size={20} />
                <span>{t.history}</span>
            </button>
          </div>
        </nav>
      )}
      <CalendarModal 
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        selectedDate={pickupDate}
        onDayClick={(date) => {
            setPickupDate(date.toISOString().split('T')[0]);
            setShowCalendar(false);
        }}
      />
      <BookingModal 
        isOpen={isBooking}
        onClose={() => setIsBooking(false)}
        ride={rideToBook}
        onConfirmBooking={handleConfirmBooking}
      />
      <LanguageSelectModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onSelect={setLanguage}
        t={t}
      />
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


const TripDetails = ({ ride, isUnreliable, onToggleReliability, onBack, onBook }) => {
    const discount = ride.basePrice * 0.10;
    const finalPrice = isUnreliable ? ride.basePrice : ride.basePrice - discount;

    return (
        <div className="flex flex-col h-full bg-[#F8F8F8]">
            <div className="bg-white text-gray-800 p-4 flex-shrink-0 border-b border-neutral-200">
                 <div className="flex items-center">
                    <button onClick={onBack} className="mr-3 text-gray-600 hover:text-gray-800"><ChevronLeft size={24} /></button>
                    <img src={ride.imageUrl} alt={ride.carModel} className="w-24 h-16 object-cover rounded-md mr-4" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/200x150/E2E8F0/4A5568?text=Image+Error')}/>
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
                                <img src={ride.driverImageUrl} alt={ride.driverName} className="w-20 h-20 object-cover rounded-full" onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/100x100/E2E8F0/4A5568?text=N/A')}/>
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
                <button onClick={() => onBook(ride)} className="bg-green-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-lg">Book</button>
            </div>
        </div>
    );
};

export default App;



