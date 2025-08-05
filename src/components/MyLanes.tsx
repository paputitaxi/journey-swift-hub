import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateLaneModal } from './CreateLaneModal';
import { useLanguage } from '@/hooks/useLanguage';
import { Plus, Clock, MapPin, Calendar } from 'lucide-react';

interface Lane {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  weekdays: string[];
  pricePerSeat: number;
  isActive: boolean;
}

export const MyLanes: React.FC = () => {
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lanes] = useState<Lane[]>([
    {
      id: '1',
      from: 'Tashkent',
      to: 'Samarkand',
      departureTime: '08:00',
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      pricePerSeat: 50000,
      isActive: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">{t('lanes.title')}</h1>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('lanes.createNew')}
        </Button>
      </div>

      <div className="space-y-4">
        {lanes.map((lane) => (
          <Card key={lane.id} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {lane.from} → {lane.to}
                </CardTitle>
                <Badge variant={lane.isActive ? "default" : "secondary"}>
                  {lane.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lane.departureTime}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {lane.weekdays.join(', ')}
                </div>
              </div>
              <div className="text-lg font-semibold text-primary">
                {lane.pricePerSeat.toLocaleString()} UZS per seat
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateLaneModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};