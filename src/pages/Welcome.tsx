import React, { useState, useEffect } from "react";
import { Car, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// The Welcome component to choose a role with username gate
const Welcome = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<'username' | 'role'>('username');
  const [checking, setChecking] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const savedUsername = session.user.user_metadata?.username || localStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
          setStep('role');
        }
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const savedUsername = session.user.user_metadata?.username || localStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
          setStep('role');
        }
      }
    });

    // Also check localStorage for existing username (backward compatibility)
    const saved = localStorage.getItem('username');
    if (saved && !user) {
      setUsername(saved);
      setStep('role');
    }

    return () => subscription.unsubscribe();
  }, [user]);

  const validateUsername = (u: string) => /^[a-zA-Z0-9_]{3,20}$/.test(u);

  const handleClaim = async () => {
    if (!validateUsername(username)) {
      toast({ title: 'Invalid username', description: 'Use 3-20 letters, numbers or _', variant: 'destructive' });
      return;
    }
    setChecking(true);
    try {
      // Check if username already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('usernames')
        .select('username')
        .eq('username', username)
        .maybeSingle();
      
      if (checkError) throw checkError;

      const internalEmail = `${username}@internal.app`;
      const defaultPassword = 'username-auth-2024';

      if (existingUser) {
        // Username exists, sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: internalEmail,
          password: defaultPassword
        });
        
        if (signInError) {
          toast({ title: 'Error signing in', description: signInError.message, variant: 'destructive' });
          return;
        }
        
        toast({ title: 'Welcome back', description: `Hello, ${username}!` });
      } else {
        // Username doesn't exist, create new account
        const { error: signUpError } = await supabase.auth.signUp({
          email: internalEmail,
          password: defaultPassword,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (signUpError) {
          toast({ title: 'Error creating account', description: signUpError.message, variant: 'destructive' });
          return;
        }

        // Insert username record
        const { error: insertError } = await supabase.from('usernames').insert([{ username }]);
        if (insertError) {
          toast({ title: 'Error saving username', description: insertError.message, variant: 'destructive' });
          return;
        }

        toast({ title: 'Account created', description: `Welcome, ${username}!` });
      }

      localStorage.setItem('username', username);
      setStep('role');
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not process username. Try again.', variant: 'destructive' });
    } finally {
      setChecking(false);
    }
  };

  const handleRoleSelect = (role: 'rider' | 'driver') => {
    // Allow navigation if user is authenticated OR username exists in localStorage
    const hasUsername = localStorage.getItem('username');
    if (!user && !hasUsername) {
      toast({ title: 'Please sign in first', description: 'Choose a username to continue.', variant: 'destructive' });
      setStep('username');
      return;
    }
    
    setSelectedType(role);
    
    if (role === 'rider') {
      navigate('/rider-dashboard');
    } else {
      navigate('/driver-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto space-y-8">
        {/* Main Header and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Welcome</h1>
          <p className="text-lg text-muted-foreground">Choose your role to get started. Find rides or offer a spot in your car.</p>
        </div>

        {step === 'username' ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Pick a unique username to identify you in rides.</p>
            <div className="flex gap-2">
              <Input placeholder="your_username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Button onClick={handleClaim} disabled={checking}>Continue</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">Signed in as <span className="font-semibold">{username}</span></div>
            {/* Role Selection Buttons */}
            <div className="flex flex-col gap-4">
              {/* Rider Button */}
              <button
                onClick={() => handleRoleSelect("rider")}
                className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 ${selectedType === "rider" ? "bg-primary border-primary-foreground text-primary-foreground shadow-md" : "bg-card border-border text-card-foreground hover:bg-accent hover:border-accent-foreground"}`}
              >
                <Users className={`h-6 w-6 mr-3 ${selectedType === "rider" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className="font-semibold text-lg">I'm a Rider</span>
              </button>

              {/* Driver Button */}
              <button
                onClick={() => handleRoleSelect("driver")}
                className={`flex-1 flex items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 ${selectedType === "driver" ? "bg-primary border-primary-foreground text-primary-foreground shadow-md" : "bg-card border-border text-card-foreground hover:bg-accent hover:border-accent-foreground"}`}
              >
                <Car className={`h-6 w-6 mr-3 ${selectedType === "driver" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className="font-semibold text-lg">I'm a Driver</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
