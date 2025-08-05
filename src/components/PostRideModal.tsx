import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Mail, Clock, Users, DollarSign, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import LocationSelector from "./LocationSelector";

interface PostRideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostRideModal = ({ open, onOpenChange }: PostRideModalProps) => {
  const [step, setStep] = useState(1);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [showMailOptions, setShowMailOptions] = useState(false);
  const [mailOption, setMailOption] = useState<string | null>(null);
  const [ridePrice, setRidePrice] = useState("");
  const [mailPrice, setMailPrice] = useState("");
  const [departureType, setDepartureType] = useState<"time" | "sitToGo" | null>(null);
  const [departureTime, setDepartureTime] = useState("");
  const [showDepartureSelector, setShowDepartureSelector] = useState(false);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);

  const mailOptions = [
    {
      id: "yes",
      title: "Yes, I do carry Mail",
      icon: Mail,
      description: "I can transport both passengers and mail"
    },
    {
      id: "no", 
      title: "No, I do not carry Mail",
      icon: Users,
      description: "Passengers only"
    },
    {
      id: "mailOnly",
      title: "I carry Mail Only Not Riders",
      icon: Mail,
      description: "Mail delivery service only"
    }
  ];

  const handleMailOptionSelect = (option: string) => {
    setMailOption(option);
    setShowMailOptions(false);
  };

  const handlePost = () => {
    // Handle posting the ride
    onOpenChange(false);
    // Reset form
    setStep(1);
    setDeparture("");
    setDestination("");
    setDate(undefined);
    setMailOption(null);
    setRidePrice("");
    setMailPrice("");
    setDepartureType(null);
    setDepartureTime("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="departure" className="text-base font-semibold">Departure Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Button
                    variant="outline"
                    onClick={() => setShowDepartureSelector(true)}
                    className="w-full h-14 justify-start text-lg pl-10"
                  >
                    {departure || "Where are you starting from?"}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="destination" className="text-base font-semibold">Destination Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  <Button
                    variant="outline"
                    onClick={() => setShowDestinationSelector(true)}
                    className="w-full h-14 justify-start text-lg pl-10 border-primary/50"
                  >
                    {destination || "Where are you going?"}
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!departure || !destination}
              variant="ride"
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Select Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal text-lg",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5" />
                    {date ? format(date, "PPP") : <span>Pick a date for your journey</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)} 
                disabled={!date}
                variant="ride"
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Do you carry Mail?</Label>
              <Button
                onClick={() => setShowMailOptions(true)}
                variant="outline"
                className="w-full h-14 justify-start text-lg"
              >
                <Mail className="mr-3 h-5 w-5" />
                {mailOption ? mailOptions.find(o => o.id === mailOption)?.title : "Select mail option"}
              </Button>

              {showMailOptions && (
                <Card className="mt-4 p-4 space-y-3 border-primary/20">
                  {mailOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleMailOptionSelect(option.id)}
                        className="w-full p-4 text-left border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">{option.title}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </Card>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(4)} 
                disabled={!mailOption}
                variant="ride"
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Set Your Prices</Label>
              
              {(mailOption === "yes" || mailOption === "no") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ridePrice">Ride Price Per Seat</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="ridePrice"
                        value={ridePrice}
                        onChange={(e) => setRidePrice(e.target.value)}
                        placeholder="0.00"
                        type="number"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(mailOption === "yes" || mailOption === "mailOnly") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mailPrice">Mail Price</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="mailPrice"
                        value={mailPrice}
                        onChange={(e) => setMailPrice(e.target.value)}
                        placeholder="0.00"
                        type="number"
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep(5)} 
                disabled={!ridePrice && !mailPrice}
                variant="ride"
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Departure Type</Label>
              
              <div className="space-y-3">
                <button
                  onClick={() => setDepartureType("time")}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    departureType === "time" ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Fixed Departure Time</div>
                      <div className="text-sm text-muted-foreground">Leave at a specific time</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setDepartureType("sitToGo")}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    departureType === "sitToGo" ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Sit to Go</div>
                      <div className="text-sm text-muted-foreground">Leave when car is full</div>
                    </div>
                  </div>
                </button>
              </div>

              {departureType === "time" && (
                <div className="mt-4">
                  <Label htmlFor="time">Departure Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="mt-2 h-12"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(4)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handlePost}
                disabled={!departureType || (departureType === "time" && !departureTime)}
                variant="hero"
                size="xl"
                className="flex-1"
              >
                <Car className="mr-2 h-5 w-5" />
                Post Ride
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Post a New Ride
            </DialogTitle>
            <div className="text-center text-sm text-muted-foreground">
              Step {step} of 5
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {renderStep()}
          </div>
        </DialogContent>
      </Dialog>

      <LocationSelector
        open={showDepartureSelector}
        onOpenChange={setShowDepartureSelector}
        onLocationSelect={setDeparture}
        title="Select Departure Location"
        placeholder="Search departure locations..."
      />

      <LocationSelector
        open={showDestinationSelector}
        onOpenChange={setShowDestinationSelector}
        onLocationSelect={setDestination}
        title="Select Destination"
        placeholder="Search destination locations..."
      />
    </>
  );
};

export default PostRideModal;