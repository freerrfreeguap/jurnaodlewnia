import LegalPageLayout from "@/components/LegalPageLayout";
import { TermsContent } from "@/content/legal";

const Regulamin = () => (
  <LegalPageLayout
    title="Regulamin świadczenia usług drogą elektroniczną | Odlewnia Leniar"
    description="Regulamin korzystania z serwisu odlewnialeniar.pl zgodny z ustawą z 18.07.2002 r. o świadczeniu usług drogą elektroniczną."
    path="/regulamin"
    heading="Regulamin świadczenia usług drogą elektroniczną"
  >
    <TermsContent />
  </LegalPageLayout>
);

export default Regulamin;
