import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Basic SEO for the auth page
  const title = useMemo(() => (mode === "signin" ? "Login" : "Create account") + " | Rideshare", [mode]);
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    const content = mode === "signin" ? "Login to your rideshare account" : "Create a rideshare account";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      m.setAttribute("content", content);
      document.head.appendChild(m);
    }
  }, [title, mode]);

  // Redirect to home when authenticated
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/", { replace: true });
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back", description: "You are now signed in" });
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "Confirm your email to complete signup." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <main className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2 text-foreground">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin" ? "Enter your credentials to continue" : "Use your email and a strong password"}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-foreground">Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1 text-foreground">Password</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {mode === "signin" ? (
            <Button className="w-full" onClick={handleSignIn} disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          ) : (
            <Button className="w-full" onClick={handleSignUp} disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          )}

          <div className="text-sm text-center text-muted-foreground">
            {mode === "signin" ? (
              <button className="underline underline-offset-4" onClick={() => setMode("signup")}>Need an account? Sign up</button>
            ) : (
              <button className="underline underline-offset-4" onClick={() => setMode("signin")}>Already have an account? Sign in</button>
            )}
          </div>
        </div>

        <aside className="mt-6 text-xs text-muted-foreground">
          Tip: If email confirmation is enabled in Supabase, check your inbox after signup. You can disable it in Auth settings while testing.
        </aside>

        <footer className="mt-6 text-xs text-muted-foreground text-center">
          <Link to="/" className="underline underline-offset-4">Back to home</Link>
        </footer>
      </main>
    </div>
  );
};

export default Auth;
