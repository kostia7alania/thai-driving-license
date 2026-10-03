import type { APIRoute } from "astro";
import { PUBLIC_SITE_CONFIGURED, SITE_URL } from "@/shared/config/site";

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      ...(PUBLIC_SITE_CONFIGURED ? ["Allow: /", "Disallow: /playground"] : ["Disallow: /"]),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
