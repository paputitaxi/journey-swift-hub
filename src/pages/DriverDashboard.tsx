import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Plus,
  User,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Navigation,
  MessageCircle,
  Users,
  Hash,
  Store,
  Search,
  X,
  CheckCircle,
  ArrowLeft,
  Send,
  Loader2,
  XCircle,
  Fuel,
  Radar,
  LocateFixed,
  Car,
  Sparkles,
  Newspaper,
  TrendingUp,
  Mail,
  Phone,
  Settings,
  LogOut,
  Edit2,
  ChevronLeft,
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
  UserPlus,
  UserRound,
  LifeBuoy,
  Archive as ArchiveIcon,
} from "lucide-react";

// Mock Supabase client for demonstration purposes
const supabase = {
  from: (table) => ({
    select: (columns = "*") => ({
      eq: (column, value) => ({
        order: (column, options) =>
          Promise.resolve({
            data: [],
            error: null,
          }),
      }),
    }),
    insert: (data) => ({
      select: () => ({
        single: () =>
          Promise.resolve({
            data: {
              id: Date.now(),
              ...data,
            },
            error: null,
          }),
      }),
    }),
  }),
};

// Mock Toast hook
const useToast = () => {
  return {
    toast: ({ title, description }) => {
      console.log(`Toast: ${title} - ${description}`);
    },
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
    switchAccount: "Switch to Rider Account",
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
    confirmArchiveRide:
      "Bu sayohatni arxivlashga ishonchingiz komilmi? U yaqinlashib kelayotgan sayohatlaringizdan olib tashlanadi.",
    archive: "Arxiv",
    youLoseClients: "Mijozlaringizni yo'qotasiz!",
    repostRide: "Bu sayohatni qayta joylash",
    yourNumber: "Sizning raqamingiz",
    driverLabel: "Haydovchi",
    switchAccount: "Yo'lovchi hisobiga o'tish",
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
    confirmArchiveRide:
      "Вы уверены, что хотите архивировать эту поездку? Она будет удалена из ваших предстоящих поездок.",
    archive: "Архив",
    youLoseClients: "Вы потеряете своих клиентов!",
    repostRide: "Повторно опубликовать",
    driverLabel: "Водитель",
    switchAccount: "Переключиться на аккаунт пассажира",
  },
};

// Language Context for internationalization
const LanguageContext = createContext({
  t: (key) => key,
  language: "en",
  setLanguage: (lang) => {},
});
const useLanguage = () => useContext(LanguageContext);

// Modern UI Styles Component
const ModernUIStyles = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>{`
      :root {
        --modern-bg: #ffffff;
        --modern-surface: #f9fafb;
        --modern-border: #e5e7eb;
        --modern-text-primary: #111827;
        --modern-text-secondary: #6b7280;
        --modern-primary: #000000;
        --modern-primary-foreground: #ffffff;
      }

      body, .font-sans {
        font-family: 'Inter', sans-serif !important;
        background-color: var(--modern-bg);
        color: var(--modern-text-primary);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Redefining retro classes for a modern look */
      .retro-window {
        background: var(--modern-bg);
        border: 1px solid var(--modern-border);
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        padding: 0;
        overflow: hidden;
      }

      .retro-title-bar {
        color: var(--modern-text-primary);
        padding: 1rem 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        font-size: 1rem;
        border-bottom: 1px solid var(--modern-border);
        margin-bottom: 0;
        background-color: transparent !important; /* Override inline styles */
      }
      
      .retro-title-bar-button {
        width: 24px;
        height: 24px;
        background: var(--modern-surface);
        border: 1px solid var(--modern-border);
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--modern-text-secondary);
        font-size: 12px;
        transition: background-color 0.2s;
      }
      .retro-title-bar-button:hover {
        background-color: #f3f4f6;
      }

      .retro-button {
        background-color: var(--modern-primary);
        color: var(--modern-primary-foreground);
        border: 1px solid var(--modern-primary);
        padding: 0.625rem 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .retro-button:hover:not(:disabled) {
        opacity: 0.9;
      }
      
      .retro-button:disabled {
        background-color: #f3f4f6;
        color: #9ca3af;
        border-color: #e5e7eb;
        cursor: not-allowed;
      }

      .retro-button.primary {
        background-color: var(--modern-primary);
        color: var(--modern-primary-foreground);
        border-color: var(--modern-primary);
      }
      
      .retro-button.danger {
        background-color: #fef2f2;
        color: #dc2626;
        border-color: #fca5a5;
      }
      .retro-button.danger:hover:not(:disabled) {
        background-color: #fee2e2;
      }
      /* secondary button style */
      .retro-button:not(.primary):not(.danger) {
        background-color: var(--modern-bg);
        color: var(--modern-text-primary);
        border-color: var(--modern-border);
      }
       .retro-button:not(.primary):not(.danger):hover:not(:disabled) {
        background-color: var(--modern-surface);
      }

      .retro-button.active-nav {
        background: var(--modern-surface);
        font-weight: 600;
        color: var(--modern-text-primary);
      }

      .retro-input {
        background: var(--modern-bg);
        border: 1px solid var(--modern-border);
        border-radius: 8px;
        padding: 0.625rem 0.75rem;
        color: var(--modern-text-primary);
        width: 100%;
      }
      .retro-input:focus {
        outline: 2px solid var(--modern-primary);
        outline-offset: 2px;
        border-color: var(--modern-primary);
      }

      .retro-inset-box, .retro-outset-box {
          background: var(--modern-surface);
          border: 1px solid var(--modern-border);
          border-radius: 8px;
          padding: 1rem;
      }
      
      header, footer {
        border-color: var(--modern-border) !important;
        background-color: var(--modern-bg) !important;
      }
    `}</style>
  </>
);

