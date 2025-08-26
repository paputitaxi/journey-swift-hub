import React from 'react';
import { useLanguage, Language } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const languages = [
  { code: 'uz' as Language, name: 'O\'zbekcha', flag: '🇺🇿' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Choose Language</h1>
          <p className="text-muted-foreground">Select your preferred language</p>
        </div>
        
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className="w-full flex items-center gap-4 p-4 bg-background hover:bg-accent/50 border border-border/50 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {language.flag}
              </span>
              <span className="text-lg font-medium text-foreground flex-1 text-left">
                {language.name}
              </span>
              <div className="w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary transition-colors duration-200"></div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            You can change this later in settings
          </p>
        </div>
      </div>
    </div>
  );
};