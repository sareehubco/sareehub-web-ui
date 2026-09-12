import keycloak, { initKeycloak } from "../auth/keycloak.js";
import {setAuthenticated, setEmail, setUsername, setFirstName, setLastName, setPhone, removeUser} from "../store/slice/UserSlice.js";
import CustomerService from "../api/CustomerService.js";

export const fetchCustomerDetails = (email) => async (dispatch) => {
    try {
        const res = await CustomerService.getCustomerByEmail(email);
        dispatch(setFirstName(res.data.firstName));
        dispatch(setLastName(res.data.lastName));
        dispatch(setPhone(res.data.phone));
    } catch (error) {
        console.error("Failed to fetch customer details:", error);
    }
}

export const userLogin = () => async (dispatch) => {
    try {
        let authenticated = await initKeycloak();
        if (authenticated) {
            dispatch(setAuthenticated(true));
            dispatch(setEmail(keycloak.tokenParsed.email));
            dispatch(setUsername(keycloak.tokenParsed.preferred_username));
            dispatch(fetchCustomerDetails(keycloak.tokenParsed.email));
        } else {
            await keycloak.login();
        }
    } catch (error) {
        console.error("Keycloak login failed:", error);
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        await keycloak.logout();
        dispatch(removeUser());
    } catch (error) {
        console.error("Keycloak logout failed:", error);
    }
}
