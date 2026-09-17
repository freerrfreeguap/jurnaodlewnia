import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/i18n";

import imgDetaleSurowe from "@/assets/leniar/detale-surowe.png.asset.json";
import imgDetaleChrom from "@/assets/leniar/detale-chromowane.png.asset.json";
import imgChromPol from "@/assets/leniar/chromowanie-polerowanie.png.asset.json";
import imgWarianty from "@/assets/leniar/warianty-wykonczenia.png.asset.json";
import imgForma from "@/assets/leniar/forma-wielogniazdowa.png.asset.json";
import imgElektrody from "@/assets/leniar/elektrody-do-form.png.asset.json";
import imgGalw from "@/assets/leniar/galwanizacja-chrom.png.asset.json";
import imgPortfolio from "@/assets/leniar/portfolio-detali-zamak.png.asset.json";
import imgWiercFrez from "@/assets/leniar/wiercenie-frezowanie.png.asset.json";
import imgOdlewBlisko from "@/assets/leniar/odlewy-detale-blisko.png.asset.json";
import imgOdlewStos from "@/assets/leniar/odlewy-surowe-stos.png.asset.json";
import img24 from "@/assets/leniar/leniar-24.webp.asset.json";
import img27 from "@/assets/leniar/leniar-27.webp.asset.json";
import img21 from "@/assets/leniar/leniar-21.webp.asset.json";
import img22 from "@/assets/leniar/leniar-22.webp.asset.json";
import img12 from "@/assets/leniar/leniar-12.webp.asset.json";
import imgBath2 from "@/assets/leniar/chromowane-akcesoria-lazienkowe-2.png.asset.json";
import imgInHand from "@/assets/leniar/detal-surowy-w-dloni.png.asset.json";
import imgChromeCorners from "@/assets/leniar/chromowane-narozniki.png.asset.json";
import imgRawTech from "@/assets/leniar/detal-techniczny-surowy.png.asset.json";
import imgChromePremium from "@/assets/leniar/chromowane-detale-premium.png.asset.json";
import imgRawHinges from "@/assets/leniar/zawiasy-surowe-zamak.png.asset.json";
import imgRawBodies from "@/assets/leniar/detale-korpusy-surowe.png.asset.json";
import imgLShapes from "@/assets/leniar/precyzyjne-korpusy-l.png.asset.json";
import imgHandlesInsert from "@/assets/leniar/uchwyty-techniczne-z-wkladka.png.asset.json";
import imgGatesSet from "@/assets/leniar/odlewy-z-ukladem-wlewowym-zestaw.png.asset.json";
import imgFormyWozek from "@/assets/leniar/formy-na-wozku-hala.png.asset.json";
import imgFrechOdlewy from "@/assets/leniar/maszyna-frech-z-odlewami.png.asset.json";
import imgSuroweL from "@/assets/leniar/surowe-l-zawiasy-zestaw.png.asset.json";
import imgChromZawias from "@/assets/leniar/chromowany-zawias-prysznicowy.png.asset.json";

type Industry = {
  slug: string;
  name: string;
  short: string;
  long: string;
  examples: string[];
};

