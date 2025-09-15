// Driver Dashboard - With Custom Scrollbar Styling
import React, { useState, useEffect, useRef, createContext, useContext } from "react";
// Note: In a real app, these would be properly imported from your project structure
// For this example, we'll assume they are available.
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Plus, User, MapPin, Calendar, Clock, Shield, Navigation, MessageCircle, Users,
  Hash, Store, Search, X, CheckCircle, ArrowLeft, Send, Loader2, XCircle, Fuel,
  Radar, LocateFixed, Car, Sparkles, Newspaper, TrendingUp, Mail, Phone, Settings,
  LogOut, Edit2, ChevronLeft, ChevronRight, Star, ShieldCheck, CreditCard, Bell,
  Languages, Lock, Trash2, History, FileText, MinusCircle, PlusCircle, UserPlus,
  UserRound, LifeBuoy
} from "lucide-react";

// --- Mock Supabase and Toast ---
// In a real environment, you'd use the actual libraries.
// These mocks are for demonstration purposes to make the code runnable.
const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
    insert: (data) => ({
        select: () => ({
            single: () => Promise.resolve({ data: {id: Date.now(), ...data}, error: null })
        })
    }),
  }),
};

const useToast = () => {
    return {
        toast: ({ title, description }) => {
            console.log(`Toast: ${title} - ${description}`);
            // A simple alert to simulate a toast notification for this example
            // In a real app, you'd use a proper toast component library.
            alert(`${title}\n${description}`);
        }
    };
};


// --- i18n Translations ---
const translations = {
  en: {
    ride: "Ride", newRide: "New Ride", myLines: "My Lines", profile: "Profile", history: "History",
    totalEarnings: "Total Earnings", stats: "Statistics", safety: "Safety", yourActivity: "Your Activity",
    noLines: "No Lines Posted Yet", postRidePrompt: "Post a new ride to see it here.", active: "Active",
    postNewRide: "Post a New Ride", fromWhere: "From where", toWhere: "To where", departureDate: "Departure date",
    mailService: "Mail Service", yesCarryMail: "Yes, I do carry Mail", mailDescYes: "I can transport both passengers and mail packages",
    noCarryMail: "No, I do not carry Mail", mailDescNo: "I only transport passengers, no mail service",
    freeSeats: "Free Seats", departureType: "Departure Type", fixedDeparture: "Fixed Departure Time",
    fixedDepartureDesc: "Leave between the selected times",
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
    submitting: "Submitting...", noActiveRide: "Your active ride will appear here", passengers: "passengers", iTookAClient: "I took a client",
    editRide: "Edit Ride", updateRide: "Update Ride",
    chats: "Chats", groups: "Groups", channels: "Channels", market: "Market", noMessages: "No messages here yet.",
    typeMessage: "Type a message...", cancel: "Cancel", letsGo: "Let's Go!", areYouSure: "Are you sure?", okay: "Okay",
    searchingForClients: "Searching for clients...", call: "Call", message: "Message", removePassenger: "Remove Passenger",
    dailyEarnings: "Daily Earnings", recentTrips: "Recent Trips",
    mailPriceLabel: "Mail Price", enterMailPrice: "Enter mail price",
    carType: "Car Type", selectCar: "Select Your Car",
    activeRideErrorTitle: "Cannot Post Ride",
    activeRideWarning: "You cannot post a new ride while you have an active ride.",
    finishRide: "Finish Ride",
    areYouSureFinish: "Are you sure you want to finish the ride?",
    yesFinish: "Yes, Finish",
    rideDetails: "Ride Details",
    from: "from",
    to: "to",
    confirmRidePost: "Confirm Ride",
    confirmPhone: "Is this your phone number?",
    yesPost: "Yes, post",
    noEdit: "No, edit",
  },
  uz: {
    ride: "Yo'lga chiqish", newRide: "Yangi e'lon", myLines: "Mening yo'nalishlarim", profile: "Profil", history: "Tarix",
    totalEarnings: "Jami daromad", stats: "Statistika", safety: "Xavfsizlik", yourActivity: "Sizning faoliyatingiz",
    noLines: "Hali e'lonlar joylanmagan", postRidePrompt: "Bu yerda ko'rish uchun yangi e'lon joylashtiring.", active: "Faol",
    postNewRide: "Yangi e'lon joylash", fromWhere: "Qayerdan", toWhere: "Qayerga", departureDate: "Jo'nash sanasi",
    mailService: "Pochta xizmati", yesCarryMail: "Ha, pochta olaman", mailDescYes: "Yo'lovchilar va pochta jo'natmalarini tashiyman",
    noCarryMail: "Yo'q, pochta olmayman", mailDescNo: "Faqat yo'lovchilarni tashiyman, pochta xizmati yo'q",
    freeSeats: "Bo'sh o'rindiqlar", departureType: "Jo'nash turi", fixedDeparture: "Belgilangan vaqtda jo'nash",
    fixedDepartureDesc: "Tanlangan vaqtlar oralig'ida jo'nang",
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
    submitting: "Yuborilmoqda...", noActiveRide: "Sizning faol sayohatingiz shu yerda paydo bo'ladi", passengers: "yo'lovchilar", iTookAClient: "Mijoz oldim",
    editRide: "Sayohatni tahrirlash", updateRide: "Yangilash",
    chats: "Suhbatlar", groups: "Guruhlar", channels: "Kanallar", market: "Bozor", noMessages: "Bu yerda hali xabarlar yo'q.",
    typeMessage: "Xabar yozing...", cancel: "Bekor qilish", letsGo: "Ketdik!", areYouSure: "Ishonchingiz komilmi?", okay: "Ha",
    searchingForClients: "Mijozlar qidirilmoqda...", call: "Qo'ng'iroq", message: "Xabar", removePassenger: "Yo'lovchini o'chirish",
    dailyEarnings: "Kunlik daromad", recentTrips: "Oxirgi sayohatlar",
    mailPriceLabel: "Pochta Narxi", enterMailPrice: "Pochta narxini kiriting",
    carType: "Avtomobil turi", selectCar: "Avtomobilingizni tanlang",
    activeRideErrorTitle: "E'lon joylab bo'lmaydi",
    activeRideWarning: "Faol sayohatingiz borligida yangi e'lon joylay olmaysiz.",
    finishRide: "Sayohatni yakunlash",
    areYouSureFinish: "Sayohatni yakunlashga ishonchingiz komilmi?",
    yesFinish: "Ha, yakunlash",
    rideDetails: "Sayohat tafsilotlari",
    from: "-dan",
    to: "-gacha",
    confirmRidePost: "Sayohni Tasdiqlang",
    confirmPhone: "Bu sizning telefon raqamingizmi?",
    yesPost: "Ha, joylash",
    noEdit: "Yo'q, tahrirlash",
  },
  ru: {
    ride: "Поездка", newRide: "Новая поездка", myLines: "Мои поездки", profile: "Профиль", history: "История",
    totalEarnings: "Общий заработок", stats: "Статистика", safety: "Безопасность", yourActivity: "Ваша активность",
    noLines: "Поездки еще не опубликованы", postRidePrompt: "Опубликуйте новую поездку, чтобы увидеть ее здесь.", active: "Активна",
    postNewRide: "Опубликовать новую поездку", fromWhere: "Откуда", toWhere: "Куда", departureDate: "Дата отправления",
    mailService: "Почтовая служба", yesCarryMail: "Да, перевожу посылки", mailDescYes: "Могу перевозить как пассажиров, так и посылки",
    noCarryMail: "Нет, не перевожу посылки", mailDescNo: "Перевожу только пассажиров, без почтовых услуг",
    freeSeats: "Свободные места", departureType: "Тип отправления", fixedDeparture: "Фиксированное время отправления",
    fixedDepartureDesc: "Отправление между выбранными временами",
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
    submitting: "Отправка...", noActiveRide: "Ваша активная поездка появится здесь", passengers: "пассажиров", iTookAClient: "Я взял клиента",
    editRide: "Редактировать поездку", updateRide: "Обновить",
    chats: "Чаты", groups: "Группы", channels: "Каналы", market: "Маркет", noMessages: "Здесь пока нет сообщений.",
    typeMessage: "Введите сообщение...", cancel: "Отмена", letsGo: "Поехали!", areYouSure: "Вы уверены?", okay: "Да",
    searchingForClients: "Поиск клиентов...", call: "Позвонить", message: "Написать", removePassenger: "Удалить пассажира",
    dailyEarnings: "Дневной заработок", recentTrips: "Последние поездки",
    mailPriceLabel: "Цена за посылку", enterMailPrice: "Введите цену за посылку",
    carType: "Тип автомобиля", selectCar: "Выберите ваш автомобиль",
    activeRideErrorTitle: "Невозможно Опубликовать Поездку",
    activeRideWarning: "Вы не можете опубликовать новую поездку, пока у вас есть активная.",
    finishRide: "Завершить поездку",
    areYouSureFinish: "Вы уверены, что хотите завершить поездку?",
    yesFinish: "Да, завершить",
    rideDetails: "Детали поездки",
    from: "с",
    to: "до",
    confirmRidePost: "Подтвердить поездку",
    confirmPhone: "Это ваш номер телефона?",
    yesPost: "Да, опубликовать",
    noEdit: "Нет, изменить",
  },
};

