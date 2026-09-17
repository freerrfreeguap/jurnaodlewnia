import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import ServicesSection from "@/components/ServicesSection";
import { breadcrumbLd, serviceCatalogLd } from "@/lib/seo";

const Uslugi = () => (
  <PageLayout>
    <Seo
      title="Usługi odlewni B2B – Zamak 5, CNC, galwanizacja | Leniar"
      description="Pełen cykl produkcji odlewów ciśnieniowych Zamak 5: DFM, formy H13, obróbka CNC, galwanizacja, lakierowanie, montaż i pakowanie. Wycena B2B w 2–3 dni."
      path="/uslugi"
      jsonLd={[
        serviceCatalogLd(),
        breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
        ]),
      ]}
    />
    <ServicesSection asH1 />
  </PageLayout>

);

export default Uslugi;
