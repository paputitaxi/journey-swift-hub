import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, Send } from 'lucide-react';

// Telegram Web App Script
const TELEGRAM_SCRIPT_URL = 'https://telegram.org/js/telegram-web-app.js';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [telegramWebApp, setTelegramWebApp] = useState<any>(null);
  const navigate = useNavigate();

  // Load Telegram Web App SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = TELEGRAM_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        setTelegramWebApp(tg);
      }
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src="${TELEGRAM_SCRIPT_URL}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
      
      setError('Check your email for the confirmation link!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramAuth = () => {
    if (!telegramWebApp) {
      setError('Telegram Web App not available');
      return;
    }

    // Get user data from Telegram
    const user = telegramWebApp.initDataUnsafe?.user;
    if (!user) {
      setError('Unable to get Telegram user data');
      return;
    }

    // Create a custom auth flow with the Telegram user data
    authenticateWithTelegram(user);
  };

  const authenticateWithTelegram = async (telegramUser: any) => {
    setLoading(true);
    setError('');

    try {
      // Create a unique email based on Telegram ID
      const telegramEmail = `telegram_${telegramUser.id}@rideshare.app`;
      
      // Try to sign in first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: telegramEmail,
        password: `telegram_${telegramUser.id}`,
      });

      if (signInError) {
        // If sign in fails, create new account
        const { error: signUpError } = await supabase.auth.signUp({
          email: telegramEmail,
          password: `telegram_${telegramUser.id}`,
          options: {
            data: {
              telegram_id: telegramUser.id,
              telegram_username: telegramUser.username,
              first_name: telegramUser.first_name,
              last_name: telegramUser.last_name,
              display_name: `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim(),
            }
          }
        });

        if (signUpError) throw signUpError;
      }

      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome to RideShare</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Telegram Auth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-[#0088cc] hover:bg-[#006699] text-white border-[#0088cc]"
            onClick={handleTelegramAuth}
            disabled={!telegramWebApp || loading}
          >
            <Send className="mr-2 h-4 w-4" />
            Continue with Telegram
          </Button>

          {error && (
            <div className={`mt-4 text-sm text-center ${
              error.includes('Check your email') ? 'text-green-600' : 'text-red-600'
            }`}>
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

// Extend the Window interface to include Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}