import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import IndustriesSection from "@/components/IndustriesSection";
import CtaButtonsBlock from "@/components/CtaButtonsBlock";
import { breadcrumbLd } from "@/lib/seo";

const Branze = () => (
  <PageLayout>
    <Seo
      title="Branże – odlewy Zamak 5 dla motoryzacji i AGD | Leniar"
      description="Komponenty odlewane ciśnieniowo Zamak 5 dla motoryzacji, AGD, meblarstwa, oświetlenia, elektrotechniki i przemysłu maszynowego. Sprawdź realizacje B2B."
      path="/branze"
      jsonLd={breadcrumbLd([
        { name: "Strona główna", path: "/" },
        { name: "Branże", path: "/branze" },
      ])}
    />
    <IndustriesSection asH1 />
    <CtaButtonsBlock tone="navy" />
  </PageLayout>
);

export default Branze;
