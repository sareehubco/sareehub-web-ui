const CART_KEY = "sareehub_cart";
const WISHLIST_KEY = "sareehub_wishlist";

function readJSON(key) {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function writeJSON(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — persistence is best-effort.
  }
}

export function loadPersistedState() {
  const cart = readJSON(CART_KEY);
  const wishlist = readJSON(WISHLIST_KEY);
  return {
    ...(cart ? { cart } : {}),
    ...(wishlist ? { wishlist } : {}),
  };
}

export function persistState(state) {
  writeJSON(CART_KEY, state.cart);
  writeJSON(WISHLIST_KEY, state.wishlist);
}
