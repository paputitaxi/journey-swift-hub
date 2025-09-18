-- Drop the existing rides table
DROP TABLE IF EXISTS public.rides CASCADE;

-- Create new rides table with proper structure
CREATE TABLE public.rides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME,
  departure_type TEXT NOT NULL CHECK (departure_type IN ('fixed', 'seat_fill')),
  total_seats INTEGER NOT NULL CHECK (total_seats >= 1 AND total_seats <= 4),
  available_seats INTEGER NOT NULL CHECK (available_seats >= 0 AND available_seats <= 4),
  ride_price DECIMAL(10,2) NOT NULL,
  has_mail_service BOOLEAN NOT NULL DEFAULT false,
  mail_price DECIMAL(10,2),
  phone_number TEXT NOT NULL,
  driver_username TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- Create policies for rides access
CREATE POLICY "Anyone can view all rides" 
ON public.rides 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create rides" 
ON public.rides 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update rides" 
ON public.rides 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete rides" 
ON public.rides 
FOR DELETE 
USING (true);

-- Add constraint to ensure available_seats doesn't exceed total_seats
ALTER TABLE public.rides 
ADD CONSTRAINT check_available_seats_valid 
CHECK (available_seats <= total_seats);

-- Add constraint for mail price when mail service is enabled
ALTER TABLE public.rides 
ADD CONSTRAINT check_mail_price_when_service_enabled 
CHECK (
  (has_mail_service = false AND mail_price IS NULL) OR 
  (has_mail_service = true AND mail_price IS NOT NULL AND mail_price >= 0)
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_rides_updated_at
BEFORE UPDATE ON public.rides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_rides_departure_date ON public.rides(departure_date);
CREATE INDEX idx_rides_from_to ON public.rides(from_location, to_location);
CREATE INDEX idx_rides_status ON public.rides(status);
CREATE INDEX idx_rides_available_seats ON public.rides(available_seats) WHERE available_seats > 0;