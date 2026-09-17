import { CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/i18n";

const WhyUsSection = () => {
  const { t, tArray } = useLanguage();

  const reasons = [
    { title: t("whyUs.r1title"), desc: t("whyUs.r1desc") },
    { title: t("whyUs.r2title"), desc: t("whyUs.r2desc") },
    { title: t("whyUs.r3title"), desc: t("whyUs.r3desc") },
    { title: t("whyUs.r4title"), desc: t("whyUs.r4desc") },
    { title: t("whyUs.r5title"), desc: t("whyUs.r5desc") },
    { title: t("whyUs.r6title"), desc: t("whyUs.r6desc") },
  ];

  const approachItems = tArray("experienceQuality.approachItems");
  const effectItems = tArray("experienceQuality.effectItems");

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("whyUs.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed prose-measure">{t("whyUs.desc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {reasons.map((r) => (
            <div key={r.title} className="card-light h-full flex gap-4">
              <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{t("experienceQuality.title")}</h3>
          <p className="text-muted-foreground leading-relaxed prose-measure mb-6">{t("experienceQuality.intro")}</p>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="card-light h-full">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
                <h4 className="font-semibold text-foreground">{t("experienceQuality.approachTitle")}</h4>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {t("experienceQuality.approachIntro")}
              </p>
              <ul className="space-y-2">
                {approachItems.map((item) => (
                  <li key={item} className="flex gap-2 text-base text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-light h-full">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-primary" aria-hidden="true" />
                <h4 className="font-semibold text-foreground">{t("experienceQuality.effectTitle")}</h4>
              </div>
              <ul className="space-y-2">
                {effectItems.map((item) => (
                  <li key={item} className="flex gap-2 text-base text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
