import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, User, MapPin, Calendar, Clock, Shield, Navigation, MessageCircle, Users, Hash, Store, Search, X, CheckCircle, ArrowLeft, Send, Loader2, XCircle, Fuel, Radar, LocateFixed, Car, Sparkles, Newspaper, TrendingUp, Mail, Phone, Settings, LogOut, Edit2, ChevronLeft, ChevronRight, Star, ShieldCheck, CreditCard, Bell, Languages, Lock, Trash2, History, FileText, MinusCircle, PlusCircle, UserPlus, UserRound, LifeBuoy, Archive as ArchiveIcon } from "lucide-react";

// Mock Supabase client for demonstration purposes
const supabase = {
  from: table => ({
    select: (columns = '*') => ({
      eq: (column, value) => ({
        order: (column, options) => Promise.resolve({
          data: [],
          error: null
        })
      })
    }),
    insert: data => ({
      select: () => ({
        single: () => Promise.resolve({
          data: {
            id: Date.now(),
            ...data
          },
          error: null
        })
      })
    })
  })
};

// Mock Toast hook
const useToast = () => {
  return {
    toast: ({
      title,
      description
    }) => {
      console.log(`Toast: ${title} - ${description}`);
      alert(`${title}\n${description}`);
    }
  };
};

// Translation data (remains unchanged)
const translations = {
  en: {
    ride: "Ride",
    newRide: "New Ride",
    myLines: "My Lines",
    profile: "Profile",
    history: "History",
    totalEarnings: "Total Earnings",
    stats: "Statistics",
    safety: "Safety",
    yourActivity: "Your Activity",
    noLines: "No Lines Posted Yet",
    postRidePrompt: "Post a new ride to see it here.",
    active: "Active",
    postNewRide: "Post a New Ride",
    fromWhere: "From where",
    toWhere: "To where",
    departureDate: "Departure date",
    mailService: "Mail Service",
    yesCarryMail: "Yes, I do carry Mail",
    mailDescYes: "I can transport both passengers and mail packages",
    noCarryMail: "No, I do not carry Mail",
    mailDescNo: "I only transport passengers, no mail service",
    freeSeats: "Free Seats",
    departureType: "Departure Type",
    fixedDeparture: "Fixed Departure Time",
    fixedDepartureDesc: "Leave between the selected times",
    whenFills: "Leave When Seats Fill",
    whenFillsDesc: "Depart as soon as all available seats are booked",
    price: "Price",
    enterPrice: "Enter price",
    postRide: "Post Ride",
    submitted: "Submitted!",
    selectOrigin: "Select Origin",
    selectDestination: "Select Destination",
    searchCity: "Search for a city or region...",
    noLocations: "No regions or cities found.",
    selectDepDate: "Select Departure Date",
    reviews: "reviews",
    rides: "rides",
    username: "Username",
    gender: "Gender",
    memberSince: "Member Since",
    contactVerification: "Contact & Verification",
    phone: "Phone Number",
    email: "Email",
    idVerification: "ID Verification",
    verified: "Verified",
    notVerified: "Not Verified",
    driverDetails: "Driver Details",
    vehicle: "Vehicle",
    licensePlate: "License Plate",
    drivingLicense: "Driving License",
    activity: "Activity",
    rideHistory: "Ride History",
    upcomingRides: "Upcoming Rides",
    settings: "Settings",
    language: "Language",
    notifications: "Notification Preferences",
    paymentMethods: "Payment Methods",
    privacy: "Privacy Settings",
    security: "Security",
    changePassword: "Change Password",
    logout: "Logout",
    editProfile: "Edit Profile",
    fullName: "Full Name",
    saveChanges: "Save Changes",
    editVehicle: "Edit Vehicle Details",
    uzbek: "Uzbek",
    english: "English",
    russian: "Russian",
    pastRides: "Past Rides",
    noCompletedRides: "No completed rides.",
    noUpcomingRides: "No upcoming rides.",
    submitting: "Submitting...",
    noActiveRide: "Your active ride will appear here",
    passengers: "passengers",
    iTookAClient: "I took a client",
    editRide: "Edit Ride",
    updateRide: "Update Ride",
    chats: "Chats",
    groups: "Guruhlar",
    channels: "Channels",
    market: "Market",
    noMessages: "No messages here yet.",
    typeMessage: "Type a message...",
    cancel: "Cancel",
    letsGo: "Let's Go!",
    areYouSure: "Are you sure?",
    okay: "Okay",
    searchingForClients: "Searching for clients...",
    call: "Call",
    message: "Message",
    removePassenger: "Remove Passenger",
    dailyEarnings: "Daily Earnings",
    recentTrips: "Recent Trips",
    mailPriceLabel: "Mail Price",
    enterMailPrice: "Enter mail price",
    carType: "Car Type",
    selectCar: "Select Your Car",
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
    areYouReallySure: "Are you really sure?",
    yesPostAlready: "Yes, post already",
    stopRide: "Stop this ride",
    archiveRide: "Archive ride",
    confirmStopRide: "Are you sure you want to stop this ride? It will be marked as cancelled.",
    confirmArchiveRide: "Are you sure you want to archive this ride? It will be removed from your upcoming rides.",
    archive: "Archive",
    youLoseClients: "You lose your clients!",
    repostRide: "Repost this ride",
    yourNumber: "Your Number",
    driverLabel: "Driver",
    switchAccount: "Switch to Rider Account"
  },
  uz: {
    ride: "Yo'lga chiqish",
    newRide: "Yangi e'lon",
    myLines: "Mening yo'nalishlarim",
    profile: "Profil",
    history: "Tarix",
    totalEarnings: "Jami daromad",
    stats: "Statistika",
    safety: "Xavfsizlik",
    yourActivity: "Sizning faoliyatingiz",
    noLines: "Hali e'lonlar joylanmagan",
    postRidePrompt: "Bu yerda ko'rish uchun yangi e'lon joylashtiring.",
    active: "Faol",
    postNewRide: "Yangi e'lon joylash",
    fromWhere: "Qayerdan",
    toWhere: "Qayerga",
    departureDate: "Jo'nash sanasi",
    mailService: "Pochta xizmati",
    yesCarryMail: "Ha, pochta olaman",
    mailDescYes: "Yo'lovchilar va pochta jo'natmalarini tashiyman",
    noCarryMail: "Yo'q, pochta olmayman",
    mailDescNo: "Faqat yo'lovchilarni tashiyman, pochta xizmati yo'q",
    freeSeats: "Bo'sh o'rindiqlar",
    departureType: "Jo'nash turi",
    fixedDeparture: "Belgilangan vaqtda jo'nash",
    fixedDepartureDesc: "Tanlangan vaqtlar oralig'ida jo'nang",
    whenFills: "O'rindiqlar to'lganda",
    whenFillsDesc: "Barcha mavjud o'rindiqlar band qilingan zahoti jo'nab ketish",
    price: "Narx",
    enterPrice: "Narxni kiriting",
    postRide: "E'lonni joylash",
    submitted: "Yuborildi!",
    selectOrigin: "Boshlanish nuqtasini tanlang",
    selectDestination: "Manzilni tanlang",
    searchCity: "Shahar yoki viloyatni qidiring...",
    noLocations: "Viloyat yoki shahar topilmadi.",
    selectDepDate: "Jo'nash sanasini tanlang",
    reviews: "sharhlar",
    rides: "sayohatlar",
    username: "Foydalanuvchi nomi",
    gender: "Jins",
    memberSince: "Ro'yxatdan o'tgan sana",
    contactVerification: "Aloqa va tekshiruv",
    phone: "Telefon raqami",
    email: "Elektron pochta",
    idVerification: "Shaxsni tasdiqlash",
    verified: "Tasdiqlangan",
    notVerified: "Tasdiqlanmagan",
    driverDetails: "Haydovchi ma'lumotlari",
    vehicle: "Avtomobil",
    licensePlate: "Davlat raqami",
    drivingLicense: "Haydovchilik guvohnomasi",
    activity: "Faoliyat",
    rideHistory: "Sayohatlar tarixi",
    upcomingRides: "Kutilayotgan sayohatlar",
    settings: "Sozlamalar",
    language: "Til",
    notifications: "Bildirishnomalar",
    paymentMethods: "To'lov usullari",
    privacy: "Maxfiylik",
    security: "Xavfsizlik",
    changePassword: "Parolni o'zgartirish",
    logout: "Chiqish",
    editProfile: "Profilni tahrirlash",
    fullName: "To'liq ism",
    saveChanges: "O'zgarishlarni saqlash",
    editVehicle: "Avtomobil ma'lumotlarini tahrirlash",
    uzbek: "O'zbekcha",
    english: "Inglizcha",
    russian: "Ruscha",
    pastRides: "O'tgan Sayohatlar",
    noCompletedRides: "Tugallangan sayohatlar yo'q.",
    noUpcomingRides: "Kutilayotgan sayohatlar yo'q.",
    submitting: "Yuborilmoqda...",
    noActiveRide: "Sizning faol sayohatingiz shu yerda paydo bo'ladi",
    passengers: "yo'lovchilar",
    iTookAClient: "Mijoz oldim",
    editRide: "Sayohatni tahrirlash",
    updateRide: "Yangilash",
    chats: "Suhbatlar",
    groups: "Guruhlar",
    channels: "Kanallar",
    market: "Bozor",
    noMessages: "Bu yerda hali xabarlar yo'q.",
    typeMessage: "Xabar yozing...",
    cancel: "Bekor qilish",
    letsGo: "Ketdik!",
    areYouSure: "Ishonchingiz komilmi?",
    okay: "Ha",
    searchingForClients: "Mijozlar qidirilmoqda...",
    call: "Qo'ng'iroq",
    message: "Xabar",
    removePassenger: "Yo'lovchini o'chirish",
    dailyEarnings: "Kunlik daromad",
    recentTrips: "Oxirgi sayohatlar",
    mailPriceLabel: "Pochta Narxi",
    enterMailPrice: "Pochta narxini kiriting",
    carType: "Avtomobil turi",
    selectCar: "Avtomobilingizni tanlang",
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
    areYouReallySure: "Haqiqatan ham ishonchingiz komimmi?",
    yesPostAlready: "Ha, joylang",
    stopRide: "Bu sayohatni to'xtatish",
    archiveRide: "E'lonni arxivlash",
    confirmStopRide: "Bu sayohatni bekor qilishga ishonchingiz komilmi? U bekor qilingan deb belgilanadi.",
    confirmArchiveRide: "Bu sayohatni arxivlashga ishonchingiz komilmi? U yaqinlashib kelayotgan sayohatlaringizdan olib tashlanadi.",
    archive: "Arxiv",
    youLoseClients: "Mijozlaringizni yo'qotasiz!",
    repostRide: "Bu sayohatni qayta joylash",
    yourNumber: "Sizning raqamingiz",
    driverLabel: "Haydovchi",
    switchAccount: "Yo'lovchi hisobiga o'tish"
  },
  ru: {
    ride: "Поездка",
    newRide: "Новая поездка",
    myLines: "Мои поездки",
    profile: "Профиль",
    history: "История",
    totalEarnings: "Общий заработок",
    stats: "Статистика",
    safety: "Безопасность",
    yourActivity: "Ваша активность",
    noLines: "Поездки еще не опубликованы",
    postRidePrompt: "Опубликуйте новую поездку, чтобы увидеть ее здесь.",
    active: "Активна",
    postNewRide: "Опубликовать новую поездку",
    fromWhere: "Откуда",
    toWhere: "Куда",
    departureDate: "Дата отправления",
    mailService: "Почтовая служба",
    yesCarryMail: "Да, перевожу посылки",
    mailDescYes: "Могу перевозить как пассажиров, так и посылки",
    noCarryMail: "Нет, не перевожу посылки",
    mailDescNo: "Перевожу только пассажиров, без почтовых услуг",
    freeSeats: "Свободные места",
    departureType: "Тип отправления",
    fixedDeparture: "Фиксированное время отправления",
    fixedDepartureDesc: "Отправление между выбранными временами",
    whenFills: "Когда места заполнятся",
    whenFillsDesc: "Отправление, как только все доступные места будут забронированы",
    price: "Цена",
    enterPrice: "Введите цену",
    postRide: "Опубликовать",
    submitted: "Отправлено!",
    selectOrigin: "Выберите место отправления",
    selectDestination: "Выберите пункт назначения",
    searchCity: "Поиск города или региона...",
    noLocations: "Регионы или города не найдены.",
    selectDepDate: "Выберите дату отправления",
    reviews: "отзывов",
    rides: "поездок",
    username: "Имя пользователя",
    gender: "Пол",
    memberSince: "На сайте с",
    contactVerification: "Контакт и верификация",
    phone: "Номер телефона",
    email: "Электронная почта",
    idVerification: "Подтверждение личности",
    verified: "Подтверждено",
    notVerified: "Не подтверждено",
    driverDetails: "Данные водителя",
    vehicle: "Автомобиль",
    licensePlate: "Гос. номер",
    drivingLicense: "Водительское удостоверение",
    activity: "Активность",
    rideHistory: "История поездок",
    upcomingRides: "Предстоящие поездки",
    settings: "Настройки",
    language: "Язык",
    notifications: "Настройки уведомлений",
    paymentMethods: "Способы оплаты",
    privacy: "Конфиденциальность",
    security: "Безопасность",
    changePassword: "Изменить пароль",
    logout: "Выйти",
    editProfile: "Редактировать профиль",
    fullName: "Полное имя",
    saveChanges: "Сохранить изменения",
    editVehicle: "Редактировать данные автомобиля",
    uzbek: "Узбекский",
    english: "Английский",
    russian: "Русский",
    pastRides: "Прошлые поездки",
    noCompletedRides: "Завершенных поездок нет.",
    noUpcomingRides: "Предстоящих поездок нет.",
    submitting: "Отправка...",
    noActiveRide: "Ваша активная поездка появится здесь",
    passengers: "пассажиров",
    iTookAClient: "Я взял клиента",
    editRide: "Редактировать поездку",
    updateRide: "Обновить",
    chats: "Чаты",
    groups: "Группы",
    channels: "Каналы",
    market: "Маркет",
    noMessages: "Здесь пока нет сообщений.",
    typeMessage: "Введите сообщение...",
    cancel: "Отмена",
    letsGo: "Поехали!",
    areYouSure: "Вы уверены?",
    okay: "Да",
    searchingForClients: "Поиск клиентов...",
    call: "Позвонить",
    message: "Написать",
    removePassenger: "Удалить пассажира",
    dailyEarnings: "Дневной заработок",
    recentTrips: "Последние поездки",
    mailPriceLabel: "Цена за посылку",
    enterMailPrice: "Введите цену за посылку",
    carType: "Тип автомобиля",
    selectCar: "Выберите ваш автомобиль",
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
    areYouReallySure: "Вы уверены?",
    yesPostAlready: "Да, опубликовать",
    stopRide: "Остановить поездку",
    archiveRide: "Архивировать поездку",
    confirmStopRide: "Вы уверены, что хотите остановить эту поездку? Она будет отмечена как отмененная.",
    confirmArchiveRide: "Вы уверены, что хотите архивировать эту поездку? Она будет удалена из ваших предстоящих поездок.",
    archive: "Архив",
    youLoseClients: "Вы потеряете своих клиентов!",
    repostRide: "Повторно опубликовать",
    driverLabel: "Водитель",
    switchAccount: "Переключиться на аккаунт пассажира"
  }
};

