import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Car, Users, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-ride.jpg";
const Welcome = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const handleRoleSelect = (role: "rider" | "driver") => {
    setSelectedType(role);
    setTimeout(() => {
      navigate(`/${role}-dashboard`);
    }, 300);
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-cyan-950">
        
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-bounce-gentle mb-8">
            <Car className="h-16 w-16 mx-auto text-primary-glow" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Share The
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Journey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Connect with fellow travelers. Save money. Reduce carbon footprint. 
            Make every journey count.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className={`p-8 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-500 transform hover:scale-105 ${selectedType === "rider" ? "ring-2 ring-primary-glow scale-105" : ""}`} onClick={() => handleRoleSelect("rider")}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">I'm a Rider</h3>
                <p className="text-white/80 mb-6">
                  Find rides to your destination and travel together
                </p>
                <Button variant="hero" size="lg" className="w-full">
                  Find Rides
                  <MapPin className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className={`p-8 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-500 transform hover:scale-105 ${selectedType === "driver" ? "ring-2 ring-ride-orange scale-105" : ""}`} onClick={() => handleRoleSelect("driver")}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">I'm a Driver</h3>
                <p className="text-white/80 mb-6">
                  Offer rides and earn money while traveling
                </p>
                <Button variant="ride-orange" size="lg" className="w-full">
                  Offer Rides
                  <Clock className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-white/60">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-glow">50K+</div>
              <div className="text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ride-orange">100K+</div>
              <div className="text-sm">Rides Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ride-green">95%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Welcome;