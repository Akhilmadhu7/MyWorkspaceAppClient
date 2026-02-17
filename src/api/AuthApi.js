import { httpPost } from "../utils/httpMethods"

const BASE = `${import.meta.env.VITE_API_BASE_URL}v1/auth/`;

export const authAPI = {
  login: (endpoint, credentials, headers={}) =>
    httpPost({ url: `${BASE}${endpoint}`, data: credentials, headers }),

  logout: (endpoint) =>
    httpPost({ url: `${BASE}${endpoint}` }),

  refreshToken: (endpoint, refreshToken, headers) =>
    httpPost({ url: `${BASE}${endpoint}`, data: { refresh_token: refreshToken }, headers }),
};