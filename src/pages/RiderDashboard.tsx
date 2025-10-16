import React, { useState, useRef, useEffect } from "react";
import {
  History,
  Search,
  User,
  MapPin,
  Target,
  ChevronRight,
  Calendar,
  Users,
  Star,
  ChevronLeft,
  DollarSign,
  Wind,
  Bookmark,
  Lightbulb,
  X,
  Mail,
  Wifi,
  Snowflake,
  Briefcase,
  ChevronDown,
  Info,
  Car,
  MessageCircle,
  Send,
  Plus,
  Minus,
  Globe,
} from "lucide-react";

const translations = {
  en: {
    findYourNextRide: "Find Your Next Ride",
    selectPickupAndDestination: "Select your pickup and destination locations.",
    origin: "Origin",
    destination: "Destination",
    selectADate: "Select a date",
    howManySeats: "How many seats, or mail?",
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
    mailOnly: "Mail Only",
  },
  uz: {
    findYourNextRide: "Keyingi Sayohatni Toping",
    selectPickupAndDestination: "Boshlanish va borish manzillarini tanlang.",
    origin: "Boshlanish",
    destination: "Manzil",
    selectADate: "Sanani tanlang",
    howManySeats: "Nechta o'rindiq, yoki pochta?",
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
    mailOnly: "Faqat Pochta",
  },
  ru: {
    findYourNextRide: "Найти следующую поездку",
    selectPickupAndDestination: "Выберите места отправления и назначения.",
    origin: "Откуда",
    destination: "Куда",
    selectADate: "Выберите дату",
    howManySeats: "Сколько мест, или почта?",
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
    mailOnly: "Только почта",
  },
};

