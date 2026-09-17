import { Atom, Weight, Flame, FileCode2, Cog, Droplets } from "lucide-react";
import { useLanguage } from "@/i18n";

const copy = {
  pl: {
    title: "Przewagi LENIAR",
    items: [
      { label: "ZAMAK 5", desc: "Stop ZnAl4Cu1 – wysoka powtarzalność" },
      { label: "Odlewy do 1500 g", desc: "Detale od kilku gramów do 1,5 kg" },
      { label: "FRECH Hot Chamber", desc: "Maszyny gorącokomorowe FRECH" },
      { label: "STP / IGES / PDF", desc: "Przyjmujemy modele 3D i rysunki 2D" },
      { label: "CNC", desc: "Wiercenie, frezowanie, gwintowanie" },
      { label: "Galwanizacja i malowanie", desc: "Chrom, nikiel, lakier proszkowy" },
    ],
  },
  en: {
    title: "Why LENIAR delivers",
    items: [
      { label: "ZAMAK 5", desc: "ZnAl4Cu1 alloy – high repeatability" },
      { label: "Castings up to 1500 g", desc: "Parts from a few grams to 1.5 kg" },
      { label: "FRECH Hot Chamber", desc: "FRECH hot-chamber machines" },
      { label: "STP / IGES / PDF", desc: "We accept 3D models and 2D drawings" },
      { label: "CNC", desc: "Drilling, milling, tapping" },
      { label: "Plating & painting", desc: "Chrome, nickel, powder coating" },
    ],
  },
  de: {
    title: "Stärken von LENIAR",
    items: [
      { label: "ZAMAK 5", desc: "ZnAl4Cu1 – hohe Wiederholgenauigkeit" },
      { label: "Gussteile bis 1500 g", desc: "Teile von wenigen Gramm bis 1,5 kg" },
      { label: "FRECH Warmkammer", desc: "FRECH Warmkammer-Maschinen" },
      { label: "STP / IGES / PDF", desc: "3D-Modelle und 2D-Zeichnungen" },
      { label: "CNC", desc: "Bohren, Fräsen, Gewindeschneiden" },
      { label: "Galvanik & Lackierung", desc: "Chrom, Nickel, Pulverlack" },
    ],
  },
} as const;

const ICONS = [Atom, Weight, Flame, FileCode2, Cog, Droplets];

const AdvantagesStrip = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;

  return (
    <section className="section-padding border-t border-border bg-secondary/40">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
          {c.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={item.label}
                className="h-full flex items-start gap-3 md:gap-4 rounded-xl border border-border bg-background p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground leading-snug">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesStrip;
