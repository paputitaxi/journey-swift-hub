import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useLanguage, type Language } from '@/hooks/useLanguage';
import { useTheme } from '@/components/ThemeProvider';
import { StatsPage } from './StatsPage';
import { 
  User, 
  Globe, 
  Palette, 
  BarChart3, 
  HelpCircle, 
  Mail, 
  Phone,
  Car,
  ChevronRight,
  Settings
} from 'lucide-react';

export const AdvancedProfile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [showStats, setShowStats] = useState(false);
  const [accountType, setAccountType] = useState<'client' | 'dispatch' | 'heavyTruck'>('client');

  if (showStats) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowStats(false)}
          className="mb-4"
        >
          ← Back to Profile
        </Button>
        <StatsPage />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* User Info */}
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">John Driver</h2>
        <p className="text-sm text-muted-foreground">Member since 2023</p>
        <Badge variant="outline" className="mt-2">{accountType}</Badge>
      </div>

      {/* Contact Info */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">john@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">+998 90 123 4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Honda Civic 2022</span>
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('profile.account')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t('profile.accountType')}</label>
            <Select value={accountType} onValueChange={(value: any) => setAccountType(value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">{t('profile.client')}</SelectItem>
                <SelectItem value="dispatch">{t('profile.dispatch')}</SelectItem>
                <SelectItem value="heavyTruck">{t('profile.heavyTruck')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Language & Theme */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('profile.language')}</span>
            </div>
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uz">O'zbek</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('profile.theme')}</span>
            </div>
            <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="x">X (Twitter)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardContent className="p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-between"
            onClick={() => setShowStats(true)}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('profile.stats')}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            {t('profile.support')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            FAQ
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Help Center
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};