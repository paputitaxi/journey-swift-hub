import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uz' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    // Navigation
    'nav.dashboard': 'Asosiy',
    'nav.lanes': 'Marshrutlarim',
    'nav.videos': 'Videolar',
    'nav.profile': 'Profil',
    
    // Profile
    'profile.language': 'Til',
    'profile.theme': 'Mavzu',
    'profile.account': 'Hisob',
    'profile.support': 'Yordam',
    'profile.stats': 'Statistika',
    'profile.accountType': 'Hisob turi',
    'profile.client': 'Mijoz',
    'profile.dispatch': 'Dispetcher',
    'profile.heavyTruck': 'Og\'ir yuk mashinasi',
    
    // Lanes
    'lanes.title': 'Marshrutlarim',
    'lanes.createNew': 'Yangi marshrut yaratish',
    'lanes.weekdays': 'Ish kunlari',
    'lanes.pricing': 'Narx',
    'lanes.departureTime': 'Jo\'nash vaqti',
    'lanes.from': 'Qayerdan',
    'lanes.to': 'Qayerga',
    
    // Common
    'common.save': 'Saqlash',
    'common.cancel': 'Bekor qilish',
    'common.edit': 'Tahrirlash',
    'common.delete': 'O\'chirish',
    'common.search': 'Qidirish',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.lanes': 'History',
    'nav.videos': 'Videos',
    'nav.profile': 'Profile',
    
    // Profile
    'profile.language': 'Language',
    'profile.theme': 'Theme',
    'profile.account': 'Account',
    'profile.support': 'Support',
    'profile.stats': 'Statistics',
    'profile.accountType': 'Account Type',
    'profile.client': 'Client',
    'profile.dispatch': 'Dispatch',
    'profile.heavyTruck': 'Heavy Truck',
    
    // Lanes
    'lanes.title': 'History',
    'lanes.createNew': 'Create New Lane',
    'lanes.weekdays': 'Weekdays',
    'lanes.pricing': 'Pricing',
    'lanes.departureTime': 'Departure Time',
    'lanes.from': 'From',
    'lanes.to': 'To',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
  },
  ru: {
    // Navigation
    'nav.dashboard': 'Главная',
    'nav.lanes': 'Мои Маршруты',
    'nav.videos': 'Видео',
    'nav.profile': 'Профиль',
    
    // Profile
    'profile.language': 'Язык',
    'profile.theme': 'Тема',
    'profile.account': 'Аккаунт',
    'profile.support': 'Поддержка',
    'profile.stats': 'Статистика',
    'profile.accountType': 'Тип аккаунта',
    'profile.client': 'Клиент',
    'profile.dispatch': 'Диспетчер',
    'profile.heavyTruck': 'Грузовик',
    
    // Lanes
    'lanes.title': 'Мои Маршруты',
    'lanes.createNew': 'Создать Маршрут',
    'lanes.weekdays': 'Дни недели',
    'lanes.pricing': 'Цена',
    'lanes.departureTime': 'Время отправления',
    'lanes.from': 'Откуда',
    'lanes.to': 'Куда',
    
    // Common
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.search': 'Поиск',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageProvider = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    if (saved && ['uz', 'en', 'ru'].includes(saved)) {
      return saved as Language;
    }
    
    // Detect device language
    const deviceLang = navigator.language.toLowerCase();
    if (deviceLang.startsWith('uz')) return 'uz';
    if (deviceLang.startsWith('ru')) return 'ru';
    return 'en'; // Default fallback
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
};