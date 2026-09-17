import { Award, Car, Workflow } from "lucide-react";
import { useLanguage } from "@/i18n";

const copy = {
  pl: {
    title: "Dlaczego LENIAR?",
    items: [
      { title: "48 lat doświadczenia", desc: "Odlewnictwo ciśnieniowe cynku od 1978 roku – setki uruchomionych narzędzi." },
      { title: "Produkcja dla Automotive", desc: "Detale techniczne dla dostawców motoryzacyjnych – powtarzalność i dokumentacja jakościowa." },
      { title: "Kompleksowa obsługa", desc: "Od projektu i formy, przez odlew i CNC, po galwanizację i gotowy wyrób." },
    ],
  },
  en: {
    title: "Why LENIAR?",
    items: [
      { title: "48 years of experience", desc: "Zinc die casting since 1978 – hundreds of tools launched into production." },
      { title: "Automotive production", desc: "Technical parts for automotive suppliers – repeatability and full quality documentation." },
      { title: "End-to-end service", desc: "From design and tooling, through casting and CNC, to plating and the finished product." },
    ],
  },
  de: {
    title: "Warum LENIAR?",
    items: [
      { title: "48 Jahre Erfahrung", desc: "Zink-Druckguss seit 1978 – hunderte in Serie gebrachte Werkzeuge." },
      { title: "Produktion für Automotive", desc: "Technische Teile für Automobilzulieferer – Wiederholgenauigkeit und Qualitätsdokumentation." },
      { title: "Komplettservice", desc: "Von Konstruktion und Werkzeug über Guss und CNC bis zu Galvanik und Fertigteil." },
    ],
  },
} as const;

const ICONS = [Award, Car, Workflow];

const WhyLeniarSection = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
          {c.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title} className="card-light h-full">
                <span className="w-11 h-11 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLeniarSection;
