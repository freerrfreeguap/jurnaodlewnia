import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Factory, Layers, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";

const copy = {
  pl: {
    title: "Szybkie linki",
    items: ["Technologia", "Produkcja", "Branże", "Kontakt"],
  },
  en: {
    title: "Quick links",
    items: ["Technology", "Production", "Industries", "Contact"],
  },
  de: {
    title: "Schnellzugriff",
    items: ["Technologie", "Produktion", "Branchen", "Kontakt"],
  },
} as const;

const HREFS = ["/technologia", "/produkcja-biezaca", "/branze", "/kontakt"];
const ICONS = [Cpu, Factory, Layers, Mail];

const QuickLinksSection = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;

  return (
    <section className="section-padding border-t border-border bg-secondary/40">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
          {c.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {c.items.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <Link
                key={label}
                to={HREFS[i]}
                className="group rounded-xl border border-border bg-background p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex items-center gap-3"
              >
                <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <span className="font-semibold text-foreground flex-1">{label}</span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
