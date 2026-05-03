import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: any | null;
  roleId: string | null;
  permissions: string[];
  preferences: any;
  isAuthenticated: boolean;
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
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
