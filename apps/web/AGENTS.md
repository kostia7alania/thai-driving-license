# Astro frontend

Read Feature 025 and official Astro docs for framework changes. Pages render
static HTML by default; do not add a client directive to a content view. Keep
React islands limited to actual interaction and preserve the existing `/v1`
contract, URL state, source dates and index/noindex gates. Legacy `NEXT_PUBLIC_*`
build variables remain supported explicitly; never expose general process.env.
