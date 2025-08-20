// Driver Dashboard - With Custom Scrollbar Styling
import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Plus,
  User,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Navigation,
  MessageCircle,
  Users, // For Groups
  Hash, // For Channels
  Store, // For Market
  Search, // For search bar
  X, // For closing modals
  CheckCircle, // For submit button success state
  ArrowLeft, // For Navigation
  Send, // For search button
  Loader2, // For loading state
  XCircle, // For ending a trip
  Fuel, // Nearby gas stations
  Radar, // Speed cameras
  LocateFixed, // Recenter to user
  Car, // Added Car icon back for Welcome component
  Sparkles, // For Gemini features
  Newspaper, // For News
  TrendingUp, // For Stats
  Mail,
  Phone,
  Settings,
  LogOut,
  Edit2,
  ChevronLeft, // Added missing icon
  ChevronRight,
  Star,
  ShieldCheck,
  CreditCard,
  Bell,
  Languages,
  Lock,
  Trash2,
  History,
  FileText,
  MinusCircle,
  PlusCircle,
  UserPlus, // Added icon for the new button
} from "lucide-react";

// --- i18n Translations ---
const translations = {
  en: {
    ride: "Ride", newRide: "New Ride", myLines: "My Lines", profile: "Profile",
    totalEarnings: "Total Earnings", stats: "Stats", safety: "Safety", yourActivity: "Your Activity",
    noLines: "No Lines Posted Yet", postRidePrompt: "Post a new ride to see it here.", active: "Active",
    postNewRide: "Post a New Ride", fromWhere: "From where", toWhere: "To where", departureDate: "Departure date",
    mailService: "Mail Service", yesCarryMail: "Yes, I do carry Mail", mailDescYes: "I can transport both passengers and mail packages",
    noCarryMail: "No, I do not carry Mail", mailDescNo: "I only transport passengers, no mail service",
    freeSeats: "Free Seats", departureType: "Departure Type", fixedDeparture: "Fixed Departure Time",
    fixedDepartureDesc: "Leave at a specific time regardless of seat availability",
    whenFills: "Leave When Seats Fill", whenFillsDesc: "Depart as soon as all available seats are booked",
    price: "Price", enterPrice: "Enter price", postRide: "Post Ride", submitted: "Submitted!",
    selectOrigin: "Select Origin", selectDestination: "Select Destination", searchCity: "Search for a city or region...",
    noLocations: "No regions or cities found.", selectDepDate: "Select Departure Date",
    reviews: "reviews", rides: "rides", username: "Username", gender: "Gender", memberSince: "Member Since",
    contactVerification: "Contact & Verification", phone: "Phone Number", email: "Email", idVerification: "ID Verification",
    verified: "Verified", notVerified: "Not Verified", driverDetails: "Driver Details", vehicle: "Vehicle",
    licensePlate: "License Plate", drivingLicense: "Driving License", activity: "Activity", rideHistory: "Ride History",
    upcomingRides: "Upcoming Rides", settings: "Settings", language: "Language", notifications: "Notification Preferences",
    paymentMethods: "Payment Methods", privacy: "Privacy Settings", security: "Security", changePassword: "Change Password",
    logout: "Logout", editProfile: "Edit Profile", fullName: "Full Name", saveChanges: "Save Changes",
    editVehicle: "Edit Vehicle Details", uzbek: "Uzbek", english: "English", russian: "Russian",
    pastRides: "Past Rides", noCompletedRides: "No completed rides.", noUpcomingRides: "No upcoming rides.",
    submitting: "Submitting...", noActiveRide: "No active ride.", passengers: "passengers", iTookAClient: "I took a client",
    editRide: "Edit Ride", updateRide: "Update Ride",
  },
  uz: {
    ride: "Yo'lga chiqish", newRide: "Yangi e'lon", myLines: "Mening yo'nalishlarim", profile: "Profil",
    totalEarnings: "Jami daromad", stats: "Statistika", safety: "Xavfsizlik", yourActivity: "Sizning faoliyatingiz",
    noLines: "Hali e'lonlar joylanmagan", postRidePrompt: "Bu yerda ko'rish uchun yangi e'lon joylashtiring.", active: "Faol",
    postNewRide: "Yangi e'lon joylash", fromWhere: "Qayerdan", toWhere: "Qayerga", departureDate: "Jo'nash sanasi",
    mailService: "Pochta xizmati", yesCarryMail: "Ha, pochta olaman", mailDescYes: "Yo'lovchilar va pochta jo'natmalarini tashiyman",
    noCarryMail: "Yo'q, pochta olmayman", mailDescNo: "Faqat yo'lovchilarni tashiyman, pochta xizmati yo'q",
    freeSeats: "Bo'sh o'rindiqlar", departureType: "Jo'nash turi", fixedDeparture: "Belgilangan vaqtda jo'nash",
    fixedDepartureDesc: "O'rindiqlar to'lishidan qat'i nazar, belgilangan vaqtda jo'nab ketish",
    whenFills: "O'rindiqlar to'lganda", whenFillsDesc: "Barcha mavjud o'rindiqlar band qilingan zahoti jo'nab ketish",
    price: "Narx", enterPrice: "Narxni kiriting", postRide: "E'lonni joylash", submitted: "Yuborildi!",
    selectOrigin: "Boshlanish nuqtasini tanlang", selectDestination: "Manzilni tanlang", searchCity: "Shahar yoki viloyatni qidiring...",
    noLocations: "Viloyat yoki shahar topilmadi.", selectDepDate: "Jo'nash sanasini tanlang",
    reviews: "sharhlar", rides: "sayohatlar", username: "Foydalanuvchi nomi", gender: "Jins", memberSince: "Ro'yxatdan o'tgan sana",
    contactVerification: "Aloqa va tekshiruv", phone: "Telefon raqami", email: "Elektron pochta", idVerification: "Shaxsni tasdiqlash",
    verified: "Tasdiqlangan", notVerified: "Tasdiqlanmagan", driverDetails: "Haydovchi ma'lumotlari", vehicle: "Avtomobil",
    licensePlate: "Davlat raqami", drivingLicense: "Haydovchilik guvohnomasi", activity: "Faoliyat", rideHistory: "Sayohatlar tarixi",
    upcomingRides: "Kutilayotgan sayohatlar", settings: "Sozlamalar", language: "Til", notifications: "Bildirishnomalar",
    paymentMethods: "To'lov usullari", privacy: "Maxfiylik", security: "Xavfsizlik", changePassword: "Parolni o'zgartirish",
    logout: "Chiqish", editProfile: "Profilni tahrirlash", fullName: "To'liq ism", saveChanges: "O'zgarishlarni saqlash",
    editVehicle: "Avtomobil ma'lumotlarini tahrirlash", uzbek: "O'zbekcha", english: "Inglizcha", russian: "Ruscha",
    pastRides: "O'tgan Sayohatlar", noCompletedRides: "Tugallangan sayohatlar yo'q.", noUpcomingRides: "Kutilayotgan sayohatlar yo'q.",
    submitting: "Yuborilmoqda...", noActiveRide: "Faol sayohat yo'q.", passengers: "yo'lovchilar", iTookAClient: "Mijoz oldim",
    editRide: "Sayohatni tahrirlash", updateRide: "Yangilash",
  },
  ru: {
    ride: "Поездка", newRide: "Новая поездка", myLines: "Мои поездки", profile: "Профиль",
    totalEarnings: "Общий заработок", stats: "Статистика", safety: "Безопасность", yourActivity: "Ваша активность",
    noLines: "Поездки еще не опубликованы", postRidePrompt: "Опубликуйте новую поездку, чтобы увидеть ее здесь.", active: "Активна",
    postNewRide: "Опубликовать новую поездку", fromWhere: "Откуда", toWhere: "Куда", departureDate: "Дата отправления",
    mailService: "Почтовая служба", yesCarryMail: "Да, перевожу посылки", mailDescYes: "Могу перевозить как пассажиров, так и посылки",
    noCarryMail: "Нет, не перевожу посылки", mailDescNo: "Перевожу только пассажиров, без почтовых услуг",
    freeSeats: "Свободные места", departureType: "Тип отправления", fixedDeparture: "Фиксированное время отправления",
    fixedDepartureDesc: "Отправление в указанное время независимо от наличия пассажиров",
    whenFills: "Когда места заполнятся", whenFillsDesc: "Отправление, как только все доступные места будут забронированы",
    price: "Цена", enterPrice: "Введите цену", postRide: "Опубликовать", submitted: "Отправлено!",
    selectOrigin: "Выберите место отправления", selectDestination: "Выберите пункт назначения", searchCity: "Поиск города или региона...",
    noLocations: "Регионы или города не найдены.", selectDepDate: "Выберите дату отправления",
    reviews: "отзывов", rides: "поездок", username: "Имя пользователя", gender: "Пол", memberSince: "На сайте с",
    contactVerification: "Контакт и верификация", phone: "Номер телефона", email: "Электронная почта", idVerification: "Подтверждение личности",
    verified: "Подтверждено", notVerified: "Не подтверждено", driverDetails: "Данные водителя", vehicle: "Автомобиль",
    licensePlate: "Гос. номер", drivingLicense: "Водительское удостоверение", activity: "Активность", rideHistory: "История поездок",
    upcomingRides: "Предстоящие поездки", settings: "Настройки", language: "Язык", notifications: "Настройки уведомлений",
    paymentMethods: "Способы оплаты", privacy: "Конфиденциальность", security: "Безопасность", changePassword: "Изменить пароль",
    logout: "Выйти", editProfile: "Редактировать профиль", fullName: "Полное имя", saveChanges: "Сохранить изменения",
    editVehicle: "Редактировать данные автомобиля", uzbek: "Узбекский", english: "Английский", russian: "Русский",
    pastRides: "Прошлые поездки", noCompletedRides: "Завершенных поездок нет.", noUpcomingRides: "Предстоящих поездок нет.",
    submitting: "Отправка...", noActiveRide: "Активных поездок нет.", passengers: "пассажиров", iTookAClient: "Я взял клиента",
    editRide: "Редактировать поездку", updateRide: "Обновить",
  },
};

