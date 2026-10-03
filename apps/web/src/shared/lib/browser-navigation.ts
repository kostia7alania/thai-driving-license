import { useCallback, useMemo, useSyncExternalStore } from "react";

const QUERY_CHANGE_EVENT = "app:querychange";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(QUERY_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(QUERY_CHANGE_EVENT, callback);
  };
}

function readSearch() {
  return window.location.search;
}

function readServerSearch() {
  return null;
}

/** URL-backed filters without a client-side router or a document navigation. */
export function useBrowserQuery(mode: "replace" | "push" = "replace") {
  const search = useSyncExternalStore(subscribe, readSearch, readServerSearch);
  // An empty browser query is ready; the build-time query is not yet known.
  const queryReady = search !== null;
  const searchParams = useMemo(() => new URLSearchParams(search ?? ""), [search]);

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      // Read the current URL so consecutive updates cannot overwrite each other.
      const url = new URL(window.location.href);
      for (const [name, value] of Object.entries(updates)) {
        if (value === null) url.searchParams.delete(name);
        else url.searchParams.set(name, value);
      }
      if (url.href === window.location.href) return;
      window.history[mode === "push" ? "pushState" : "replaceState"](window.history.state, "", url);
      // History writes do not emit popstate; notify the other mounted consumers.
      window.dispatchEvent(new Event(QUERY_CHANGE_EVENT));
    },
    [mode],
  );

  return { searchParams, updateQuery, queryReady };
}
