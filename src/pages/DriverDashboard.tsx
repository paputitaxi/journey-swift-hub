import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming this is a local UI component or can be removed if not used
import { Card } from "@/components/ui/card"; // Assuming this is a local UI component or can be removed if not used
import {
  Plus,
  Play,
  User,
  MapPin,
  Calendar,
  Clock,
  BarChart,
  Shield,
  RefreshCcw,
} from "lucide-react";

// Removed imports for components and hooks that are not resolvable in this environment
// import PostRideModal from "@/components/PostRideModal";
// import VideoFeed from "@/components/VideoFeed";
// import { MyLanes } from "@/components/MyLanes";
// import { AdvancedProfile } from "@/components/AdvancedProfile";
// import { useLanguage } from "@/hooks/useLanguage";

const DriverDashboard = () => {
  // Removed useLanguage hook as it's not resolvable
  // const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false); // Kept for potential future use if PostRideModal functionality is re-added

  // Updated bottom navigation items to match the second image
  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: MapPin },
    { id: "lanes", label: "My Lines", icon: RefreshCcw },
    { id: "videos", label: "Videos", icon: Play },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-4 space-y-4 text-white">
            {/* Total Earnings section - matches the top part of the second image */}
            <div className="text-center py-4">
              <h2 className="text-sm opacity-80">Total Earnings</h2>
              <p className="text-4xl font-bold mt-1 mb-4">$0.00</p>
              <div className="flex justify-around items-center">
                {/* New Ride Icon */}
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => console.log("New Ride clicked")} // Changed to console log as PostRideModal is not available
                >
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">New Ride</span>
                </div>
                {/* My lines Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <RefreshCcw className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">My lines</span>
                </div>
                {/* Stats Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <BarChart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">Stats</span>
                </div>
                {/* Safety Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs">Safety</span>
                </div>
              </div>
            </div>

            {/* Your activity section - matches the middle part of the second image */}
            <h3 className="flex items-center text-sm font-semibold mb-2 opacity-80">
              <Calendar className="h-4 w-4 mr-2" />
              Your activity
            </h3>
            <Card className="p-4 bg-white/10 border-0 rounded-lg space-y-3">
              {/* Active Ride Card */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-2 text-green-400" /> Ggg
                  </div>
                  <div className="flex items-center text-white ml-6">
                    <MapPin className="h-4 w-4 mr-2 text-red-400" /> Ttgt
                  </div>
                  <div className="flex items-center text-white/80 mt-2">
                    <User className="h-4 w-4 mr-2" /> 2/4 passengers
                  </div>
                  <div className="flex items-center text-white/80 mt-1">
                    <Calendar className="h-4 w-4 mr-2" /> 31.07.2025
                    <Clock className="h-4 w-4 mx-2" /> 16:15
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                  <button>
                    {/* Placeholder for the dropdown arrow icon */}
                    <Plus className="h-5 w-5 mt-2 opacity-60 rotate-45" />{" "}
                    {/* Using Plus and rotating it for a similar look */}
                  </button>
                </div>
              </div>
              <div className="h-px bg-white/10 my-3" /> {/* Divider */}
              {/* Past Ride Card */}
              <div className="flex justify-between items-center text-sm opacity-60">
                <div className="flex flex-col">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-2" /> wfwewrf
                  </div>
                  <div className="flex items-center text-white ml-6">
                    <MapPin className="h-4 w-4 mr-2" /> fwewfw
                  </div>
                </div>
                <div className="text-xs">24.07.2025</div>
              </div>
            </Card>
          </div>
        );
      case "lanes":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">My Lines Content</h2>
            <p>This section would display your saved routes or "lines".</p>
          </div>
        ); // Placeholder for MyLanes
      case "videos":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">Video Feed Content</h2>
            <p>This section would display your video feed.</p>
          </div>
        ); // Placeholder for VideoFeed
      case "profile":
        return (
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">Advanced Profile Content</h2>
            <p>This section would display your user profile details.</p>
          </div>
        ); // Placeholder for AdvancedProfile
      default:
        return null;
    }
  };

  return (
    // Main container with a dark aqua background color and vertical scroll
    <div className="min-h-screen bg-[#244A62] text-white overflow-hidden flex flex-col">
      {/* Header section from the first image is removed to match the second image's full-screen content style */}

      {/* Content area with vertical scroll, adjusted padding for bottom nav */}
      <div className="flex-grow overflow-y-auto pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation - fixed at the bottom, matching the aqua theme */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#244A62] border-t border-white/10 shadow-lg z-10">
        <div className="flex justify-around">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center py-3 transition-colors ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Post Ride Modal - Removed as it was causing compilation errors */}
      {/* <PostRideModal open={showPostRide} onOpenChange={setShowPostRide} /> */}
    </div>
  );
};

export default DriverDashboard;
