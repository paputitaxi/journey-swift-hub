-- Create rides table
CREATE TABLE public.rides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  departure_location TEXT NOT NULL,
  destination_location TEXT NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME,
  departure_type TEXT NOT NULL CHECK (departure_type IN ('time', 'sitToGo')),
  mail_option TEXT NOT NULL CHECK (mail_option IN ('yes', 'no', 'mailOnly')),
  ride_price DECIMAL(10,2),
  mail_price DECIMAL(10,2),
  available_seats INTEGER NOT NULL DEFAULT 4,
  total_seats INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- Create policies for rides
CREATE POLICY "Anyone can view active rides" 
ON public.rides 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Users can create their own rides" 
ON public.rides 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rides" 
ON public.rides 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rides" 
ON public.rides 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_rides_updated_at
BEFORE UPDATE ON public.rides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();