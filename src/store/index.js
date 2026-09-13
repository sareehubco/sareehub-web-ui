import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/UserSlice';
import cartReducer from './slice/CartSlice';
import wishlistReducer from './slice/WishlistSlice';
import { persistState } from './persist';

// Factory instead of a module-level singleton: Next.js can run this module on
// the server (per request) as well as in the browser, and a shared store
// instance would leak state across requests/users. Each caller gets its own
// store — see https://redux-toolkit.js.org/usage/nextjs
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
    // No preloadedState here on purpose: the store must start identical on the
    // server and the client's first (hydration) render, or React throws a
    // hydration mismatch. Cart/wishlist are instead rehydrated from
    // localStorage in a post-mount effect — see Providers.
  });

  // Cart/wishlist are otherwise in-memory only, so a full page reload — including
  // the Keycloak login redirect round trip — would silently empty them.
  if (typeof window !== 'undefined') {
    store.subscribe(() => persistState(store.getState()));
  }

  return store;
};
