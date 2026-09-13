import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/UserSlice';
import cartReducer from './slice/CartSlice';
import wishlistReducer from './slice/WishlistSlice';
import { loadPersistedState, persistState } from './persist';

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
    preloadedState: loadPersistedState(),
  });

  // Cart/wishlist are otherwise in-memory only, so a full page reload — including
  // the Keycloak login redirect round trip — would silently empty them.
  if (typeof window !== 'undefined') {
    store.subscribe(() => persistState(store.getState()));
  }

  return store;
};
