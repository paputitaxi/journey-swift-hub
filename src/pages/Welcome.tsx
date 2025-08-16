import React, { useState } from "react";
import { Car, Users } from "lucide-react";

// Mocking react-router-dom's useNavigate for demonstration purposes
// In a real application, you would use BrowserRouter and actual routes.
const useNavigate = () => {
  const [page, setPage] = useState("welcome"); // Internal state to simulate navigation

  const navigate = (path) => {
    // In a real app, this would change the browser's URL and render the corresponding route.
    // Here, we just update a state variable to simulate different "pages".
    if (path === "/rider-dashboard") {
      setPage("rider-dashboard");
    } else if (path === "/driver-dashboard") {
      setPage("driver-dashboard");
    } else {
      setPage("welcome"); // Default back to welcome if path is unknown
    }
  };
  return navigate;
};

// The Welcome component to choose a role, styled like Back Market's mobile UI
const Welcome = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedType(role);
    // Simulate navigation after a short delay to show the selection state
    setTimeout(() => {
      if (role === "rider") {
        navigate("/rider-dashboard");
      } else if (role === "driver") {
        navigate("/driver-dashboard");
      }
    }, 300); // Small delay for visual feedback
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-8 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral-200">
        {/* Main Header and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Welcome
          </h1>
          <p className="text-lg text-neutral-600">
            Choose your role to get started. Find rides or offer a spot in your car.
          </p>
        </div>

        {/* Role Selection Buttons */}
        <div className="flex flex-col gap-4">
          {/* Rider Button */}
          <button
            onClick={() => handleRoleSelect("rider")}
            className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300
              ${selectedType === "rider"
                ? "bg-cyan-600 border-cyan-700 text-white shadow-lg" // Back Market-like primary color for selected state
                : "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-cyan-200" // Neutral background, hover with subtle cyan
              }`}
          >
            <Users className={`h-7 w-7 mr-3 ${selectedType === "rider" ? "text-white" : "text-cyan-600"}`} /> {/* Icon color */}
            <span className="font-semibold text-xl">I'm a Rider</span>
          </button>

          {/* Driver Button */}
          <button
            onClick={() => handleRoleSelect("driver")}
            className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300
              ${selectedType === "driver"
                ? "bg-cyan-600 border-cyan-700 text-white shadow-lg" // Back Market-like primary color for selected state
                : "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-cyan-200" // Neutral background, hover with subtle cyan
              }`}
          >
            <Car className={`h-7 w-7 mr-3 ${selectedType === "driver" ? "text-white" : "text-cyan-600"}`} /> {/* Icon color */}
            <span className="font-semibold text-xl">I'm a Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock components for the dashboards
const RiderDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-emerald-100 flex items-center justify-center p-4 font-sans">
    <div className="text-center bg-white p-8 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-4xl font-bold text-cyan-700">Rider Dashboard</h2>
      <p className="text-lg text-neutral-600">Welcome, Rider! Find your next ride here.</p>
      <button
        onClick={() => window.location.reload()} // Simple reload to go back to Welcome
        className="mt-6 px-6 py-3 bg-cyan-600 text-white rounded-xl shadow-md hover:bg-cyan-700 transition-colors duration-300"
      >
        Go Back
      </button>
    </div>
  </div>
);

const DriverDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center p-4 font-sans">
    <div className="text-center bg-white p-8 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-4xl font-bold text-emerald-700">Driver Dashboard</h2>
      <p className="text-lg text-neutral-600">Welcome, Driver! Manage your rides here.</p>
      <button
        onClick={() => window.location.reload()} // Simple reload to go back to Welcome
        className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-colors duration-300"
      >
        Go Back
      </button>
    </div>
  </div>
);

// Main App component to simulate routing
const App = () => {
  // This state will simulate which "page" is currently active
  const [currentPage, setCurrentPage] = useState("welcome");

  // Custom hook to update the currentPage state
  const useNavigateForApp = () => {
    return (path) => {
      if (path === "/rider-dashboard") {
        setCurrentPage("rider-dashboard");
      } else if (path === "/driver-dashboard") {
        setCurrentPage("driver-dashboard");
      } else {
        setCurrentPage("welcome");
      }
    };
  };

  // Override the global useNavigate for the Welcome component to use this App's state
  React.useEffect(() => {
    // This is a simplified way to ensure the mock useNavigate controls this App's state.
    // In a real app, this wouldn't be necessary as react-router-dom handles it naturally.
    window.tempNavigate = useNavigateForApp();
  }, []);

  // Render the appropriate component based on currentPage state
  switch (currentPage) {
    case "rider-dashboard":
      return <RiderDashboard />;
    case "driver-dashboard":
      return <DriverDashboard />;
    case "welcome":
    default:
      // Pass the mock navigate function to the Welcome component
      // This is a workaround for the isolated component preview;
      // normally, Welcome would just use useNavigate() directly.
      return <Welcome />;
  }
};

export default App;
