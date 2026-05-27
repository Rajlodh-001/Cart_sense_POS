import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TenantDetail {
  org: {
    id: string;
    name: string;
  };
  location: {
    id: string;
    locationSkuId: string;
    name: string;
  };
}

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: Record<string, unknown> | null;
  roleId: string | null;
  permissions: string[];
  preferences: Record<string, unknown> | null;
  isAuthenticated: boolean;
  deviceId: string | null;
  tenantDetail: TenantDetail | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  avatar: null,
  role: null,
  roleId: null,
  permissions: [],
  preferences: null,
  isAuthenticated: false,
  deviceId: null,
  tenantDetail: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Partial<UserState>>,
    ) => {
      if (action.payload.id) state.id = action.payload.id;
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.avatar !== undefined) state.avatar = action.payload.avatar;
      if (action.payload.role) state.role = action.payload.role;
      if (action.payload.roleId) state.roleId = action.payload.roleId;
      if (action.payload.permissions) state.permissions = action.payload.permissions;
      if (action.payload.preferences) state.preferences = action.payload.preferences;
      if (action.payload.deviceId) state.deviceId = action.payload.deviceId;
      if (action.payload.tenantDetail) state.tenantDetail = action.payload.tenantDetail;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.avatar = null;
      state.role = null;
      state.roleId = null;
      state.permissions = [];
      state.preferences = null;
      state.isAuthenticated = false;
      state.deviceId = null;
      state.tenantDetail = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
