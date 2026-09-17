import { Helmet } from "react-helmet-async";

const SITE = "https://odlewnialeniar.pl";
const SITE_NAME = "Odlewnia Leniar";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/J30xqHFBGpQp6vwtBtgbtJDSIHi2/social-images/social-1778531569216-ChatGPT_Image_11_maj_2026,_22_32_29.webp";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Dodatkowy JSON-LD do osadzenia w head (Service, FAQPage, BreadcrumbList itp.) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Domyślnie index,follow. Ustaw na "noindex, follow" dla stron prywatnych. */
  robots?: string;
}

const Seo = ({ title, description, path, image, jsonLd, robots = "index, follow" }: SeoProps) => {
  const url = `${SITE}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="pl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
