import { useSyncExternalStore } from "react";

const KEY = "sareehub_buy_now_item";

// "Buy Now" checks out a single saree directly, bypassing the shared cart —
// this is a session-scoped handoff from the product page to checkout, not
// part of the cart itself. Kept in sessionStorage (not Redux) so it also
// survives the Keycloak login redirect round trip, same as the shipping draft.
export function setBuyNowItem(item) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(item));
  } catch {
    // sessionStorage unavailable — Buy Now will just fall back to an empty checkout.
  }
}

export function getBuyNowItem() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearBuyNowItem() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

// No same-tab "storage" event exists to subscribe to, so this never fires —
// callers re-read the snapshot on whatever render already follows their own
// setBuyNowItem/clearBuyNowItem call.
function subscribe() {
  return () => {};
}

let cachedRaw;
let cachedSnapshot = null;

function readSnapshot() {
  if (typeof window === "undefined") return null;
  let raw;
  try {
    raw = window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSnapshot = raw ? JSON.parse(raw) : null;
    } catch {
      cachedSnapshot = null;
    }
  }
  return cachedSnapshot;
}

function getServerSnapshot() {
  return null;
}

// Reads the buy-now item without a hydration mismatch: React uses
// getServerSnapshot for both the server render and the client's first
// (hydration) render, then switches to the real value from sessionStorage
// right after — see https://react.dev/reference/react/useSyncExternalStore
export function useBuyNowItem() {
  return useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);
}
