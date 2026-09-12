import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'sareehub-realm',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'sareehub-web-ui',
};

const initOptions = {
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    checkLoginIframe: false,
};

const keycloak = new Keycloak(keycloakConfig);

let initPromise = null;

export function initKeycloak() {
    if (typeof window === 'undefined') {
        return Promise.resolve(false);
    }
    if (!initPromise) {
        initPromise = keycloak.init(initOptions);
    }
    return initPromise;
}

export default keycloak;
