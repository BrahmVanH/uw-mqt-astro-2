import type { GTagConsentSettings } from "./index";

declare global {
  interface Window {
    updateConsent: (settings: GTagConsentSettings) => void;
  }
}