// Custom styles for scrollbars and animations
const ModernScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { 
      width: 8px; 
      height: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track { 
      background-color: #f1f1f1;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb { 
      background-color: #c1c1c1;
      border-radius: 4px;
    }
     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #a8a8a8;
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
        background-color: rgba(0, 0, 0, 0.15);
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
  `}</style>
);

// Reusable Avatar component
const Avatar = ({ initials, bgColor, size = "w-10 h-10", src = null }) => (
  <div
    className={`relative flex items-center justify-center text-slate-900 text-lg font-bold border-2 border-gray-300 ${bgColor} ${size}`}
  >
    {src ? <img src={src} alt="profile" className="w-full h-full object-cover" /> : initials}
  </div>
);

// MessageDashboard Component (Chat Interface)
const MessageDashboard = ({ onClose }) => {
  const { t } = useLanguage();
  const [activeMessageTab, setActiveMessageTab] = useState("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [conversations, setConversations] = useState({
    1: [
      {
        id: "m1",
        sender: "Jane Doe",
        text: "Hey, are you available for a ride?",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "me",
        text: "Hi Jane, yes I am!",
        time: "10:31 AM",
      },
    ],
    2: [
      {
        id: "m3",
        sender: "Mike Smith",
        text: "Thanks for the ride last week!",
        time: "Yesterday",
      },
    ],
  });
  const messageNavItems = [
    {
      id: "chats",
      label: t("chats"),
      icon: MessageCircle,
    },
    {
      id: "groups",
      label: t("groups"),
      icon: Users,
    },
    {
      id: "channels",
      label: t("channels"),
      icon: Hash,
    },
    {
      id: "market",
      label: t("market"),
      icon: Store,
    },
  ];
  const chatItems = {
    chats: [
      {
        id: 1,
        name: "Jane Doe",
        lastMessage: "Hey, are you available for a ride?",
        time: "10:30 AM",
        avatar: <Avatar initials="JD" bgColor="bg-gray-200" src={null} />,
      },
      {
        id: 2,
        name: "Mike Smith",
        lastMessage: "Thanks for the ride last week!",
        time: "Yesterday",
        avatar: <Avatar initials="MS" bgColor="bg-gray-200" src={null} />,
      },
    ],
    groups: [
      {
        id: 101,
        name: "Drivers Community",
        lastMessage: "New update on city regulations.",
        time: "1 hr ago",
        avatar: <Avatar initials="DC" bgColor="bg-gray-200" src={null} />,
      },
    ],
    channels: [
      {
        id: 201,
        name: "Ride Alerts Official",
        lastMessage: "High demand in downtown area!",
        time: "15 min ago",
        avatar: <Avatar initials="RA" bgColor="bg-gray-200" src={null} />,
      },
    ],
    market: [
      {
        id: 301,
        name: "Special Offers",
        lastMessage: "Discount on car maintenance this week.",
        time: "2 days ago",
        avatar: <Avatar initials="SO" bgColor="bg-gray-200" src={null} />,
      },
    ],
  };
  const currentChats = chatItems[activeMessageTab] || [];
  const filteredChats = currentChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
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
          {
            id: `${Date.now()}`,
            sender: "me",
            text: draft.trim(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      };
    });
    setDraft("");
    setTimeout(() => {
      setConversations((prev) => {
        const msgs = prev[selectedChat.id] || [];
        return {
          ...prev,
          [selectedChat.id]: [
            ...msgs,
            {
              id: `${Date.now()}-r`,
              sender: selectedChat.name,
              text: "Got it!",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      });
    }, 800);
  };
  const renderList = () => (
    <div className="flex-grow overflow-y-auto custom-scrollbar p-1">
      {filteredChats.length > 0 ? (
        <div className="space-y-1">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="w-full flex items-center p-2 hover:bg-gray-100 cursor-pointer text-left rounded-lg"
            >
              {chat.avatar}
              <div className="ml-3 flex-grow">
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-500">{t("noMessages")}</p>
      )}
    </div>
  );
  const renderChat = () => {
    const msgs = conversations[selectedChat?.id] || [];
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${m.sender === "me" ? "bg-black text-white" : "bg-gray-200 text-gray-900"}`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-2 border-t border-gray-200 flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("typeMessage")}
            className="flex-1 retro-input"
          />
          <button type="submit" className="retro-button primary aspect-square !p-2">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className="retro-window flex flex-col h-full">
      <div className="retro-title-bar">
        {selectedChat && (
          <button onClick={() => setSelectedChat(null)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <span>{selectedChat ? selectedChat.name : t("chats")}</span>
        <button onClick={onClose} className="retro-title-bar-button">
          <X className="h-4 w-4" />
        </button>
      </div>
      {!selectedChat && (
        <div className="flex border-b border-gray-200">
          {messageNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMessageTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMessageTab(item.id);
                  setSearchQuery("");
                }}
                className={`flex-1 flex flex-col items-center py-2 relative transition-colors ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50 text-gray-600"}`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
      {selectedChat ? renderChat() : renderList()}
    </div>
  );
};

// Location and Car data
const uzbekistanLocations = [
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
      "Yangibozar",
      "Urgench",
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
const allCars = [
  "Chevrolet Damas",
  "Chevrolet Labo",
  "Chevrolet Cobalt",
  "Chevrolet Onix",
  "Chevrolet Tracker",
  "Chevrolet Lacetti",
  "Chevrolet Captiva",
  "Chevrolet Equinox",
  "Chevrolet Traverse",
  "Chevrolet Malibu",
  "Chevrolet Tahoe",
  "Chevrolet Trailblazer",
  "Chevrolet Monza",
  "Chevrolet Gentra",
  "Chevrolet Nexia",
  "Kia Sonet",
  "Kia Seltos",
  "Kia Sportage",
  "Kia Sorento",
  "Kia K5",
  "Kia K8",
  "Kia K9",
  "Kia Carens",
  "Kia Carnival",
  "Kia Stonic",
  "BYD Chazor",
  "BYD Song Plus",
  "BYD Han",
  "BYD Seagull",
  "BYD Dolphin",
  "BYD Atto 3",
  "BYD Yuan Plus",
  "BYD Tang",
  "BYD Qin Plus",
  "BYD F3",
  "BYD e6",
  "Chery Arrizo 6",
  "Chery Tiggo 4",
  "Chery Tiggo 4 Pro",
  "Chery Tiggo 7",
  "Chery Tiggo 7 Pro",
  "Chery Tiggo 8",
  "Chery Tiggo 8 Pro",
  "Chery Tiggo 8 Pro Max",
  "Chery Tiggo 9",
  "Haval Jolion",
  "Haval H6",
  "Haval H9",
  "Haval M6",
  "Lada VAZ 2106",
  "Lada Vesta",
  "Lada Largus",
  "Lada Xray",
  "Lada Granta",
  "Lada Iskra",
  "Lada Niva Legend",
  "Hyundai Elantra",
  "Hyundai Sonata",
  "Hyundai Tucson",
  "Hyundai Creta",
  "Hyundai Santa Fe",
  "Hyundai Palisade",
  "Hyundai Staria",
  "Hyundai Accent",
  "Toyota Camry",
  "Toyota Corolla",
  "Toyota RAV4",
  "Toyota Land Cruiser",
  "Toyota Prado",
  "Toyota Hilux",
  "Toyota Corolla Cross",
  "Toyota Yaris",
  "Nissan Sunny",
  "Nissan Almera",
  "Nissan X-Trail",
  "Nissan Qashqai",
  "Nissan Patrol",
  "Nissan Terra",
  "Mitsubishi Outlander",
  "Mitsubishi Pajero",
  "Mitsubishi Lancer",
  "Mitsubishi ASX",
  "Mitsubishi Triton",
  "Suzuki Swift",
  "Suzuki Dzire",
  "Suzuki Vitara",
  "Suzuki Jimny",
  "Suzuki SX4",
  "Mazda Mazda3",
  "Mazda Mazda6",
  "Mazda CX 5",
  "Mazda CX 30",
  "Mazda CX 9",
  "Volkswagen Polo",
  "Volkswagen Tiguan",
  "Volkswagen Passat",
  "Volkswagen Jetta",
  "Volkswagen Caddy",
  "Skoda Rapid",
  "Skoda Octavia",
  "Skoda Kodiaq",
  "Skoda Karoq",
  "Renault Logan",
  "Renault Sandero",
  "Renault Duster",
  "Renault Koleos",
  "Renault Arkana",
  "Peugeot 208",
  "Peugeot 301",
  "Peugeot 3008",
  "Peugeot 5008",
  "Citroen C3",
  "Citroen C4",
  "Citroen C5 Aircross",
  "Ford Fiesta",
  "Ford Focus",
  "Ford Transit",
  "Ford Ranger",
  "Ford Explorer",
  "Mercedes Benz A Class",
  "Mercedes Benz C Class",
  "Mercedes Benz E Class",
  "Mercedes Benz S Class",
  "Mercedes Benz GLC",
  "Mercedes Benz GLE",
  "Mercedes Benz GLS",
  "Mercedes Benz Sprinter",
  "Mercedes Benz Vito",
  "BMW 3 Series",
  "BMW 5 Series",
  "BMW 7 Series",
  "BMW X3",
  "BMW X5",
  "BMW X7",
  "Audi A3",
  "Audi A4",
  "Audi A6",
  "Audi Q3",
  "Audi Q5",
  "Audi Q7",
  "Volvo S60",
  "Volvo S90",
  "Volvo XC40",
  "Volvo XC60",
  "Volvo XC90",
  "MG MG3",
  "MG HS",
  "MG ZS",
  "MG5",
  "Geely Emgrand",
  "Geely Atlas",
  "Geely Tugella",
  "Geely Coolray",
  "JAC JAC S2",
  "JAC JAC S3",
  "JAC T8",
  "FAW Besturn",
  "FAW Hongqi",
  "Isuzu D Max",
  "Tesla Model 3",
  "Tesla Model Y",
];

// CarTypeModal Component
const CarTypeModal = ({ isOpen, onClose, onSelectCar, currentCar }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [manualCar, setManualCar] = useState("");
  if (!isOpen) return null;
  const filteredCars = allCars.filter((car) => car.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleManualSelect = () => {
    if (manualCar.trim()) {
      onSelectCar(manualCar.trim());
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-md h-auto max-h-[80vh] flex flex-col animate-scale-in">
        <div className="retro-title-bar">
          <span>{t("selectCar")}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <div className="p-2 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search or type your car..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setManualCar(e.target.value);
            }}
            className="w-full retro-input"
          />
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredCars.map((car, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectCar(car);
                onClose();
              }}
              className={`w-full p-2 text-left rounded-md flex justify-between items-center ${currentCar === car ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}
            >
              {car}
              {currentCar === car && <CheckCircle className="h-5 w-5 text-black" />}
            </button>
          ))}
        </div>
        <div className="p-2 border-t border-gray-200">
          <p className="text-sm mb-2 text-center text-gray-500">Can't find your car?</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add it manually"
              value={manualCar}
              onChange={(e) => setManualCar(e.target.value)}
              className="w-full retro-input"
            />
            <button onClick={handleManualSelect} className="retro-button">
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// LocationSelectModal Component
const LocationSelectModal = ({ title, isOpen, onClose, onSelect }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };
  const filteredLocations = uzbekistanLocations
    .map((regionData) => ({
      ...regionData,
      cities: regionData.cities.filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
    .filter(
      (regionData) =>
        regionData.cities.length > 0 || regionData.region.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-md h-[80vh] flex flex-col animate-scale-in">
        <div className="retro-title-bar">
          <span>{title}</span>
          <button onClick={handleClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <div className="p-2 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder={t("searchCity")}
              className="w-full retro-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((regionData, regionIndex) => (
              <div key={`${regionData.region}-${regionIndex}`}>
                <h3 className="w-full text-left p-1 font-bold text-gray-500 text-sm select-none">
                  {regionData.region}
                </h3>
                {regionData.cities.map((city, cityIndex) => (
                  <button
                    key={`${regionData.region}-${city}-${cityIndex}`}
                    onClick={() => {
                      onSelect(city);
                      handleClose();
                    }}
                    className="w-full text-left pl-4 py-1.5 hover:bg-gray-100 rounded-md text-sm"
                  >
                    {city}
                  </button>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center mt-10 text-gray-500">{t("noLocations")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// PostRideForm Component
const PostRideForm = ({ onClose, onConfirmPost, initialValues, isEditing, onStopRide, onArchiveRide, userPhone }) => {
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
  const [contactNumber, setContactNumber] = useState(initialValues?.contactNumber || userPhone);
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
    contactNumber &&
    (departureType !== "fixed" || (departureStartTime && departureEndTime)) &&
    (mailService !== "yes" || mailPrice);
  const handleSubmit = (e) => {
    e.preventDefault();
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
        contactNumber,
      };
      onConfirmPost(newRideData);
    }
  };
  const DatePickerModal = ({ isOpen, onClose, onSelectDate }) => {
    if (!isOpen) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const dates = Array.from(
      {
        length: daysInMonth,
      },
      (_, i) => i + 1,
    );
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
        <div className="retro-window w-full max-w-xs flex flex-col animate-scale-in">
          <div className="retro-title-bar">
            <span>{t("selectDepDate")}</span>
            <button onClick={onClose} className="retro-title-bar-button">
              X
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            <div className="text-center font-semibold mb-4">{currentMonth}</div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({
                length: new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
              }).map((_, i) => (
                <div key={`pad-${i}`}></div>
              ))}
              {dates.map((day) => {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                date.setHours(0, 0, 0, 0);
                const isToday =
                  day === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();
                const isPast = date < today;
                const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (!isPast) {
                        onSelectDate(dateString);
                        onClose();
                      }
                    }}
                    className={`p-2 rounded-md aspect-square transition-colors ${isToday ? "bg-black text-white" : ""} ${isPast ? "text-gray-300" : "hover:bg-gray-100"}`}
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{isEditing ? t("editRide") : t("postNewRide")}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <div>
            <button
              type="button"
              onClick={() => setShowFromModal(true)}
              className="w-full h-12 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center px-3 hover:bg-gray-50"
            >
              <span className={fromLocation ? "text-gray-900" : "text-gray-500"}>{fromLocation || t("fromWhere")}</span>
              <MapPin className="h-5 w-5 text-gray-400" />
            </button>
            <LocationSelectModal
              title={t("selectOrigin")}
              isOpen={showFromModal}
              onClose={() => setShowFromModal(false)}
              onSelect={setFromLocation}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowToModal(true)}
              className="w-full h-12 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center px-3 hover:bg-gray-50"
            >
              <span className={toLocation ? "text-gray-900" : "text-gray-500"}>{toLocation || t("toWhere")}</span>
              <MapPin className="h-5 w-5 text-gray-400" />
            </button>
            <LocationSelectModal
              title={t("selectDestination")}
              isOpen={showToModal}
              onClose={() => setShowToModal(false)}
              onSelect={setToLocation}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowDateModal(true)}
              className="w-full h-12 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center px-3 hover:bg-gray-50"
            >
              <span className={departureDate ? "text-gray-900" : "text-gray-500"}>
                {departureDate || t("departureDate")}
              </span>
              <Calendar className="h-5 w-5 text-gray-400" />
            </button>
            <DatePickerModal
              isOpen={showDateModal}
              onClose={() => setShowDateModal(false)}
              onSelectDate={setDepartureDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t("mailService")}</label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMailService("yes")}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${mailService === "yes" ? "border-black bg-gray-100" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <p className="font-semibold">{t("yesCarryMail")}</p>
                <p className="text-sm text-gray-500">{t("mailDescYes")}</p>
              </button>
              {mailService === "yes" && (
                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">{t("mailPriceLabel")}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-p]*"
                    placeholder={t("enterMailPrice")}
                    className="w-full h-12 border border-gray-300 rounded-md px-3"
                    value={mailPrice}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-p]*$/.test(value)) setMailPrice(value);
                    }}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setMailService("no")}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${mailService === "no" ? "border-black bg-gray-100" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <p className="font-semibold">{t("noCarryMail")}</p>
                <p className="text-sm text-gray-500">{t("mailDescNo")}</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("freeSeats")}</label>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((seats) => (
                <button
                  key={seats}
                  type="button"
                  onClick={() => setFreeSeats(seats)}
                  className={`h-12 rounded-md border text-base font-semibold ${freeSeats === seats ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}
                >
                  {seats}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("departureType")}</label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setDepartureType("fixed")}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${departureType === "fixed" ? "border-black bg-gray-100" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <p className="font-semibold">{t("fixedDeparture")}</p>
                <p className="text-sm text-gray-500">{t("fixedDepartureDesc")}</p>
              </button>
              {departureType === "fixed" && (
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="text-sm text-gray-500">{t("from")}</span>
                  <input
                    type="time"
                    value={departureStartTime}
                    onChange={(e) => setDepartureStartTime(e.target.value)}
                    className="h-10 border border-gray-300 rounded-md px-3 text-center flex-1"
                  />
                  <span className="text-sm text-gray-500">{t("to")}</span>
                  <input
                    type="time"
                    value={departureEndTime}
                    onChange={(e) => setDepartureEndTime(e.target.value)}
                    className="h-10 border border-gray-300 rounded-md px-3 text-center flex-1"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setDepartureType("when_fills")}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${departureType === "when_fills" ? "border-black bg-gray-100" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <p className="font-semibold">{t("whenFills")}</p>
                <p className="text-sm text-gray-500">{t("whenFillsDesc")}</p>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("price")}</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-p]*"
              placeholder={t("enterPrice")}
              className="w-full h-12 border border-gray-300 rounded-md px-3"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-p]*$/.test(value)) setPrice(value);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("yourNumber")}</label>
            <input
              type="text"
              placeholder={t("phone")}
              className="w-full h-12 border border-gray-300 rounded-md px-3"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full h-12 retro-button primary" disabled={!isFormValid}>
            {isEditing ? t("updateRide") : t("postRide")}
          </button>
          {isEditing && (
            <div className="flex gap-2 mt-4">
              {initialValues.status === "upcoming" && (
                <button type="button" onClick={onArchiveRide} className="w-full h-12 retro-button">
                  {t("archiveRide")}
                </button>
              )}
              {initialValues.status === "in-progress" && (
                <button type="button" onClick={onStopRide} className="w-full h-12 retro-button danger">
                  {t("stopRide")}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// RideDetailModal Component
const RideDetailModal = ({ ride, isOpen, onClose, onRepost }) => {
  const { t } = useLanguage();
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
  });
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
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in"
      onClick={() => setSelectedPassenger(null)}
    >
      {selectedPassenger && (
        <div
          className="bg-white rounded-md shadow-lg border fixed z-[51] p-1 space-y-1"
          style={{
            top: popoverPosition.top,
            left: popoverPosition.left,
          }}
        >
          <button className="w-full flex items-center px-3 py-1 text-sm hover:bg-gray-100 rounded-md">
            <Phone className="h-4 w-4 mr-2" />
            {t("call")}
          </button>
          <button className="w-full flex items-center px-3 py-1 text-sm hover:bg-gray-100 rounded-md">
            <Send className="h-4 w-4 mr-2" />
            {t("message")}
          </button>
        </div>
      )}
      <div className="retro-window w-full max-w-md flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="retro-title-bar">
          <span>{t("rideDetails")}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg">
                {ride.fromLocation} → {ride.toLocation}
              </p>
            </div>
            <span className="font-bold text-lg">{ride.price}$</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <strong>{t("departureDate")}:</strong> {ride.departureDate}
            </p>
            {ride.departureStartTime && (
              <p>
                <strong>{t("fixedDeparture")}:</strong> {ride.departureStartTime} - {ride.departureEndTime}
              </p>
            )}
            <p>
              <strong>{t("mailService")}:</strong>{" "}
              {ride.mailService === "yes" ? `${t("yesCarryMail")} (${ride.mailPrice}$)` : t("noCarryMail")}
            </p>
            <p>
              <strong>{t("departureType")}:</strong>{" "}
              {ride.departureType === "fixed" ? t("fixedDeparture") : t("whenFills")}
            </p>
            <p>
              <strong>{t("carType")}:</strong> {ride.carType}
            </p>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div>
            <h3 className="font-bold mb-2">{t("passengers")}</h3>
            <div className="space-y-2">
              {ride.passengers && ride.passengers.length > 0 ? (
                ride.passengers.map((p) => (
                  <button
                    key={p.id}
                    onClick={(e) => handlePassengerClick(p, e)}
                    className="w-full flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center mr-3 rounded-full bg-gray-200`}>
                      {p.gender === "male" ? <User className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
                    </div>
                    <span className="font-semibold">{p.name}</span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No passengers on this ride.</p>
              )}
            </div>
          </div>
        </div>
        {ride.status === "archived" && (
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={() => onRepost(ride)}
              className="w-full retro-button primary flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              {t("repostRide")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// EditProfileModal Component
const EditProfileModal = ({ user, isOpen, onClose, onSave }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(user);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-md flex flex-col animate-scale-in">
        <div className="retro-title-bar">
          <span>{t("editProfile")}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block font-semibold mb-1 text-sm">{t("fullName")}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full retro-input"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-sm">{t("username")}</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full retro-input"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-sm">{t("phone")}</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full retro-input"
            />
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="retro-button primary">
              {t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// EditCarModal Component
const EditCarModal = ({ car, isOpen, onClose, onSave }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(car);
  useEffect(() => {
    setFormData(car);
  }, [car]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-md flex flex-col animate-scale-in">
        <div className="retro-title-bar">
          <span>{t("editVehicle")}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full retro-input"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full retro-input"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full retro-input"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="w-full retro-input"
          />
          <input
            type="text"
            name="plate"
            placeholder={t("licensePlate")}
            value={formData.plate}
            onChange={handleChange}
            className="w-full retro-input"
          />
          <div className="flex justify-end pt-4">
            <button type="submit" className="retro-button primary">
              {t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Generic SettingsModal Component
const SettingsModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-md flex flex-col h-auto max-h-[80vh] animate-scale-in">
        <div className="retro-title-bar">
          <span>{title}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          {children || <p>Settings content goes here.</p>}
        </div>
      </div>
    </div>
  );
};

// ProfilePage Component
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
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center text-gray-600">
        <Icon className="h-5 w-5 mr-3" />
        <span>{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
  const SettingsItem = ({ icon: Icon, label, action = () => {}, value }) => (
    <button
      onClick={action}
      className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 text-gray-500" />
        <span>{label}</span>
      </div>
      <div className="flex items-center">
        {value && <span className="mr-2 text-gray-500">{value}</span>}
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </button>
  );
  const LanguageSelectionContent = ({ currentLanguage, onSelectLanguage }) => {
    const languages = [
      {
        key: "uz",
        name: t("uzbek"),
      },
      {
        key: "en",
        name: t("english"),
      },
      {
        key: "ru",
        name: t("russian"),
      },
    ];
    return (
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang.key}
            onClick={() => {
              onSelectLanguage(lang.key);
              setShowSettingsModal(false);
            }}
            className={`w-full p-3 text-left flex justify-between items-center rounded-lg ${currentLanguage === lang.key ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}
          >
            {lang.name}
            {currentLanguage === lang.key && <CheckCircle className="h-5 w-5 text-black" />}
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className="p-4 space-y-4 pb-20">
      <EditProfileModal
        user={user}
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={onUpdateUser}
      />
      <EditCarModal car={user.car} isOpen={showEditCar} onClose={() => setShowEditCar(false)} onSave={onUpdateCar} />
      <SettingsModal title={settingsModalTitle} isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)}>
        {settingsModalContent}
      </SettingsModal>

      <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-gray-50">
        <div className="relative">
          <Avatar src={user.profilePicture} size="w-24 h-24" initials="JD" bgColor="bg-gray-200" />
          <button
            onClick={() => setShowEditProfile(true)}
            className="absolute bottom-0 right-0 retro-button !p-2 !rounded-full"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        <h2 className="text-2xl font-bold">{user.fullName}</h2>
        <p className="text-sm text-gray-500 -mt-2">{t("driverLabel")}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gray-800 mr-1" />
            <span className="font-semibold text-gray-900">{user.rating}</span> ({user.reviews} {t("reviews")})
          </div>
          <span>|</span>
          <span>
            {user.completedRides} {t("rides")}
          </span>
        </div>
      </div>

      <div className="p-2 border rounded-lg bg-gray-50 divide-y divide-gray-200">
        <InfoItem icon={User} label={t("username")} value={`@${user.username}`} />
        <InfoItem icon={Phone} label={t("phone")} value={user.phone} />
      </div>

      <div className="p-4 border rounded-lg bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{t("driverDetails")}</h3>
          <button onClick={() => setShowEditCar(true)} className="retro-button !p-2 !rounded-full">
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        <InfoItem icon={Car} label={t("vehicle")} value={`${user.car.brand} ${user.car.model} (${user.car.year})`} />
      </div>

      <div className="p-2 border rounded-lg bg-gray-50">
        <h3 className="font-bold mb-1 px-2">{t("settings")}</h3>
        <div className="space-y-1">
          <SettingsItem
            icon={Languages}
            label={t("language")}
            value={t(language === "en" ? "english" : language === "uz" ? "uzbek" : "russian")}
            action={() =>
              handleOpenSettings(
                t("language"),
                <LanguageSelectionContent currentLanguage={language} onSelectLanguage={setLanguage} />,
              )
            }
          />
          <SettingsItem
            icon={UserPlus}
            label={t("switchAccount")}
            value=""
            action={() => {
              /* In a real app, this would trigger an auth flow */
            }}
          />
        </div>
      </div>
    </div>
  );
};

// LanguageProvider Component (manages translations)
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = (key) => {
    return translations[language][key] || key;
  };
  const value = {
    language,
    setLanguage,
    t,
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// ArchiveConfirmModal Component
const ArchiveConfirmModal = ({ isOpen, onClose, onConfirm, rideStatus }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;
  const isUpcoming = rideStatus === "upcoming";
  const title = isUpcoming ? t("archiveRide") : t("stopRide");
  const message = isUpcoming ? t("confirmArchiveRide") : `${t("youLoseClients")} ${t("confirmStopRide")}`;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-sm p-0 text-center animate-scale-in">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="mb-6 text-gray-600">{message}</p>
          <div className="flex justify-center gap-4">
            <button onClick={onClose} className="retro-button flex-1">
              {t("cancel")}
            </button>
            <button onClick={onConfirm} className="retro-button danger flex-1">
              {isUpcoming ? "Yes, archive" : "Yes, stop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ConfirmationModal for posting a ride
const ConfirmationModal = ({ isOpen, onClose, onConfirm, onEdit, rideData, userData }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-sm flex flex-col animate-scale-in">
        <div className="retro-title-bar">
          <span>{t("confirmRidePost")}</span>
          <button onClick={onClose} className="retro-title-bar-button">
            X
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold">
            {rideData.fromLocation} → {rideData.toLocation}
          </h3>
          <p>
            <strong>{t("price")}:</strong> {rideData.price}$
          </p>
          <p>
            <strong>{t("departureDate")}:</strong> {rideData.departureDate}
          </p>
          {rideData.departureType === "fixed" && (
            <p>
              <strong>{t("fixedDeparture")}:</strong> {rideData.departureStartTime} - {rideData.departureEndTime}
            </p>
          )}
          <p>
            <strong>{t("freeSeats")}:</strong> {rideData.freeSeats}
          </p>
          {rideData.mailService === "yes" && (
            <p>
              <strong>{t("mailService")}:</strong> {rideData.mailPrice}$
            </p>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-sm mb-1 text-gray-600">{t("confirmPhone")}</p>
            <p className="text-lg font-bold">{userData.phone}</p>
          </div>
        </div>
        <div className="p-2 flex justify-center gap-4 mt-2 bg-gray-50 border-t border-gray-200">
          <button onClick={onEdit} className="retro-button flex-1">
            {t("noEdit")}
          </button>
          <button onClick={onConfirm} className="retro-button primary flex-1">
            {t("yesPost")}
          </button>
        </div>
      </div>
    </div>
  );
};

// NewRideOptionsModal Component (Start new or choose from archive)
const NewRideOptionsModal = ({ isOpen, onClose, onStartNewRide, onChooseFromArchive }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
      <div className="retro-window w-full max-w-sm p-6 text-center animate-scale-in">
        <h2 className="text-xl font-bold mb-6">{t("newRide")}</h2>
        <div className="space-y-4">
          <button
            onClick={onStartNewRide}
            className="w-full h-12 retro-button primary flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {t("postNewRide")}
          </button>
          <button
            onClick={onChooseFromArchive}
            className="w-full h-12 retro-button flex items-center justify-center gap-2"
          >
            <ArchiveIcon className="h-5 w-5" />
            {t("archive")}
          </button>
        </div>
        <button onClick={onClose} className="mt-6 text-sm text-gray-600 hover:underline">
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};
const ArchivePage = ({ archivedRides, onRideClick, onClose }) => {
  const { t } = useLanguage();
  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center mb-4">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold ml-2">{t("archive")}</h2>
      </div>
      {archivedRides.length > 0 ? (
        archivedRides.map((ride) => (
          <button
            key={ride.id}
            onClick={() => onRideClick(ride)}
            className="w-full text-left p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">
                  {ride.fromLocation} → {ride.toLocation}
                </p>
                <p className="text-sm text-gray-600 mt-1">{ride.departureDate}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-gray-700">Archived</p>
                <p className="text-xs text-gray-500">{ride.status === "cancelled" ? "Cancelled" : "Archived"}</p>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="p-4 text-center">
          <div className="mt-8 p-8 bg-gray-50 rounded-lg">
            <ArchiveIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-4 mb-2 font-semibold">No archived rides.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Main AppContent component that manages the state of the application
const AppContent = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showCarTypeModal, setShowCarTypeModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState("Chevrolet Lacetti");
  const [isSearchingForClients, setIsSearchingForClients] = useState(false);
  const [myRides, setMyRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
  });
  const [isRideInProgress, setIsRideInProgress] = useState(false);
  const [showActiveRideErrorModal, setShowActiveRideErrorModal] = useState(false);
  const [showFinishRideModal, setShowFinishRideModal] = useState(false);
  const [showHistoryDetailModal, setShowHistoryDetailModal] = useState(false);
  const [selectedHistoryRide, setSelectedHistoryRide] = useState(null);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [showPostConfirmationModal, setShowPostConfirmationModal] = useState(false);
  const [rideDataToPost, setRideDataToPost] = useState(null);
  const [archivedRides, setArchivedRides] = useState([]);
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false);
  const [repostRideData, setRepostRideData] = useState(null);
  const [showNewRideOptionsModal, setShowNewRideOptionsModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRide, setEditingRide] = useState(null);
  const [showArchive, setShowArchive] = useState(false);
  useEffect(() => {
    // Mock data fetch
    const fetchMyRides = async () => {
      const mockCompletedRides = [
        {
          id: 101,
          fromLocation: "Tashkent",
          toLocation: "Samarkand",
          departureDate: "2025-09-18",
          price: "50",
          status: "completed",
          carType: "Chevrolet Cobalt",
          passengers: [
            {
              id: 1,
              name: "Anna",
              gender: "female",
            },
          ],
        },
        {
          id: 102,
          fromLocation: "Bukhara",
          toLocation: "Khiva",
          departureDate: "2025-09-15",
          price: "70",
          status: "completed",
          carType: "Lada Vesta",
          passengers: [
            {
              id: 2,
              name: "Mark",
              gender: "male",
            },
          ],
        },
      ];
      setMyRides(mockCompletedRides);
      const mockArchivedRides = [
        {
          id: 201,
          fromLocation: "Fergana",
          toLocation: "Andijan",
          departureDate: "2025-09-10",
          price: "30",
          status: "archived",
          carType: "BYD Song Plus",
          passengers: [],
        },
      ];
      setArchivedRides(mockArchivedRides);
    };
    fetchMyRides();
  }, []);

  // Mock user data
  const [userData, setUserData] = useState({
    profilePicture: "https://placehold.co/100x100/e0e0e0/000000?text=JD",
    fullName: "John Doe",
    username: "johndoe99",
    phone: "+998 90 123 45 67",
    rating: 4.9,
    reviews: 124,
    completedRides: 215,
    car: {
      brand: "Chevrolet",
      model: "Cobalt",
      year: 2023,
      color: "White",
      plate: "01 A 123 BC",
    },
  });
  const handleUpdateUser = (updatedData) =>
    setUserData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  const handleUpdateCar = (updatedCarData) =>
    setUserData((prev) => ({
      ...prev,
      car: updatedCarData,
    }));
  const handleNewRideClick = () => {
    if (activeRide) {
      setShowActiveRideErrorModal(true);
    } else {
      setShowNewRideOptionsModal(true);
    }
  };
  const handleStartNewRide = () => {
    setShowNewRideOptionsModal(false);
    setShowPostRide(true);
  };
  const handleChooseFromArchive = () => {
    setShowNewRideOptionsModal(false);
    setShowArchive(true);
  };
  const handleConfirmPost = (newRideData) => {
    setRideDataToPost(newRideData);
    setShowPostRide(false);
    setShowPostConfirmationModal(true);
  };
  const executeAddRide = async () => {
    if (!rideDataToPost) return;
    setShowPostConfirmationModal(false);
    const bookedSeatsCount = 4 - rideDataToPost.freeSeats;
    const mockPassengers = Array.from(
      {
        length: bookedSeatsCount,
      },
      (_, i) => ({
        id: i + 1,
        name: `Passenger ${i + 1}`,
        gender: i % 2 === 0 ? "female" : "male",
      }),
    );
    const rideWithId = {
      ...rideDataToPost,
      id: Date.now(),
      status: "upcoming",
      passengers: mockPassengers,
      carType: selectedCar,
    };
    setRideDataToPost(null);
    setIsSearchingForClients(true);
    setTimeout(() => {
      setActiveRide(rideWithId);
      setIsSearchingForClients(false);
    }, 3000);
  };
  const handleStopRide = () => {
    const rideToStop = editingRide;
    if (rideToStop) {
      setArchivedRides((prev) => [
        ...prev,
        {
          ...rideToStop,
          status: "cancelled",
        },
      ]);
      if (activeRide && activeRide.id === rideToStop.id) {
        setActiveRide(null);
        setIsRideInProgress(false);
      }
    }
    setShowArchiveConfirmModal(false);
    setIsEditModalOpen(false);
  };
  const handleArchiveRide = () => {
    const rideToArchive = editingRide;
    if (rideToArchive) {
      setArchivedRides((prev) => [
        ...prev,
        {
          ...rideToArchive,
          status: "archived",
        },
      ]);
      if (activeRide && activeRide.id === rideToArchive.id) setActiveRide(null);
    }
    setShowArchiveConfirmModal(false);
    setIsEditModalOpen(false);
  };
  const handleRemovePassenger = (passengerId) => {
    setActiveRide((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        passengers: prev.passengers.filter((p) => p.id !== passengerId),
        freeSeats: prev.freeSeats + 1,
      };
    });
    setSelectedPassenger(null);
  };
  const handleStartRide = () => {
    setShowConfirmationModal(false);
    setIsRideInProgress(true);
  };
  const handleFinishRideClick = () => setShowFinishRideModal(true);
  const confirmFinishRide = () => {
    setMyRides((prevRides) => [
      ...prevRides,
      {
        ...activeRide,
        status: "completed",
      },
    ]);
    setActiveRide(null);
    setIsRideInProgress(false);
    setShowFinishRideModal(false);
  };
  const handleHistoryRideClick = (ride) => {
    setSelectedHistoryRide(ride);
    setShowHistoryDetailModal(true);
  };
  const handlePassengerClick = (passenger, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    });
    setSelectedPassenger(passenger);
  };
  const handleRepostRide = (ride) => {
    setShowHistoryDetailModal(false);
    setRepostRideData(ride);
    setShowPostRide(true);
  };
  const totalEarnings = myRides
    .filter((ride) => ride.status === "completed")
    .reduce((sum, ride) => sum + (parseFloat(ride.price) || 0), 0);
  const bottomNavItems = [
    {
      id: "dashboard",
      label: t("ride"),
      icon: MapPin,
    },
    {
      id: "history",
      label: t("history"),
      icon: History,
    },
  ];
  const handleEditRideClick = (ride) => {
    setEditingRide(ride);
    setIsEditModalOpen(true);
  };
  const handleSaveEditedRide = (updatedRide) => {
    const bookedSeatsCount = 4 - updatedRide.freeSeats;
    const mockPassengers = Array.from(
      {
        length: bookedSeatsCount,
      },
      (_, i) => ({
        id: i + 1,
        name: `Passenger ${i + 1}`,
        gender: i % 2 === 0 ? "female" : "male",
      }),
    );
    const finalUpdatedRide = {
      ...updatedRide,
      passengers: mockPassengers,
    };
    setMyRides((prev) => prev.map((r) => (r.id === finalUpdatedRide.id ? finalUpdatedRide : r)));
    if (activeRide && activeRide.id === finalUpdatedRide.id) setActiveRide(finalUpdatedRide);
    setIsEditModalOpen(false);
    setEditingRide(null);
  };
  const renderActiveRideContent = () => {
    if (isSearchingForClients) {
      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
          <p className="text-gray-500">{t("searchingForClients")}</p>
        </div>
      );
    }
    if (activeRide) {
      return (
        <>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg">
                  {activeRide.fromLocation} → {activeRide.toLocation}
                </p>
              </div>
              <span className="font-bold text-lg">{activeRide.price}$</span>
            </div>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>{t("departureDate")}:</strong> {activeRide.departureDate}
              </p>
              {activeRide.departureStartTime && (
                <p>
                  <strong>{t("fixedDeparture")}:</strong> {activeRide.departureStartTime} -{" "}
                  {activeRide.departureEndTime}
                </p>
              )}
            </div>
            <div className="border-t border-gray-200 my-3"></div>
            <div>
              <p className="font-bold mb-2">{t("passengers")}</p>
              <div className="flex space-x-2">
                {activeRide.passengers.map((p) => (
                  <div
                    key={p.id}
                    onClick={(e) => handlePassengerClick(p, e)}
                    className={`w-10 h-10 flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-full bg-gray-200`}
                  >
                    {p.gender === "male" ? <User className="h-6 w-6" /> : <UserRound className="h-6 w-6" />}
                  </div>
                ))}
                {Array.from({
                  length: activeRide.freeSeats,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-full relative"
                  >
                    <div className="radar-emitter-small">
                      <div className="radar-wave"></div>
                      <div className="radar-wave"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 p-2 flex gap-2 mt-auto bg-gray-50">
            {isRideInProgress ? (
              <button
                onClick={handleFinishRideClick}
                className="retro-button danger w-full flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                {t("finishRide")}
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleEditRideClick(activeRide)}
                  className="retro-button w-full flex items-center justify-center gap-2"
                >
                  <Edit2 className="h-5 w-5" />
                  {t("editRide")}
                </button>
                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="retro-button primary w-full flex items-center justify-center gap-2"
                >
                  <Navigation className="h-5 w-5" />
                  {t("letsGo")}
                </button>
              </>
            )}
          </div>
        </>
      );
    }
    return <p className="text-center p-8 text-gray-500">{t("noActiveRide")}</p>;
  };
  const renderContent = () => {
    if (showMessages) return <MessageDashboard onClose={() => setShowMessages(false)} />;
    if (showStatsModal) return <StatsModal onClose={() => setShowStatsModal(false)} />;
    if (showArchive)
      return (
        <ArchivePage
          archivedRides={archivedRides}
          onRideClick={handleHistoryRideClick}
          onClose={() => setShowArchive(false)}
        />
      );
    const completedRides = myRides.filter((r) => r.status === "completed");
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-4 space-y-4 font-sans">
            <div className="space-y-4">
              <div className="text-center py-2">
                <button
                  onClick={() => setShowCarTypeModal(true)}
                  className="text-sm text-gray-500 hover:text-black transition-colors group"
                >
                  Your current car: <span className="font-semibold text-black">{selectedCar}</span>
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs">(change)</span>
                </button>
              </div>
              <div className="flex items-stretch gap-2">
                <button
                  onClick={handleNewRideClick}
                  className="flex-1 text-left p-4 flex items-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 mr-4 rounded-full bg-gray-100">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t("postNewRide")}</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setShowArchive(true);
                  }}
                  className="retro-button px-4 flex flex-col items-center justify-center"
                >
                  <ArchiveIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 border-b bg-gray-50 font-semibold">{t("yourActivity")}</div>
              <div className="flex flex-col">{renderActiveRideContent()}</div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="p-4 space-y-4 pb-20">
            {completedRides.length > 0 ? (
              completedRides.map((ride) => (
                <button
                  key={ride.id}
                  onClick={() => handleHistoryRideClick(ride)}
                  className="w-full text-left p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">
                        {ride.fromLocation} → {ride.toLocation}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{ride.departureDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-black">+{ride.price}$</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center">
                <div className="mt-8 p-8 bg-gray-50 rounded-lg">
                  <History className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-4 mb-2 font-semibold">{t("noCompletedRides")}</p>
                </div>
              </div>
            )}
          </div>
        );
      case "profile":
        return (
          <ProfilePage
            user={{
              ...userData,
              language,
            }}
            onUpdateUser={handleUpdateUser}
            onUpdateCar={handleUpdateCar}
            myRides={myRides}
            openOnMount={openProfileEdit}
            onMountHandled={() => setOpenProfileEdit(false)}
          />
        );
      default:
        return null;
    }
  };
  const isOverlayOpen =
    showNewRideOptionsModal ||
    showPostRide ||
    isEditModalOpen ||
    showStatsModal ||
    showHistoryDetailModal ||
    showPostConfirmationModal ||
    showArchiveConfirmModal ||
    showActiveRideErrorModal ||
    showFinishRideModal ||
    showConfirmationModal ||
    showCarTypeModal ||
    showMessages;
  return (
    <div className="h-screen bg-white text-gray-900 flex flex-col font-sans">
      <ModernUIStyles />
      <ModernScrollbarStyles />
      {selectedPassenger && (
        <div
          className="bg-white rounded-md shadow-lg border fixed z-50 p-1 space-y-1"
          style={{
            top: popoverPosition.top,
            left: popoverPosition.left,
          }}
          onClick={() => selectedPassenger && setSelectedPassenger(null)}
        >
          <button className="w-full flex items-center px-3 py-1 text-sm hover:bg-gray-100 rounded-md">
            <Phone className="h-4 w-4 mr-2" />
            {t("call")}
          </button>
          <button className="w-full flex items-center px-3 py-1 text-sm hover:bg-gray-100 rounded-md">
            <Send className="h-4 w-4 mr-2" />
            {t("message")}
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            onClick={() => handleRemovePassenger(selectedPassenger.id)}
            className="w-full flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded-md"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t("removePassenger")}
          </button>
        </div>
      )}
      <div className={`relative flex flex-col flex-1 ${isOverlayOpen ? "pointer-events-none" : ""}`}>
        <header className="p-2 border-b flex items-center justify-between z-20">
          <div className="flex-1 flex justify-start">
            <button onClick={() => setActiveTab("dashboard")} className="retro-button">
              {userData.phone}
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={() => setActiveTab("profile")} className="retro-button flex items-center gap-2">
              <span>{userData.fullName}</span>
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main
          className="flex-grow overflow-y-auto custom-scrollbar h-full relative"
          onClick={() => selectedPassenger && setSelectedPassenger(null)}
        >
          {renderContent()}
        </main>
        {!(
          showMessages ||
          showPostRide ||
          isEditModalOpen ||
          showStatsModal ||
          showHistoryDetailModal ||
          showArchive
        ) && (
          <footer className="border-t z-10 p-1">
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
                    className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-colors ${isActive ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <Icon className={`h-6 w-6 mb-1`} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </footer>
        )}
      </div>

      {showPostRide && (
        <PostRideForm
          onClose={() => {
            setShowPostRide(false);
            setRepostRideData(null);
          }}
          onConfirmPost={handleConfirmPost}
          initialValues={repostRideData}
          isEditing={false}
          onStopRide={() => {}}
          onArchiveRide={() => {}}
          userPhone={userData.phone}
        />
      )}
      {isEditModalOpen && editingRide && (
        <PostRideForm
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingRide(null);
          }}
          onConfirmPost={handleSaveEditedRide}
          onStopRide={() => {
            setEditingRide(activeRide);
            setShowArchiveConfirmModal(true);
          }}
          onArchiveRide={() => {
            setEditingRide(activeRide);
            setShowArchiveConfirmModal(true);
          }}
          initialValues={editingRide}
          isEditing={true}
          userPhone={userData.phone}
        />
      )}
      <CarTypeModal
        isOpen={showCarTypeModal}
        onClose={() => setShowCarTypeModal(false)}
        onSelectCar={setSelectedCar}
        currentCar={selectedCar}
      />
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="retro-window w-full max-w-sm p-0 text-center animate-scale-in">
            <div className="retro-title-bar">
              <span>{t("letsGo")}</span>
            </div>
            <div className="p-4">
              <p className="mb-6 text-gray-600">{t("areYouSure")}</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowConfirmationModal(false)} className="retro-button flex-1">
                  {t("cancel")}
                </button>
                <button onClick={handleStartRide} className="retro-button primary flex-1">
                  {t("okay")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showActiveRideErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="retro-window w-full max-w-sm p-0 text-center animate-scale-in">
            <div className="retro-title-bar">
              <span>Error</span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{t("activeRideErrorTitle")}</h2>
              <p className="mb-6 text-gray-600">{t("activeRideWarning")}</p>
              <button onClick={() => setShowActiveRideErrorModal(false)} className="w-full retro-button primary">
                {t("okay")}
              </button>
            </div>
          </div>
        </div>
      )}
      {showFinishRideModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="retro-window w-full max-w-sm p-0 text-center animate-scale-in">
            <div className="retro-title-bar">
              <span>{t("finishRide")}</span>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-600">{t("areYouSureFinish")}</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowFinishRideModal(false)} className="retro-button flex-1">
                  {t("cancel")}
                </button>
                <button onClick={confirmFinishRide} className="retro-button danger flex-1">
                  {t("yesFinish")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showHistoryDetailModal && (
        <RideDetailModal
          isOpen={showHistoryDetailModal}
          onClose={() => setShowHistoryDetailModal(false)}
          ride={selectedHistoryRide}
          onRepost={handleRepostRide}
        />
      )}
      {showPostConfirmationModal && (
        <ConfirmationModal
          isOpen={showPostConfirmationModal}
          onClose={() => setShowPostConfirmationModal(false)}
          onConfirm={executeAddRide}
          onEdit={() => {
            setShowPostConfirmationModal(false);
            setShowPostRide(true);
          }}
          rideData={rideDataToPost}
          userData={userData}
        />
      )}
      {showArchiveConfirmModal && editingRide && (
        <ArchiveConfirmModal
          isOpen={showArchiveConfirmModal}
          onClose={() => setShowArchiveConfirmModal(false)}
          onConfirm={() => (editingRide.status === "upcoming" ? handleArchiveRide() : handleStopRide())}
          rideStatus={editingRide.status}
        />
      )}
      {showNewRideOptionsModal && (
        <NewRideOptionsModal
          isOpen={showNewRideOptionsModal}
          onClose={() => setShowNewRideOptionsModal(false)}
          onStartNewRide={handleStartNewRide}
          onChooseFromArchive={handleChooseFromArchive}
        />
      )}
    </div>
  );
};

// StatsModal Component
const StatsModal = ({ onClose }) => {
  const { t } = useLanguage();
  const dailyEarningsData = [
    {
      day: "Mon",
      earnings: 120,
    },
    {
      day: "Tue",
      earnings: 98,
    },
    {
      day: "Wed",
      earnings: 150,
    },
    {
      day: "Thu",
      earnings: 80,
    },
    {
      day: "Fri",
      earnings: 200,
    },
    {
      day: "Sat",
      earnings: 250,
    },
    {
      day: "Sun",
      earnings: 180,
    },
  ];
  const recentTrips = [
    {
      id: 1,
      from: "Tashkent",
      to: "Samarkand",
      earnings: 50,
    },
    {
      id: 2,
      from: "Bukhara",
      to: "Khiva",
      earnings: 70,
    },
    {
      id: 3,
      from: "Fergana",
      to: "Andijan",
      earnings: 45,
    },
  ];
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center mb-4">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold ml-2">{t("stats")}</h2>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="p-3 border-b bg-gray-50 font-semibold">
          <span>{t("dailyEarnings")}</span>
        </div>
        <div
          className="p-2"
          style={{
            width: "100%",
            height: 300,
          }}
        >
          <ResponsiveContainer>
            <BarChart
              data={dailyEarningsData}
              margin={{
                top: 20,
                right: 20,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{
                  fill: "#374151",
                }}
              />
              <YAxis
                tick={{
                  fill: "#374151",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="earnings" fill="#111827" stroke="#111827" strokeWidth={2} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="p-3 border-b bg-gray-50 font-semibold">
          <span>{t("recentTrips")}</span>
        </div>
        <div className="p-2 space-y-2">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="font-semibold">
                  {trip.from} - {trip.to}
                </p>
              </div>
              <p className="font-bold text-black">+{trip.earnings}$</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Final App component wrapped in the LanguageProvider
const App = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);
export default App;
