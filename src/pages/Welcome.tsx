import React, { useState } from "react";
import { Car, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// The Welcome component to choose a role
const Welcome = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedType(role);
    // The setTimeout is used to allow the selected state to update,
    // providing a brief visual feedback before navigating.
    setTimeout(() => {
      if (role === "rider") {
        navigate("/rider-dashboard");
      } else if (role === "driver") {
        navigate("/driver-dashboard");
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto space-y-8">
        {/* Main Header and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Welcome
          </h1>
          <p className="text-lg text-muted-foreground">
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
                ? "bg-primary border-primary-foreground text-primary-foreground shadow-md"
                : "bg-card border-border text-card-foreground hover:bg-accent hover:border-accent-foreground"
              }`}
          >
            <Users className={`h-6 w-6 mr-3 ${selectedType === "rider" ? "text-primary-foreground" : "text-muted-foreground"}`} />
            <span className="font-semibold text-lg">I'm a Rider</span>
          </button>

          {/* Driver Button */}
          <button
            onClick={() => handleRoleSelect("driver")}
            className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300
              ${selectedType === "driver"
                ? "bg-primary border-primary-foreground text-primary-foreground shadow-md"
                : "bg-card border-border text-card-foreground hover:bg-accent hover:border-accent-foreground"
              }`}
          >
            <Car className={`h-6 w-6 mr-3 ${selectedType === "driver" ? "text-primary-foreground" : "text-muted-foreground"}`} />
            <span className="font-semibold text-lg">I'm a Driver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
