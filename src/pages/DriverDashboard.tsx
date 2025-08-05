import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Route, Play, User, MapPin, Calendar, Clock, DollarSign, MessageCircle } from "lucide-react";
import PostRideModal from "@/components/PostRideModal";
import VideoFeed from "@/components/VideoFeed";
import ThemeSwitch from "@/components/ThemeSwitch";
import { MyLanes } from "@/components/MyLanes";
import { StatsPage } from "@/components/StatsPage";
import { AdvancedProfile } from "@/components/AdvancedProfile";
import { useLanguage } from "@/hooks/useLanguage";
const DriverDashboard = () => {
  const {
    t
  } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const bottomNavItems = [{
    id: "dashboard",
    label: t('nav.dashboard'),
    icon: Plus
  }, {
    id: "lanes",
    label: t('nav.lanes'),
    icon: Route
  }, {
    id: "videos",
    label: t('nav.videos'),
    icon: Play
  }, {
    id: "profile",
    label: t('nav.profile'),
    icon: User
  }];
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <div className="space-y-4 p-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 mb-4 bg-primary rounded-full flex items-center justify-center mx-0">
                <Plus className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground mb-2">Post a Ride</h1>
              <p className="text-muted-foreground text-sm mb-6">
                Share your journey and earn money
              </p>
              <Button onClick={() => setShowPostRide(true)} className="w-full h-12">
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
          </div>;
      case "lanes":
        return <MyLanes />;
      case "videos":
        return <VideoFeed />;
      case "profile":
        return <AdvancedProfile />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">Driver</h1>
            <p className="text-sm opacity-70">John Driver</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <ThemeSwitch />
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${activeTab === 'videos' ? 'h-[calc(100vh-120px)]' : activeTab === 'profile' ? '' : 'p-4'} pb-20`}>
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex">
          {bottomNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>;
        })}
        </div>
      </div>

      {/* Post Ride Modal */}
      <PostRideModal open={showPostRide} onOpenChange={setShowPostRide} />
    </div>;
};
export default DriverDashboard;