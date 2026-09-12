import axios from "axios";
import { attachAuthInterceptor } from "./authInterceptor.js";

const CUSTOMER_SERVICE_URL =
    (process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL || "http://localhost:8085") + "/api/customers";

const api = attachAuthInterceptor(axios.create());

class CustomerService {

    getCustomerByEmail(email) {
        return api.get(`${CUSTOMER_SERVICE_URL}/email/${email}`);
    }

    registerCustomer(data) {
        return api.post(`${CUSTOMER_SERVICE_URL}/register`, data);
    }
}

const customerService = new CustomerService();

export default customerService;
