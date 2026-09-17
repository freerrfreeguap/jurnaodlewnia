import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";
import { trackQuoteClick } from "@/lib/analytics";

type Tone = "navy" | "light" | "minimal";

interface CtaButtonsBlockProps {
  tone?: Tone;
  title?: string;
  subtitle?: string;
  className?: string;
}

const toneStyles: Record<Tone, { section: string; title: string; subtitle: string; link: string }> = {
  navy: {
    section: "bg-primary text-primary-foreground",
    title: "text-primary-foreground",
    subtitle: "text-primary-foreground/85",
    link: "text-primary-foreground/90 hover:text-primary-foreground",
  },
  light: {
    section: "bg-secondary",
    title: "text-foreground",
    subtitle: "text-muted-foreground",
    link: "text-primary hover:text-primary/80",
  },
  minimal: {
    section: "bg-background border-y border-border",
    title: "text-foreground",
    subtitle: "text-muted-foreground",
    link: "text-primary hover:text-primary/80",
  },
};

const CtaButtonsBlock = ({ tone = "navy", title, subtitle, className }: CtaButtonsBlockProps) => {
  const { t } = useLanguage();
  const s = toneStyles[tone];

  const resolvedTitle = title ?? t("common.ctaBlockTitle");
  const resolvedSubtitle = subtitle ?? t("common.ctaBlockSubtitle");

  return (
    <section className={cn("section-padding", s.section, className)}>
      <div className="section-container">
        <div className="flex flex-col items-center text-center gap-5">
          {resolvedTitle && (
            <h2 className={cn("text-2xl md:text-4xl font-bold", s.title)}>{resolvedTitle}</h2>
          )}
          {resolvedSubtitle && (
            <p className={cn("prose-measure text-base md:text-lg leading-relaxed", s.subtitle)}>
              {resolvedSubtitle}
            </p>
          )}
          <div className="flex flex-col items-center gap-4 mt-2">
            {tone === "navy" ? (
              <Button
                asChild
                className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-semibold rounded-md bg-white text-primary hover:bg-white/90"
              >
                <Link to="/kontakt" onClick={() => trackQuoteClick("cta_block_navy")}>
                  {t("common.sendInquiry")} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <Button
                variant="cta"
                asChild
                className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-semibold rounded-md"
              >
                <Link to="/kontakt" onClick={() => trackQuoteClick("cta_block")}>
                  {t("common.sendInquiry")} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            )}
            <a
              href="tel:+48690841365"
              className={cn(
                "inline-flex items-center gap-2 text-base underline underline-offset-4 transition-colors min-h-[44px]",
                s.link,
              )}
            >
              <Phone className="w-4 h-4" />
              {t("common.talkToEngineer")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaButtonsBlock;