// --- Language Context ---
const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

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
const Avatar = ({ initials, bgColor, size = 'w-10 h-10', src }) => (
    <div className={`relative rounded-full flex items-center justify-center text-white text-lg font-semibold ${bgColor} ${size}`} >
        {src ? <img src={src} alt="profile" className="rounded-full w-full h-full object-cover" /> : initials}
    </div>
);

// Message Dashboard component with Telegram-like UX
const MessageDashboard = ({ onClose }) => {
  const { t } = useLanguage();
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
    { id: "chats", label: t('chats'), icon: MessageCircle },
    { id: "groups", label: t('groups'), icon: Users },
    { id: "channels", label: t('channels'), icon: Hash },
    { id: "market", label: t('market'), icon: Store },
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
        <p className="text-neutral-500 text-center mt-10">{t('noMessages')}</p>
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
            placeholder={t('typeMessage')}
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
                placeholder={`${t('search')}...`}
                className="w-full bg-neutral-100 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E1F87E] text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="text-sm font-semibold text-gray-700 hover:text-gray-900">
              {t('cancel')}
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
  const { t } = useLanguage();
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
            <input type="text" placeholder={t('searchCity')} className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((regionData, regionIndex) => (
              <div key={`${regionData.region}-${regionIndex}`}>
                <h3 className="w-full text-left p-3 font-semibold text-gray-800 select-none">
                  {regionData.region}
                </h3>
                {regionData.cities.map((city, cityIndex) => (
                  <button key={`${regionData.region}-${city}-${cityIndex}`} onClick={() => { onSelect(city); handleClose(); }} className="w-full text-left pl-6 py-2 text-neutral-600 hover:bg-neutral-50 rounded-lg text-sm transition-colors" >
                    {city}
                  </button>
                ))}
              </div>
            ))
          ) : ( <p className="text-neutral-500 text-center mt-10">{t('noLocations')}</p> )}
        </div>
      </div>
    </div>
  );
};


