import PageLayout from "@/components/PageLayout";
import Seo from "@/components/Seo";
import { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  description: string;
  path: string;
  heading: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, description, path, heading, children }: LegalPageLayoutProps) => (
  <PageLayout>
    <Seo title={title} description={description} path={path} />
    <section className="section-padding">
      <div className="section-container max-w-4xl">
        <header className="mb-12">
          <p className="text-accent text-sm font-mono uppercase tracking-wider mb-3">Dokument prawny</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground border-l-4 border-accent pl-4">
            {heading}
          </h1>
        </header>
        <article className="text-sm md:text-base text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_strong]:text-foreground">
          {children}
        </article>
      </div>
    </section>
  </PageLayout>
);

export default LegalPageLayout;
