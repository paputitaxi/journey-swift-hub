import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus, Chrome, Square } from "lucide-react";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const redirectTo = `${window.location.origin}/`;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectTo }
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'azure') => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) setError(error.message);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <section className="w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in or create an account to continue</p>
        </header>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <Button variant={mode === 'signin' ? 'default' : 'outline'} onClick={() => setMode('signin')}><LogIn className="mr-2 h-4 w-4"/>Sign in</Button>
          <Button variant={mode === 'signup' ? 'default' : 'outline'} onClick={() => setMode('signup')}><UserPlus className="mr-2 h-4 w-4"/>Sign up</Button>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-9"/>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="pl-9"/>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Create account')}</Button>
        </form>

        <div className="my-6 flex items-center justify-center text-xs text-muted-foreground">
          <span className="px-2">OR</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" onClick={() => signInWithProvider('google')}>
            <Chrome className="mr-2 h-4 w-4"/> Continue with Google
          </Button>
          <Button variant="outline" onClick={() => signInWithProvider('azure')}>
            <Square className="mr-2 h-4 w-4"/> Continue with Microsoft
          </Button>
        </div>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </footer>
      </section>
    </main>
  );
};

export default Auth;
