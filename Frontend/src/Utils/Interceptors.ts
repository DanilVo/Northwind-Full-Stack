import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    // Create app interceptor 
    public create() {
        // Registering to request interceptor
        axios.interceptors.request.use(requestObject => {
            // RequestObj containing data send with any request 
            if (authStore.getState().token) {
                requestObject.headers.Authorization = `Bearer ${authStore.getState().token}`
            }

            return requestObject;
        });

    }

}

const interceptors = new Interceptors();

export default interceptors;