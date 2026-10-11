import { Platform } from 'react-native';

// Google Analytics GA4 — Mindful Horizons
const GA_MEASUREMENT_ID = 'G-M3XR8YYGWN';

let initialized = false;

// Loads gtag.js and configures GA4 once per page load. Safe to call repeatedly.
export function initGA() {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || initialized) return;
  initialized = true;

  const w = window as any;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_MEASUREMENT_ID);
}

// Sends a GA4 event. Initializes GA4 first so events fired by a screen's
// effects (which run before the root layout's effects) aren't dropped.
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  initGA();
  (window as any).gtag('event', name, params);
}