// Expanded Data for Uzbekistan Regions and Cities - ALL 14 REGIONS INCLUDED
const uzbekistanLocationsData = [
  {
    region: "Andijan Region",
    cities: [
      "Andijan",
      "Asaka",
      "Baliqchi",
      "Bo'ston",
      "Buloqboshi",
      "Izboskan",
      "Jalaquduq",
      "Marhamat",
      "Oltinko'l",
      "Paxtaobod",
      "Qo'rg'ontepa",
      "Shahrixon",
      "Ulug'nor",
      "Xo'jaobod",
    ],
  },
  {
    region: "Bukhara Region",
    cities: [
      "Bukhara",
      "Galaosiyo",
      "G'ijduvon",
      "Jondor",
      "Kogon",
      "Olot",
      "Peshku",
      "Qorako'l",
      "Qorovulbozor",
      "Romitan",
      "Shofirkon",
      "Vobkent",
    ],
  },
  {
    region: "Fergana Region",
    cities: [
      "Fergana",
      "Margilan",
      "Kokand",
      "Quvasoy",
      "Quva",
      "Rishton",
      "Oltiariq",
      "Bag'dod",
      "Beshariq",
      "Buvayda",
      "Dang'ara",
      "Furqat",
      "Qo'shtepa",
      "Toshloq",
      "Uchko'prik",
      "Yozyovon",
      "So'x",
    ],
  },
  {
    region: "Jizzakh Region",
    cities: [
      "Jizzakh",
      "G'allaorol",
      "Sharof Rashidov",
      "Zomin",
      "Paxtakor",
      "Do'stlik",
      "Forish",
      "Mirzacho'l",
      "Yangiobod",
      "Arnasoy",
      "Baxmal",
      "Zarbdor",
    ],
  },
  {
    region: "Kashkadarya Region",
    cities: [
      "Karshi",
      "Shahrisabz",
      "Kitob",
      "G'uzor",
      "Nishon",
      "Kasbi",
      "Chiroqchi",
      "Dehqonobod",
      "Mirishkor",
      "Muborak",
      "Qarshi",
      "Yakkabog'",
      "Koson",
      "Qamashi",
    ],
  },
  {
    region: "Khorezm Region",
    cities: [
      "Urgench",
      "Khiva",
      "Shovot",
      "Hazorasp",
      "Bog'ot",
      "Yangiariq",
      "Yangibozor",
      "Urganch",
      "Tuproqqal'a",
      "Xonqa",
      "Qo'shko'pir",
    ],
  },
  {
    region: "Namangan Region",
    cities: [
      "Namangan",
      "Chust",
      "Pop",
      "Kosonsoy",
      "Mingbuloq",
      "Norin",
      "To'raqo'rg'on",
      "Uchqo'rg'on",
      "Yangiqo'rg'on",
      "Chortoq",
    ],
  },
  {
    region: "Navoiy Region",
    cities: ["Navoiy", "Zarafshan", "Uchquduq", "Konimex", "Nurota", "Tomdi", "Xatirchi", "Qiziltepa", "Karmana"],
  },
  {
    region: "Samarkand Region",
    cities: [
      "Samarkand",
      "Urgut",
      "Jomboy",
      "Ishtixon",
      "Kattaqo'rg'on",
      "Nurobod",
      "Oqdaryo",
      "Paxtachi",
      "Pastdarg'om",
      "Tayloq",
      "Toyloq",
      "Bulung'ur",
      "Qo'shrabot",
    ],
  },
  {
    region: "Sirdaryo Region",
    cities: [
      "Guliston",
      "Yangiyer",
      "Shirin",
      "Mirzaobod",
      "Oqoltin",
      "Sayxunobod",
      "Sardoba",
      "Sirdaryo",
      "Xovos",
      "Boyovut",
    ],
  },
  {
    region: "Surkhandarya Region",
    cities: [
      "Termez",
      "Denov",
      "Boysun",
      "Sherobod",
      "Sho'rchi",
      "Qumqo'rg'on",
      "Muzrabot",
      "Angor",
      "Bandixon",
      "Jarqo'rg'on",
      "Oltinsoy",
      "Sariosiyo",
      "Uzun",
    ],
  },
  {
    region: "Tashkent Region",
    cities: [
      "Angren",
      "Chirchiq",
      "Olmaliq",
      "Bekabad",
      "Yangiyo'l",
      "Gazalkent",
      "Bo'ka",
      "Chinoz",
      "Oqqo'rg'on",
      "Parkent",
      "Piskent",
      "Qibray",
      "Quyichirchiq",
      "Yangiyo'l",
      "Yuqorichirchiq",
      "Zangiota",
    ],
  },
  {
    region: "Tashkent City",
    cities: [
      "Tashkent",
      "Bektemir",
      "Chilonzor",
      "Mirobod",
      "Mirzo Ulugbek",
      "Sergeli",
      "Shaykhontohur",
      "Uchtepa",
      "Yakkasaroy",
      "Yashnobod",
      "Yunusobod",
    ],
  },
  {
    region: "Republic of Karakalpakstan",
    cities: [
      "Nukus",
      "Beruniy",
      "Chimboy",
      "Ellikqala",
      "Kegeyli",
      "Qo'ng'irot",
      "Qorao'zak",
      "Shumanay",
      "Taxtako'pir",
      "To'rtko'l",
      "Xo'jayli",
      "Amudaryo",
      "Bo'zatov",
      "Qanliko'l",
      "Taxiatosh",
    ],
  },
];

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const formatTime = (dateString: string) => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

