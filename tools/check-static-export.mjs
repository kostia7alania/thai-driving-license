#!/usr/bin/env node

// One migration gate, not an HTML parser or a substitute for browser QA.
// Compare the preserved Next export with Astro's generated output before shipping:
// node tools/check-static-export.mjs /path/to/next-export apps/web/out
// Both builds must use the same public origin and capability flags.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

const [baselineArgument, currentArgument] = process.argv.slice(2);
if (!baselineArgument || !currentArgument || process.argv.length !== 4) {
  console.error("Usage: node tools/check-static-export.mjs <baseline-dir> <current-dir>");
  process.exit(2);
}

const baselineDir = resolve(baselineArgument);
const currentDir = resolve(currentArgument);
const interactiveRoutes = new Set([
  "/offices",
  "/map",
  "/calendar",
  "/compare",
  "/history",
  "/playground",
]);
const failures = [];
const fail = (message) => failures.push(message);

function decode(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
    if (name.startsWith("#")) {
      const point =
        name[1].toLowerCase() === "x"
          ? Number.parseInt(name.slice(2), 16)
          : Number.parseInt(name.slice(1), 10);
      return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: "\u00a0" }[name.toLowerCase()];
  });
}

function attributes(source) {
  const attrs = {};
  for (const match of source.matchAll(
    /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    attrs[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
}

function parseHtml(html) {
  const scripts = Array.from(
    html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi),
    (match) => ({
      attrs: attributes(match[1]),
      body: match[2],
    }),
  );
  // Do not mistake serialized React data, inline JS, CSS, or comments for markup.
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->/gi, "");
  const tags = Array.from(
    markup.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi),
    (match) => ({
      name: match[1].toLowerCase(),
      attrs: attributes(match[2]),
    }),
  );
  const metas = tags.filter((tag) => tag.name === "meta");
  const meta = (name) => metas.find((tag) => tag.attrs.name?.toLowerCase() === name)?.attrs.content;
  const canonical = tags.find((tag) => tag.name === "link" && tag.attrs.rel === "canonical")?.attrs
    .href;
  const robots = (meta("robots") ?? "")
    .toLowerCase()
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const structuredData = scripts
    .filter((script) => script.attrs.type === "application/ld+json")
    .map((script) => JSON.parse(script.body));
  return {
    html,
    scripts,
    tags,
    seo: {
      title: decode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim(),
      description: meta("description") ?? "",
      googleSiteVerification: meta("google-site-verification") ?? "",
      canonical: canonical ? new URL(canonical).href : null,
      // An omitted robots tag means index/follow. Explicit defaults are equivalent.
      robots: {
        index: !robots.includes("noindex") && !robots.includes("none"),
        follow: !robots.includes("nofollow") && !robots.includes("none"),
        other: robots
          .filter(
            (value) => !["index", "follow", "noindex", "nofollow", "none", "all"].includes(value),
          )
          .sort(),
      },
      structuredData,
    },
  };
}

function readPages(directory) {
  const pages = new Map();
  for (const file of readdirSync(directory, { recursive: true, encoding: "utf8" })) {
    if (!file.endsWith(".html")) continue;
    const route =
      `/${file.replaceAll(sep, "/")}`
        .replace(/\/index\.html$/, "/")
        .replace(/\.html$/, "")
        .replace(/\/$/, "") || "/";
    // Next's internal error routes are replaced by Astro's separate 404 document.
    if (["/404", "/500", "/_not-found"].includes(route)) continue;
    if (pages.has(route)) throw new Error(`Duplicate HTML route ${route} in ${directory}`);
    try {
      pages.set(route, parseHtml(readFileSync(resolve(directory, file), "utf8")));
    } catch (error) {
      throw new Error(`Cannot read generated HTML ${file}: ${error.message}`, { cause: error });
    }
  }
  if (pages.size === 0) throw new Error(`No HTML pages found in ${directory}`);
  return pages;
}

