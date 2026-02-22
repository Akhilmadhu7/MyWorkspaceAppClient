import { httpPost } from "../utils/httpMethods"

const BASE = `${import.meta.env.VITE_API_BASE_URL}v1/auth/`;

export const authAPI = {
  login: (endpoint, credentials, headers={}) =>
    httpPost({ url: `${BASE}${endpoint}`, data: credentials, headers }),

  logout: (headers={}) =>
    httpPost({ url: `${BASE}logout`}, headers),

  refreshToken: (refreshToken, headers) =>
    httpPost({ url: `${BASE}refresh`, data: { refresh_token: refreshToken }, headers }),
};