const initialDummySearchResults = [
  {
    id: 1,
    driverName: "Alisher V.",
    driverImageUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=AV",
    reliabilityStars: 4.5,
    carModel: "Chevrolet Cobalt",
    carYear: 2022,
    imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Cobalt",
    plateNumber: { locationCode: "01", series: "A", serialNumber: "123BC" },
    origin: "Tashkent",
    originDate: "2025-08-26T09:00:00",
    destination: "Tashkent Region",
    destinationDate: "2025-08-26T13:00:00",
    sitsAvailable: "2 seats",
    basePrice: 284.44,
    serviceType: "rider",
    specialServices: ["Wi-Fi", "Air Conditioning"],
  },
  {
    id: 2,
    driverName: "Botir K.",
    driverImageUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=BK",
    reliabilityStars: 3.8,
    carModel: "Lada Granta",
    carYear: 2020,
    imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Lada",
    plateNumber: { locationCode: "30", series: "D", serialNumber: "456EF" },
    origin: "Fergana",
    originDate: "2025-08-27T14:00:00",
    destination: "Samarkand Region",
    destinationDate: "2025-08-27T21:30:00",
    sitsAvailable: "1 seat",
    basePrice: 332.22,
    mailPayout: "$25",
    serviceType: "mail",
    specialServices: ["Mail delivery"],
  },
  {
    id: 3,
    driverName: "Dilshod R.",
    driverImageUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=DR",
    reliabilityStars: 5.0,
    carModel: "Kia K5",
    carYear: 2023,
    imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Kia",
    plateNumber: { locationCode: "50", series: "G", serialNumber: "789HI" },
    origin: "Andijan",
    originDate: "2025-08-28T10:00:00",
    destination: "Namangan Region",
    destinationDate: "2025-08-29T23:00:00",
    sitsAvailable: "3 seats",
    basePrice: 1514.44,
    mailPayout: "$30",
    serviceType: "both",
    specialServices: ["Wi-Fi", "Air Conditioning", "Luggage space"],
  },
  {
    id: 4,
    driverName: "Elbek S.",
    driverImageUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=ES",
    reliabilityStars: 4.2,
    carModel: "Hyundai Elantra",
    carYear: 2021,
    imageUrl: "https://placehold.co/600x400/E2E8F0/4A5568?text=Elantra",
    plateNumber: { locationCode: "80", series: "J", serialNumber: "321KL" },
    origin: "Bukhara",
    originDate: "2025-08-29T08:30:00",
    destination: "Khorezm Region",
    destinationDate: "2025-08-29T16:30:00",
    sitsAvailable: "4 seats",
    basePrice: 388.89,
    serviceType: "rider",
    specialServices: ["Air Conditioning"],
  },
];

const CustomScrollbarStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #9ca3af; }
  `}</style>
);

const PlateNumber = ({ plate }) => {
  if (!plate) return null;
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1 space-x-2 font-mono w-max select-none">
      <span className="font-bold text-lg pl-1">{plate.locationCode}</span>
      <div className="w-px h-5 bg-gray-300"></div>
      <div className="flex items-baseline space-x-1">
        <span className="font-bold text-lg">{plate.series}</span>
        <span className="text-lg font-medium tracking-tighter">{plate.serialNumber}</span>
      </div>
      <div className="flex flex-col items-center pr-1">
        <svg width="24" height="12" viewBox="0 0 900 450" className="rounded-sm">
          <rect width="900" height="450" fill="#0072CE" />
          <rect y="150" width="900" height="150" fill="#FFFFFF" />
          <rect y="300" width="900" height="150" fill="#058B37" />
          <rect y="157.5" width="900" height="15" fill="#CE1126" />
          <rect y="277.5" width="900" height="15" fill="#CE1126" />
        </svg>
        <span className="font-bold text-[10px] text-gray-700">UZ</span>
      </div>
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
    <div className="bg-white p-4">
      <div className="flex justify-center items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {days.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
          const isPast = date < today;
          return (
            <button
              key={day}
              onClick={() => onDayClick(date)}
              disabled={isPast}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : isSelected ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary"}`}
            >
              {" "}
              {day}{" "}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-secondary">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const LocationSelectModal = ({ title, isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };
  const filteredLocations = uzbekistanLocationsData
    .map((regionData) => ({
      ...regionData,
      cities: regionData.cities.filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter(
      (regionData) =>
        regionData.cities.length > 0 || regionData.region.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-11 pr-4 py-2.5 bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-2 custom-scrollbar max-h-[60vh]">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((regionData) => (
            <div key={regionData.region}>
              <h3 className="w-full text-left p-3 font-semibold text-muted-foreground text-sm select-none">
                {regionData.region}
              </h3>
              {regionData.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onSelect(city);
                    handleClose();
                  }}
                  className="w-full text-left pl-6 py-2.5 text-foreground hover:bg-secondary rounded-lg text-base transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center mt-10">No locations found.</p>
        )}
      </div>
    </ModalWrapper>
  );
};

