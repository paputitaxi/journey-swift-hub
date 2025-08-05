import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import LocationSelector from './LocationSelector';
import { useLanguage } from '@/hooks/useLanguage';

interface CreateLaneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const weekdays = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

export const CreateLaneModal: React.FC<CreateLaneModalProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureTime: '',
    pricePerSeat: '',
    selectedWeekdays: [] as string[]
  });
  const [showFromSelector, setShowFromSelector] = useState(false);
  const [showToSelector, setShowToSelector] = useState(false);

  const handleWeekdayChange = (weekdayId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedWeekdays: checked 
        ? [...prev.selectedWeekdays, weekdayId]
        : prev.selectedWeekdays.filter(id => id !== weekdayId)
    }));
  };

  const handleSave = () => {
    // Here you would save to database via Supabase
    console.log('Saving lane:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('lanes.createNew')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('lanes.from')}</Label>
              <Button 
                variant="outline" 
                onClick={() => setShowFromSelector(true)}
                className="w-full justify-start text-left font-normal"
              >
                {formData.from || t('lanes.from')}
              </Button>
            </div>
            <div>
              <Label>{t('lanes.to')}</Label>
              <Button 
                variant="outline" 
                onClick={() => setShowToSelector(true)}
                className="w-full justify-start text-left font-normal"
              >
                {formData.to || t('lanes.to')}
              </Button>
            </div>
          </div>

          <div>
            <Label>{t('lanes.departureTime')}</Label>
            <Input
              type="time"
              value={formData.departureTime}
              onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
            />
          </div>

          <div>
            <Label>{t('lanes.pricing')} (UZS per seat)</Label>
            <Input
              type="number"
              value={formData.pricePerSeat}
              onChange={(e) => setFormData(prev => ({ ...prev, pricePerSeat: e.target.value }))}
              placeholder="50000"
            />
          </div>

          <div>
            <Label>{t('lanes.weekdays')}</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {weekdays.map((day) => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={day.id}
                    checked={formData.selectedWeekdays.includes(day.id)}
                    onCheckedChange={(checked) => handleWeekdayChange(day.id, checked as boolean)}
                  />
                  <Label htmlFor={day.id} className="text-sm">{day.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {t('common.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
      
      <LocationSelector
        open={showFromSelector}
        onOpenChange={setShowFromSelector}
        onLocationSelect={(location) => setFormData(prev => ({ ...prev, from: location }))}
        title={t('lanes.from')}
      />
      
      <LocationSelector
        open={showToSelector}
        onOpenChange={setShowToSelector}
        onLocationSelect={(location) => setFormData(prev => ({ ...prev, to: location }))}
        title={t('lanes.to')}
      />
    </Dialog>
  );
};