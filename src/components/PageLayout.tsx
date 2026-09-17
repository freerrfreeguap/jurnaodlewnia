import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        key={location.pathname}
        className="flex-1 pt-16 md:pt-20 animate-page-in pb-16 lg:pb-0"
      >
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default PageLayout;
