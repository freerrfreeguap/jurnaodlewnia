import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import ContactSection from "@/components/ContactSection";
import LocationMap from "@/components/LocationMap";
import { breadcrumbLd } from "@/lib/seo";

const Kontakt = () => (
  <PageLayout>
    <Seo
      title="Kontakt – wycena odlewów Zamak 5 w 2–3 dni | Leniar"
      description="Zapytaj o wycenę B2B odlewów Zamak 5. Roman Juryk: roman.juryk@leniar.pl, +48 690 841 365. Biuro Kraków, zakład Głogów Małopolski (podkarpackie)."
      path="/kontakt"
      jsonLd={breadcrumbLd([
        { name: "Strona główna", path: "/" },
        { name: "Kontakt", path: "/kontakt" },
      ])}
    />
    <ContactSection asH1 />
    <LocationMap />
  </PageLayout>
);

export default Kontakt;
