/**
 * Pomocnicze buildery JSON-LD dla schema.org.
 * Wartości produkcyjne (telefony, e-maile) trzymamy w jednym miejscu.
 */

const SITE = "https://odlewnialeniar.pl";

export const breadcrumbLd = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.path}`,
  })),
});

export const serviceCatalogLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Odlewnictwo ciśnieniowe Zamak 5",
  provider: { "@id": `${SITE}/#organization` },
  areaServed: ["PL", "DE", "EU"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pełny zakres usług odlewni",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DFM i projekt formy H13" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Odlewanie ciśnieniowe Zamak 5" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Obróbka CNC i wykończeniowa" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Galwanizacja (chrom, nikiel, mosiądz)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lakierowanie proszkowe i ciekłe" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Montaż i pakowanie B2B" } },
    ],
  },
});

export const faqLd = (items: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});
