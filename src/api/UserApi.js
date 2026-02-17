import { httpGet } from "../utils/httpMethods";

const USERBASE = `${import.meta.env.VITE_API_BASE_URL}v1/users/`;

export const userAPI = {
    getUserById: (endpoint, headers={}) => 
        httpGet({url: `${USERBASE}${endpoint}`, headers})
}