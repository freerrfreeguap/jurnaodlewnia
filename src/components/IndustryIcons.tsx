import { Link } from "react-router-dom";
import { Car, Stethoscope, Armchair, CircuitBoard, DoorOpen } from "lucide-react";
import { useLanguage } from "@/i18n";

const copy = {
  pl: {
    title: "Obsługiwane branże",
    items: ["Automotive", "Medyczna", "Meblarska", "Elektronika", "Okna i drzwi"],
  },
  en: {
    title: "Industries we serve",
    items: ["Automotive", "Medical", "Furniture", "Electronics", "Window & Door"],
  },
  de: {
    title: "Betreute Branchen",
    items: ["Automotive", "Medizin", "Möbel", "Elektronik", "Fenster & Türen"],
  },
} as const;

const ICONS = [Car, Stethoscope, Armchair, CircuitBoard, DoorOpen];

const IndustryIcons = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
          {c.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {c.items.map((label, i) => {
            const Icon = ICONS[i];
            return (
              <Link
                key={label}
                to="/branze"
                className="rounded-xl border border-border bg-background p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col items-center text-center gap-3"
              >
                <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </span>
                <span className="font-medium text-foreground text-sm md:text-base">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryIcons;
