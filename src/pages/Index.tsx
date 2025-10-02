import TelegramBot from "@/components/TelegramBot";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Telegram Bot Integration</h1>
          <p className="text-xl text-muted-foreground">Send messages through your Telegram bot</p>
        </div>
        <TelegramBot />
      </div>
    </div>
  );
};

export default Index;
