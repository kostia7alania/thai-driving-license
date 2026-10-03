import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "NEXT_PUBLIC_");
// Keep the existing public deployment contract; never inject process.env itself.
const publicNames = [
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SITE_NAME",
  "NEXT_PUBLIC_SLOT_TOOLS_ENABLED",
];
const define = Object.fromEntries(
  publicNames.map((name) => [
    `process.env.${name}`,
    JSON.stringify(process.env[name] ?? env[name]) ?? "undefined",
  ]),
);

export default defineConfig({
  output: "static",
  outDir: "./out",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: {
    environments: {
      prerender: {
        // Resolve Astro's cookie version before bundling relocates its imports.
        // The CLI also installs an incompatible older version at the package root.
        resolve: { noExternal: ["cookie"] },
      },
    },
    define: {
      ...define,
    },
  },
});
