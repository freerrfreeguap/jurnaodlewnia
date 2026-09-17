import { useLanguage } from "@/i18n";
import imgForma from "@/assets/leniar/forma-wielogniazdowa.png.asset.json";
import imgFormaMaszyna from "@/assets/leniar/forma-w-maszynie.png.asset.json";
import imgRawStack from "@/assets/leniar/odlewy-surowe-stos.png.asset.json";
import imgChrome from "@/assets/leniar/detale-chromowane.png.asset.json";

const copy = {
  pl: {
    title: "Formy i gotowe odlewy",
    desc: "Formy wielogniazdowe projektujemy i budujemy u siebie – poniżej narzędzia oraz detale po odlaniu i wykończeniu.",
    labels: ["Forma wielogniazdowa", "Forma w maszynie FRECH", "Odlewy surowe Zamak 5", "Detale chromowane"],
  },
  en: {
    title: "Molds and finished castings",
    desc: "We design and build multi-cavity molds in-house – below the tooling and parts after casting and finishing.",
    labels: ["Multi-cavity mold", "Mold in a FRECH machine", "Raw Zamak 5 castings", "Chrome-plated parts"],
  },
  de: {
    title: "Formen und fertige Gussteile",
    desc: "Mehrfachformen konstruieren und bauen wir im Haus – unten die Werkzeuge sowie Teile nach Guss und Veredelung.",
    labels: ["Mehrfachform", "Form in der FRECH-Maschine", "Rohgussteile Zamak 5", "Verchromte Teile"],
  },
} as const;

const IMAGES = [imgForma.url, imgFormaMaszyna.url, imgRawStack.url, imgChrome.url];

const MoldsAndCastingsStrip = () => {
  const { language } = useLanguage();
  const c = copy[language as keyof typeof copy] ?? copy.pl;

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 border-l-4 border-accent pl-4">
            {c.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed prose-measure">{c.desc}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {IMAGES.map((src, i) => (
            <figure key={src} className="rounded-xl overflow-hidden border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={src}
                  alt={`${c.labels[i]} – odlewnia ciśnieniowa Zamak 5 Leniar`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <figcaption className="bg-primary text-primary-foreground text-xs md:text-sm font-medium px-3 py-2">
                {c.labels[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoldsAndCastingsStrip;
