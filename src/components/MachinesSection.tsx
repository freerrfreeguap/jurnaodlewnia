import maszyna1 from "@/assets/maszyna-1-new.jpg";
import maszyna2 from "@/assets/maszyna-2-new.jpg";
import maszyna3 from "@/assets/leniar/leniar-27.webp.asset.json";
import { useLanguage } from "@/i18n";

const MachinesSection = () => {
  const { t, tArray } = useLanguage();

  const machines = [
    { src: maszyna1, alt: t("machines.m1alt"), title: t("machines.m1title"), desc: t("machines.m1desc"), specs: tArray("machines.m1specs") },
    { src: maszyna2, alt: t("machines.m2alt"), title: t("machines.m2title"), desc: t("machines.m2desc"), specs: tArray("machines.m2specs") },
    { src: maszyna3.url, alt: t("machines.m3alt"), title: t("machines.m3title"), desc: t("machines.m3desc"), specs: tArray("machines.m3specs") },
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("machines.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("machines.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t("machines.desc")}</p>
        </div>

        <div className="space-y-12">
          {machines.map((m, i) => (
            <div key={m.title} className={`grid lg:grid-cols-2 gap-8 items-start ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="overflow-hidden rounded-lg border border-border">
                  <img src={m.src} alt={m.alt} loading="lazy" decoding="async" width={1200} height={800} className="w-full max-w-full aspect-[16/10] object-cover" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-xl font-bold text-foreground mb-3">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{m.desc}</p>
                <ul className="space-y-2">
                  {m.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-secondary-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinesSection;
