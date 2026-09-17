import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import { trackQuoteClick } from "@/lib/analytics";

const StickyMobileCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c1d45]/95 backdrop-blur border-t border-white/10 px-3 py-2 flex gap-2 shadow-lg">
      <Button variant="cta" size="sm" asChild className="flex-1 text-xs">
        <Link to="/kontakt" onClick={() => trackQuoteClick("sticky_mobile_send")}>{t("common.sendInquiry")}</Link>
      </Button>
      <Button variant="outline" size="sm" asChild className="flex-1 text-xs bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
        <Link to="/kontakt" onClick={() => trackQuoteClick("sticky_mobile_quote")}>{t("common.requestQuote")}</Link>
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
