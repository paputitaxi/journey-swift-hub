import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchLocations } from "@/data/uzbekistanLocations";
import { MapPin, Search } from "lucide-react";

interface LocationSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: string) => void;
  title: string;
  placeholder?: string;
}

export default function LocationSelector({ 
  open, 
  onOpenChange, 
  onLocationSelect, 
  title,
  placeholder = "Search locations..." 
}: LocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLocations = searchLocations(searchQuery);

  const handleLocationSelect = (locationName: string) => {
    onLocationSelect(locationName);
    onOpenChange(false);
    setSearchQuery("");
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'region':
        return 'text-primary';
      case 'city':
        return 'text-accent';
      case 'district':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case 'region':
        return 'Region';
      case 'city':
        return 'City';
      case 'district':
        return 'District';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-shrink-0 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <ScrollArea className="flex-1 mt-4">
          <div className="space-y-1">
            {filteredLocations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No locations found
              </div>
            ) : (
              filteredLocations.map((location, index) => (
                <Button
                  key={`${location.name}-${location.type}-${index}`}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 flex-col items-start"
                  onClick={() => handleLocationSelect(location.name)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{location.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getLocationTypeColor(location.type)}`}>
                      {getLocationTypeLabel(location.type)}
                    </span>
                  </div>
                  {location.region && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {location.region}
                    </span>
                  )}
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}