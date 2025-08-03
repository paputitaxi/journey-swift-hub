import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, DollarSign, Users, Star } from "lucide-react";

const RiderDashboard = () => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const mockRides = [
    {
      id: 1,
      driver: "Sarah Johnson",
      from: "New York",
      to: "Boston",
      date: "Dec 18, 2024",
      time: "09:00 AM",
      price: "$35",
      availableSeats: 3,
      rating: 4.9,
      carMail: true
    },
    {
      id: 2,
      driver: "Mike Davis",
      from: "New York", 
      to: "Boston",
      date: "Dec 18, 2024",
      time: "02:00 PM",
      price: "$40",
      availableSeats: 2,
      rating: 4.7,
      carMail: false
    },
    {
      id: 3,
      driver: "Emma Wilson",
      from: "New York",
      to: "Boston", 
      date: "Dec 19, 2024",
      time: "Sit to Go",
      price: "$30",
      availableSeats: 4,
      rating: 4.8,
      carMail: true
    }
  ];

  const filteredRides = mockRides.filter(ride => 
    ride.from.toLowerCase().includes(searchFrom.toLowerCase()) &&
    ride.to.toLowerCase().includes(searchTo.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Find Rides</h1>
            <p className="text-primary-foreground/80">Where are you going?</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            <Input
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              placeholder="From"
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            <Input
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              placeholder="To"
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <Button variant="secondary" className="w-full h-12">
            <Search className="mr-2 h-5 w-5" />
            Search Rides
          </Button>
        </div>
      </div>

      {/* Available Rides */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Available Rides</h2>
          <span className="text-sm text-muted-foreground">{filteredRides.length} rides found</span>
        </div>

        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <Card key={ride.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Driver Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{ride.driver.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{ride.driver}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-ride-green">{ride.price}</div>
                    <div className="text-sm text-muted-foreground">per seat</div>
                  </div>
                </div>

                {/* Route Info */}
                <div className="flex items-center justify-between py-2 border-l-4 border-primary pl-4 bg-primary/5 rounded-r">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{ride.from}</span>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-ride-orange" />
                    <span className="font-medium">{ride.to}</span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{ride.date} • {ride.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{ride.availableSeats} seats</span>
                    </div>
                  </div>
                  {ride.carMail && (
                    <div className="text-xs bg-ride-green/10 text-ride-green px-2 py-1 rounded-full">
                      Carries Mail
                    </div>
                  )}
                </div>

                {/* Book Button */}
                <Button variant="ride" className="w-full">
                  Book This Ride
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No rides found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;