import LegalPageLayout from "@/components/LegalPageLayout";
import { PrivacyPolicyContent } from "@/content/legal";

const PolitykaPrywatnosci = () => (
  <LegalPageLayout
    title="Polityka prywatności | Odlewnia Leniar"
    description="Pełna klauzula informacyjna RODO: administrator, cele i podstawy przetwarzania, prawa osoby, odbiorcy danych, okresy przechowywania."
    path="/polityka-prywatnosci"
    heading="Polityka prywatności"
  >
    <PrivacyPolicyContent />
  </LegalPageLayout>
);

export default PolitykaPrywatnosci;
