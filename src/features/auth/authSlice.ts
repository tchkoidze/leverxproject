import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedUser } from "../../types";
import type { RootState } from "../../app/store";

export interface AuthState {
  user: AuthenticatedUser | null;
  loading: boolean;
}

const getInitialUser = (): AuthenticatedUser | null => {
  const local = localStorage.getItem("user");
  const session = sessionStorage.getItem("user");

  if (local) return JSON.parse(local);
  if (session) return JSON.parse(session);
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthenticatedUser; remember: boolean }>
    ) => {
      state.user = action.payload.user;

      if (action.payload.remember) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    },

    updateAuthUser: (
      state,
      action: PayloadAction<Partial<AuthenticatedUser>>
    ) => {
      if (!state.user) return;

      state.user = {
        ...state.user,
        ...action.payload,
      };

      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
      if (sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateAuthUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
