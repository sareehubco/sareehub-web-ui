import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/UserSlice';

// Factory instead of a module-level singleton: Next.js can run this module on
// the server (per request) as well as in the browser, and a shared store
// instance would leak state across requests/users. Each caller gets its own
// store — see https://redux-toolkit.js.org/usage/nextjs
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};
