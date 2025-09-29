import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const Chat: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [messages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    // Chat functionality disabled - no backend
    setDraft("");
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
        <div className="text-center text-muted-foreground py-8">
          Chat functionality is disabled
        </div>
      </div>
      <form onSubmit={sendMessage} className="p-2 border-t border-border flex items-center gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message" disabled />
        <Button type="submit" disabled>Send</Button>
      </form>
    </div>
  );
};

export default Chat;
