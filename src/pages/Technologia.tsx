import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

import Seo from "@/components/Seo";
import TechnologySection from "@/components/TechnologySection";
import MachinesSection from "@/components/MachinesSection";
import SectionDivider from "@/components/SectionDivider";
import { breadcrumbLd } from "@/lib/seo";
import { useLanguage } from "@/i18n";

const Technologia = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <Seo
        title="Technologia i park maszynowy Zamak 5 | Odlewnia Leniar"
        description="Odlewanie ciśnieniowe Zamak 5: maszyny FRECH, formy H13, tolerancje ±0,05 mm, obróbka CNC, kontrola jakości ISO 9001:2015 i pełna identyfikowalność partii."
        path="/technologia"
        jsonLd={breadcrumbLd([
          { name: "Strona główna", path: "/" },
          { name: "Technologia", path: "/technologia" },
        ])}
      />
      <TechnologySection asH1 />
      <SectionDivider />
      <MachinesSection />
      <section className="section-container pb-16 flex justify-center">
        <Button asChild size="lg">
          <Link to="/#realizacje">
            {t("technology.galleryLink")} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </section>

    </PageLayout>
  );
};

export default Technologia;

