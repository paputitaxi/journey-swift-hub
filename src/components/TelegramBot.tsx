import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const TelegramBot = () => {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [botInfo, setBotInfo] = useState<any>(null);
  const { toast } = useToast();

  const getBotInfo = async () => {
    setLoading(true);
    try {
      console.log("Calling telegram bot function...");
      const response = await fetch(
        "https://dskmiajizazkcfyotibk.supabase.co/functions/v1/telegram-bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "getMe" }),
        }
      );
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.ok) {
        setBotInfo(data.result);
        toast({
          title: "Bot Connected",
          description: `Bot: @${data.result.username}`,
        });
      } else {
        toast({
          title: "Bot Error",
          description: data.description || JSON.stringify(data),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Bot connection error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect to bot",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!chatId || !message) {
      toast({
        title: "Error",
        description: "Please enter chat ID and message",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Sending message to chat:", chatId);
      const response = await fetch(
        "https://dskmiajizazkcfyotibk.supabase.co/functions/v1/telegram-bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "sendMessage",
            chatId,
            text: message,
          }),
        }
      );
      const data = await response.json();
      console.log("Send message response:", data);
      
      if (data.ok) {
        toast({
          title: "Message Sent",
          description: "Your message was sent successfully",
        });
        setMessage("");
      } else {
        throw new Error(data.description || JSON.stringify(data));
      }
    } catch (error) {
      console.error("Send message error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Telegram Bot</CardTitle>
        <CardDescription>
          {botInfo ? `Connected: @${botInfo.username}` : "Connect to your bot"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!botInfo && (
          <Button onClick={getBotInfo} disabled={loading} className="w-full">
            Connect to Bot
          </Button>
        )}
        
        {botInfo && (
          <>
            <Input
              placeholder="Chat ID"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
            />
            <Input
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              disabled={loading}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TelegramBot;
