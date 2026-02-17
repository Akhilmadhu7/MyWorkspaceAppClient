import axios from "axios";
import store from "../store/store";

const getAuthCredentials = () => {
  console.log("Getting auth credentials from Redux store...");

  const state = store.getState();
  const accessToken = state.auth?.tokens?.accessToken;
  const tenantId = state.auth?.tenant?.tenantId;
  const refreshToken = state.auth.refreshToken;
  return {
    accessToken: accessToken,
    tenantId: tenantId,
    refreshToken: refreshToken,
  };
};

const getAuthHeaders = () => {
  const authcredentials = getAuthCredentials();
  if (authcredentials?.accessToken && authcredentials?.tenantId) {
    return {
      Authorization: `Bearer ${authcredentials.accessToken}`,
      "X-Tenant-Id": authcredentials.tenantId,
    };
  }
  console.warn("No auth credentials found. Requests may fail.");
  return {};
};

export const httpGet = async ({ url, headers = {}, params = {} }) => {
  headers = {
    ...headers,
    ...getAuthHeaders(),
    accept: "application/json",
  };

    const response = await axios.get(url, { headers, params });
    console.log("GET response:", response.data);
    return response;
  
};

export const httpPost = async ({ url, data, headers }) => {
  headers = {
    ...headers,
    ...getAuthHeaders(),
    accept: "application/json",
    "Content-Type": "application/json",
  };

  return await axios.post(url, data, { headers });
};
