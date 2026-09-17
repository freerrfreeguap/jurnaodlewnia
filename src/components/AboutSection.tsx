import { Factory, Users, Settings, BarChart3, MapPin, Calendar, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import zakladPhoto from "@/assets/leniar/zaklad-glogow-malopolski.jpg.asset.json";
import biuroPhoto from "@/assets/leniar/biuro-krakow-szlak67.jpg.asset.json";



const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Calendar, value: "od 1983", label: t("about.stat1") },
    { icon: TrendingUp, value: "1 000 000+", label: t("about.stat2") },
    { icon: Users, value: "40+", label: t("about.stat3") },
    { icon: Award, value: "±0.03 mm", label: t("about.stat4") },
  ];

  const features = [
    { icon: Factory, title: t("about.feat1title"), text: t("about.feat1text") },
    { icon: Settings, title: t("about.feat2title"), text: t("about.feat2text") },
    { icon: BarChart3, title: t("about.feat3title"), text: t("about.feat3text") },
    { icon: Users, title: t("about.feat4title"), text: t("about.feat4text") },
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-12">
          <div className="border-l-4 border-accent pl-6 max-w-4xl">
            <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("about.tag")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
              {t("about.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.desc1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.desc2")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.desc3")}</p>
          </div>
        </div>


        <div className="mb-12 grid md:grid-cols-2 gap-6 items-stretch">
          <figure className="rounded-lg overflow-hidden border border-border bg-primary flex flex-col min-w-0 w-full">
            <div className="h-[420px] overflow-hidden bg-muted">
              <img
                src={zakladPhoto.url}
                alt="Zakład produkcyjny Leniar – Głogów Małopolski"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
              />
            </div>
            <figcaption className="px-5 py-4 bg-primary text-primary-foreground flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold">Zakład produkcyjny Leniar</p>
                <p className="text-primary-foreground/80">ul. Innowacyjna 3, 36-060 Głogów Małopolski, Strefa Rogoźnica · podkarpackie</p>
              </div>
            </figcaption>
          </figure>
          <figure className="rounded-lg overflow-hidden border border-border bg-primary flex flex-col min-w-0 w-full">
            <div className="h-[420px] overflow-hidden bg-muted">
              <img
                src={biuroPhoto.url}
                alt="Biuro Leniar – Kraków, ul. Szlak 67"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="px-5 py-4 bg-primary text-primary-foreground flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold">Biuro Leniar</p>
                <p className="text-primary-foreground/80">ul. Szlak 67, 31-153 Kraków · małopolskie</p>
              </div>
            </figcaption>
          </figure>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("about.locationTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.locationDesc")}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("about.certsTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.certsDesc")}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("about.teamTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.teamDesc")}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mb-8 p-6 rounded-lg bg-primary/5 border-2 border-primary/30 flex items-center gap-4 justify-center text-center flex-wrap">
          <ShieldCheck className="w-7 h-7 text-primary shrink-0" />
          <div>
            <p className="font-bold text-foreground text-lg">Zatwierdzony dostawca branży automotive</p>
            <p className="text-sm text-muted-foreground">Wieloletnia współpraca z producentami komponentów dla motoryzacji – jakość zgodna z wymaganiami sektora automotive.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-lg bg-card border border-border text-center">
              <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors group">
              <f.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