// --- Language Context ---
const LanguageContext = createContext({ t: (key) => key, language: 'en', setLanguage: (lang) => {} });
const useLanguage = () => useContext(LanguageContext);

// --- Custom Scrollbar Styles Component ---
const CustomScrollbarStyles = () => (
  <style>{`
    /* For Webkit-based browsers (Chrome, Safari, Edge) */
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 2px solid #F8F8F800; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
    .animate-spin-slow { animation: spin 2s linear infinite; }
    /* Hide the default Leaflet routing instructions panel */
    .leaflet-routing-container { display: none !important; }

    /* Radar Animation */
    .radar-emitter {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .radar-emitter .radar-wave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(34, 197, 94, 0.5);
        animation: radar-wave-animation 2s infinite;
        opacity: 0;
    }
    .radar-emitter .radar-wave:nth-child(2) {
        animation-delay: 1s;
    }

    .radar-emitter-small {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
     .radar-emitter-small .radar-wave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(34, 197, 94, 0.5);
        animation: radar-wave-animation 2s infinite;
        opacity: 0;
    }
    .radar-emitter-small .radar-wave:nth-child(2) {
        animation-delay: 1s;
    }

    @keyframes radar-wave-animation {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
  `}</style>
);


// Helper component for a simple avatar
const Avatar = ({ initials, bgColor, size = 'w-10 h-10', src = null }) => (
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
      { id: 1, name: "Jane Doe", lastMessage: "Hey, are you available for a ride?", time: "10:30 AM", avatar: <Avatar initials="JD" bgColor="bg-purple-500" src={null} /> },
      { id: 2, name: "Mike Smith", lastMessage: "Thanks for the ride last week!", time: "Yesterday", avatar: <Avatar initials="MS" bgColor="bg-blue-500" src={null} /> },
    ],
    groups: [ { id: 101, name: "Drivers Community", lastMessage: "New update on city regulations.", time: "1 hr ago", avatar: <Avatar initials="DC" bgColor="bg-yellow-500" src={null} /> } ],
    channels: [ { id: 201, name: "Ride Alerts Official", lastMessage: "High demand in downtown area!", time: "15 min ago", avatar: <Avatar initials="RA" bgColor="bg-red-500" src={null} /> } ],
    market: [ { id: 301, name: "Special Offers", lastMessage: "Discount on car maintenance this week.", time: "2 days ago", avatar: <Avatar initials="SO" bgColor="bg-indigo-500" src={null} /> } ],
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
              className="w-full flex items-center p-3 hover:bg-neutral-100/50 cursor-pointer transition-colors text-left"
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
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.sender === 'me' ? 'bg-[#E1F87E] text-[#121212]' : 'bg-white/80 backdrop-blur-sm text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-3 border-t border-neutral-200/50 bg-white/80 backdrop-blur-sm flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('typeMessage')}
            className="flex-1 p-2 rounded-lg bg-neutral-100/50 text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]"
          />
          <button type="submit" className="p-2 rounded-lg bg-[#E1F87E] text-[#121212] hover:bg-opacity-80">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
      <div className="bg-white/80 backdrop-blur-sm p-3 border-b border-neutral-200/50 flex items-center justify-between gap-2">
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
                className="w-full bg-neutral-100/50 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E1F87E] text-gray-800"
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
            <a href="https://t.me/nevalela" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100/50 hover:text-gray-900 transition-colors">
                <LifeBuoy className="h-6 w-6" />
            </a>
            <h2 className="text-lg font-semibold text-gray-800 flex-1 text-center">Chats</h2>
            <button onClick={() => setIsSearching(true)} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100/50 hover:text-gray-900 transition-colors">
                <Search className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {!selectedChat && (
        <div className="flex justify-around bg-white/80 backdrop-blur-sm p-2 border-b border-neutral-200/50">
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

const uzbekistanCars = [
    'Chevrolet Cobalt', 'Chevrolet Lacetti', 'Chevrolet Nexia 3', 'Chevrolet Spark', 
    'Chevrolet Damas', 'Daewoo Matiz', 'Daewoo Nexia', 'Hyundai Elantra', 'Kia K5',
    'Lada Vesta', 'BYD Song Plus', 'Chery Tiggo 7 Pro'
];

// Car Type Selection Modal
const CarTypeModal = ({ isOpen, onClose, onSelectCar, currentCar }) => {
    const { t } = useLanguage();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-auto max-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('selectCar')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {uzbekistanCars.map((car, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onSelectCar(car);
                                onClose();
                            }}
                            className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center ${
                                currentCar === car ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-neutral-100/50'
                            }`}
                        >
                            {car}
                            {currentCar === car && <CheckCircle className="h-5 w-5" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


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
const PostRideForm = ({ onClose, onPostSuccess, onConfirmPost, initialValues, isEditing }) => {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState(initialValues?.fromLocation || "");
  const [toLocation, setToLocation] = useState(initialValues?.toLocation || "");
  const [departureDate, setDepartureDate] = useState(initialValues?.departureDate || "");
  const [mailService, setMailService] = useState(initialValues?.mailService || "");
  const [freeSeats, setFreeSeats] = useState(initialValues?.freeSeats || null);
  const [departureType, setDepartureType] = useState(initialValues?.departureType || "");
  const [departureStartTime, setDepartureStartTime] = useState(initialValues?.departureStartTime || "");
  const [departureEndTime, setDepartureEndTime] = useState(initialValues?.departureEndTime || "");
  const [price, setPrice] = useState(initialValues?.price || "");
  const [mailPrice, setMailPrice] = useState(initialValues?.mailPrice || "");
  const [submissionState, setSubmissionState] = useState('idle');

  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const isFormValid =
    fromLocation &&
    toLocation &&
    departureDate &&
    mailService &&
    freeSeats !== null &&
    departureType &&
    price &&
    (departureType !== "fixed" || (departureStartTime && departureEndTime)) &&
    (mailService !== "yes" || mailPrice);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newRideData = { ...initialValues, fromLocation, toLocation, departureDate, mailService, freeSeats, totalSeats: 4, departureType, departureStartTime, departureEndTime, price, mailPrice };
      onConfirmPost(newRideData);
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
              {Array.from({ length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() }).map((_, i) => ( <div key={`pad-${i}`} className="p-2"></div> ))}
              {dates.map(day => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                date.setHours(0, 0, 0, 0);
                const isToday = day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
                const isPast = date < today;
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
          <h2 className="text-lg font-semibold text-gray-800">{isEditing ? t('editRide') : t('postNewRide')}</h2>
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
              {mailService === "yes" && (
                <div className="mt-3">
                    <label className="block text-neutral-800 text-sm font-medium mb-2">{t('mailPriceLabel')}</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            inputMode="numeric" 
                            pattern="[0-9]*" 
                            placeholder={t('enterMailPrice')} 
                            className="w-full p-3 pl-10 bg-neutral-100 rounded-xl text-gray-800 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" 
                            value={mailPrice} 
                            onChange={(e) => { const value = e.target.value; if (/^[0-9]*$/.test(value)) { setMailPrice(value); } }} 
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    </div>
                </div>
              )}
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
                <div className="w-full p-3 bg-neutral-100 rounded-xl flex items-center justify-between border border-neutral-200 mt-2 gap-2">
                    <span className="text-sm text-neutral-500">{t('from')}</span>
                    <input type="time" value={departureStartTime} onChange={(e) => setDepartureStartTime(e.target.value)} className="bg-transparent text-gray-800 placeholder-neutral-500 focus:outline-none text-center" />
                    <span className="text-sm text-neutral-500">{t('to')}</span>
                    <input type="time" value={departureEndTime} onChange={(e) => setDepartureEndTime(e.target.value)} className="bg-transparent text-gray-800 placeholder-neutral-500 focus:outline-none text-center" />
                    <Clock className="h-5 w-5 text-neutral-500 ml-2" />
                </div>
              )}
              <button type="button" onClick={() => { setDepartureType("when_fills"); setDepartureStartTime(""); setDepartureEndTime("") }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors shadow ${departureType === "when_fills" ? "bg-teal-600/30 border border-teal-400" : "bg-neutral-100 hover:bg-neutral-200 border border-transparent"}`} >
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
          <button type="submit" disabled={!isFormValid} className={`w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg 
            ${isFormValid ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`} >
             {isEditing ? t('updateRide') : t('postRide')}
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

// --- Ride Detail Modal ---
const RideDetailModal = ({ ride, isOpen, onClose }) => {
    const { t } = useLanguage();
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const handlePassengerClick = (passenger, e) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      setPopoverPosition({
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + window.scrollX,
      });
      setSelectedPassenger(passenger);
    };


    if (!isOpen || !ride) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans" onClick={() => setSelectedPassenger(null)}>
            {selectedPassenger && (
              <div 
                  className="fixed bg-white rounded-xl shadow-2xl z-[51] p-2 space-y-1"
                  style={{ top: popoverPosition.top, left: popoverPosition.left }}
              >
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg"><Phone className="h-4 w-4 mr-2"/>{t('call')}</button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg"><Send className="h-4 w-4 mr-2"/>{t('message')}</button>
              </div>
            )}
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('rideDetails')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-neutral-800 hover:bg-neutral-100">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
                    {/* Ride Details */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center text-lg font-bold text-gray-800"><MapPin className="h-5 w-5 mr-2 text-green-600" />{ride.fromLocation}</div>
                            <div className="flex items-center text-lg font-bold text-gray-800 mt-1"><MapPin className="h-5 w-5 mr-2 text-red-600" />{ride.toLocation}</div>
                        </div>
                        <span className="text-3xl font-bold text-gray-800">${ride.price}</span>
                    </div>
                    <div className="border-t border-neutral-200/50"></div>
                    <div className="flex justify-between items-center text-sm text-neutral-600">
                        <div className="flex items-center"><Calendar className="h-5 w-5 mr-2" /><span>{ride.departureDate}</span></div>
                        {ride.departureStartTime && (
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>
                                    {ride.departureStartTime}
                                    {ride.departureEndTime && ` - ${ride.departureEndTime}`}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-sm text-neutral-600">
                        <div className="flex items-center"><Mail className="h-5 w-5 mr-2" /><span>{ride.mailService === 'yes' ? t('yesCarryMail') : t('noCarryMail')}</span></div>
                        <div className="flex items-center">{ride.departureType === 'fixed' ? <Clock className="h-5 w-5 mr-2" /> : <Users className="h-5 w-5 mr-2" />}<span>{ride.departureType === 'fixed' ? t('fixedDeparture') : t('whenFills')}</span></div>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600"><div className="flex items-center"><Car className="h-5 w-5 mr-2" /><span>{ride.carType}</span></div></div>
                    
                    {/* Passengers List */}
                    <div className="border-t border-neutral-200/50"></div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">{t('passengers')}</h3>
                        <div className="space-y-2">
                            {ride.passengers && ride.passengers.length > 0 ? (
                                ride.passengers.map(p => (
                                    <button key={p.id} onClick={(e) => handlePassengerClick(p, e)} className="w-full flex items-center p-2 bg-neutral-100/50 rounded-lg text-left hover:bg-neutral-200/50 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${p.gender === 'male' ? 'bg-blue-200' : 'bg-green-200'}`}>
                                            {p.gender === 'male' ? <User className="h-5 w-5 text-blue-800" /> : <UserRound className="h-5 w-5 text-green-800" />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{p.name}</span>
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-500">No passengers on this ride.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
                        <label className="block text-sm font-medium text-neutral-700 mb-1">{t('phone')}</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-neutral-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E1F87E]" />
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

const HistoryPage = ({ rides, onRideClick }) => {
    const { t } = useLanguage();
    const completedRides = rides.filter(r => r.status === 'completed');

    if (completedRides.length === 0) {
        return (
            <div className="p-4 text-center">
                <div className="mt-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow">
                    <History className="h-12 w-12 mx-auto text-neutral-400" />
                    <p className="text-gray-600 mt-4 mb-2">{t('noCompletedRides')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4 pb-20">
            {completedRides.map(ride => (
                <button key={ride.id} onClick={() => onRideClick(ride)} className="w-full text-left p-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">{ride.fromLocation} → {ride.toLocation}</p>
                            <p className="text-sm text-neutral-500 mt-1">{ride.departureDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-green-600">+${ride.price}</p>
                            <p className="text-xs text-neutral-500">Completed</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

// --- Profile Page Component ---
const ProfilePage = ({ user, onUpdateUser, onUpdateCar, myRides, openOnMount, onMountHandled }) => {
    const { t, language, setLanguage } = useLanguage();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showEditCar, setShowEditCar] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [settingsModalTitle, setSettingsModalTitle] = useState("");
    const [settingsModalContent, setSettingsModalContent] = useState(null);

    useEffect(() => {
        if (openOnMount) {
            setShowEditProfile(true);
            onMountHandled();
        }
    }, [openOnMount, onMountHandled]);

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
        <button onClick={action} className="w-full flex items-center justify-between py-3 text-left hover:bg-neutral-50/50 rounded-lg px-2 transition-colors">
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
    
    const UpcomingRidesContent = () => (
        <div>
            <h3 className="font-semibold mb-2">{t('upcomingRides')}</h3>
            {myRides.filter(r => r.status === 'upcoming').length > 0 ? myRides.filter(r => r.status === 'upcoming').map(ride => (
                <div key={ride.id} className="mb-2 p-2 border-b border-neutral-200/50">
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
                        className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center ${currentLanguage === lang.key ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-neutral-100/50'}`}
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
                    <button onClick={() => setShowEditProfile(true)} className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-neutral-100/50 transition-colors">
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
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                <InfoItem icon={User} label={t('username')} value={`@${user.username}`} />
                <InfoItem icon={Phone} label={t('phone')} value={user.phone} />
            </div>
            
            {/* --- Driver Details Card --- */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-neutral-800">{t('driverDetails')}</h3>
                    <button onClick={() => setShowEditCar(true)} className="p-1.5 rounded-full hover:bg-neutral-100/50 transition-colors">
                        <Edit2 className="h-4 w-4 text-gray-800" />
                    </button>
                </div>
                <InfoItem icon={Car} label={t('vehicle')} value={`${user.car.brand} ${user.car.model} (${user.car.year})`} />
            </div>

            {/* --- Activity & History --- */}
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
                 <h3 className="text-sm font-semibold mb-1 text-neutral-800 px-2 pt-2">{t('activity')}</h3>
                 <SettingsItem icon={Calendar} label={t('upcomingRides')} value="" action={() => handleOpenSettings(t('upcomingRides'), <UpcomingRidesContent />)} />
            </div>


            {/* --- Settings & Preferences --- */}
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-sm font-semibold mb-1 text-neutral-800 px-2 pt-2">{t('settings')}</h3>
                <SettingsItem 
                    icon={Languages} 
                    label={t('language')} 
                    value={t(language === 'en' ? 'english' : language === 'uz' ? 'uzbek' : 'russian')}
                    action={() => handleOpenSettings(t('language'), <LanguageSelectionContent currentLanguage={language} onSelectLanguage={setLanguage} />)} 
                />
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showCarTypeModal, setShowCarTypeModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState("Chevrolet Cobalt");
  const [isSearchingForClients, setIsSearchingForClients] = useState(false);
  const [myRides, setMyRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  
  // New state variables for ride flow
  const [isRideInProgress, setIsRideInProgress] = useState(false);
  const [showActiveRideErrorModal, setShowActiveRideErrorModal] = useState(false);
  const [showFinishRideModal, setShowFinishRideModal] = useState(false);
  const [showHistoryDetailModal, setShowHistoryDetailModal] = useState(false);
  const [selectedHistoryRide, setSelectedHistoryRide] = useState(null);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [showPostConfirmationModal, setShowPostConfirmationModal] = useState(false);
  const [rideDataToPost, setRideDataToPost] = useState(null);

  useEffect(() => {
    const fetchMyRides = async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('username')) return;
      
      const username = localStorage.getItem('username');
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('username', username)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my rides:', error);
      } else {
        setMyRides(data || []);
      }
    };

    fetchMyRides();
  }, []);

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

  const handleNewRideClick = () => {
    if (activeRide) {
      setShowActiveRideErrorModal(true);
    } else {
      setShowPostRide(true);
      setHeaderTitle(t('newRide'));
    }
  };

  const handleConfirmPost = (newRideData) => {
    setRideDataToPost(newRideData);
    setShowPostRide(false);
    setShowPostConfirmationModal(true);
  }

  const handleAddRide = async () => {
    if (!rideDataToPost) return;
    try {
      const { data: insertedRide, error } = await supabase
        .from('rides')
        .insert({
          username: localStorage.getItem('username') || 'driver',
          departure_location: rideDataToPost.fromLocation,
          destination_location: rideDataToPost.toLocation,
          departure_date: rideDataToPost.departureDate,
          departure_start_time: rideDataToPost.departureStartTime,
          departure_end_time: rideDataToPost.departureEndTime,
          departure_type: rideDataToPost.departureType === 'fixed' ? 'time' : rideDataToPost.departureType === 'when_fills' ? 'sitToGo' : rideDataToPost.departureType,
          mail_option: rideDataToPost.mailService,
          ride_price: parseFloat(rideDataToPost.price) || 0,
          mail_price: rideDataToPost.mailService === 'yes' ? parseFloat(rideDataToPost.mailPrice) || 0 : 0,
          available_seats: parseInt(rideDataToPost.freeSeats) || 4,
          total_seats: 4,
          status: 'upcoming', // Rides start as upcoming
          car_type: selectedCar
        })
        .select()
        .single();

      if (error) { throw error; }

      const bookedSeatsCount = 4 - rideDataToPost.freeSeats;
      const mockPassengers = Array.from({ length: bookedSeatsCount }, (_, i) => ({
          id: i + 1, name: `Passenger ${i + 1}`, gender: i % 2 === 0 ? "female" : "male",
      }));
      const rideWithId = { ...rideDataToPost, id: insertedRide.id, status: "upcoming", passengers: mockPassengers, carType: selectedCar };
      
      setMyRides(prev => [rideWithId, ...prev]);
      
      setShowPostConfirmationModal(false);
      setRideDataToPost(null);
      
      setIsSearchingForClients(true);
      setTimeout(() => {
          setActiveRide(rideWithId);
          setIsSearchingForClients(false);
      }, 3000);
    } catch (error) {
      console.error('Error in handleAddRide:', error);
    }
  };
 
  const handleUpdateRide = (updatedRideData) => {
      setActiveRide(updatedRideData);
      setMyRides(prev => prev.map(ride => ride.id === updatedRideData.id ? updatedRideData : ride));
  };

  const handleRemovePassenger = (passengerId) => {
      setActiveRide(prev => {
          if (!prev) return null;
          const updatedPassengers = prev.passengers.filter(p => p.id !== passengerId);
          return {...prev, passengers: updatedPassengers, freeSeats: prev.freeSeats + 1};
      });
      setSelectedPassenger(null);
  };

  const handleStartRide = () => {
      console.log("Ride started!");
      setShowConfirmationModal(false);
      setIsRideInProgress(true);
  };
  
  const handleFinishRideClick = () => {
    setShowFinishRideModal(true);
  };
  
  const confirmFinishRide = () => {
    console.log("Ride Finished!");
    setMyRides(prevRides =>
        prevRides.map(ride =>
            ride.id === activeRide.id ? { ...ride, status: 'completed' } : ride
        )
    );
    setActiveRide(null);
    setIsRideInProgress(false);
    setShowFinishRideModal(false);
  };

  const handleHistoryRideClick = (ride) => {
    setSelectedHistoryRide(ride);
    setShowHistoryDetailModal(true);
  };
  
  const handleEditProfileClick = () => {
    setActiveTab('profile');
    setOpenProfileEdit(true);
  };

  const handleBack = () => {
    if (showPostRide) { setShowPostRide(false); }
    else if (showMessages) { setShowMessages(false); } 
    else if (showEditRide) { setShowEditRide(false); }
    else if (showStatsModal) { setShowStatsModal(false); }
    else { setActiveTab("dashboard"); }
    setHeaderTitle(t('ride'));
  };

  useEffect(() => {
    switch (activeTab) {
      case "dashboard": setHeaderTitle(t('ride')); break;
      case "history": setHeaderTitle(t('history')); break;
      case "profile": setHeaderTitle(t('profile')); break;
      default: setHeaderTitle("Driver");
    }
     if (showStatsModal) { setHeaderTitle(t('stats')); }
  }, [activeTab, language, t, showStatsModal]);

  const bottomNavItems = [
    { id: "dashboard", label: t('ride'), icon: MapPin },
    { id: "history", label: t('history'), icon: History },
  ];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRide, setEditingRide] = useState(null);

  const handleEditRideClick = (ride) => {
    setEditingRide(ride);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedRide = (updatedRide) => {
    const bookedSeatsCount = 4 - updatedRide.freeSeats;
    const mockPassengers = Array.from({ length: bookedSeatsCount }, (_, i) => ({
        id: i + 1, name: `Passenger ${i + 1}`, gender: i % 2 === 0 ? "female" : "male",
    }));
    const finalUpdatedRide = { ...updatedRide, passengers: mockPassengers, };
    setMyRides(prev => prev.map(r => r.id === finalUpdatedRide.id ? finalUpdatedRide : r));
    if (activeRide && activeRide.id === finalUpdatedRide.id) { setActiveRide(finalUpdatedRide); }
    setIsEditModalOpen(false);
    setEditingRide(null);
  };
  
  const handlePassengerClick = (passenger, e) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      setPopoverPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX, });
      setSelectedPassenger(passenger);
  };

  const renderActiveRideContent = () => {
      if (isSearchingForClients) {
          return (
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                  <div className="radar-emitter"><div className="radar-wave"></div><div className="radar-wave"></div></div>
                  <p className="text-green-600 font-semibold animate-pulse">{t('searchingForClients')}</p>
              </div>
          );
      }
      if (activeRide) {
          return (
              <>
                  <div className="p-4">
                      {/* Ride Details */}
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="flex items-center text-lg font-bold text-gray-800"><MapPin className="h-5 w-5 mr-2 text-green-600" />{activeRide.fromLocation}</div>
                              <div className="flex items-center text-lg font-bold text-gray-800 mt-1"><MapPin className="h-5 w-5 mr-2 text-red-600" />{activeRide.toLocation}</div>
                          </div>
                          <span className="text-3xl font-bold text-gray-800">${activeRide.price}</span>
                      </div>
                      <div className="border-t border-neutral-200/50 my-4"></div>
                      <div className="flex justify-between items-center text-sm text-neutral-600">
                          <div className="flex items-center"><Calendar className="h-5 w-5 mr-2" /><span>{activeRide.departureDate}</span></div>
                          {activeRide.departureStartTime && (
                              <div className="flex items-center">
                                  <Clock className="h-5 w-5 mr-2" />
                                  <span>
                                      {activeRide.departureStartTime}
                                      {activeRide.departureEndTime && ` - ${activeRide.departureEndTime}`}
                                  </span>
                              </div>
                          )}
                      </div>
                      <div className="flex justify-between items-center text-sm text-neutral-600 mt-2">
                          <div className="flex items-center"><Mail className="h-5 w-5 mr-2" /><span>{activeRide.mailService === 'yes' ? t('yesCarryMail') : t('noCarryMail')}</span></div>
                          <div className="flex items-center">{activeRide.departureType === 'fixed' ? <Clock className="h-5 w-5 mr-2" /> : <Users className="h-5 w-5 mr-2" />}<span>{activeRide.departureType === 'fixed' ? t('fixedDeparture') : t('whenFills')}</span></div>
                      </div>
                      <div className="flex items-center text-sm text-neutral-600 mt-2"><div className="flex items-center"><Car className="h-5 w-5 mr-2" /><span>{activeRide.carType}</span></div></div>
                      <div className="border-t border-neutral-200/50 my-4"></div>
                      {/* Passengers Section */}
                      <div>
                          <p className="text-sm font-medium text-neutral-800 mb-2">{t('passengers')}</p>
                          <div className="flex space-x-2">
                              {activeRide.passengers.map((p) => (<div key={p.id} onClick={(e) => handlePassengerClick(p, e)} className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${p.gender === 'male' ? 'bg-blue-200' : 'bg-green-200'}`}>{p.gender === 'male' ? <User className="h-6 w-6 text-blue-800" /> : <UserRound className="h-6 w-6 text-green-800" />}</div>))}
                              {Array.from({ length: activeRide.freeSeats }).map((_, index) => (
                                <div key={index} className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100/50 relative">
                                  {isRideInProgress ? (
                                    <User className="h-6 w-6 text-green-300" />
                                  ) : (
                                    <div className="radar-emitter-small"><div className="radar-wave"></div><div className="radar-wave"></div></div>
                                  )}
                                </div>
                              ))}
                          </div>
                      </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="border-t border-neutral-200/50 p-4 flex gap-2">
                      {isRideInProgress ? (
                         <button onClick={handleFinishRideClick} className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            {t('finishRide')}
                         </button>
                      ) : (
                        <>
                          <button onClick={() => handleEditRideClick(activeRide)} className="w-full py-2 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-xl hover:bg-neutral-300 transition-colors flex items-center justify-center"><Edit2 className="h-5 w-5 mr-2" />{t('editRide')}</button>
                          <button onClick={() => setShowConfirmationModal(true)} className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center"><Navigation className="h-5 w-5 mr-2" />{t('letsGo')}</button>
                        </>
                      )}
                  </div>
              </>
          );
      }
      return <p className="text-neutral-500 text-center py-8">{t('noActiveRide')}</p>;
  };

  const renderContent = () => {
    if (showMessages) { return <MessageDashboard onClose={() => { setShowMessages(false); setHeaderTitle(t('ride')); }} />; }
    if (showStatsModal) { return <StatsModal onClose={() => setShowStatsModal(false)} />; }

    switch (activeTab) {
      case "dashboard": return (
        <div className="p-4 space-y-4 text-gray-800 font-sans">
          <div className="grid grid-cols-3 gap-4">
              <div onClick={() => setShowStatsModal(true)} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 text-center flex flex-col justify-center cursor-pointer">
                  <h2 className="text-sm text-neutral-600">{t('totalEarnings')}</h2>
                  <p className="text-2xl font-extrabold text-gray-800 mt-2">$0.00</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105" onClick={handleNewRideClick}>
                  <div className="w-12 h-12 bg-neutral-100/50 rounded-full flex items-center justify-center border-2 border-neutral-200/50 shadow-md"><Plus className="h-6 w-6 text-gray-800" /></div>
                  <span className="text-xs text-neutral-600 mt-2">{t('newRide')}</span>
              </div>
              <div onClick={() => setShowCarTypeModal(true)} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 text-center flex flex-col items-center justify-center cursor-pointer">
                  <Car className="h-6 w-6 text-gray-800" />
                  <h2 className="text-sm text-neutral-600 mt-2">{t('carType')}</h2>
                  <p className="text-xs font-semibold text-gray-800 truncate">{selectedCar}</p>
              </div>
          </div>
          <div>
              <h3 className="flex items-center text-sm font-semibold mb-2 text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"><Calendar className="h-4 w-4 mr-2" />{t('yourActivity')}</h3>
              <div className={`w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg text-left overflow-hidden`}>{renderActiveRideContent()}</div>
          </div>
        </div>
      );
      case "history": return <HistoryPage rides={myRides} onRideClick={handleHistoryRideClick} />;
      case "profile": return ( <ProfilePage user={{...userData, language}} onUpdateUser={handleUpdateUser} onUpdateCar={handleUpdateCar} myRides={myRides} openOnMount={openProfileEdit} onMountHandled={() => setOpenProfileEdit(false)} /> );
      default: return null;
    }
  };

  return (
    <div 
      className="h-screen text-gray-800 flex flex-col font-sans"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533106418989-88406e768d19?q=80&w=2940&auto=format&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <CustomScrollbarStyles />
      {selectedPassenger && (
          <div 
              className="fixed bg-white rounded-xl shadow-2xl z-50 p-2 space-y-1"
              style={{ top: popoverPosition.top, left: popoverPosition.left }}
              onClick={() => setSelectedPassenger(null)}
          >
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg"><Phone className="h-4 w-4 mr-2"/>{t('call')}</button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-neutral-100 rounded-lg"><Send className="h-4 w-4 mr-2"/>{t('message')}</button>
              <div className="border-t border-neutral-200 my-1"></div>
              <button onClick={() => handleRemovePassenger(selectedPassenger.id)} className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4 mr-2"/>{t('removePassenger')}</button>
          </div>
      )}
      <header className="bg-white/80 backdrop-blur-sm p-3 border-b border-white/20 flex items-center justify-between z-20 shadow-lg relative rounded-b-2xl">
          <div className="w-1/3 flex justify-start">
            {(activeTab !== "dashboard" || showPostRide || showMessages || showStatsModal) ? (
              <button onClick={handleBack} className="p-2 rounded-full text-neutral-800 hover:bg-black/10 transition-colors" >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : (
              <button onClick={handleEditProfileClick} className="text-sm font-semibold text-gray-700 ml-2 p-2 rounded-full hover:bg-black/10 transition-colors">{userData.phone}</button>
            )}
          </div>
          <div className="w-1/3 text-center">
            <h1 className="text-xl font-bold text-gray-800">{headerTitle}</h1>
          </div>
          <div className="w-1/3 flex justify-end">
             {(activeTab === "dashboard" && !showPostRide && !showMessages && !showStatsModal) && (
                <button onClick={handleEditProfileClick} className="flex items-center gap-2 p-2 rounded-full hover:bg-black/10 transition-colors">
                    <span className="text-sm font-semibold text-gray-700">{userData.fullName}</span>
                    <User className="h-5 w-5 text-gray-700" />
                </button>
             )}
          </div>
      </header>
      <main className="flex-grow overflow-y-auto custom-scrollbar h-full relative" onClick={() => selectedPassenger && setSelectedPassenger(null)}>
        {renderContent()}
      </main>
      {!(showMessages || showPostRide || isEditModalOpen || showStatsModal) && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-white/20 shadow-lg z-10">
          <div className="flex justify-around py-2">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (<button key={item.id} onClick={() => { setActiveTab(item.id); }} className={`flex-1 flex flex-col items-center py-2 transition-colors ${ isActive ? "text-gray-800" : "text-neutral-500" }`} ><Icon className={`h-6 w-6 mb-1 ${ isActive ? "text-green-500" : "text-neutral-500" }`} /><span className="text-xs">{item.label}</span></button>);
            })}
          </div>
        </footer>
      )}
      {showPostRide && <PostRideForm onClose={() => { setShowPostRide(false); setHeaderTitle(t('ride')); }} onPostSuccess={() => {}} onConfirmPost={handleConfirmPost} initialValues={null} isEditing={false} />}
      {isEditModalOpen && editingRide && <PostRideForm onClose={() => { setIsEditModalOpen(false); setEditingRide(null); }} onPostSuccess={() => { setIsEditModalOpen(false); setEditingRide(null); }} onAddRide={handleSaveEditedRide} initialValues={editingRide} isEditing={true} />}
      <CarTypeModal isOpen={showCarTypeModal} onClose={() => setShowCarTypeModal(false)} onSelectCar={setSelectedCar} currentCar={selectedCar} />
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t('letsGo')}</h2>
              <p className="text-neutral-600 mb-6">{t('areYouSure')}</p>
              <div className="flex justify-center gap-4">
                  <button onClick={() => setShowConfirmationModal(false)} className="flex-1 py-2 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-xl hover:bg-neutral-300 transition-colors">{t('cancel')}</button>
                  <button onClick={handleStartRide} className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">{t('okay')}</button>
              </div>
          </div>
        </div>
      )}
      {showActiveRideErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t('activeRideErrorTitle')}</h2>
              <p className="text-neutral-600 mb-6">{t('activeRideWarning')}</p>
              <button onClick={() => setShowActiveRideErrorModal(false)} className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">{t('okay')}</button>
          </div>
        </div>
      )}
      {showFinishRideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t('finishRide')}</h2>
              <p className="text-neutral-600 mb-6">{t('areYouSureFinish')}</p>
              <div className="flex justify-center gap-4">
                  <button onClick={() => setShowFinishRideModal(false)} className="flex-1 py-2 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-xl hover:bg-neutral-300 transition-colors">{t('cancel')}</button>
                  <button onClick={confirmFinishRide} className="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">{t('yesFinish')}</button>
              </div>
          </div>
        </div>
      )}
       {showHistoryDetailModal && (
        <RideDetailModal 
            isOpen={showHistoryDetailModal}
            onClose={() => setShowHistoryDetailModal(false)}
            ride={selectedHistoryRide}
        />
    )}
    {showPostConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{t('confirmRidePost')}</h2>
              <p className="text-neutral-600 mb-2">{t('confirmPhone')}</p>
              <p className="text-gray-800 font-semibold mb-6">{userData.phone}</p>
              <div className="flex justify-center gap-4">
                  <button onClick={() => {setShowPostConfirmationModal(false); setShowPostRide(true);}} className="flex-1 py-2 px-4 bg-neutral-200 text-neutral-800 font-semibold rounded-xl hover:bg-neutral-300 transition-colors">{t('noEdit')}</button>
                  <button onClick={handleAddRide} className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">{t('yesPost')}</button>
              </div>
          </div>
        </div>
    )}
    </div>
  );
};

const StatsModal = ({ onClose }) => {
    const { t } = useLanguage();
    const dailyEarningsData = [
        { day: 'Mon', earnings: 120 }, { day: 'Tue', earnings: 98 }, { day: 'Wed', earnings: 150 },
        { day: 'Thu', earnings: 80 }, { day: 'Fri', earnings: 200 }, { day: 'Sat', earnings: 250 },
        { day: 'Sun', earnings: 180 },
    ];
    const recentTrips = [
        {id: 1, from: 'Tashkent', to: 'Samarkand', earnings: 50}, {id: 2, from: 'Bukhara', to: 'Khiva', earnings: 70},
        {id: 3, from: 'Fergana', to: 'Andijan', earnings: 45},
    ];
    return (
        <div className="p-4 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-4">{t('dailyEarnings')}</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={dailyEarningsData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="earnings" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold mb-4">{t('recentTrips')}</h3>
                <div className="space-y-3">
                    {recentTrips.map(trip => (
                        <div key={trip.id} className="flex justify-between items-center p-3 bg-neutral-100/50 rounded-xl">
                            <div><p className="font-medium">{trip.from} - {trip.to}</p></div>
                            <p className="font-bold text-green-600">+${trip.earnings}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const App = () => (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
);

export default App;

