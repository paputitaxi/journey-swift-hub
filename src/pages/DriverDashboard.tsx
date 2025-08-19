import React, { useState } from "react";
import { Car, Plus, Navigation, User, MessageCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from '@/hooks/useLanguage';

// Custom Scrollbar Styles Component
const CustomScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #F8F8F8; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 10px; border: 2px solid #F8F8F8; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
  `}</style>
);

// Helper component for a simple avatar
const Avatar = ({ initials, bgColor, size = 'w-10 h-10' }) => (
  <div className={`rounded-full flex items-center justify-center text-white text-sm font-semibold ${bgColor} ${size}`}>
    {initials}
  </div>
);

// Simple Message Dashboard
const MessageDashboard = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <header className="bg-white p-4 flex items-center border-b border-neutral-200">
        <button onClick={onClose} className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold ml-4">Messages</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="text-center py-8">
          <MessageCircle className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">No messages yet</p>
        </div>
      </main>
    </div>
  );
};

const DriverDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [headerTitle, setHeaderTitle] = useState("Ride");
  const [showMessages, setShowMessages] = useState(false);

  // Mock user data
  const user = {
    name: 'John Doe',
    nickname: 'JD',
    totalEarnings: 2847.59,
  };

  // Mock rides data
  const rides = [
    { id: 1, from: 'Tashkent', to: 'Samarkand', date: '2024-01-15', passengers: 3, earnings: 125.00, status: 'completed' },
    { id: 2, from: 'Samarkand', to: 'Bukhara', date: '2024-01-18', passengers: 2, earnings: 98.50, status: 'completed' },
    { id: 3, from: 'Tashkent', to: 'Fergana', date: '2024-01-25', passengers: 4, earnings: 156.00, status: 'upcoming' }
  ];

  const bottomNavItems = [
    { id: "dashboard", label: "Ride", icon: Car },
    { id: "newride", label: "New Ride", icon: Plus },
    { id: "mylines", label: "My Lines", icon: Navigation },
    { id: "profile", label: "Profile", icon: User },
  ];

  const completedRides = rides.filter(ride => ride.status === 'completed');

  const DashboardContent = () => (
    <div className="p-4 space-y-4 font-sans">
      <CustomScrollbarStyles />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Activity</h2>
        <button className="bg-[#E1F87E] text-[#121212] px-4 py-2 rounded-full font-semibold hover:bg-opacity-80 transition-colors">
          Post New Ride
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
          <h3 className="text-sm font-semibold mb-2 text-neutral-600">Total Earnings</h3>
          <p className="text-2xl font-bold text-gray-800">${user.totalEarnings}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
          <h3 className="text-sm font-semibold mb-2 text-neutral-600">Active</h3>
          <p className="text-2xl font-bold text-gray-800">{completedRides.length}</p>
          <p className="text-xs text-neutral-500">rides</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200">
        <div className="p-4 border-b border-neutral-100">
          <h3 className="text-lg font-semibold text-gray-800">My Lines</h3>
        </div>
        <div className="p-4">
          {rides.length === 0 ? (
            <div className="text-center py-8">
              <Navigation className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-neutral-600 mb-2">No Lines Posted Yet</h4>
              <p className="text-sm text-neutral-500 mb-4">Post a new ride to see it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rides.slice(0, 3).map((ride) => (
                <div key={ride.id} className="flex justify-between items-center p-3 border border-neutral-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{ride.from} → {ride.to}</p>
                    <p className="text-sm text-neutral-600">{ride.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">${ride.earnings}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ride.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {ride.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MyLinesContent = () => (
    <div className="p-4 space-y-4 font-sans">
      <CustomScrollbarStyles />
      <h2 className="text-xl font-bold text-gray-800">My Lines</h2>
      
      {rides.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 text-center">
          <Navigation className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-neutral-600 mb-2">No Lines Posted Yet</h4>
          <p className="text-sm text-neutral-500 mb-4">Post a new ride to see it here.</p>
          <button className="bg-[#E1F87E] text-[#121212] px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-colors">
            Post New Ride
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{ride.from} → {ride.to}</h3>
                  <p className="text-sm text-neutral-600">{ride.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  ride.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ride.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-neutral-600">
                  <span>{ride.passengers} passengers</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">${ride.earnings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ProfileContent = () => (
    <div className="p-4 space-y-4 font-sans">
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar initials={user.nickname} bgColor="bg-blue-500" size="w-16 h-16" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-neutral-600">January 2024</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-neutral-100">
            <span className="text-sm text-neutral-600">Total Earnings</span>
            <span className="text-sm font-semibold">${user.totalEarnings}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-neutral-100">
            <span className="text-sm text-neutral-600">Completed Rides</span>
            <span className="text-sm font-semibold">{completedRides.length}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-neutral-600">Status</span>
            <span className="text-sm text-green-600 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardContent />;
      case "mylines": return <MyLinesContent />;
      case "profile": return <ProfileContent />;
      default: return <DashboardContent />;
    }
  };

  if (showMessages) {
    return <MessageDashboard onClose={() => setShowMessages(false)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CustomScrollbarStyles />
      
      <header className="bg-white p-4 flex items-center justify-between shadow-sm border-b border-neutral-200">
        <div className="w-8 h-8"></div>
        <h1 className="text-xl font-bold text-gray-800">{headerTitle}</h1>
        <button 
          onClick={() => setShowMessages(true)} 
          className="p-2 rounded-full text-neutral-800 hover:bg-neutral-100 hover:text-gray-900 transition-colors"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      </header>
      
      <main className="flex-grow overflow-y-auto custom-scrollbar h-full relative rounded-t-3xl overflow-hidden">
        {renderContent()}
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-10">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); }} 
                className={`flex-1 flex flex-col items-center py-2 transition-colors ${isActive ? "text-gray-800" : "text-neutral-500"}`}
              >
                <Icon className={`h-6 w-6 mb-1 ${isActive ? "text-[#E1F87E]" : "text-neutral-500"}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default DriverDashboard;