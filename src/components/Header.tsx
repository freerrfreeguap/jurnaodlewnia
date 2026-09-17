import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n";
import logoLeniar from "@/assets/logo-leniar.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const useWhiteText = true;
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.technology"), href: "/technologia" },
    { label: t("nav.services"), href: "/uslugi" },
    { label: t("nav.industries"), href: "/branze" },
    { label: t("nav.currentProduction"), href: "/produkcja-biezaca" },
    { label: t("nav.contact"), href: "/kontakt" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0c1d45] ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="relative px-4 md:px-8 flex items-center h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 z-10">
          <img src={logoLeniar} alt="Odlewnia Leniar – logo" width={160} height={30} className="h-6 md:h-7 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={{ color: "rgba(255,255,255,0.85)" }}
              className="text-sm transition-colors duration-300 hover:!text-white visited:!text-white"
            >
              {link.label}
            </Link>

          ))}
          <LanguageSwitcher />
          <Button variant="cta" size="sm" asChild className="min-h-[40px]">
            <Link to="/kontakt">{t("nav.cta")}</Link>
          </Button>
        </nav>

        <button
          className={`lg:hidden ml-auto -mr-2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${useWhiteText ? "text-white" : "text-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="lg:hidden bg-primary border-b border-primary-foreground/20">
          <nav className="section-container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-left py-3 min-h-[44px] flex items-center transition-colors ${
                  location.pathname === link.href
                    ? "text-white font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <LanguageSwitcher />
                  <Button variant="cta" asChild className="flex-1 min-h-[44px]">
                <Link to="/kontakt">{t("nav.cta")}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
