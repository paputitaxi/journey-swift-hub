import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, DollarSign, Users, Star } from "lucide-react";
import ThemeSwitch from "@/components/ThemeSwitch";

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
      <div className="bg-primary text-primary-foreground p-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-medium">Find Rides</h1>
            <p className="text-sm opacity-70">Where are you going?</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
            <Input
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              placeholder="From"
              className="pl-9 h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
            <Input
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              placeholder="To"
              className="pl-9 h-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
          <Button variant="secondary" className="w-full h-10">
            <Search className="mr-2 h-4 w-4" />
            Search Rides
          </Button>
        </div>
      </div>

      {/* Available Rides */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Available Rides</h2>
          <span className="text-xs text-muted-foreground">{filteredRides.length} rides</span>
        </div>

        <div className="space-y-3">
          {filteredRides.map((ride) => (
            <Card key={ride.id} className="p-3 border-0 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="space-y-2">
                {/* Driver Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-sm">{ride.driver.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{ride.driver}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{ride.price}</div>
                    <div className="text-xs text-muted-foreground">per seat</div>
                  </div>
                </div>

                {/* Route Info */}
                <div className="flex items-center justify-between py-2 border-l-2 border-primary pl-3 bg-primary/5 rounded-r">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="font-medium text-sm">{ride.from}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">→</div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="font-medium text-sm">{ride.to}</span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{ride.date} • {ride.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{ride.availableSeats} seats</span>
                    </div>
                  </div>
                  {ride.carMail && (
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Mail
                    </div>
                  )}
                </div>

                {/* Book Button */}
                <Button className="w-full h-8 text-sm">
                  Book This Ride
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-sm font-medium text-foreground mb-1">No rides found</h3>
            <p className="text-xs text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;