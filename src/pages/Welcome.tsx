import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Car, Users } from "lucide-react";

// The Welcome component is now a child of the Router
const Welcome = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedType(role);
    // The setTimeout is used to allow the selected state to update,
    // providing a brief visual feedback before navigating.
    setTimeout(() => {
      navigate(`/${role}-dashboard`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-teal-900 flex items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto space-y-8">
        {/* Main Header and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-lg text-teal-200">
            Choose your role to get started. Find rides or offer a spot in your car.
          </p>
        </div>

        {/* Role Selection Buttons */}
        <div className="flex flex-col gap-4">
          {/* Rider Button */}
          <button
            onClick={() => handleRoleSelect("rider")}
            className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300
              ${selectedType === "rider"
                ? "bg-teal-700 border-teal-400 text-white shadow-md"
                : "bg-teal-800 border-teal-700 text-teal-200 hover:bg-teal-700 hover:border-teal-400"
              }`}
          >
            <Users className={`h-6 w-6 mr-3 ${selectedType === "rider" ? "text-white" : "text-teal-400"}`} />
            <span className="font-semibold text-lg">I'm a Rider</span>
          </button>

          {/* Driver Button */}
          <button
            onClick={() => handleRoleSelect("driver")}
            className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300
              ${selectedType === "driver"
                ? "bg-teal-700 border-teal-400 text-white shadow-md"
                : "bg-teal-800 border-teal-700 text-teal-200 hover:bg-teal-700 hover:border-teal-400"
              }`}
          >
            <Car className={`h-6 w-6 mr-3 ${selectedType === "driver" ? "text-white" : "text-teal-400"}`} />
            <span className="font-semibold text-lg">I'm a Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Dummy components for the dashboards to prevent routing errors
const RiderDashboard = () => <div className="text-white text-center p-8">Rider Dashboard</div>;
const DriverDashboard = () => <div className="text-white text-center p-8">Driver Dashboard</div>;

// Main App component with the BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
