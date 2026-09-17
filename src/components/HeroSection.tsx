import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroCasting1 from "@/assets/photos/hero-castings-2.webp";
import heroCasting2 from "@/assets/photos/hero-castings-3.webp";
import { useLanguage } from "@/i18n";
import { trackQuoteClick } from "@/lib/analytics";
import { scrollToQuoteForm } from "@/components/QuoteTopBar";

const heroImages = [heroCasting1, heroCasting2];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [secondReady, setSecondReady] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Defer mounting the second image so it doesn't compete with the LCP image.
    const mount = setTimeout(() => setSecondReady(true), 2500);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => { clearTimeout(mount); clearInterval(interval); };
  }, []);

  // Smaller font for longer languages (DE, EN)
  const h1Class = language === "pl"
    ? "text-4xl sm:text-5xl lg:text-6xl"
    : "text-3xl sm:text-4xl lg:text-5xl";

  const ctaTextClass = language === "pl"
    ? "h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-semibold"
    : "h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-semibold";

  return (
    <section className="relative min-h-[calc(100vh-14rem)] flex items-center">
      <div className="absolute inset-0">
        {heroImages.map((src, i) => {
          if (i === 1 && !secondReady) return null;
          return (
            <img
              key={i}
              src={src}
              alt={t("hero.title1")}
              width={1920}
              height={1080}
              {...{ fetchpriority: i === 0 ? "high" : "low" }}
              decoding={i === 0 ? "sync" : "async"}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: current === i ? 1 : 0 }}
            />
          );
        })}
        <div className="gradient-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 py-8 md:py-10 px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-3xl">
          <div className="inline-block mb-3 px-3 py-1 rounded border border-white/30 text-white/80 text-sm font-mono tracking-wider uppercase">
            {t("hero.badge")}
          </div>
          <h1 className={`${h1Class} font-bold leading-tight mb-4 text-white whitespace-pre-line`}>
            {t("hero.title1")}
            <span className="text-white/70 block mt-2 whitespace-pre-line">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-3 leading-relaxed">
            {t("hero.desc1")}
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mb-6 leading-relaxed">
            {t("hero.desc2")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="hero"
              size="lg"
              className={ctaTextClass}
              onClick={() => {
                trackQuoteClick("hero");
                if (!scrollToQuoteForm()) navigate("/kontakt");
              }}
            >
              {t("hero.ctaSend")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className={`${ctaTextClass} bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-primary`}
            >
              <Link to="/technologia">{t("hero.ctaSecondary")}</Link>
            </Button>
          </div>

          <div className="mt-6 md:mt-8 flex gap-8 md:gap-12">
            {[
              { value: t("hero.stat1value"), label: t("hero.stat1label") },
              { value: t("hero.stat2value"), label: t("hero.stat2label") },
              { value: t("hero.stat3value"), label: t("hero.stat3label") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
