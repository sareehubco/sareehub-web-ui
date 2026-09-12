# SareeHub Web UI

Customer-facing web app for SareeHub, built with Next.js (App Router). This is the
Next.js migration of the original Vite/React app (`sareehub-web-ui-react`) — same
Keycloak login, Redux state, and API layer, restructured to Next.js conventions.

## Stack

- [Next.js 16](https://nextjs.org/docs) (App Router)
- [Redux Toolkit](https://redux-toolkit.js.org/) + React Redux for client state
- [Keycloak](https://www.keycloak.org/) (`keycloak-js`) for authentication
- [Axios](https://axios-http.com/) for API calls, with a request interceptor that
  attaches the Keycloak bearer token

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Configure backend URLs in `.env.local` (see the checked-in defaults):

- `NEXT_PUBLIC_KEYCLOAK_URL`, `NEXT_PUBLIC_KEYCLOAK_REALM`, `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`
- `NEXT_PUBLIC_CUSTOMER_SERVICE_URL`

## Project structure

```
src/
  app/                Routing only: layout.js, page.js, route folders,
                       each route's own page.module.css and metadata.
  components/         Shared UI (MenuBar, Landing, Home, RegisterForm),
                       each with a colocated CSS Module.
  store/              Redux Toolkit store + slices.
  actions/            Redux thunks (login/logout, fetch customer).
  auth/               Keycloak client + init.
  api/                Axios client + auth interceptor + service calls.
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project
