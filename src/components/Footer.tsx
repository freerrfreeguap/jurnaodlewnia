import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";
import logoLeniar from "@/assets/logo-leniar.png";
import { openCookieSettings } from "@/components/CookieConsent";
import { COMPANY } from "@/content/legal";

const Footer = () => {
  const { t, tArray } = useLanguage();

  const footerNav = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.technology"), href: "/technologia" },
    { label: t("nav.services"), href: "/uslugi" },
    { label: t("nav.industries"), href: "/branze" },
    { label: t("nav.contact"), href: "/kontakt" },
  ];

  const techItems = tArray("footer.techItems");

  return (
    <footer className="border-t border-border bg-card">
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoLeniar} alt="Odlewnia Leniar – logo" width={160} height={30} loading="lazy" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
            <div className="mt-6 space-y-1 text-xs text-muted-foreground">
              <p className="text-foreground font-semibold">Leniar&amp;Leniar Sp. z o.o. Sp. komandytowa</p>
              <p>KRS: 0000769423</p>
              <p>NIP: 6793179929</p>
              <p>REGON: 382451991</p>
              <p className="pt-2 text-foreground">Biuro:</p>
              <p>ul. Szlak 67, 31-153 Kraków, małopolskie</p>
              <p className="pt-2 text-foreground">Zakład produkcyjny:</p>
              <p>ul. Innowacyjna 3, 36-060 Głogów Małopolski, podkarpackie</p>
            </div>
          </div>


          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.navTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.contactTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="text-foreground font-medium">Roman Juryk – Menadżer Produktu</li>
              <li>
                <a href="mailto:roman.juryk@leniar.pl" className="hover:text-foreground transition-colors">roman.juryk@leniar.pl</a>
              </li>
              <li>
                <a href="tel:+48690841365" className="hover:text-foreground transition-colors">+48 690 841 365</a>
              </li>
              <li>
                <a href="https://odlewnialeniar.pl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">odlewnialeniar.pl</a>
              </li>
              <li className="pt-2 border-t border-border/60 mt-2">
                <span className="block text-foreground">{t("home.locationOffice")}</span>
                <span className="block">{t("home.locationOfficeAddr")}</span>
              </li>
              <li>
                <span className="block text-foreground">{t("home.locationProduction")}</span>
                <span className="block">{t("home.locationProductionAddr")}</span>
              </li>
              <li className="pt-2 border-t border-border/60 mt-2">
                <a href="tel:+48172831141" className="hover:text-foreground transition-colors">+48 17 283 11 41</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">{t("footer.techTitle")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {techItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Informacje prawne</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/polityka-prywatnosci" className="hover:text-foreground transition-colors">Polityka prywatności</Link></li>
                <li><Link to="/polityka-cookies" className="hover:text-foreground transition-colors">Polityka cookies</Link></li>
                <li><Link to="/regulamin" className="hover:text-foreground transition-colors">Regulamin</Link></li>
                <li>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="hover:text-foreground transition-colors text-left"
                  >
                    Ustawienia cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Leniar. Wszelkie prawa zastrzeżone.</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
