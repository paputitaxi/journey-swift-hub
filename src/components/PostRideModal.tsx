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
import { useToast } from "@/hooks/use-toast";
import { useUsername } from "@/hooks/useUsername";
interface PostRideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostRideModal = ({ open, onOpenChange }: PostRideModalProps) => {
  const { toast } = useToast();
  const { username: savedUsername } = useUsername();
  const [step, setStep] = useState(1);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [showMailOptions, setShowMailOptions] = useState(false);
  const [mailOption, setMailOption] = useState<string | null>(null);
  const [ridePrice, setRidePrice] = useState("");
  const [mailPrice, setMailPrice] = useState("");
  const [departureType, setDepartureType] = useState<"fixed" | "seat_fill" | null>(null);
  const [departureTime, setDepartureTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalSeats, setTotalSeats] = useState("4");
  const [showDepartureSelector, setShowDepartureSelector] = useState(false);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePost = async () => {
    console.log('=== POST RIDE STARTED ===');
    console.log('Form data:', { date, mailOption, departureType, phoneNumber, departure, destination, ridePrice, totalSeats, departureTime });

    if (!date || !mailOption || !departureType || !phoneNumber) {
      console.error('Validation failed - missing fields');
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!departure || !destination) {
      console.error('Validation failed - missing locations');
      toast({
        title: "Missing Information", 
        description: "Please select departure and destination locations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      // Prepare time with timezone format (HH:MM:SS+00)
      const fromTime = departureType === 'fixed' && departureTime ? `${departureTime}:00+00` : '00:00:00+00';
      const toTime = departureType === 'fixed' && departureTime ? `${departureTime}:00+00` : '23:59:59+00';
      
      const rideData = {
        origincity: departure,
        destinationcity: destination,
        departuredate: format(date, 'yyyy-MM-dd'),
        mailservice: mailOption === 'yes' || mailOption === 'mailOnly',
        freeseats: mailOption === 'mailOnly' ? 0 : parseInt(totalSeats),
        isitfixed: departureType === 'fixed',
        fromfixeddeparturetime: fromTime,
        tofixeddeparturetime: toTime,
        price: parseInt(ridePrice || '0'),
        phonenumber: parseInt(phoneNumber.replace(/\D/g, '')), // Remove non-digits
      };

      console.log('Attempting to insert:', rideData);

      const { data, error } = await (supabase as any)
        .from('Ridesbydrivers')
        .insert([rideData])
        .select();

      console.log('Insert result:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to post ride. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('=== POST RIDE SUCCESS ===');
      toast({
        title: "Success!",
        description: "Your ride has been posted successfully.",
      });

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
      setPhoneNumber("");
      setTotalSeats("4");
    } catch (error) {
      console.error('Caught error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post ride. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Button
                    variant="outline"
                    onClick={() => setShowDepartureSelector(true)}
                    className="w-full h-12 justify-start text-base font-normal bg-background hover:bg-muted/50"
                  >
                    {departure || "Buloqboshi"}
                  </Button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Button
                    variant="outline"
                    onClick={() => setShowDestinationSelector(true)}
                    className="w-full h-12 justify-start text-base font-normal bg-background hover:bg-muted/50"
                  >
                    {destination || "Buloqboshi"}
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!departure || !destination}
              variant="gradient"
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal text-base bg-background hover:bg-muted/50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="absolute right-3 h-5 w-5 text-muted-foreground" />
                    {date ? format(date, "yyyy-MM-dd") : <span>2025-10-14</span>}
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
                variant="gradient"
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
                variant="gradient"
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
                    <Label htmlFor="ridePrice" className="text-base font-semibold">Price</Label>
                    <Input
                      id="ridePrice"
                      value={ridePrice}
                      onChange={(e) => setRidePrice(e.target.value)}
                      placeholder="423"
                      type="number"
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
              )}

              {(mailOption === "yes" || mailOption === "mailOnly") && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="mailPrice" className="text-base font-semibold">Mail Price</Label>
                    <Input
                      id="mailPrice"
                      value={mailPrice}
                      onChange={(e) => setMailPrice(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      className="mt-2 h-12"
                    />
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
                variant="gradient"
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
                  onClick={() => setDepartureType("fixed")}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    departureType === "fixed" ? "border-primary bg-primary/10" : "hover:bg-muted/50"
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
                  onClick={() => setDepartureType("seat_fill")}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    departureType === "seat_fill" ? "border-primary bg-primary/10" : "hover:bg-muted/50"
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

              {departureType === "fixed" && (
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

              <div className="mt-4 space-y-4">
                {mailOption !== "mailOnly" && (
                  <div>
                    <Label htmlFor="totalSeats" className="text-base font-semibold">Free Seats</Label>
                    <div className="grid grid-cols-4 gap-3 mt-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Button
                          key={num}
                          type="button"
                          variant="outline"
                          onClick={() => setTotalSeats(String(num))}
                          className={cn(
                            "h-12 text-base font-medium",
                            totalSeats === String(num) 
                              ? "bg-primary/10 border-primary text-primary hover:bg-primary/20" 
                              : "hover:bg-muted/50"
                          )}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {mailOption === "mailOnly" && (
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Mail Only Service</div>
                        <div className="text-sm text-muted-foreground">No passenger seats available</div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="phoneNumber" className="text-base font-semibold">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-2 h-12"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep(4)} 
                variant="outline" 
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePost}
                disabled={!departureType || (departureType === "fixed" && !departureTime) || !phoneNumber || isLoading}
                variant="orange"
                className="flex-1 h-12"
              >
                {isLoading ? "Posting..." : "Post Ride"}
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
            <DialogTitle className="text-xl font-bold">
              Post a New Ride
            </DialogTitle>
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