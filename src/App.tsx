import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n";
import Index from "./pages/Index";
import Technologia from "./pages/Technologia";
import Uslugi from "./pages/Uslugi";
import Branze from "./pages/Branze";
import Kontakt from "./pages/Kontakt";
import ProdukcjaBiezaca from "./pages/ProdukcjaBiezaca";
import NotFound from "./pages/NotFound";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import PolitykaCookies from "./pages/PolitykaCookies";
import Regulamin from "./pages/Regulamin";
import { CookieConsentProvider } from "@/components/CookieConsent";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <BrowserRouter>
          <CookieConsentProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/technologia" element={<Technologia />} />
              <Route path="/uslugi" element={<Uslugi />} />
              <Route path="/branze" element={<Branze />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/produkcja-biezaca" element={<ProdukcjaBiezaca />} />
              <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
              <Route path="/polityka-cookies" element={<PolitykaCookies />} />
              <Route path="/regulamin" element={<Regulamin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CookieConsentProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
