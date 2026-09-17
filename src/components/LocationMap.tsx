import { MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";

const LocationMap = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        <div className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">{t("home.locationTag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
            {t("home.locationTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed prose-measure">{t("home.locationDesc")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className="card-light h-full flex flex-col">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">{t("home.locationOffice")}</h3>
                <p className="text-base text-muted-foreground">{t("home.locationOfficeAddr")}</p>
              </div>
            </div>
            <div className="mt-4 rounded-md overflow-hidden border border-border">
              <iframe
                title="Leniar – biuro Kraków, ul. Szlak 67"
                src="https://www.google.com/maps?q=ul.+Szlak+67%2C+31-153+Krak%C3%B3w&hl=pl&gl=PL&output=embed"
                className="w-full h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="card-light h-full flex flex-col">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground">{t("home.locationProduction")}</h3>
                <p className="text-base text-muted-foreground">{t("home.locationProductionAddr")}</p>
              </div>
            </div>
            <div className="mt-4 rounded-md overflow-hidden border border-border">
              <iframe
                title="Leniar – zakład produkcyjny, ul. Innowacyjna 3, Głogów Małopolski"
                src="https://www.google.com/maps?q=ul.+Innowacyjna+3%2C+36-060+G%C5%82og%C3%B3w+Ma%C5%82opolski&hl=pl&gl=PL&output=embed"
                className="w-full h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