// Language Context for internationalization
const LanguageContext = createContext({
  t: key => key,
  language: 'en',
  setLanguage: lang => {}
});
const useLanguage = () => useContext(LanguageContext);

// Custom styles for scrollbars and animations
const CustomScrollbarStyles = () => <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #9ca3af; }
    .animate-spin-slow { animation: spin 2s linear infinite; }

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
        0% { transform: scale(0.5); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
    }
  `}</style>;

// Reusable Avatar component
const Avatar = ({
  initials,
  bgColor,
  size = 'w-10 h-10',
  src = null
}) => <div className={`relative rounded-full flex items-center justify-center text-slate-900 text-lg font-bold ${bgColor} ${size}`}>
        {src ? <img src={src} alt="profile" className="rounded-full w-full h-full object-cover" /> : initials}
    </div>;

// MessageDashboard Component (Chat Interface)
const MessageDashboard = ({
  onClose
}) => {
  const {
    t
  } = useLanguage();
  const [activeMessageTab, setActiveMessageTab] = useState("chats");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState({
    1: [{
      id: "m1",
      sender: "Jane Doe",
      text: "Hey, are you available for a ride?",
      time: "10:30 AM"
    }, {
      id: "m2",
      sender: "me",
      text: "Hi Jane, yes I am!",
      time: "10:31 AM"
    }],
    2: [{
      id: "m3",
      sender: "Mike Smith",
      text: "Thanks for the ride last week!",
      time: "Yesterday"
    }]
  });

  const messageNavItems = [{
    id: "chats",
    label: t('chats'),
    icon: MessageCircle
  }, {
    id: "groups",
    label: t('groups'),
    icon: Users
  }, {
    id: "channels",
    label: t('channels'),
    icon: Hash
  }, {
    id: "market",
    label: t('market'),
    icon: Store
  }];

  const chatItems = {
    chats: [{
      id: 1,
      name: "Jane Doe",
      lastMessage: "Hey, are you available for a ride?",
      time: "10:30 AM",
      avatar: <Avatar initials="JD" bgColor="bg-purple-400" src={null} />
    }, {
      id: 2,
      name: "Mike Smith",
      lastMessage: "Thanks for the ride last week!",
      time: "Yesterday",
      avatar: <Avatar initials="MS" bgColor="bg-blue-400" src={null} />
    }],
    groups: [{
      id: 101,
      name: "Drivers Community",
      lastMessage: "New update on city regulations.",
      time: "1 hr ago",
      avatar: <Avatar initials="DC" bgColor="bg-yellow-400" src={null} />
    }],
    channels: [{
      id: 201,
      name: "Ride Alerts Official",
      lastMessage: "High demand in downtown area!",
      time: "15 min ago",
      avatar: <Avatar initials="RA" bgColor="bg-red-400" src={null} />
    }],
    market: [{
      id: 301,
      name: "Special Offers",
      lastMessage: "Discount on car maintenance this week.",
      time: "2 days ago",
      avatar: <Avatar initials="SO" bgColor="bg-indigo-400" src={null} />
    }]
  };

  const currentChats = chatItems[activeMessageTab] || [];
  const filteredChats = currentChats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));

  const sendMessage = e => {
    e.preventDefault();
    if (!selectedChat || !draft.trim()) return;
    setConversations(prev => {
      const msgs = prev[selectedChat.id] || [];
      return {
        ...prev,
        [selectedChat.id]: [...msgs, {
          id: `${Date.now()}`,
          sender: "me",
          text: draft.trim(),
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }]
      };
    });
    setDraft("");
    setTimeout(() => {
      setConversations(prev => {
        const msgs = prev[selectedChat.id] || [];
        return {
          ...prev,
          [selectedChat.id]: [...msgs, {
            id: `${Date.now()}-r`,
            sender: selectedChat.name,
            text: "Got it!",
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }]
        };
      });
    }, 800);
  };

  const renderList = () => <div className="flex-grow overflow-y-auto custom-scrollbar">
      {filteredChats.length > 0 ? <div className="space-y-1">
          {filteredChats.map(chat => <button key={chat.id} onClick={() => setSelectedChat(chat)} className="w-full flex items-center p-3 hover:bg-gray-100/50 cursor-pointer transition-colors text-left rounded-lg">
              {chat.avatar}
              <div className="ml-3 flex-grow">
                <p className="font-medium text-gray-800">{chat.name}</p>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </button>)}
        </div> : <p className="text-gray-500 text-center mt-10">{t('noMessages')}</p>}
    </div>;

  const renderChat = () => {
    const msgs = conversations[selectedChat?.id] || [];
    return <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {msgs.map(m => <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.sender === 'me' ? 'bg-lime-400 text-slate-900' : 'bg-gray-200 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>)}
        </div>
        <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white/80 backdrop-blur-sm flex items-center gap-2">
          <input value={draft} onChange={e => setDraft(e.target.value)} placeholder={t('typeMessage')} className="flex-1 p-2 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400" />
          <button type="submit" className="p-2 rounded-lg bg-lime-400 text-slate-900 hover:bg-lime-500 transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>;
  };

  return <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200">
      <div className="bg-white/80 backdrop-blur-sm p-3 border-b border-gray-200 flex items-center justify-between gap-2">
        {selectedChat ? <>
            <button onClick={() => setSelectedChat(null)} className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 flex-1 truncate">{selectedChat.name}</h2>
            <div className="w-6 h-6"></div>
          </> : isSearching ? <>
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder={`${t('search')}...`} className="w-full bg-gray-100/80 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus />
            </div>
            <button onClick={() => {
          setIsSearching(false);
          setSearchQuery('');
        }} className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              {t('cancel')}
            </button>
          </> : <>
            <a href="https://t.me/nevalela" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-gray-600 hover:bg-gray-100/50 hover:text-gray-900 transition-colors">
                <LifeBuoy className="h-6 w-6" />
            </a>
            <h2 className="text-lg font-semibold text-gray-800 flex-1 text-center">Chats</h2>
            <button onClick={() => setIsSearching(true)} className="p-2 rounded-full text-gray-600 hover:bg-gray-100/50 hover:text-gray-900 transition-colors">
                <Search className="h-6 w-6" />
            </button>
          </>}
      </div>

      {!selectedChat && <div className="flex justify-around bg-white/80 backdrop-blur-sm p-2 border-b border-gray-200">
          {messageNavItems.map(item => {
        const Icon = item.icon;
        const isActive = activeMessageTab === item.id;
        return <button key={item.id} onClick={() => {
          setActiveMessageTab(item.id);
          setSearchQuery("");
          setIsSearching(false);
        }} className={`flex-1 flex flex-col items-center py-2 transition-colors relative ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"}`}>
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
                {isActive && <div className="absolute bottom-0 h-0.5 w-full bg-lime-400 rounded-full"></div>}
              </button>;
      })}
        </div>}
      {selectedChat ? renderChat() : renderList()}
    </div>;
};

