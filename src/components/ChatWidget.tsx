import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Chat from "./Chat";
import { useLocation } from "react-router-dom";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setIsAuthed(!!session));
    supabase.auth.getSession().then(({ data: { session } }) => setIsAuthed(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Hide on auth page
  if (location.pathname.startsWith('/auth') || !isAuthed) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {open && (
        <div className="mb-3 w-[320px] h-[420px] sm:w-[380px] sm:h-[520px] drop-shadow-xl">
          <Chat onClose={() => setOpen(false)} />
        </div>
      )}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg grid place-items-center hover:opacity-90 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChatWidget;
