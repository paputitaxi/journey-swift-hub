import { useState } from "react";
// Removed Button and Card imports as they were causing compilation errors
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
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
  MessageCircle,
  Users, // For Groups
  Hash, // For Channels
  Store, // For Market
  Search, // For search bar
  Settings, // Placeholder for settings/menu in message dashboard
} from "lucide-react";

// Helper component for a simple avatar
const Avatar = ({ initials, bgColor }) => (
  <div
    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${bgColor}`}
  >
    {initials}
  </div>
);

// Message Dashboard component with Telegram-like UX
const MessageDashboard = () => {
  const [activeMessageTab, setActiveMessageTab] = useState("chats"); // Changed from 'persons' to 'chats'

  const messageNavItems = [
    { id: "chats", label: "Chats", icon: MessageCircle }, // Renamed from Persons to Chats
    { id: "groups", label: "Groups", icon: Users },
    { id: "channels", label: "Channels", icon: Hash },
    { id: "market", label: "Market", icon: Store },
  ];

  const renderMessageContent = () => {
    // Placeholder chat items for demonstration
    const chatItems = {
      chats: [
        {
          id: 1,
          name: "Jane Doe",
          lastMessage: "Hey, are you available for a ride?",
          time: "10:30 AM",
          avatar: <Avatar initials="JD" bgColor="bg-purple-500" />,
        },
        {
          id: 2,
          name: "Mike Smith",
          lastMessage: "Thanks for the ride last week!",
          time: "Yesterday",
          avatar: <Avatar initials="MS" bgColor="bg-blue-500" />,
        },
        {
          id: 3,
          name: "Family Group",
          lastMessage: "Dinner at 7 PM?",
          time: "Mon",
          avatar: <Avatar initials="FG" bgColor="bg-green-500" />,
        },
      ],
      groups: [
        {
          id: 1,
          name: "Drivers Community",
          lastMessage: "New update on city regulations.",
          time: "1 hr ago",
          avatar: <Avatar initials="DC" bgColor="bg-yellow-500" />,
        },
      ],
      channels: [
        {
          id: 1,
          name: "Ride Alerts Official",
          lastMessage: "High demand in downtown area!",
          time: "15 min ago",
          avatar: <Avatar initials="RA" bgColor="bg-red-500" />,
        },
      ],
      market: [
        {
          id: 1,
          name: "Special Offers",
          lastMessage: "Discount on car maintenance this week.",
          time: "2 days ago",
          avatar: <Avatar initials="SO" bgColor="bg-indigo-500" />,
        },
      ],
    };

    const currentChats = chatItems[activeMessageTab];

    return (
      <div className="flex-grow overflow-y-auto">
        {currentChats.length > 0 ? (
          <div className="space-y-1">
            {currentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center p-3 hover:bg-white/10 cursor-pointer transition-colors"
              >
                {chat.avatar}
                <div className="ml-3 flex-grow">
                  <p className="font-medium text-white">{chat.name}</p>
                  <p className="text-sm text-white/70 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-white/50">{chat.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/50 text-center mt-10">
            No messages in this section.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#244A62]">
      {/* Top Bar for Message Dashboard (Telegram-like) */}
      <div className="bg-[#244A62] p-3 border-b border-white/10 flex items-center justify-between">
        <button className="text-white/80 hover:text-white">
          <Settings className="h-6 w-6" /> {/* Placeholder for menu/settings */}
        </button>
        <h2 className="text-lg font-semibold text-white">Chats</h2> {/* Dynamic title based on active tab */}
        <button className="text-white/80 hover:text-white">
          <Search className="h-6 w-6" />
        </button>
      </div>

      {/* Message Dashboard Navigation Tabs */}
      <div className="flex justify-around bg-[#244A62] p-2 border-b border-white/10">
        {messageNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMessageTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMessageTab(item.id)}
              className={`flex-1 flex flex-col items-center py-2 transition-colors relative
                ${isActive ? "text-white" : "text-white/50"}`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-0.5 w-full bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Message Content Area */}
      {renderMessageContent()}
    </div>
  );
};

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostRide, setShowPostRide] = useState(false);
  const [showMessages, setShowMessages] = useState(false); // State for message dashboard visibility

  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: MapPin },
    { id: "lanes", label: "My Lines", icon: RefreshCcw },
    { id: "videos", label: "Videos", icon: Play },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    // If showMessages is true, render the MessageDashboard
    if (showMessages) {
      return <MessageDashboard />;
    }

    // Otherwise, render content based on the active bottom navigation tab
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
            {/* Replaced Card with div, assuming Card component is not resolvable */}
            <div className="p-4 bg-white/10 border-0 rounded-lg space-y-3">
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
            </div>
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
      {/* New Header for Message Button and Title */}
      <div className="bg-[#244A62] p-3 border-b border-white/10 flex justify-between items-center z-20">
        <h1 className="text-lg font-medium">Driver</h1>
        <button
          onClick={() => setShowMessages(!showMessages)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Content area with vertical scroll, adjusted padding for both top and bottom navs */}
      {/* The h-full ensures it takes full available height between top and bottom fixed elements */}
      <div className="flex-grow overflow-y-auto pb-[5rem] pt-[4rem]">
        {" "}
        {/* Adjusted padding to account for fixed top and bottom bars */}
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
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMessages(false); // Hide messages when a bottom nav item is clicked
                }}
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
