import { Sofa, HardHat, DoorOpen, Cog, Factory } from "lucide-react";
import { useLanguage } from "@/i18n";

type App = { title: string; desc: string };
const icons = [Sofa, HardHat, DoorOpen, Cog, Factory];

const ApplicationsSection = () => {
  const { t, tList } = useLanguage();
  const items = tList<App>("home.applicationsItems");

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("home.applicationsTag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("home.applicationsTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t("home.applicationsDesc")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors text-center"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