function sitemapUrls(directory) {
  return Array.from(
    readFileSync(resolve(directory, "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/gs),
    (match) => decode(match[1]),
  ).sort();
}

function robotsDirectives(directory) {
  return readFileSync(resolve(directory, "robots.txt"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter(Boolean)
    .map((line) => line.replace(/^([^:]+):\s*/, (_, key) => `${key.toLowerCase()}: `));
}

function existingFile(directory, pathname) {
  const local = resolve(directory, `.${decodeURIComponent(pathname)}`);
  if (local !== directory && !local.startsWith(`${directory}${sep}`)) return false;
  return [local, `${local}.html`, resolve(local, "index.html")].some(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
}

function localReferences(page) {
  const references = [];
  for (const { name, attrs } of [
    ...page.tags,
    ...page.scripts.map((script) => ({ name: "script", attrs: script.attrs })),
  ]) {
    if (["a", "link"].includes(name) && attrs.href) references.push(attrs.href);
    if (attrs.src) references.push(attrs.src);
    if (attrs.poster) references.push(attrs.poster);
    if (attrs.srcset && !attrs.srcset.startsWith("data:")) {
      references.push(...attrs.srcset.split(",").map((entry) => entry.trim().split(/\s+/)[0]));
    }
    if (
      name === "meta" &&
      ["og:image", "twitter:image"].includes(attrs.property ?? attrs.name) &&
      attrs.content
    )
      references.push(attrs.content);
  }
  return references;
}

try {
  const baseline = readPages(baselineDir);
  const current = readPages(currentDir);
  if (existsSync(resolve(currentDir, "_next")))
    fail("Generated output retains a Next chunks directory");
  let contentPages = 0;
  let checkedReferences = 0;

  for (const [route, previous] of baseline) {
    const next = current.get(route);
    if (!next) {
      fail(`${route}: HTML route missing`);
      continue;
    }
    for (const field of Object.keys(previous.seo)) {
      if (!isDeepStrictEqual(previous.seo[field], next.seo[field])) {
        fail(
          `${route}: ${field} changed (${JSON.stringify(previous.seo[field])} -> ${JSON.stringify(next.seo[field])})`,
        );
      }
    }
  }

  const currentSitemap = sitemapUrls(currentDir);
  if (!isDeepStrictEqual(sitemapUrls(baselineDir), currentSitemap))
    fail("sitemap.xml: published URL set changed");
  if (new Set(currentSitemap).size !== currentSitemap.length) fail("sitemap.xml: duplicate URLs");
  if (!isDeepStrictEqual(robotsDirectives(baselineDir), robotsDirectives(currentDir)))
    fail("robots.txt: directives changed");
  const origin = new URL(current.get("/")?.seo.canonical ?? currentSitemap[0]).origin;

  for (const url of currentSitemap) {
    if (!existingFile(currentDir, new URL(url).pathname)) fail(`sitemap.xml: no HTML for ${url}`);
  }

  for (const [route, page] of current) {
    if (page.html.includes("/_next/")) fail(`${route}: retains a Next asset reference`);
    if (!interactiveRoutes.has(route)) {
      contentPages += 1;
      const executable = page.scripts.filter(
        (script) => !["application/ld+json", "application/json"].includes(script.attrs.type),
      );
      const preload = page.tags.some(
        ({ name, attrs }) =>
          name === "link" && (attrs.rel === "modulepreload" || attrs.as === "script"),
      );
      if (executable.length || preload)
        fail(`${route}: ordinary content ships executable JavaScript or a script preload`);
    }
    for (const reference of new Set(localReferences(page))) {
      if (/^(?:data|mailto|tel|javascript):/i.test(reference) || reference.startsWith("#"))
        continue;
      const url = new URL(reference, `${origin}${route}`);
      if (url.origin !== origin || url.pathname.startsWith("/v1/") || url.pathname === "/healthz")
        continue;
      checkedReferences += 1;
      if (!existingFile(currentDir, url.pathname))
        fail(`${route}: missing local link or asset ${reference}`);
    }
  }

  if (!existingFile(currentDir, "/404.html")) fail("Missing static 404.html fallback");
  if (failures.length) {
    console.error(`Static migration check failed (${failures.length} findings):`);
    for (const message of failures.slice(0, 60)) console.error(`- ${message}`);
    if (failures.length > 60)
      console.error(`- ${failures.length - 60} additional findings omitted`);
    process.exitCode = 1;
  } else {
    console.log(
      `Static migration check passed: ${baseline.size} preserved HTML routes, ${currentSitemap.length} sitemap URLs, ${contentPages} zero-JS content pages, ${checkedReferences} local links/assets checked.`,
    );
    const added = [...current.keys()].filter((route) => !baseline.has(route));
    if (added.length) console.log(`Additional routes: ${added.join(", ")}`);
  }
} catch (error) {
  console.error(`Static migration check could not complete: ${error.message}`);
  process.exitCode = 1;
}
