import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Clock } from "lucide-react";
import { useLanguage } from "@/i18n";
import { trackQuoteClick } from "@/lib/analytics";

const copy = {
  pl: {
    title: "Poproś o wycenę odlewów Zamak 5",
    sub: "Prześlij model 3D (STEP/IGES) lub PDF – ofertę odsyłamy w 2–3 dni robocze.",
    cta: "Poproś o wycenę",
    badge: "Odpowiedź w 2–3 dni robocze",
  },
  en: {
    title: "Request a quote for Zamak 5 die castings",
    sub: "Send us a 3D model (STEP/IGES) or a PDF – you get the quotation within 2–3 business days.",
    cta: "Request a Quote",
    badge: "Reply within 2–3 business days",
  },
  de: {
    title: "Angebot für Zamak-5-Druckguss anfordern",
    sub: "Senden Sie uns ein 3D-Modell (STEP/IGES) oder ein PDF – Angebot in 2–3 Werktagen.",
    cta: "Angebot anfordern",
    badge: "Antwort in 2–3 Werktagen",
  },
} as const;

export const scrollToQuoteForm = () => {
  const el = document.getElementById("kontakt");
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};

const QuoteTopBar = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    trackQuoteClick("top_bar");
    if (!scrollToQuoteForm()) {
      navigate(pathname === "/kontakt" ? "/kontakt" : "/kontakt");
    }
  };

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="section-container py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex-1">
          <h2 className="text-lg md:text-2xl font-bold leading-tight">{c.title}</h2>
          <p className="text-sm md:text-base text-primary-foreground/85 mt-1">{c.sub}</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
          <Button
            onClick={handleClick}
            className="h-12 md:h-14 px-6 md:px-10 text-base md:text-lg font-semibold rounded-md bg-white text-primary hover:bg-white/90 w-full md:w-auto"
          >
            {c.cta}
            <ArrowDown className="w-5 h-5" />
          </Button>
          <span className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/80">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {c.badge}
          </span>
        </div>
      </div>
    </section>
  );
};

export default QuoteTopBar;
