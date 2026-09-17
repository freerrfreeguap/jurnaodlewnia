import { Wrench, Sparkles, Shield, Layers, FileText, Settings, PaintBucket, Ruler } from "lucide-react";
import { useLanguage } from "@/i18n";

type ScopeItem = { title: string; desc: string };

const icons = [Wrench, Layers, Settings, Sparkles, PaintBucket, Shield, FileText, Ruler];

const ServicesScopeSection = () => {
  const { t, tList } = useLanguage();
  const items = tList<ScopeItem>("home.scopeItems");

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("home.scopeTag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("home.scopeTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed prose-measure">{t("home.scopeDesc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.title} className="card-light h-full flex flex-col">
                <Icon className="w-7 h-7 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesScopeSection;