// Main Post Ride Form Component
const PostRideForm = ({ onClose, onPostSuccess, onAddRide }) => {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [mailService, setMailService] = useState(""); // "yes", "no"
  const [freeSeats, setFreeSeats] = useState(null); // New state for free seats
  const [departureType, setDepartureType] = useState(""); // "fixed", "when_fills"
  const [departureTime, setDepartureTime] = useState(""); // Only for fixed departure
  const [price, setPrice] = useState("");
  const [submissionState, setSubmissionState] = useState('idle'); // 'idle', 'submitting', 'submitted'

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
      setSubmissionState('submitting');
      const newRideData = { fromLocation, toLocation, departureDate, mailService, freeSeats, departureType, departureTime, price, totalSeats: freeSeats };
      
      setTimeout(() => {
        onAddRide(newRideData); // Pass the data up to the parent component
        setSubmissionState('submitted');
        setTimeout(() => {
            onClose();
            if (onPostSuccess) onPostSuccess(); 
        }, 800);
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
            <h2 className="text-lg font-semibold text-gray-800">{t('selectDepDate')}</h2>
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
          <h2 className="text-lg font-semibold text-gray-800">{t('postNewRide')}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"> <X className="h-6 w-6" /> </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <div onClick={() => setShowFromModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${fromLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {fromLocation || t('fromWhere')}
              <MapPin className="h-5 w-5 text-neutral-500" />
            </div>
            <LocationSelectModal title={t('selectOrigin')} isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setFromLocation} />
          </div>
          <div>
            <div onClick={() => setShowToModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${toLocation ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {toLocation || t('toWhere')}
              <MapPin className="h-5 w-5 text-neutral-500" />
            </div>
            <LocationSelectModal title={t('selectDestination')} isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setToLocation} />
          </div>
          <div>
            <div onClick={() => setShowDateModal(true)} className={`w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between cursor-pointer border ${departureDate ? 'text-gray-800 font-semibold border-green-700' : 'text-neutral-600 border-transparent'}`} >
              {departureDate || t('departureDate')}
              <Calendar className="h-5 w-5 text-neutral-500" />
            </div>
            <DatePickerModal isOpen={showDateModal} onClose={() => setShowDateModal(false)} onSelectDate={setDepartureDate} />
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">{t('mailService')}</label>
            <div className="space-y-3">
              <button type="button" onClick={() => setMailService("yes")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "yes" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="text-left">
                  <p className="font-medium text-gray-800">{t('yesCarryMail')}</p>
                  <p className="text-sm text-neutral-600">{t('mailDescYes')}</p>
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
              <button type="button" onClick={() => setMailService("no")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${mailService === "no" ? "bg-green-600/30 border border-green-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="text-left">
                  <p className="font-medium text-gray-800">{t('noCarryMail')}</p>
                  <p className="text-sm text-neutral-600">{t('mailDescNo')}</p>
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-green-400" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">{t('freeSeats')}</label>
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
            <label className="block text-neutral-800 text-sm font-medium mb-2">{t('departureType')}</label>
            <div className="space-y-3">
              <button type="button" onClick={() => { setDepartureType("fixed"); }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "fixed" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-teal-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{t('fixedDeparture')}</p>
                    <p className="text-sm text-neutral-600">{t('fixedDepartureDesc')}</p>
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
                    <p className="font-medium text-gray-800">{t('whenFills')}</p>
                    <p className="text-sm text-neutral-600">{t('whenFillsDesc')}</p>
                  </div>
                </div>
                {departureType === "when_fills" && <CheckCircle className="h-6 w-6 text-teal-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-neutral-800 text-sm font-medium mb-2">{t('price')}</label>
            <div className="relative">
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder={t('enterPrice')} className="w-full p-3 pl-10 bg-neutral-100 rounded-xl text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" value={price} onChange={(e) => { const value = e.target.value; if (/^[0-9]*$/.test(value)) { setPrice(value); } }} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            </div>
          </div>
          <button type="submit" disabled={!isFormValid || submissionState !== 'idle'} className={`w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg 
            ${isFormValid && submissionState === 'idle' ? "bg-green-500 hover:bg-green-600 text-white" : 
            submissionState === 'submitting' ? "bg-yellow-500 text-white cursor-wait" : 
            submissionState === 'submitted' ? "bg-green-700 text-white" : 
            "bg-gray-600 text-gray-400 cursor-not-allowed"}`} >
            {submissionState === 'submitting' ? <><Loader2 className="h-6 w-6 mr-2 animate-spin" /> {t('submitting')}</> : 
             submissionState === 'submitted' ? <><CheckCircle className="h-6 w-6 mr-2" /> {t('submitted')}</> : 
             t('postRide')}
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

// --- Edit Profile Modal ---
const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('editProfile')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100"> <X className="h-6 w-6" /> </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('fullName')}</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('username')}</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('gender')}</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">{t('saveChanges')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Edit Car Modal ---
const EditCarModal = ({ car, isOpen, onClose, onSave }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState(car);

    useEffect(() => {
        setFormData(car);
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('editVehicle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100"> <X className="h-6 w-6" /> </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    <input type="text" name="plate" placeholder={t('licensePlate')} value={formData.plate} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">{t('saveChanges')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Generic Settings Modal ---
const SettingsModal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col h-auto max-h-[80vh]">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100"> <X className="h-6 w-6" /> </button>
                </div>
                <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
                    {children || <p className="text-neutral-500">Settings content goes here.</p>}
                </div>
            </div>
        </div>
    );
};


// --- Profile Page Component ---
const ProfilePage = ({ user, onUpdateUser, onUpdateCar, myRides }) => {
    const { t, language, setLanguage } = useLanguage();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showEditCar, setShowEditCar] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [settingsModalTitle, setSettingsModalTitle] = useState("");
    const [settingsModalContent, setSettingsModalContent] = useState(null);

    const handleOpenSettings = (title, content) => {
        setSettingsModalTitle(title);
        setSettingsModalContent(content);
        setShowSettingsModal(true);
    };

    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
                <Icon className="h-5 w-5 text-neutral-500 mr-3" />
                <span className="text-sm text-neutral-600">{label}</span>
            </div>
            <span className="text-sm font-medium text-gray-800">{value}</span>
        </div>
    );

    const SettingsItem = ({ icon: Icon, label, action = () => {}, value }) => (
        <button onClick={action} className="w-full flex items-center justify-between py-3 text-left hover:bg-neutral-50 rounded-lg px-2 transition-colors">
            <div className="flex items-center">
                <Icon className="h-5 w-5 text-neutral-500 mr-3" />
                <span className="text-sm font-medium text-gray-800">{label}</span>
            </div>
            <div className="flex items-center">
                {value && <span className="text-sm text-neutral-500 mr-2">{value}</span>}
                <ChevronRight className="h-5 w-5 text-neutral-400" />
            </div>
        </button>
    );

    const RideHistoryContent = () => (
        <div>
            <h3 className="font-semibold mb-2">{t('pastRides')}</h3>
            {myRides.filter(r => r.status === 'completed').length > 0 ? myRides.filter(r => r.status === 'completed').map(ride => (
                <div key={ride.id} className="mb-2 p-2 border-b">
                    <p>{ride.fromLocation} to {ride.toLocation}</p>
                    <p className="text-xs text-neutral-500">{ride.departureDate}</p>
                </div>
            )) : <p className="text-neutral-500">{t('noCompletedRides')}</p>}
        </div>
    );
    
    const UpcomingRidesContent = () => (
         <div>
            <h3 className="font-semibold mb-2">{t('upcomingRides')}</h3>
            {myRides.filter(r => r.status === 'upcoming').length > 0 ? myRides.filter(r => r.status === 'upcoming').map(ride => (
                <div key={ride.id} className="mb-2 p-2 border-b">
                    <p>{ride.fromLocation} to {ride.toLocation}</p>
                    <p className="text-xs text-neutral-500">{ride.departureDate}</p>
                </div>
            )) : <p className="text-neutral-500">{t('noUpcomingRides')}</p>}
        </div>
    );

    const LanguageSelectionContent = ({ currentLanguage, onSelectLanguage }) => {
        const languages = [
            { key: "uz", name: t('uzbek')}, 
            { key: "en", name: t('english')}, 
            { key: "ru", name: t('russian')}
        ];
        return (
            <div className="space-y-2">
                {languages.map(lang => (
                    <button
                        key={lang.key}
                        onClick={() => {
                            onSelectLanguage(lang.key);
                            setShowSettingsModal(false);
                        }}
                        className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center ${currentLanguage === lang.key ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-neutral-100'}`}
                    >
                        {lang.name}
                        {currentLanguage === lang.key && <CheckCircle className="h-5 w-5" />}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="p-4 space-y-6 text-gray-800 font-sans pb-20">
            <EditProfileModal user={user} isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} onSave={onUpdateUser} />
            <EditCarModal car={user.car} isOpen={showEditCar} onClose={() => setShowEditCar(false)} onSave={onUpdateCar} />
            <SettingsModal title={settingsModalTitle} isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)}>
                {settingsModalContent}
            </SettingsModal>

            {/* --- Profile Header --- */}
            <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                    <Avatar src={user.profilePicture} size="w-24 h-24" initials="JD" bgColor="bg-gray-700" />
                    <button onClick={() => setShowEditProfile(true)} className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-neutral-100 transition-colors">
                        <Edit2 className="h-4 w-4 text-gray-800" />
                    </button>
                </div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <div className="flex items-center space-x-4 text-sm text-neutral-600">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">{user.rating}</span> ({user.reviews} {t('reviews')})
                    </div>
                    <span>|</span>
                    <span>{user.completedRides} {t('rides')}</span>
                </div>
            </div>

            {/* --- Basic Info Card --- */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
                <InfoItem icon={User} label={t('username')} value={`@${user.username}`} />
                <InfoItem icon={Users} label={t('gender')} value={user.gender} />
                <InfoItem icon={Calendar} label={t('memberSince')} value={user.memberSince} />
            </div>

            {/* --- Contact & Verification Card --- */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
                <h3 className="text-sm font-semibold mb-2 text-neutral-800">{t('contactVerification')}</h3>
                <InfoItem icon={Phone} label={t('phone')} value={user.phone} />
                <InfoItem icon={Mail} label={t('email')} value={user.email} />
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-neutral-500 mr-3" />
                        <span className="text-sm text-neutral-600">{t('idVerification')}</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${user.idVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.idVerified ? t('verified') : t('notVerified')}
                    </span>
                </div>
            </div>
            
            {/* --- Driver Details Card --- */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-neutral-800">{t('driverDetails')}</h3>
                    <button onClick={() => setShowEditCar(true)} className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors">
                        <Edit2 className="h-4 w-4 text-gray-800" />
                    </button>
                </div>
                <InfoItem icon={Car} label={t('vehicle')} value={`${user.car.brand} ${user.car.model} (${user.car.year})`} />
                <InfoItem icon={FileText} label={t('licensePlate')} value={user.car.plate} />
                 <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-neutral-500 mr-3" />
                        <span className="text-sm text-neutral-600">{t('drivingLicense')}</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${user.licenseVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.licenseVerified ? t('verified') : t('notVerified')}
                    </span>
                </div>
            </div>

            {/* --- Activity & History --- */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-neutral-200">
                 <h3 className="text-sm font-semibold mb-1 text-neutral-800 px-2 pt-2">{t('activity')}</h3>
                 <SettingsItem icon={History} label={t('rideHistory')} action={() => handleOpenSettings(t('rideHistory'), <RideHistoryContent />)} />
                 <SettingsItem icon={Calendar} label={t('upcomingRides')} action={() => handleOpenSettings(t('upcomingRides'), <UpcomingRidesContent />)} />
            </div>


            {/* --- Settings & Preferences --- */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-neutral-200">
                <h3 className="text-sm font-semibold mb-1 text-neutral-800 px-2 pt-2">{t('settings')}</h3>
                <SettingsItem 
                    icon={Languages} 
                    label={t('language')} 
                    value={t(language)}
                    action={() => handleOpenSettings(t('language'), <LanguageSelectionContent currentLanguage={language} onSelectLanguage={setLanguage} />)} 
                />
                <SettingsItem icon={Bell} label={t('notifications')} action={() => handleOpenSettings(t('notifications'))} />
                <SettingsItem icon={CreditCard} label={t('paymentMethods')} action={() => handleOpenSettings(t('paymentMethods'))} />
                <SettingsItem icon={Shield} label={t('privacy')} action={() => handleOpenSettings(t('privacy'))} />
            </div>

            {/* --- Security --- */}
            <div className="bg-white p-2 rounded-2xl shadow-lg border border-neutral-200">
                <h3 className="text-sm font-semibold mb-1 text-neutral-800 px-2 pt-2">{t('security')}</h3>
                <SettingsItem icon={Lock} label={t('changePassword')} action={() => handleOpenSettings(t('changePassword'))} />
                <SettingsItem icon={LogOut} label={t('logout')} action={() => handleOpenSettings(t('logout'))} />
            </div>
        </div>
    );
};

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // 'en', 'uz', 'ru'

    const t = (key) => {
        return translations[language][key] || key;
    };

    const value = { language, setLanguage, t };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

const AppContent = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [headerTitle, setHeaderTitle] = useState(t('ride'));
  const [showPostRide, setShowPostRide] = useState(false);
  const [showEditRide, setShowEditRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [myRides, setMyRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [userData, setUserData] = useState({
        profilePicture: "https://placehold.co/100x100/E1F87E/121212?text=JD",
        fullName: "John Doe",
        username: "johndoe99",
        gender: "Male",
        dob: "1990-05-15",
        phone: "+998 90 123 45 67",
        email: "john.doe@example.com",
        idVerified: true,
        rating: 4.9,
        reviews: 124,
        memberSince: "2022-01-20",
        completedRides: 215,
        car: {
            brand: "Chevrolet",
            model: "Cobalt",
            year: 2023,
            color: "White",
            plate: "01 A 123 BC"
        },
        licenseVerified: true,
        preferences: {
            smoking: "No",
            music: "Pop, Rock"
        },
    });

  const handleUpdateUser = (updatedData) => {
    setUserData(prev => ({...prev, ...updatedData}));
  };

  const handleUpdateCar = (updatedCarData) => {
    setUserData(prev => ({...prev, car: updatedCarData}));
  };

  // Function to add a new ride to the state
  const handleAddRide = (newRide) => {
    const rideWithId = { ...newRide, id: Date.now(), status: "upcoming" };
    setMyRides(prevRides => [...prevRides, rideWithId]);
    setActiveRide(rideWithId);
  };
  
  const handleUpdateRide = (updatedRideData) => {
      setActiveRide(updatedRideData);
      setMyRides(prev => prev.map(ride => ride.id === updatedRideData.id ? updatedRideData : ride));
  };

  const handleSeatChange = (increment) => {
      setActiveRide(prev => {
          if (!prev) return null;
          const newSeats = prev.freeSeats + increment;
          if (newSeats < 0 || newSeats > prev.totalSeats) return prev;
          return {...prev, freeSeats: newSeats};
      });
  };

  const handleCancelRide = () => {
      setActiveRide(null);
  };

  const handleBack = () => {
    if (showPostRide) {
      setShowPostRide(false);
      setHeaderTitle(t('ride'));
    } else if (showMessages) {
      setShowMessages(false);
      setHeaderTitle(t('ride'));
    } else if (showEditRide) {
        setShowEditRide(false);
        setHeaderTitle(t('ride'));
    }
    else {
      setHeaderTitle(t('ride'));
      setActiveTab("dashboard");
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case "dashboard": setHeaderTitle(t('ride')); break;
      case "my-lines": setHeaderTitle(t('myLines')); break;
      case "profile": setHeaderTitle(t('profile')); break;
      default: setHeaderTitle("Driver");
    }
  }, [activeTab, language, t]);

  const bottomNavItems = [
    { id: "dashboard", label: t('ride'), icon: MapPin },
    { id: "my-lines", label: t('myLines'), icon: Navigation },
    { id: "profile", label: t('profile'), icon: User },
  ];

  const renderContent = () => {
    if (showMessages) { return <MessageDashboard onClose={() => { setShowMessages(false); setHeaderTitle(t('ride')); }} />; }
    if (showPostRide) { return <PostRideForm onClose={() => { setShowPostRide(false); setHeaderTitle(t('ride')); }} onPostSuccess={() => setHeaderTitle(t('ride'))} onAddRide={handleAddRide} />; }
    if (showEditRide && activeRide) { return <EditRideForm rideData={activeRide} onClose={() => setShowEditRide(false)} onUpdateRide={handleUpdateRide} />; }

    switch (activeTab) {
      case "dashboard": return (
          <div className="p-4 space-y-4 text-gray-800 font-sans">
            <div className="text-center py-4">
              <h2 className="text-sm text-neutral-600">{t('totalEarnings')}</h2>
              <p className="text-5xl font-extrabold mt-1 mb-4 text-gray-800">$0.00</p>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => { setShowPostRide(true); setHeaderTitle(t('newRide')); }} >
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <Plus className="h-7 w-7 text-gray-800" />
                  </div>
                  <span className="text-xs text-neutral-600">{t('newRide')}</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105">
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <BarChart className="h-7 w-7 text-[#E1F87E]" />
                  </div>
                  <span className="text-xs text-neutral-600">{t('stats')}</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105">
                  <div className="w-14 h-14 mb-1 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200 shadow-md">
                    <Shield className="h-7 w-7 text-[#E1F87E]" />
                  </div>
                  <span className="text-xs text-neutral-600">{t('safety')}</span>
                </div>
              </div>
            </div>
            <h3 className="flex items-center text-sm font-semibold mb-2 text-neutral-800">
              <Calendar className="h-4 w-4 mr-2 text-neutral-700" />
              {t('yourActivity')}
            </h3>
            <div onClick={() => activeRide && setShowEditRide(true)} className={`w-full p-4 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-lg text-left ${activeRide ? 'cursor-pointer' : 'cursor-default'}`}>
              {activeRide ? (
                <div className="flex justify-between items-start text-sm">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-green-600" /> {activeRide.fromLocation} </div>
                        <div className="flex items-center text-gray-800 font-medium"> <MapPin className="h-4 w-4 mr-2 text-red-600" /> {activeRide.toLocation} </div>
                        <div className="flex items-center text-neutral-600"> 
                            <Users className="h-4 w-4 mr-2" /> 
                            <button onClick={(e) => {e.stopPropagation(); handleSeatChange(1)}} disabled={activeRide.freeSeats === activeRide.totalSeats} className="mr-2 p-1 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"><MinusCircle size={16}/></button>
                            <span>{activeRide.totalSeats - activeRide.freeSeats}/{activeRide.totalSeats} {t('passengers')}</span>
                            <button onClick={(e) => {e.stopPropagation(); handleSeatChange(-1)}} disabled={activeRide.freeSeats === 0} className="ml-2 p-1 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"><PlusCircle size={16}/></button>
                        </div>
                        <div className="flex items-center text-neutral-600"> <Calendar className="h-4 w-4 mr-2" /> {activeRide.departureDate} {activeRide.departureTime && <><Clock className="h-4 w-4 mx-2" /> {activeRide.departureTime}</>}</div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <span className="bg-green-500/20 text-green-600 text-xs font-medium px-2 py-1 rounded-full"> {t('active')} </span>
                        <button onClick={(e) => {e.stopPropagation(); handleCancelRide()}} className="p-1 rounded-full hover:bg-neutral-100 transition-colors"> <XCircle className="h-5 w-5 text-red-500" /> </button>
                        <button onClick={(e) => {e.stopPropagation(); handleSeatChange(-1)}} disabled={activeRide.freeSeats === 0} className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed">
                            <UserPlus size={14} className="mr-1.5"/>
                            {t('iTookAClient')}
                        </button>
                    </div>
                </div>
              ) : (
                <p className="text-neutral-500 text-center py-4">{t('noActiveRide')}</p>
              )}
            </div>
          </div>
        );
      case "my-lines": return (
        <div className="p-4 text-gray-800 font-sans space-y-4">
            {myRides.filter(r => r.status === 'upcoming').length > 0 ? (
                myRides.filter(r => r.status === 'upcoming').map(ride => (
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
                                <span className="bg-green-500/20 text-green-600 text-xs font-medium px-2 py-1 rounded-full">{t('active')}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-xl font-bold">{t('noLines')}</h2>
                    <p className="text-neutral-600 mt-2">{t('postRidePrompt')}</p>
                </div>
            )}
        </div>
      );
      case "profile": return ( <ProfilePage user={{...userData, language}} onUpdateUser={handleUpdateUser} onUpdateCar={handleUpdateCar} myRides={myRides} /> );
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#F8F8F8] text-gray-800 flex flex-col font-sans">
      <CustomScrollbarStyles />
      <header className="bg-white p-3 border-b border-neutral-200 flex items-center justify-between z-20 shadow-lg relative">
        {(showPostRide || showMessages || activeTab !== "dashboard" || showEditRide) && (
          <button onClick={handleBack} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors" >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {!(showPostRide || showMessages || activeTab !== "dashboard" || showEditRide) && (
          <div className="w-8 h-8"></div> // Placeholder for alignment
        )}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800">{headerTitle}</h1>
         <button onClick={() => setShowMessages(true)} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors" >
          <MessageCircle className="h-8 w-8" />
        </button>
      </header>
      <main className="flex-grow overflow-y-auto custom-scrollbar h-full relative rounded-t-3xl overflow-hidden">
        {renderContent()}
      </main>
      {!showMessages && !showPostRide && !showEditRide && (
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

const App = () => (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
);

export default App;