const imagesBySlug: Record<string, { url: string; alt: string }[]> = {
  meblarstwo: [
    { url: imgDetaleChrom.url, alt: "Chromowane uchwyty i okucia meblowe" },
    { url: imgChromeCorners.url, alt: "Chromowane narożniki i łączniki do systemów meblowych" },
    { url: img24.url, alt: "Lakierowane elementy meblowe" },
  ],
  stolarka: [
    { url: imgRawHinges.url, alt: "Surowe zawiasy i komponenty stolarki z Zamak 5" },
    { url: imgSuroweL.url, alt: "Zestaw surowych odlewów L – zawiasy i okucia stolarki" },
    { url: imgGalw.url, alt: "Galwanicznie wykończone klamki i elementy stolarki" },
  ],
  lazienka: [
    { url: imgChromZawias.url, alt: "Chromowany zawias prysznicowy – detal premium z Zamak po galwanizacji" },
    { url: imgBath2.url, alt: "Chromowane akcesoria łazienkowe z odlewu ciśnieniowego" },
    { url: imgChromePremium.url, alt: "Detale premium do armatury i wyposażenia łazienek" },
  ],
  automotive: [
    { url: imgRawTech.url, alt: "Surowy detal techniczny dla automotive" },
    { url: imgGatesSet.url, alt: "Zestaw odlewów z układem wlewowym dla produkcji seryjnej" },
    { url: imgFrechOdlewy.url, alt: "Maszyna FRECH z paletą odlewów Zamak – produkcja seryjna komponentów" },
  ],
  agd: [
    { url: imgBath2.url, alt: "Chromowane komponenty i pokrętła do AGD" },
    { url: imgChromePremium.url, alt: "Wykończone detale użytkowe do urządzeń AGD" },
    { url: img27.url, alt: "Detale AGD po wykończeniu" },
  ],
  elektronika: [
    { url: imgLShapes.url, alt: "Precyzyjne korpusy i obudowy w kształcie L" },
    { url: imgSuroweL.url, alt: "Surowe odlewy L – komponenty konstrukcyjne do obudów" },
    { url: imgRawBodies.url, alt: "Surowe korpusy i obudowy techniczne do elektroniki" },
  ],
  oswietlenie: [
    { url: imgChromZawias.url, alt: "Chromowany detal techniczny – wykończenie premium opraw" },
    { url: imgDetaleChrom.url, alt: "Chromowane elementy opraw oświetleniowych" },
    { url: imgWarianty.url, alt: "Warianty wykończenia opraw i akcesoriów" },
  ],
  bankomaty: [
    { url: imgSuroweL.url, alt: "Surowe odlewy L – komponenty mechaniczne do terminali i bankomatów" },
    { url: imgLShapes.url, alt: "Precyzyjne korpusy L do obudów terminali i systemów bezpieczeństwa" },
    { url: imgRawBodies.url, alt: "Surowe korpusy mechaniczne do urządzeń samoobsługowych" },
  ],
  medycyna: [
    { url: img21.url, alt: "Korpusy aparatury medycznej" },
    { url: imgDetaleChrom.url, alt: "Wykończone elementy urządzeń medycznych" },
    { url: imgPortfolio.url, alt: "Portfolio detali dla medycyny" },
  ],
  "reklama-pos": [
    { url: imgWarianty.url, alt: "Warianty wykończenia elementów POS" },
    { url: img24.url, alt: "Lakierowane elementy ekspozytorów" },
    { url: imgDetaleChrom.url, alt: "Chromowane elementy reklamowe" },
  ],
  pozostale: [
    { url: imgFormyWozek.url, alt: "Park form wielogniazdowych H13 na wózku transportowym w hali odlewni" },
    { url: imgForma.url, alt: "Forma wielogniazdowa do produkcji seryjnej" },
    { url: imgElektrody.url, alt: "Elektrody do form i oprzyrządowania" },
  ],
};

const ALLOWED_SLUGS = new Set([
  "meblarstwo",
  "stolarka",
  "lazienka",
  "automotive",
  "agd",
  "elektronika",
  "oswietlenie",
  "bankomaty",
  "pozostale",
]);

const IndustriesSection = ({ asH1 = false }: { asH1?: boolean }) => {
  const Heading = asH1 ? "h1" : "h2";
  const { t, tArray, tList } = useLanguage();
  const allItems = tList<Industry>("industries.items");
  const items = allItems.filter((i) => ALLOWED_SLUGS.has(i.slug));
  const capabilities = tArray("industries.capabilities");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(items[0]?.slug ?? null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selected = items.find((i) => i.slug === selectedSlug) ?? null;
  const images = selected ? imagesBySlug[selected.slug] ?? [] : [];

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="branze" className="section-padding border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("industries.tag")}</p>
          <Heading className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("industries.title")}
          </Heading>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("industries.desc1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("industries.desc2")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {items.map((item) => {
            const active = item.slug === selectedSlug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => handleSelect(item.slug)}
                className={`text-left p-4 md:p-6 rounded-lg border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card border-border hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                <h3 className={`text-base md:text-lg font-semibold mb-1 ${active ? "text-primary-foreground" : "text-foreground"}`}>
                  {item.name}
                </h3>
                <p className={`text-sm leading-snug ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                  {item.short}
                </p>
              </button>
            );
          })}
        </div>

        <div ref={detailRef} className="scroll-mt-24">
          {selected ? (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border bg-primary">
                <p className="text-xs font-mono uppercase tracking-wider text-primary-foreground/70 mb-2">
                  {t("industries.tag")}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">{selected.name}</h3>
                <p className="text-primary-foreground/85 leading-relaxed max-w-3xl">{selected.long}</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-0 border-b border-border">
                {images.map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">
                    {t("industries.capabilitiesTitle")}
                  </h4>
                  <ul className="space-y-2.5">
                    {capabilities.map((cap, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-base text-muted-foreground leading-relaxed">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">
                    {t("industries.examplesTitle")}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 mb-6">
                    {selected.examples.map((ex, i) => (
                      <li
                        key={i}
                        className="text-sm text-white bg-[hsl(215,75%,48%)] border border-[hsl(215,75%,55%)] rounded px-3 py-2"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-accent pl-3">
                    {t("industries.bothProjectsNote")}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-primary text-primary-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    {selected.name} – {t("common.ctaBlockTitle")}
                  </p>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    {t("common.ctaBlockSubtitle")}
                  </p>
                </div>
                <Button asChild className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-white text-primary hover:bg-white/90 shrink-0">
                  <Link to="/kontakt">
                    {t("industries.ctaLabel")} <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              {t("industries.selectPrompt")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
