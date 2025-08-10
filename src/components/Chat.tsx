import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

type ProfilesMap = Record<string, { display_name: string | null; nickname: string | null }>;

const Chat: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<ProfilesMap>({});
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }));
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Load latest messages
      const { data: msgs } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(200);
      setMessages(msgs || []);

      // Load profiles for display names
      const { data: profs } = await supabase.from('profiles').select('id, display_name, nickname');
      const map: ProfilesMap = {};
      (profs || []).forEach((p: any) => { map[p.id] = { display_name: p.display_name, nickname: p.nickname }; });
      setProfiles(map);

      // Subscribe to realtime inserts
      const channel = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    };

    const cleanupPromise = init();
    return () => { /* channel cleanup handled above */ };
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages.length]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const text = draft.trim();
    if (!text) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError('You must be signed in.'); return; }

    const { error } = await supabase.from('messages').insert({ user_id: session.user.id, content: text });
    if (error) setError(error.message);
    else setDraft("");
  };

  const nameFor = (userId: string) => {
    const p = profiles[userId];
    return p?.display_name || p?.nickname || 'Anonymous';
  };

  return (
    <div className="w-full h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
        <h3 className="font-semibold">Community Chat</h3>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col">
            <div className="text-xs text-muted-foreground">{nameFor(m.user_id)} • {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="px-3 py-2 rounded-lg bg-accent text-accent-foreground w-fit max-w-[80%]">{m.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-2 border-t border-border flex items-center gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message" />
        <Button type="submit">Send</Button>
      </form>
      {error && <div className="px-3 py-2 text-sm text-destructive border-t border-border">{error}</div>}
    </div>
  );
};

export default Chat;