const BookingModal = ({ isOpen, onClose, ride, onConfirmBooking }) => {
  if (!isOpen) return null;
  const maxSeats = parseInt(ride.sitsAvailable) || 1;
  const [seats, setSeats] = useState(1);
  const handleConfirm = () => {
    onConfirmBooking(ride, seats);
  };
  const incrementSeats = () => setSeats((prev) => Math.min(prev + 1, maxSeats));
  const decrementSeats = () => setSeats((prev) => Math.max(1, prev - 1));
  const totalPrice = (ride.basePrice * seats).toFixed(2);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Confirm Your Booking">
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">You are booking a ride from</p>
          <p className="font-semibold text-lg text-foreground">
            {ride.origin} to {ride.destination}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(ride.originDate)} at {formatTime(ride.originDate)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Seats to book:</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={decrementSeats}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-50"
              disabled={seats <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="text-xl font-bold w-8 text-center">{seats}</span>
            <button
              onClick={incrementSeats}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 disabled:opacity-50"
              disabled={seats >= maxSeats}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-baseline pt-4 border-t">
          <span className="font-semibold text-lg text-foreground">Total Price:</span>
          <span className="font-bold text-2xl text-primary">${totalPrice}</span>
        </div>
      </div>
      <div className="p-4 bg-muted rounded-b-2xl">
        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:bg-primary/90 transition duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </ModalWrapper>
  );
};

