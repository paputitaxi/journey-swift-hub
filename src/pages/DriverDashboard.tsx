import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, History, Play, User, MapPin, Calendar, Clock, DollarSign } from "lucide-react";
import PostRideModal from "@/components/PostRideModal";
import VideoFeed from "@/components/VideoFeed";
import ThemeSwitch from "@/components/ThemeSwitch";

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);

  const bottomNavItems = [
    { id: "dashboard", label: "Post Ride", icon: Plus },
    { id: "history", label: "History", icon: History },
    { id: "videos", label: "Videos", icon: Play },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-4 p-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground mb-2">Post a Ride</h1>
              <p className="text-muted-foreground text-sm mb-6">
                Share your journey and earn money
              </p>
              <Button 
                onClick={() => setShowPostRide(true)}
                className="w-full h-12"
              >
                <Plus className="mr-2 h-4 w-4" />
                Post a Ride
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-3 text-center border-0 bg-secondary/50">
                <div className="text-lg font-semibold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Rides</div>
              </Card>
              <Card className="p-3 text-center border-0 bg-secondary/50">
                <div className="text-lg font-semibold text-primary">$340</div>
                <div className="text-xs text-muted-foreground">Earned</div>
              </Card>
              <Card className="p-3 text-center border-0 bg-secondary/50">
                <div className="text-lg font-semibold text-primary">4.8</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </Card>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="space-y-3 p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ride History</h2>
            {[1, 2, 3].map((ride) => (
              <Card key={ride} className="p-3 border-0 bg-secondary/30">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">New York → Boston</div>
                    <div className="text-xs text-muted-foreground">Dec 15, 2024 • 3 passengers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">$45</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      case "videos":
        return <VideoFeed />;
      case "profile":
        return (
          <div className="space-y-4 p-4">
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">John Driver</h2>
              <p className="text-sm text-muted-foreground">Member since 2023</p>
            </div>
            
            <Card className="p-4 space-y-3 border-0 bg-secondary/30">
              <div className="flex justify-between text-sm">
                <span>Email</span>
                <span className="text-muted-foreground">john@example.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phone</span>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Car Model</span>
                <span className="text-muted-foreground">Honda Civic 2022</span>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">Driver</h1>
            <p className="text-sm opacity-70">John Driver</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${activeTab === 'videos' ? 'h-[calc(100vh-120px)]' : 'p-4'} pb-20`}>
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Post Ride Modal */}
      <PostRideModal 
        open={showPostRide} 
        onOpenChange={setShowPostRide}
      />
    </div>
  );
};

export default DriverDashboard;