import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, History, Play, User, MapPin, Calendar, Clock, DollarSign } from "lucide-react";
import PostRideModal from "@/components/PostRideModal";

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
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <Plus className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Ready to Drive?</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Share your journey and earn money while helping others reach their destinations
              </p>
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => setShowPostRide(true)}
                className="shadow-ride"
              >
                Post a Ride
                <MapPin className="ml-2 h-6 w-6" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-ride-orange">$340</div>
                <div className="text-sm text-muted-foreground">Earned</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-ride-green">4.8</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </Card>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Ride History</h2>
            {[1, 2, 3].map((ride) => (
              <Card key={ride} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">New York → Boston</div>
                    <div className="text-sm text-muted-foreground">Dec 15, 2024 • 3 passengers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-ride-green">$45</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );
      case "videos":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Driving Tips</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((video) => (
                <Card key={video} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Safety Tips for Ride Sharing</div>
                      <div className="text-sm text-muted-foreground">2:30 • Watch tips</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">John Driver</h2>
              <p className="text-muted-foreground">Member since 2023</p>
            </div>
            
            <Card className="p-6 space-y-4">
              <div className="flex justify-between">
                <span>Email</span>
                <span className="text-muted-foreground">john@example.com</span>
              </div>
              <div className="flex justify-between">
                <span>Phone</span>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between">
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
      <div className="bg-gradient-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Driver Dashboard</h1>
            <p className="text-primary-foreground/80">Welcome back, John!</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-2">
        <div className="flex justify-around">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
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