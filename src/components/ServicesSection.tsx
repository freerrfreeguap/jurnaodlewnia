import { Link } from "react-router-dom";
import {
  Wrench, Paintbrush, Sparkles, CircleDot, Layers, Shield,
  Ruler, ClipboardCheck, ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/i18n";


type Step = { title: string; desc: string };

const ServicesSection = ({ asH1 = false }: { asH1?: boolean }) => {
  const Heading = asH1 ? "h1" : "h2";
  const { t, tArray, tList } = useLanguage();

  const services = [
    { icon: ClipboardCheck, title: t("services.s8title"), desc: t("services.s8desc"), details: tArray("services.s8details") },
    { icon: Wrench, title: t("services.s1title"), desc: t("services.s1desc"), details: tArray("services.s1details") },
    { icon: Sparkles, title: t("services.s2title"), desc: t("services.s2desc"), details: tArray("services.s2details") },
    { icon: Shield, title: t("services.s3title"), desc: t("services.s3desc"), details: tArray("services.s3details") },
    { icon: Paintbrush, title: t("services.s4title"), desc: t("services.s4desc"), details: tArray("services.s4details") },
    { icon: CircleDot, title: t("services.s5title"), desc: t("services.s5desc"), details: tArray("services.s5details") },
    { icon: Layers, title: t("services.s6title"), desc: t("services.s6desc"), details: tArray("services.s6details") },
    { icon: Ruler, title: t("services.s7title"), desc: t("services.s7desc"), details: tArray("services.s7details") },
  ];

  // Kanoniczny proces 5-etapowy – wspólny ze stroną główną
  const processSteps = tList<Step>("home.processSteps");


  const qualityItems = tArray("services.qualityItems");

  return (
    <section id="uslugi" className="section-padding border-t border-border">
      <div className="section-container">
        <div className="max-w-3xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("services.tag")}</p>
          <Heading className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("services.title")}
          </Heading>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("services.desc1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("services.desc2")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch">
          <div className="h-full p-8 rounded-lg bg-card border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t("services.qualityTitle")}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("services.qualityDesc")}</p>
            <p className="text-sm text-muted-foreground mb-4">{t("services.qualityScope")}</p>
            <ul className="space-y-2">
              {qualityItems.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4 italic">{t("services.qualityNote")}</p>
          </div>

          <div className="h-full p-8 rounded-lg bg-card border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {t("services.designersTitle")}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("services.designersDesc")}</p>
            <p className="text-sm text-muted-foreground mb-4">{t("services.designersNote")}</p>
            <Link to="/kontakt" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              {t("contact.rfqTitle")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

        </div>

        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("home.processTag")}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
            {t("home.processTitle")}
          </h3>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {processSteps.map((s, i) => (
              <li
                key={s.title}
                className="relative h-full p-6 rounded-lg bg-primary text-primary-foreground border border-white/15"
              >
                <span className="block mb-2 text-5xl font-bold font-mono text-white/30 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-semibold text-primary-foreground mb-2">{s.title}</h4>
                <p className="text-base text-primary-foreground/90 leading-relaxed">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("services.scopeTag")}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 border-l-4 border-accent pl-4">
            {t("services.servicesGridTitle")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {services.map((s) => (
              <div key={s.title} className="h-full flex flex-col p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group">
                <s.icon className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.details.map((d) => (
                    <li key={d} className="text-[13px] leading-relaxed text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 rounded-lg bg-primary text-primary-foreground text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t("services.ctaTitle")}</h3>
          <p className="text-primary-foreground/90 mb-4 max-w-xl mx-auto">{t("services.ctaDesc")}</p>
          <p className="text-sm text-primary-foreground/75 mb-6 max-w-md mx-auto">{t("services.ctaConfidential")}</p>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-md font-semibold text-lg transition-colors"
            >
              {t("services.ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+48690841365"
              className="inline-flex items-center gap-2 text-base text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-4 min-h-[44px]"
            >
              {t("common.talkToEngineer")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
