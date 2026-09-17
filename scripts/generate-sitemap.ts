import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://odlewnialeniar.pl";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/technologia", changefreq: "monthly", priority: "0.8" },
  { path: "/uslugi", changefreq: "monthly", priority: "0.8" },
  { path: "/branze", changefreq: "monthly", priority: "0.7" },
  { path: "/produkcja-biezaca", changefreq: "weekly", priority: "0.7" },
  { path: "/kontakt", changefreq: "monthly", priority: "0.6" },
  { path: "/polityka-prywatnosci", changefreq: "yearly", priority: "0.2" },
  { path: "/polityka-cookies", changefreq: "yearly", priority: "0.2" },
  { path: "/regulamin", changefreq: "yearly", priority: "0.2" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
