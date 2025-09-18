import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUsername } from '@/hooks/useUsername';
import { useLanguage } from '@/hooks/useLanguage';
import { User, Car } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { username, saveUsername } = useUsername();
  const { t } = useLanguage();
  const [tempUsername, setTempUsername] = useState(username);
  const [showRoleSelection, setShowRoleSelection] = useState(!!username);

  const handleContinue = () => {
    if (tempUsername.trim()) {
      saveUsername(tempUsername.trim());
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelect = (role: 'rider' | 'driver') => {
    if (role === 'rider') {
      navigate('/rider-dashboard');
    } else {
      navigate('/driver-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="bg-card/80 backdrop-blur-lg border border-border/50 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted-foreground">
            {showRoleSelection 
              ? "Choose your role to get started. Find rides or offer a spot in your car."
              : "Pick a unique username to identify you in rides."
            }
          </p>
          {showRoleSelection && username && (
            <p className="text-sm text-muted-foreground mt-2">
              Signed in as {username}
            </p>
          )}
        </div>

        {!showRoleSelection ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="your_username"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              className="text-center"
            />
            <Button 
              onClick={handleContinue}
              disabled={!tempUsername.trim()}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelect('rider')}
              variant="outline"
              className="w-full flex items-center gap-3 p-6 text-left hover:bg-accent/50"
            >
              <User className="w-6 h-6" />
              <span className="text-lg font-medium">I'm a Rider</span>
            </Button>
            
            <Button
              onClick={() => handleRoleSelect('driver')}
              variant="outline"
              className="w-full flex items-center gap-3 p-6 text-left hover:bg-accent/50"
            >
              <Car className="w-6 h-6" />
              <span className="text-lg font-medium">I'm a Driver</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;