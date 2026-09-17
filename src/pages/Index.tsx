import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import QuoteTopBar from "@/components/QuoteTopBar";
import HeroSection from "@/components/HeroSection";
import AdvantagesStrip from "@/components/AdvantagesStrip";
import AboutSection from "@/components/AboutSection";
import WhyLeniarSection from "@/components/WhyLeniarSection";
import ServicesScopeSection from "@/components/ServicesScopeSection";
import MoldsAndCastingsStrip from "@/components/MoldsAndCastingsStrip";
import WhyUsSection from "@/components/WhyUsSection";
import ProcessSection from "@/components/ProcessSection";
import IndustryIcons from "@/components/IndustryIcons";
import ApplicationsSection from "@/components/ApplicationsSection";
import LocationMap from "@/components/LocationMap";
import CapabilitiesShowcase from "@/components/CapabilitiesShowcase";
import RealizationsGallery from "@/components/RealizationsGallery";
import QuickLinksSection from "@/components/QuickLinksSection";
import ContactSection from "@/components/ContactSection";
import CtaButtonsBlock from "@/components/CtaButtonsBlock";

const Index = () => (
  <PageLayout>
    <Seo
      title="Odlewnia Leniar – odlewy ciśnieniowe Zamak 5 dla B2B"
      description="Odlewnia ciśnieniowa cynku i Zamak 5. Precyzyjne komponenty B2B, obróbka CNC, galwanizacja i lakierowanie. Wycena w 2–3 dni roboczych w PL, DE i UE."
      path="/"
    />
    <QuoteTopBar />
    <HeroSection />
    <AdvantagesStrip />
    <AboutSection />
    <WhyLeniarSection />
    <ServicesScopeSection />
    <MoldsAndCastingsStrip />
    <CapabilitiesShowcase />
    <WhyUsSection />
    <CtaButtonsBlock tone="navy" />
    <RealizationsGallery />
    <ProcessSection />
    <IndustryIcons />
    <ApplicationsSection />
    <LocationMap />
    <QuickLinksSection />
    <ContactSection />
  </PageLayout>
);

export default Index;
