/** Lightweight, privacy-friendly click tracking for RFQ / quote CTAs. */

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "leniar_cta_clicks";

export const trackEvent = (event: string, payload: Payload = {}) => {
  if (typeof window === "undefined") return;

  const data = {
    event,
    page_path: window.location.pathname,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  window.gtag?.("event", event, data);

  // Local counter – always available even without an analytics tag installed.
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const counts = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    const key = `${event}:${String(payload.location ?? "unknown")}`;
    counts[key] = (counts[key] ?? 0) + 1;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {
    /* storage unavailable – ignore */
  }
};

/** Click on any "Request a quote / Send inquiry" button. */
export const trackQuoteClick = (location: string) =>
  trackEvent("rfq_cta_click", { location });

/** Successful RFQ form submission. */
export const trackQuoteSubmit = (location = "contact_form") =>
  trackEvent("rfq_form_submit", { location });
