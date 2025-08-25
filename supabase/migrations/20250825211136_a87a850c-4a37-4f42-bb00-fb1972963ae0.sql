-- Update RLS policies to allow access without authentication
DROP POLICY IF EXISTS "Anyone can view active rides" ON public.rides;
DROP POLICY IF EXISTS "Users can create their own rides" ON public.rides;
DROP POLICY IF EXISTS "Users can update their own rides" ON public.rides;
DROP POLICY IF EXISTS "Users can delete their own rides" ON public.rides;

-- Create new policies that allow public access
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