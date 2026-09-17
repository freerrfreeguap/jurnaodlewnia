import { useLanguage } from "@/i18n";
import img26 from "@/assets/leniar/detale-surowe.png.asset.json";
import img27 from "@/assets/leniar/leniar-27.webp.asset.json";
import imgChromPol from "@/assets/leniar/chromowanie-polerowanie.png.asset.json";
import img21 from "@/assets/leniar/detale-chromowane.png.asset.json";
import img24 from "@/assets/leniar/leniar-24.webp.asset.json";
import img25 from "@/assets/leniar/warianty-wykonczenia.png.asset.json";
import imgForma from "@/assets/leniar/forma-wielogniazdowa.png.asset.json";
import imgElektrody from "@/assets/leniar/elektrody-do-form.png.asset.json";
import imgBath2 from "@/assets/leniar/chromowane-akcesoria-lazienkowe-2.png.asset.json";
import imgChromePremium from "@/assets/leniar/chromowane-detale-premium.png.asset.json";
import imgChromeCorners from "@/assets/leniar/chromowane-narozniki.png.asset.json";
import imgInHand from "@/assets/leniar/detal-surowy-w-dloni.png.asset.json";
import imgRawBodies from "@/assets/leniar/detale-korpusy-surowe.png.asset.json";
import imgLShapes from "@/assets/leniar/precyzyjne-korpusy-l.png.asset.json";
import imgHandlesInsert from "@/assets/leniar/uchwyty-techniczne-z-wkladka.png.asset.json";
import imgGatesSet from "@/assets/leniar/odlewy-z-ukladem-wlewowym-zestaw.png.asset.json";

const RealizationsGallery = () => {
  const { t } = useLanguage();

  const items: { image: string; alt: string; label: string }[] = [
    { image: img26.url, alt: "Kolekcja odlewów Zamak – surowe detale techniczne", label: "Detale surowe – portfolio" },
    { image: img27.url, alt: "Kolekcja odlewów po lakierowaniu proszkowym na czarno", label: "Lakierowanie proszkowe" },
    { image: imgChromPol.url, alt: "Odlew po polerowaniu i chromowaniu galwanicznym", label: "Chromowanie / polerowanie" },
    { image: img25.url, alt: "Ten sam detal w trzech wykończeniach – chrom, satyna, czerń", label: "Warianty wykończenia" },
    { image: img24.url, alt: "Dwie połówki obudowy – lakier czarny i biały", label: "Obudowy lakierowane" },
    { image: img21.url, alt: "Detale chromowane – zestaw odlewów po polerowaniu i chromowaniu", label: "Detale chromowane" },
    { image: imgBath2.url, alt: "Chromowane akcesoria łazienkowe i użytkowe", label: "Akcesoria chromowane" },
    { image: imgChromePremium.url, alt: "Wysokopołyskowe detale premium po galwanizacji", label: "Detale premium" },
    { image: imgChromeCorners.url, alt: "Chromowane narożniki i łączniki techniczne", label: "Narożniki chromowane" },
    { image: imgInHand.url, alt: "Surowy detal techniczny prezentowany w dłoni", label: "Detal techniczny" },
    { image: imgRawBodies.url, alt: "Surowe korpusy i obudowy z odlewu ciśnieniowego", label: "Korpusy surowe" },
    { image: imgLShapes.url, alt: "Precyzyjne korpusy w kształcie L", label: "Korpusy precyzyjne" },
    { image: imgHandlesInsert.url, alt: "Techniczne uchwyty i detale z wkładką", label: "Detale techniczne" },
    { image: imgGatesSet.url, alt: "Zestaw odlewów z układem wlewowym", label: "Układ wlewowy – seria" },
    { image: imgForma.url, alt: "Forma wielogniazdowa – kompletny układ odlewu z wieloma gniazdami", label: "Forma wielogniazdowa" },
    { image: imgElektrody.url, alt: "Elektrody miedziane do form wtryskowych i odlewniczych", label: "Elektrody do form" },
  ];

  return (
    <section id="realizacje" className="section-padding border-t border-border scroll-mt-24">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("realizations.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("realizations.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t("realizations.desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="group overflow-hidden rounded-lg border border-border bg-muted">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-card">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealizationsGallery;