// Location and Car data
const uzbekistanLocations = [{
  region: "Andijan Region",
  cities: ["Andijan", "Asaka", "Baliqchi", "Bo'ston", "Buloqboshi", "Izboskan", "Jalaquduq", "Marhamat", "Oltinko'l", "Paxtaobod", "Qo'rg'ontepa", "Shahrixon", "Ulug'nor", "Xo'jaobod"]
}, {
  region: "Bukhara Region",
  cities: ["Bukhara", "Galaosiyo", "G'ijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Qorako'l", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"]
}, {
  region: "Fergana Region",
  cities: ["Fergana", "Margilan", "Kokand", "Quvasoy", "Quva", "Rishton", "Oltiariq", "Bag'dod", "Beshariq", "Buvayda", "Dang'ara", "Furqat", "Qo'shtepa", "Toshloq", "Uchko'prik", "Yozyovon", "So'x"]
}, {
  region: "Jizzakh Region",
  cities: ["Jizzakh", "G'allaorol", "Sharof Rashidov", "Zomin", "Paxtakor", "Do'stlik", "Forish", "Mirzacho'l", "Yangiobod", "Arnasoy", "Baxmal", "Zarbdor"]
}, {
  region: "Kashkadarya Region",
  cities: ["Karshi", "Shahrisabz", "Kitob", "G'uzor", "Nishon", "Kasbi", "Chiroqchi", "Dehqonobod", "Mirishkor", "Muborak", "Qarshi", "Yakkabog'", "Koson", "Qamashi"]
}, {
  region: "Khorezm Region",
  cities: ["Urgench", "Khiva", "Shovot", "Hazorasp", "Bog'ot", "Yangiariq", "Yangibozar", "Urgench", "Tuproqqal'a", "Xonqa", "Qo'shko'pir"]
}, {
  region: "Namangan Region",
  cities: ["Namangan", "Chust", "Pop", "Kosonsoy", "Mingbuloq", "Norin", "To'raqo'rg'on", "Uchqo'rg'on", "Yangiqo'rg'on", "Chortoq"]
}, {
  region: "Navoiy Region",
  cities: ["Navoiy", "Zarafshan", "Uchquduq", "Konimex", "Nurota", "Tomdi", "Xatirchi", "Qiziltepa", "Karmana"]
}, {
  region: "Samarkand Region",
  cities: ["Samarkand", "Urgut", "Jomboy", "Ishtixon", "Kattaqo'rg'on", "Nurobod", "Oqdaryo", "Paxtachi", "Pastdarg'om", "Tayloq", "Toyloq", "Bulung'ur", "Qo'shrabot"]
}, {
  region: "Sirdaryo Region",
  cities: ["Guliston", "Yangiyer", "Shirin", "Mirzaobod", "Oqoltin", "Sayxunobod", "Sardoba", "Sirdaryo", "Xovos", "Boyovut"]
}, {
  region: "Surkhandarya Region",
  cities: ["Termez", "Denov", "Boysun", "Sherobod", "Sho'rchi", "Qumqo'rg'on", "Muzrabot", "Angor", "Bandixon", "Jarqo'rg'on", "Oltinsoy", "Sariosiyo", "Uzun"]
}, {
  region: "Tashkent Region",
  cities: ["Angren", "Chirchiq", "Olmaliq", "Bekabad", "Yangiyo'l", "Gazalkent", "Bo'ka", "Chinoz", "Oqqo'rg'on", "Parkent", "Piskent", "Qibray", "Quyichirchiq", "Yangiyo'l", "Yuqorichirchiq", "Zangiota"]
}, {
  region: "Tashkent City",
  cities: ["Tashkent", "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugbek", "Sergeli", "Shaykhontohur", "Uchtepa", "Yakkasaroy", "Yashnobod", "Yunusobod"]
}, {
  region: "Republic of Karakalpakstan",
  cities: ["Nukus", "Beruniy", "Chimboy", "Ellikqala", "Kegeyli", "Qo'ng'irot", "Qorao'zak", "Shumanay", "Taxtako'pir", "To'rtko'l", "Xo'jayli", "Amudaryo", "Bo'zatov", "Qanliko'l", "Taxiatosh"]
}];
const allCars = [
    'Chevrolet Damas', 'Chevrolet Labo', 'Chevrolet Cobalt', 'Chevrolet Onix', 'Chevrolet Tracker', 'Chevrolet Lacetti', 'Chevrolet Captiva', 'Chevrolet Equinox', 'Chevrolet Traverse', 'Chevrolet Malibu', 'Chevrolet Tahoe', 'Chevrolet Trailblazer', 'Chevrolet Monza', 'Chevrolet Gentra', 'Chevrolet Nexia',
    'Kia Sonet', 'Kia Seltos', 'Kia Sportage', 'Kia Sorento', 'Kia K5', 'Kia K8', 'Kia K9', 'Kia Carens', 'Kia Carnival', 'Kia Stonic',
    'BYD Chazor', 'BYD Song Plus', 'BYD Han', 'BYD Seagull', 'BYD Dolphin', 'BYD Atto 3', 'BYD Yuan Plus', 'BYD Tang', 'BYD Qin Plus', 'BYD F3', 'BYD e6',
    'Chery Arrizo 6', 'Chery Tiggo 4', 'Chery Tiggo 4 Pro', 'Chery Tiggo 7', 'Chery Tiggo 7 Pro', 'Chery Tiggo 8', 'Chery Tiggo 8 Pro', 'Chery Tiggo 8 Pro Max', 'Chery Tiggo 9',
    'Haval Jolion', 'Haval H6', 'Haval H9', 'Haval M6',
    'Lada VAZ 2106', 'Lada Vesta', 'Lada Largus', 'Lada Xray', 'Lada Granta', 'Lada Iskra', 'Lada Niva Legend',
    'Hyundai Elantra', 'Hyundai Sonata', 'Hyundai Tucson', 'Hyundai Creta', 'Hyundai Santa Fe', 'Hyundai Palisade', 'Hyundai Staria', 'Hyundai Accent',
    'Toyota Camry', 'Toyota Corolla', 'Toyota RAV4', 'Toyota Land Cruiser', 'Toyota Prado', 'Toyota Hilux', 'Toyota Corolla Cross', 'Toyota Yaris',
    'Nissan Sunny', 'Nissan Almera', 'Nissan X-Trail', 'Nissan Qashqai', 'Nissan Patrol', 'Nissan Terra',
    'Mitsubishi Outlander', 'Mitsubishi Pajero', 'Mitsubishi Lancer', 'Mitsubishi ASX', 'Mitsubishi Triton',
    'Suzuki Swift', 'Suzuki Dzire', 'Suzuki Vitara', 'Suzuki Jimny', 'Suzuki SX4',
    'Mazda Mazda3', 'Mazda Mazda6', 'Mazda CX 5', 'Mazda CX 30', 'Mazda CX 9',
    'Volkswagen Polo', 'Volkswagen Tiguan', 'Volkswagen Passat', 'Volkswagen Jetta', 'Volkswagen Caddy',
    'Skoda Rapid', 'Skoda Octavia', 'Skoda Kodiaq', 'Skoda Karoq',
    'Renault Logan', 'Renault Sandero', 'Renault Duster', 'Renault Koleos', 'Renault Arkana',
    'Peugeot 208', 'Peugeot 301', 'Peugeot 3008', 'Peugeot 5008',
    'Citroen C3', 'Citroen C4', 'Citroen C5 Aircross',
    'Ford Fiesta', 'Ford Focus', 'Ford Transit', 'Ford Ranger', 'Ford Explorer',
    'Mercedes Benz A Class', 'Mercedes Benz C Class', 'Mercedes Benz E Class', 'Mercedes Benz S Class', 'Mercedes Benz GLC', 'Mercedes Benz GLE', 'Mercedes Benz GLS', 'Mercedes Benz Sprinter', 'Mercedes Benz Vito',
    'BMW 3 Series', 'BMW 5 Series', 'BMW 7 Series', 'BMW X3', 'BMW X5', 'BMW X7',
    'Audi A3', 'Audi A4', 'Audi A6', 'Audi Q3', 'Audi Q5', 'Audi Q7',
    'Volvo S60', 'Volvo S90', 'Volvo XC40', 'Volvo XC60', 'Volvo XC90',
    'MG MG3', 'MG HS', 'MG ZS', 'MG5',
    'Geely Emgrand', 'Geely Atlas', 'Geely Tugella', 'Geely Coolray',
    'JAC JAC S2', 'JAC JAC S3', 'JAC T8',
    'FAW Besturn', 'FAW Hongqi',
    'Isuzu D Max',
    'Tesla Model 3', 'Tesla Model Y',
];

// CarTypeModal Component
const CarTypeModal = ({
  isOpen,
  onClose,
  onSelectCar,
  currentCar
}) => {
  const {
    t
  } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [manualCar, setManualCar] = useState("");

  if (!isOpen) return null;

  const filteredCars = allCars.filter(car =>
    car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManualSelect = () => {
    if (manualCar.trim()) {
      onSelectCar(manualCar.trim());
      onClose();
    }
  };

  return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-auto max-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('selectCar')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search or type your car..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setManualCar(e.target.value);
                        }}
                        className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800"
                    />
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {filteredCars.map((car, index) => <button key={index} onClick={() => {
                        onSelectCar(car);
                        onClose();
                        }} className={`w-full p-3 rounded-lg text-left transition-colors flex justify-between items-center text-gray-700 ${currentCar === car ? 'bg-lime-100 text-lime-800 font-semibold' : 'hover:bg-gray-100'}`}>
                            {car}
                            {currentCar === car && <CheckCircle className="h-5 w-5 text-lime-500" />}
                        </button>)}
                </div>
                 <div className="p-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 text-center">Can't find your car?</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add it manually"
                            value={manualCar}
                            onChange={(e) => setManualCar(e.target.value)}
                            className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800"
                        />
                        <button
                            onClick={handleManualSelect}
                            className="px-4 py-2 bg-lime-400 text-slate-900 font-semibold rounded-lg hover:bg-lime-500 transition-colors"
                        >
                            Set
                        </button>
                    </div>
                </div>
            </div>
        </div>;
};

