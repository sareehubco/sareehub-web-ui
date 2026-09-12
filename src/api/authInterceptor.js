import keycloak from "../auth/keycloak.js";

export function attachAuthInterceptor(axiosInstance) {
    axiosInstance.interceptors.request.use(async (config) => {
        if (keycloak.authenticated) {
            await keycloak.updateToken(30);
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    });
    return axiosInstance;
}
