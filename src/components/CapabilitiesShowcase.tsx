import { useLanguage } from "@/i18n";
import imgInHand from "@/assets/leniar/detal-surowy-w-dloni.png.asset.json";
import imgRawHinges from "@/assets/leniar/zawiasy-surowe-zamak.png.asset.json";
import imgRawBodies from "@/assets/leniar/detale-korpusy-surowe.png.asset.json";
import imgCnc from "@/assets/leniar/wiercenie-frezowanie.png.asset.json";
import imgChrom from "@/assets/leniar/galwanizacja-chrom.png.asset.json";
import imgChromePremium from "@/assets/leniar/chromowane-detale-premium.png.asset.json";
import imgChromeCorners from "@/assets/leniar/chromowane-narozniki.png.asset.json";
import imgRaw1 from "@/assets/leniar/odlew-surowy-1.png.asset.json";

type CapItem = { title: string; desc: string };

const IMAGES = [
  imgInHand.url,
  imgRawHinges.url,
  imgRawBodies.url,
  imgCnc.url,
  imgChrom.url,
  imgChromePremium.url,
  imgChromeCorners.url,
];

const CapabilitiesShowcase = () => {
  const { t, tList } = useLanguage();
  const items = tList<CapItem>("capabilities.items");

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("capabilities.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("capabilities.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed prose-measure">{t("capabilities.desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {items.map((item, i) => (
            <article
              key={item.title}
              className="rounded-lg overflow-hidden bg-background border border-border shadow-sm hover:border-primary/40 transition-colors flex flex-col h-full"
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {IMAGES[i] && (
                  <img
                    src={IMAGES[i]}
                    alt={`${item.title} – Zamak 5, odlewnia Leniar`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </article>
          ))}

          <article className="rounded-lg overflow-hidden bg-background border border-border shadow-sm hover:border-primary/40 transition-colors flex flex-col h-full">
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              <img
                src={imgRaw1.url}
                alt="Odlew surowy Zamak 5 z układem wlewowym, przed obróbką wykończeniową"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-1.5">{t("capabilities.rawTitle")}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{t("capabilities.rawDesc")}</p>
            </div>
          </article>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesShowcase;
