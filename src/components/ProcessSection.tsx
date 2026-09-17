import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";

type Step = { title: string; desc: string };

const ProcessSection = () => {
  const { t, tList } = useLanguage();
  const steps = tList<Step>("home.processSteps");

  return (
    <section className="section-padding border-t border-border bg-primary text-primary-foreground">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-primary-foreground/70 text-sm font-mono uppercase tracking-wider mb-3">{t("home.processTag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 border-l-4 border-primary-foreground pl-4">
            {t("home.processTitle")}
          </h2>
          <p className="text-primary-foreground/85 leading-relaxed">{t("home.processDesc")}</p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative p-6 rounded-lg bg-white/10 border border-white/25 hover:border-primary-foreground/40 transition-colors backdrop-blur"
            >
              <span className="text-4xl font-bold text-white font-mono block mb-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-primary-foreground mb-2">{step.title}</h3>
              <p className="text-base text-primary-foreground/90 leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>

        <Link
          to="/technologia"
          className="mt-8 inline-flex items-center gap-2 font-semibold text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80"
        >
          {t("home.processDetailsLink")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ProcessSection;
