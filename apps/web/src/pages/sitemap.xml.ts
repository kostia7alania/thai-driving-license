import type { APIRoute } from "astro";
import { PUBLIC_SLOT_TOOLS_ENABLED, SITE_URL } from "@/shared/config/site";
import { STATIC_ROUTES } from "@/shared/config/static-routes";

const FULL_BFF_ONLY_PATHS = new Set(["/calendar", "/compare", "/history"]);

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });
}

export const GET: APIRoute = () => {
  const entries = STATIC_ROUTES.filter(
    (route) => PUBLIC_SLOT_TOOLS_ENABLED || !FULL_BFF_ONLY_PATHS.has(route.path),
  ).map(
    (route) =>
      `<url><loc>${escapeXml(`${SITE_URL}${route.path}`)}</loc><changefreq>${route.changeFrequency}</changefreq><priority>${route.priority}</priority></url>`,
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
