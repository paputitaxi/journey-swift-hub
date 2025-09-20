import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import DriverDashboard from "./pages/DriverDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import ChatWidget from "./components/ChatWidget";

const AppContent = () => {
  const { language, setLanguage } = useLanguage();

  console.log('Current language:', language);

  if (!language) {
    console.log('No language set, showing language selector');
    return <LanguageSelector onLanguageSelect={setLanguage} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/rider-dashboard" element={<RiderDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
};

const App = () => {
  // Register service worker for PWA (production only)
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="telegram" storageKey="rideshare-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