// LocationSelectModal Component
const LocationSelectModal = ({
  title,
  isOpen,
  onClose,
  onSelect
}) => {
  const {
    t
  } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };
  const filteredLocations = uzbekistanLocations.map(regionData => ({
    ...regionData,
    cities: regionData.cities.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(regionData => regionData.cities.length > 0 || regionData.region.toLowerCase().includes(searchTerm.toLowerCase()));
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={handleClose} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder={t('searchCity')} className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredLocations.length > 0 ? filteredLocations.map((regionData, regionIndex) => <div key={`${regionData.region}-${regionIndex}`}>
                <h3 className="w-full text-left p-3 font-semibold text-gray-800 select-none">
                  {regionData.region}
                </h3>
                {regionData.cities.map((city, cityIndex) => <button key={`${regionData.region}-${city}-${cityIndex}`} onClick={() => {
            onSelect(city);
            handleClose();
          }} className="w-full text-left pl-6 py-2 text-gray-600 hover:bg-gray-50 hover:text-lime-600 rounded-lg text-sm transition-colors">
                    {city}
                  </button>)}
              </div>) : <p className="text-gray-500 text-center mt-10">{t('noLocations')}</p>}
        </div>
      </div>
    </div>;
};

// PostRideForm Component
const PostRideForm = ({
  onClose,
  onConfirmPost,
  initialValues,
  isEditing,
  onStopRide,
  onArchiveRide,
  userPhone
}) => {
  const {
    t
  } = useLanguage();
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
  const [contactNumber, setContactNumber] = useState(initialValues?.contactNumber || userPhone);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const isFormValid = fromLocation && toLocation && departureDate && mailService && freeSeats !== null && departureType && price && contactNumber && (departureType !== "fixed" || departureStartTime && departureEndTime) && (mailService !== "yes" || mailPrice);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmissionAttempted(true);
    if (isFormValid) {
      const newRideData = {
        ...initialValues,
        fromLocation,
        toLocation,
        departureDate,
        mailService,
        freeSeats,
        totalSeats: 4,
        departureType,
        departureStartTime,
        departureEndTime,
        price,
        mailPrice,
        contactNumber
      };
      onConfirmPost(newRideData);
    }
  };

  const DatePickerModal = ({
    isOpen,
    onClose,
    onSelectDate
  }) => {
    if (!isOpen) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dates = Array.from({
      length: daysInMonth
    }, (_, i) => i + 1);
    return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">{t('selectDepDate')}</h2>
            <button onClick={onClose} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"> <X className="h-6 w-6" /> </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center text-gray-800 text-lg font-medium mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-500 text-sm mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({
              length: new Date(today.getFullYear(), today.getMonth(), 1).getDay()
            }).map((_, i) => <div key={`pad-${i}`} className="p-2"></div>)}
              {dates.map(day => {
              const date = new Date(today.getFullYear(), today.getMonth(), day);
              date.setHours(0, 0, 0, 0);
              const isToday = day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
              const isPast = date < today;
              const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              return <button key={day} onClick={() => {
                if (!isPast) {
                  onSelectDate(dateString);
                  onClose();
                }
              }} className={`p-2 rounded-full text-gray-800 text-sm font-medium ${isToday ? 'bg-gray-100 border border-gray-300' : 'hover:bg-gray-100'} ${isPast ? 'text-gray-400 cursor-not-allowed' : ''}`} disabled={isPast}>
                    {day}
                  </button>;
            })}
            </div>
          </div>
        </div>
      </div>;
  };

  return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{isEditing ? t('editRide') : t('postNewRide')}</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"> <X className="h-6 w-6" /> </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <div onClick={() => setShowFromModal(true)} className={`w-full p-3 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-between cursor-pointer border-2 ${submissionAttempted && !fromLocation ? 'border-red-500/50' : fromLocation ? 'border-lime-400/50' : 'border-transparent'}`}>
              {fromLocation || t('fromWhere')}
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <LocationSelectModal title={t('selectOrigin')} isOpen={showFromModal} onClose={() => setShowFromModal(false)} onSelect={setFromLocation} />
          </div>
          <div>
            <div onClick={() => setShowToModal(true)} className={`w-full p-3 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-between cursor-pointer border-2 ${submissionAttempted && !toLocation ? 'border-red-500/50' : toLocation ? 'border-lime-400/50' : 'border-transparent'}`}>
              {toLocation || t('toWhere')}
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <LocationSelectModal title={t('selectDestination')} isOpen={showToModal} onClose={() => setShowToModal(false)} onSelect={setToLocation} />
          </div>
          <div>
            <div onClick={() => setShowDateModal(true)} className={`w-full p-3 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-between cursor-pointer border-2 ${submissionAttempted && !departureDate ? 'border-red-500/50' : departureDate ? 'border-lime-400/50' : 'border-transparent'}`}>
              {departureDate || t('departureDate')}
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePickerModal isOpen={showDateModal} onClose={() => setShowDateModal(false)} onSelectDate={setDepartureDate} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('mailService')}</label>
            <div className="space-y-3">
              <button type="button" onClick={() => setMailService("yes")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors border-2 ${mailService === "yes" ? "bg-lime-100 border-lime-300" : submissionAttempted && !mailService ? 'border-red-500/50' : 'border-gray-200 bg-gray-100 hover:bg-gray-200'}`}>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{t('yesCarryMail')}</p>
                  <p className="text-sm text-gray-500">{t('mailDescYes')}</p>
                </div>
                {mailService === "yes" && <CheckCircle className="h-6 w-6 text-lime-500" />}
              </button>
              {mailService === "yes" && <div className="mt-3">
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t('mailPriceLabel')}</label>
                    <div className="relative">
                        <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder={t('enterMailPrice')} className={`w-full p-3 pl-10 bg-gray-100 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 ${submissionAttempted && mailService === 'yes' && !mailPrice ? 'border-2 border-red-500/50' : 'border-2 border-transparent'}`} value={mailPrice} onChange={e => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value)) {
                    setMailPrice(value);
                  }
                }} />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                </div>}
              <button type="button" onClick={() => setMailService("no")} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors border-2 ${mailService === "no" ? "bg-lime-100 border-lime-300" : submissionAttempted && !mailService ? 'border-red-500/50' : 'border-gray-200 bg-gray-100 hover:bg-gray-200'}`}>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{t('noCarryMail')}</p>
                  <p className="text-sm text-gray-500">{t('mailDescNo')}</p>
                </div>
                {mailService === "no" && <CheckCircle className="h-6 w-6 text-lime-500" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('freeSeats')}</label>
            <div className="flex justify-around space-x-2">
              {[1, 2, 3, 4].map(seats => <button key={seats} type="button" onClick={() => setFreeSeats(seats)} className={`flex-1 p-3 rounded-xl text-lg font-semibold transition-colors border-2
                    ${freeSeats === seats ? "bg-lime-100 border-lime-300 text-gray-800" : submissionAttempted && freeSeats === null ? 'border-red-500/50' : 'border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>
                  {seats}
                </button>)}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('departureType')}</label>
            <div className="space-y-3">
              <button type="button" onClick={() => {
              setDepartureType("fixed");
            }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors border-2 ${departureType === "fixed" ? "bg-lime-100 border-lime-300" : submissionAttempted && !departureType ? 'border-red-500/50' : 'border-gray-200 bg-gray-100 hover:bg-gray-200'}`}>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-lime-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{t('fixedDeparture')}</p>
                    <p className="text-sm text-gray-500">{t('fixedDepartureDesc')}</p>
                  </div>
                </div>
                {departureType === "fixed" && <CheckCircle className="h-6 w-6 text-lime-500" />}
              </button>
              {departureType === "fixed" && <div className={`w-full p-3 bg-gray-100/50 rounded-xl flex items-center justify-between border-2 mt-2 gap-2 ${submissionAttempted && (!departureStartTime || !departureEndTime) ? 'border-red-500/50' : 'border-gray-200'}`}>
                    <span className="text-sm text-gray-500">{t('from')}</span>
                    <input type="time" value={departureStartTime} onChange={e => setDepartureStartTime(e.target.value)} className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
                    <span className="text-sm text-gray-500">{t('to')}</span>
                    <input type="time" value={departureEndTime} onChange={e => setDepartureEndTime(e.target.value)} className="bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
                    <Clock className="h-5 w-5 text-gray-400 ml-2" />
                </div>}
              <button type="button" onClick={() => {
              setDepartureType("when_fills");
              setDepartureStartTime("");
              setDepartureEndTime("");
            }} className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors border-2 ${departureType === "when_fills" ? "bg-lime-100 border-lime-300" : submissionAttempted && !departureType ? 'border-red-500/50' : 'border-gray-200 bg-gray-100 hover:bg-gray-200'}`}>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-lime-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{t('whenFills')}</p>
                    <p className="text-sm text-gray-500">{t('whenFillsDesc')}</p>
                  </div>
                </div>
                {departureType === "when_fills" && <CheckCircle className="h-6 w-6 text-lime-500" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('price')}</label>
            <div className="relative">
              <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder={t('enterPrice')} className={`w-full p-3 pl-10 bg-gray-100 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 ${submissionAttempted && !price ? 'border-2 border-red-500/50' : 'border-2 border-transparent'}`} value={price} onChange={e => {
              const value = e.target.value;
              if (/^[0-9]*$/.test(value)) {
                setPrice(value);
              }
            }} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('yourNumber')}</label>
            <div className="relative">
              <input type="text" placeholder={t('phone')} className={`w-full p-3 pl-10 bg-gray-100 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 ${submissionAttempted && !contactNumber ? 'border-2 border-red-500/50' : 'border-2 border-transparent'}`} value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Phone className="h-5 w-5" /></span>
            </div>
          </div>
          <button type="submit" className={`w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg
            ${isFormValid ? "bg-lime-400 hover:bg-lime-500 text-slate-900" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
             {isEditing ? t('updateRide') : t('postRide')}
          </button>
          {isEditing && <div className="flex gap-2 mt-4">
              {initialValues.status === 'upcoming' && <button type="button" onClick={onArchiveRide} className="w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg bg-gray-500 hover:bg-gray-600 text-white">
                  <Trash2 className="h-5 w-5 mr-2" />
                  {t('archiveRide')}
                </button>}
              {initialValues.status === 'in-progress' && <button type="button" onClick={onStopRide} className="w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg bg-red-500 hover:bg-red-600 text-white">
                  <MinusCircle className="h-5 w-5 mr-2" />
                  {t('stopRide')}
                </button>}
            </div>}
        </form>
      </div>
    </div>;
};

// RideDetailModal Component
const RideDetailModal = ({
  ride,
  isOpen,
  onClose,
  onRepost
}) => {
  const {
    t
  } = useLanguage();
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0
  });
  const handlePassengerClick = (passenger, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    });
    setSelectedPassenger(passenger);
  };
  if (!isOpen || !ride) return null;
  return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans" onClick={() => setSelectedPassenger(null)}>
            {selectedPassenger && <div className="fixed bg-white rounded-xl shadow-2xl z-[51] p-2 space-y-1 border border-gray-200" style={{
      top: popoverPosition.top,
      left: popoverPosition.left
    }}>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"><Phone className="h-4 w-4 mr-2" />{t('call')}</button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"><Send className="h-4 w-4 mr-2" />{t('message')}</button>
              </div>}
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">{t('rideDetails')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center text-lg font-bold text-gray-800"><MapPin className="h-5 w-5 mr-2 text-lime-500" />{ride.fromLocation}</div>
                            <div className="flex items-center text-lg font-bold text-gray-800 mt-1"><MapPin className="h-5 w-5 mr-2 text-red-500" />{ride.toLocation}</div>
                        </div>
                        <span className="text-3xl font-bold text-gray-800">{ride.price}$</span>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center"><Calendar className="h-5 w-5 mr-2" /><span>{ride.departureDate}</span></div>
                        {ride.departureStartTime && <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>
                                    {ride.departureStartTime}
                                    {ride.departureEndTime && ` - ${ride.departureEndTime}`}
                                </span>
                            </div>}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                        <div className="flex items-center"><Mail className="h-5 w-5 mr-2" /><span>{ride.mailService === 'yes' ? t('yesCarryMail') : t('noCarryMail')}</span></div>
                        <div className="flex items-center">{ride.departureType === 'fixed' ? <Clock className="h-5 w-5 mr-2" /> : <Users className="h-5 w-5 mr-2" />}<span>{ride.departureType === 'fixed' ? t('fixedDeparture') : t('whenFills')}</span></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2"><div className="flex items-center"><Car className="h-5 w-5 mr-2" /><span>{ride.carType}</span></div></div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">{t('passengers')}</h3>
                        <div className="space-y-2">
                            {ride.passengers && ride.passengers.length > 0 ? ride.passengers.map(p => <button key={p.id} onClick={e => handlePassengerClick(p, e)} className="w-full flex items-center p-2 bg-gray-100/50 rounded-lg text-left hover:bg-gray-200 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${p.gender === 'male' ? 'bg-blue-100' : 'bg-lime-100'}`}>
                                            {p.gender === 'male' ? <User className="h-5 w-5 text-blue-600" /> : <UserRound className="h-5 w-5 text-lime-600" />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{p.name}</span>
                                    </button>) : <p className="text-sm text-gray-500">No passengers on this ride.</p>}
                        </div>
                    </div>
                </div>
                {ride.status === 'archived' && <div className="p-4 border-t border-gray-200">
                        <button onClick={() => onRepost(ride)} className="w-full py-3 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center shadow-lg bg-lime-400 hover:bg-lime-500 text-slate-900">
                            <Sparkles className="h-5 w-5 mr-2" />
                            {t('repostRide')}
                        </button>
                    </div>}
            </div>
        </div>;
};

// EditProfileModal Component
const EditProfileModal = ({
  user,
  isOpen,
  onClose,
  onSave
}) => {
  const {
    t
  } = useLanguage();
  const [formData, setFormData] = useState(user);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md flex flex-col">
                <div className="p
