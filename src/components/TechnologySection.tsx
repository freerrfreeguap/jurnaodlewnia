import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";


const TechnologySection = ({ asH1 = false }: { asH1?: boolean }) => {
  const Heading = asH1 ? "h1" : "h2";
  const { t, language } = useLanguage();
  const dec = (v: string) => (language === "en" ? v : v.replace(".", ","));

  const steps = [
    { num: "01", title: t("technology.step1title"), desc: t("technology.step1desc") },
    { num: "02", title: t("technology.step2title"), desc: t("technology.step2desc") },
    { num: "03", title: t("technology.step3title"), desc: t("technology.step3desc") },
    { num: "04", title: t("technology.step4title"), desc: t("technology.step4desc") },
    { num: "05", title: t("technology.step5title"), desc: t("technology.step5desc") },
    { num: "06", title: t("technology.step6title"), desc: t("technology.step6desc") },
    { num: "07", title: t("technology.step7title"), desc: t("technology.step7desc") },
  ];

  const materialProps = [
    { label: t("technology.propDensity"), value: `${dec("6.6")} g/cm³` },
    { label: t("technology.propMelting"), value: "386–394°C" },
    { label: t("technology.propInjection"), value: "~420°C" },
    { label: t("technology.propTensile"), value: "328 MPa" },
    { label: t("technology.propHardness"), value: "82 HB" },
    { label: t("technology.propShrinkage"), value: `~${dec("0.6")}%` },
  ];

  return (
    <section id="technologia" className="section-padding border-t border-border">
      <div className="section-container">
        <div className="max-w-3xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("technology.tag")}</p>
          <Heading className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("technology.title")}
          </Heading>
          <p className="text-foreground font-medium mb-4">{t("technology.processIntro")}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("technology.desc1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("technology.desc2")}</p>
        </div>

        <div className="space-y-0 mb-16">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-lg bg-primary text-primary-foreground border border-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-1 flex-1 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6 border-l-4 border-accent pl-4">
            {t("technology.zamakTitle")}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{t("technology.zamakDesc")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch">
            {materialProps.map((p) => (
              <div
                key={p.label}
                className="h-full p-4 rounded-lg bg-card border border-border text-center flex flex-col items-center justify-center"
              >
                <p className="text-lg font-semibold text-foreground">{p.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.label}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="p-8 rounded-lg bg-card border-2 border-primary/30">
          <h3 className="text-xl font-bold text-foreground mb-3">{t("technology.dfmTitle")}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">{t("technology.dfmDesc")}</p>
          <p className="text-sm text-muted-foreground">{t("technology.dfmNote")}</p>
        </div>

        <div className="mt-16 p-8 md:p-10 rounded-xl bg-primary text-primary-foreground flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">{t("technology.quoteCtaTitle")}</h3>
              <p className="text-sm md:text-base text-primary-foreground/85 leading-relaxed max-w-2xl">
                {t("technology.quoteCtaDesc")}
              </p>
            </div>
          </div>
          <Button variant="cta" asChild className="h-12 md:h-14 px-6 md:px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 w-full md:w-auto md:shrink-0">
            <Link to="/kontakt">
              {t("technology.quoteCtaButton")} <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

  );
};

export default TechnologySection;
