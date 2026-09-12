"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import keycloak, { initKeycloak } from "@/auth/keycloak";
import { setAuthenticated, setEmail, setUsername } from "@/store/slice/UserSlice";
import { fetchCustomerDetails } from "@/actions/UserActions";

export default function Providers({ children }) {
  // Lazy useState initializer creates one store per component instance (per
  // browser tab), rather than importing a shared singleton — see
  // src/store/index.js.
  const [store] = useState(() => makeStore());

  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    (async () => {
      try {
        const authenticated = await initKeycloak();
        if (authenticated) {
          store.dispatch(setAuthenticated(true));
          store.dispatch(setEmail(keycloak.tokenParsed.email));
          store.dispatch(setUsername(keycloak.tokenParsed.preferred_username));
          store.dispatch(fetchCustomerDetails(keycloak.tokenParsed.email));
        }
      } catch (error) {
        console.error("Keycloak init failed:", error);
      }
    })();
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