const LanguageSelectModal = ({ isOpen, onClose, onSelect, currentLanguage, t }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "uz", name: "Oʻzbekcha" },
    { code: "ru", name: "Русский" },
  ];
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={t.selectLanguage}>
      <div className="p-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              onSelect(lang.code);
              onClose();
            }}
            className={`w-full text-left p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors ${currentLanguage === lang.code ? "font-semibold text-purple-600" : "text-gray-800"}`}
          >
            <span>{lang.name}</span>
            {currentLanguage === lang.code && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
          </button>
        ))}
      </div>
    </ModalWrapper>
  );
};

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeSort, setActiveSort] = useState(null);
  const [seatsNeeded, setSeatsNeeded] = useState(null);
  const [searchForMail, setSearchForMail] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isUnreliableRider, setIsUnreliableRider] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [rideToBook, setRideToBook] = useState(null);
  const [language, setLanguage] = useState("en");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [availableRides, setAvailableRides] = useState(initialDummySearchResults);
  const t = translations[language];

  const handleBookClick = (ride) => {
    setRideToBook(ride);
    setIsBooking(true);
  };
  const handleCardClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleConfirmBooking = (bookedRide, seats) => {
    setRideHistory((prev) => [{ ...bookedRide, seatsBooked: seats, bookingDate: new Date().toISOString() }, ...prev]);
    setAvailableRides((prev) => prev.filter((r) => r.id !== bookedRide.id));
    setIsBooking(false);
    setRideToBook(null);
    setSelectedRide(null);
  };

  const handleFilterClick = (filterType) => setActiveFilter((prev) => (prev === filterType ? null : filterType));
  const handleSortClick = (sortType) => setActiveSort((prev) => (prev === sortType ? null : sortType));

  const handleSeatsNeededClick = (numSeats) => {
    setSeatsNeeded((prev) => (prev === numSeats ? null : numSeats));
    setSearchForMail(false);
  };
  const handleMailOnlyClick = () => {
    setSearchForMail((prev) => !prev);
    setSeatsNeeded(null);
  };
  const resetSearch = () => {
    setActiveTab("search");
    setShowSearchResults(false);
    setPickupLocation("");
    setDestinationLocation("");
    setPickupDate("");
    setActiveFilter(null);
    setActiveSort(null);
    setSelectedRide(null);
    setSeatsNeeded(null);
    setSearchForMail(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "history":
        return (
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t.rideHistory}</h2>
            {rideHistory.length > 0 ? (
              <div className="space-y-4">
                {rideHistory.map((ride) => (
                  <div key={`${ride.id}-${ride.bookingDate}`} className="bg-white p-4 rounded-xl shadow-soft">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">
                          {ride.origin} to {ride.destination}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t.bookedOn} {formatDate(ride.bookingDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-purple-600">
                          ${(ride.basePrice * ride.seatsBooked).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {ride.seatsBooked} {t.seatsUnit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10">{t.pastRidesAppearHere}</p>
            )}
          </div>
        );
      case "search":
        if (selectedRide) {
          return (
            <TripDetails
              ride={selectedRide}
              onBack={() => setSelectedRide(null)}
              onBook={handleBookClick}
              isUnreliable={isUnreliableRider}
              onToggleReliability={() => setIsUnreliableRider((p) => !p)}
            />
          );
        }
        if (showSearchResults) {
          let results = [...availableRides];
          if (searchForMail) {
            results = results.filter((ride) => ride.serviceType === "mail" || ride.serviceType === "both");
          }
          if (activeFilter === "recommended") {
            results = results.filter((ride) => ride.reliabilityStars >= 4.5);
          }
          if (seatsNeeded) {
            results = results.filter((ride) => (parseInt(ride.sitsAvailable) || 0) >= seatsNeeded);
          }
          if (activeSort === "by_time") {
            results.sort((a, b) => new Date(a.originDate).getTime() - new Date(b.originDate).getTime());
          }
          if (activeSort === "by_seat") {
            results.sort((a, b) => (parseInt(b.sitsAvailable) || 0) - (parseInt(a.sitsAvailable) || 0));
          }

          let stickyTitle = t.allAvailableRides;
          if (activeFilter === "recommended") stickyTitle = t.recommendedForYou;
          else if (activeFilter === "mail") stickyTitle = t.mailDelivery;
          else if (activeSort === "by_seat") stickyTitle = t.sortedBySeat;
          else if (activeSort === "by_time") stickyTitle = t.sortedByTime;

          return (
            <div className="flex flex-col h-full">
              <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm z-10 sticky top-0">
                  <div className="p-4 border-b border-border">
                  <div className="flex items-center mb-4">
                    <button
                      className="p-2 rounded-full hover:bg-secondary transition-colors -ml-2 mr-2"
                      onClick={resetSearch}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold text-foreground text-left">{t.results}</h2>
                  </div>
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mb-2">
                    <button
                      onClick={() => handleSortClick("by_seat")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === "by_seat" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <Users size={16} />
                      <span>{t.bySeat}</span>
                    </button>
                    <button
                      onClick={() => handleSortClick("by_time")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeSort === "by_time" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <History size={16} />
                      <span>{t.byTime}</span>
                    </button>
                    <button
                      onClick={() => handleFilterClick("mail")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === "mail" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <Mail size={16} />
                      <span>{t.withMailOption}</span>
                    </button>
                    <button
                      onClick={() => handleFilterClick("recommended")}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${activeFilter === "recommended" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <Star size={16} />
                      <span>{t.recommended}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto bg-background">
                <div className="p-4 space-y-4">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className="bg-white p-4 rounded-2xl shadow-soft text-left cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <img
                            src={item.driverImageUrl}
                            alt={item.driverName}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <p className="font-semibold text-gray-800 text-lg">{item.driverName}</p>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star size={16} className="mr-1 fill-current" />{" "}
                          <span className="font-bold">{item.reliabilityStars.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 my-4">
                        <div className="flex items-center space-x-2">
                          <MapPin size={18} className="text-purple-500" />
                          <span className="text-gray-800 font-semibold">{item.origin}</span>
                        </div>
                        <div className="text-gray-300 font-bold text-lg">→</div>
                        <div className="flex items-center space-x-2">
                          <Target size={18} className="text-pink-500" />
                          <span className="text-gray-800 font-semibold">{item.destination}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold">{formatDate(item.originDate)}</span> at{" "}
                        {formatTime(item.originDate)}
                      </div>
                      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          {(item.serviceType === "mail" || item.serviceType === "both") && (
                            <div className="flex items-center space-x-1.5 text-blue-600 font-semibold">
                              <Mail size={16} />
                              <span>Mail: {item.mailPayout}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1.5 text-gray-600 font-semibold">
                            <Users size={16} />
                            <span>{item.sitsAvailable}</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-purple-600">${item.basePrice.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="p-4 sm:p-6 text-center flex flex-col justify-center flex-grow">
              <h2 className="text-4xl font-extrabold mb-2 text-foreground">{t.findYourNextRide}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.selectPickupAndDestination}</p>
              <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-elevated space-y-4">
                <button
                  onClick={() => setShowFromModal(true)}
                  className="w-full p-4 bg-secondary rounded-xl flex items-center justify-between hover:bg-secondary/80 transition-colors"
                >
                  <span className={`font-semibold ${pickupLocation ? "text-foreground" : "text-muted-foreground"}`}>
                    {pickupLocation || t.origin}
                  </span>
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setShowToModal(true)}
                  className="w-full p-4 bg-secondary rounded-xl flex items-center justify-between hover:bg-secondary/80 transition-colors"
                >
                  <span className={`font-semibold ${destinationLocation ? "text-foreground" : "text-muted-foreground"}`}>
                    {destinationLocation || t.destination}
                  </span>
                  <Target className="h-5 w-5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setShowCalendar(true)}
                  className="w-full p-4 bg-secondary rounded-xl flex items-center justify-between hover:bg-secondary/80 transition-colors"
                >
                  <span className={`font-semibold ${pickupDate ? "text-foreground" : "text-muted-foreground"}`}>
                    {pickupDate ? formatDate(pickupDate) : t.selectADate}
                  </span>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="pt-4 border-t border-border">
                  <p className="text-left font-semibold text-foreground mb-3">{t.howManySeats}</p>
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleSeatsNeededClick(num)}
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full text-lg font-bold transition-colors flex items-center justify-center ${seatsNeeded === num ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleMailOnlyClick}
                      className={`h-12 sm:h-14 px-5 rounded-full text-md font-semibold transition-colors flex items-center justify-center space-x-2 ${searchForMail ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                    >
                      <Mail size={20} />
                      <span>{t.mailOnly}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      case "profile":
        return (
          <div className="p-4 sm:p-6 h-full">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src="https://placehold.co/100x100/c4b5fd/4338ca?text=JD"
                  alt="User"
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-600">{t.memberSince}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-soft divide-y divide-gray-100">
              <button className="w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors rounded-t-2xl">
                <Car size={20} className="text-gray-500 mr-4" />
                <span className="flex-grow font-semibold text-gray-700">{t.goToDriverAccount}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors"
              >
                <Globe size={20} className="text-gray-500 mr-4" />
                <span className="flex-grow font-semibold text-gray-700">{t.language}</span>
                <span className="text-gray-500 mr-2 font-semibold">{language.toUpperCase()}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
              <a
                href="https://t.me/@locontico"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors rounded-b-2xl"
              >
                <MessageCircle size={20} className="text-gray-500 mr-4" />
                <span className="flex-grow font-semibold text-gray-700">{t.support}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-purple-50 to-pink-50 font-['Inter',_sans-serif] text-gray-800 antialiased">
      <CustomScrollbarStyles />
      {!selectedRide && (
        <header className="flex-shrink-0 bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 z-20 sticky top-0">
          <span className="font-semibold text-gray-800">+998 90 123 45 67</span>
          <button
            onClick={() => setActiveTab(activeTab === "profile" ? "search" : "profile")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {activeTab === "profile" ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <User size={24} className="text-gray-700" />
            )}
          </button>
        </header>
      )}
      <main className="flex-grow overflow-y-auto">{renderContent()}</main>
      {!selectedRide && !showSearchResults && activeTab === "search" && (
        <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 sticky bottom-16 sm:bottom-0">
          <button
            className={`w-full py-4 font-semibold transition-all rounded-full text-lg ${pickupLocation && destinationLocation && pickupDate && (seatsNeeded || searchForMail) ? "bg-gray-900 text-white shadow-lg shadow-gray-900/30" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            onClick={() => {
              if (searchForMail) {
                setActiveFilter("mail");
              }
              setShowSearchResults(true);
            }}
            disabled={!(pickupLocation && destinationLocation && pickupDate && (seatsNeeded || searchForMail))}
          >
            {t.continue}
          </button>
        </div>
      )}
      {!selectedRide && (
        <nav className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-2 z-50 border-t border-gray-200">
          <div className="bg-gray-100 rounded-full flex items-center p-1 max-w-sm mx-auto">
            <button
              className={`flex-1 py-2.5 text-sm font-semibold rounded-full flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === "search" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
              onClick={resetSearch}
            >
              <Search size={20} />
              <span>{t.search}</span>
            </button>
            <button
              className={`flex-1 py-2.5 text-sm font-semibold rounded-full flex items-center justify-center space-x-2 transition-all duration-300 ${activeTab === "history" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
              onClick={() => setActiveTab("history")}
            >
              <History size={20} />
              <span>{t.history}</span>
            </button>
          </div>
        </nav>
      )}
      <ModalWrapper isOpen={showCalendar} onClose={() => setShowCalendar(false)} title="Select a Date">
        <CalendarView
          selectedDate={pickupDate}
          onDayClick={(date) => {
            setPickupDate(date.toISOString().split("T")[0]);
            setShowCalendar(false);
          }}
        />
      </ModalWrapper>
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
      <LocationSelectModal
        title={t.selectOrigin}
        isOpen={showFromModal}
        onClose={() => setShowFromModal(false)}
        onSelect={setPickupLocation}
      />
      <LocationSelectModal
        title={t.selectDestination}
        isOpen={showToModal}
        onClose={() => setShowToModal(false)}
        onSelect={setDestinationLocation}
      />
    </div>
  );
};

const AccordionItem = ({ icon, title, value, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0 border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex justify-between items-center w-full hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className="text-gray-500">{icon}</div>
          <span className="font-semibold text-gray-700">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 truncate max-w-[120px]">{value}</span>
          <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="p-4 bg-gray-50 text-gray-600 text-sm">{children}</div>
      </div>
    </div>
  );
};

const SpecialService = ({ service }) => {
  const iconMap = {
    "Wi-Fi": <Wifi size={16} />,
    "Air Conditioning": <Snowflake size={16} />,
    "Mail delivery": <Mail size={16} />,
    "Luggage space": <Briefcase size={16} />,
  };
  return (
    <div className="flex items-center space-x-2">
      {iconMap[service] || <Star size={16} />} <span>{service}</span>
    </div>
  );
};

const TripDetails = ({ ride, isUnreliable, onToggleReliability, onBack, onBook }) => {
  const discount = ride.basePrice * 0.1;
  const finalPrice = isUnreliable ? ride.basePrice : ride.basePrice - discount;

  return (
    <div className="flex flex-col h-full bg-gray-50 font-['Inter',_sans-serif] text-gray-800">
      <header className="bg-white p-4 flex-shrink-0 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 text-gray-600 hover:bg-gray-100 rounded-full p-2 -ml-2">
            <ChevronLeft size={24} />
          </button>
          <img
            src={ride.imageUrl}
            alt={ride.carModel}
            className="w-20 h-14 object-cover rounded-lg mr-4"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.currentTarget.src = "https://placehold.co/200x150/e4e0d4/543d33?text=No+Img")}
          />
          <div className="flex items-stretch w-full">
            <div className="relative flex flex-col justify-between items-center mr-4 shrink-0">
              <div className="absolute top-2.5 bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 bg-gray-200"></div>
              <MapPin size={20} className="text-purple-500 bg-white z-10" />
              <Target size={20} className="text-pink-500 bg-white z-10" />
            </div>
            <div className="flex flex-col justify-between w-full text-sm">
              <div>
                <p className="font-bold text-base">{ride.origin}</p>
                <p className="text-gray-500">
                  {formatDate(ride.originDate)} {formatTime(ride.originDate)}
                </p>
              </div>
              <div>
                <p className="font-bold text-base">{ride.destination}</p>
                <p className="text-gray-500">
                  {formatDate(ride.destinationDate)} {formatTime(ride.destinationDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between text-sm p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
            <span className="text-yellow-800 font-medium">Simulate Unreliable Rider:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isUnreliable} onChange={onToggleReliability} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
            </label>
          </div>
          <h2 className="text-xl font-bold pt-2">About the trip</h2>
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <AccordionItem icon={<DollarSign size={20} />} title="Payout (est.)" value={`$${finalPrice.toFixed(2)}`}>
              <div className="space-y-2 font-medium">
                <div className="flex justify-between">
                  <span>Base Fare:</span>
                  <span>${ride.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isUnreliable ? "line-through text-gray-400" : ""}>Reliability Discount:</span>
                  <span className={isUnreliable ? "line-through text-gray-400" : "text-green-600"}>
                    -${discount.toFixed(2)}
                  </span>
                </div>
                {isUnreliable && (
                  <div className="text-xs text-yellow-800 bg-yellow-100 p-2 rounded-md flex items-start space-x-2">
                    <Info size={14} className="mt-0.5 flex-shrink-0" />
                    <span>Discount removed due to no-show.</span>
                  </div>
                )}
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Final Price:</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem
              icon={<Users size={20} />}
              title="Special services"
              value={ride.specialServices.length > 0 ? ride.specialServices.join(", ") : "None"}
            >
              <div className="space-y-3">
                {ride.specialServices.map((service) => (
                  <SpecialService key={service} service={service} />
                ))}
              </div>
            </AccordionItem>
            <AccordionItem icon={<User size={20} />} title="Driver & Car" value="">
              <div className="flex space-x-4">
                <img
                  src={ride.driverImageUrl}
                  alt={ride.driverName}
                  className="w-20 h-20 object-cover rounded-full"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.currentTarget.src = "https://placehold.co/100x100/e4e0d4/543d33?text=N/A")}
                />
                <div>
                  <p className="font-bold text-lg">{ride.driverName}</p>
                  <div className="flex items-center text-sm text-gray-500 font-semibold">
                    <Star size={14} className="text-yellow-500 fill-current mr-1" />
                    {ride.reliabilityStars}
                  </div>
                  <div className="flex items-center space-x-2 mt-2 text-sm font-medium">
                    <Car size={16} />
                    <span>
                      {ride.carYear} {ride.carModel}
                    </span>
                  </div>
                  <div className="mt-2">
                    <PlateNumber plate={ride.plateNumber} />
                  </div>
                </div>
              </div>
            </AccordionItem>
          </div>
        </div>
      </main>
      <footer className="p-4 bg-white border-t border-gray-200 flex-shrink-0 flex justify-between items-center sticky bottom-0">
        <div>
          <p className="text-2xl font-bold">${finalPrice.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onBook(ride)}
          className="bg-gray-900 text-white px-8 py-3.5 text-lg font-semibold rounded-full shadow-lg shadow-gray-900/30 hover:bg-gray-800 transition-all"
        >
          Book
        </button>
      </footer>
    </div>
  );
};

export default App;
