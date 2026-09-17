import LegalPageLayout from "@/components/LegalPageLayout";
import { CookiePolicyContent } from "@/content/legal";
import { openCookieSettings } from "@/components/CookieConsent";

const PolitykaCookies = () => (
  <LegalPageLayout
    title="Polityka cookies | Odlewnia Leniar"
    description="Zasady wykorzystywania plików cookies: kategorie, wykaz, czas przechowywania oraz sposób zarządzania zgodą."
    path="/polityka-cookies"
    heading="Polityka cookies"
  >
    <CookiePolicyContent openSettings={openCookieSettings} />
  </LegalPageLayout>
);

export default PolitykaCookies;
