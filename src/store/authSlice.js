import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
    userImageUrl:null
  },
  tenant: {
    tenantId: null,
    tenantName: null,
    tenantTimezone: null,
    tenantLogoUrl: null,
  },
  role: {
    roleId: null,
    roleName: null,
  },
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthCredentials: (state, action) => {
      const {
        userId,
        userFirstName,
        userLastName,
        userEmail,
        tenantName,
        tenantId,
        tenantTimezone,
        tenantLogoUrl,
        roleId,
        roleName,
        accessToken,
        refreshToken,
      } = action.payload;
      state.user = {
        userId,
        userEmail,
        userFirstName: userFirstName,
        userLastName: userLastName,
      };
      state.tenant = {
        tenantId,
        tenantName,
        tenantTimezone,
        tenantLogoUrl,
      };
      state.role = {
        roleId,
        roleName,
      };
      state.tokens = {
        accessToken,
        refreshToken,
      };
      state.isAuthenticated = true;
    },
    clearAuthCredentials: (state) => {
      state.user = null;
      state.tenant = null;
      state.role = null;
      state.tokens = {
        accessToken: null,
        refreshToken: null,
      };
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthCredentials, clearAuthCredentials } = authSlice.actions;
export default authSlice.reducer;
