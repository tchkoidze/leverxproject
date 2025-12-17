import { apiSlice } from "../api/apiSlice";
import type {
  AuthenticatedUser,
  LoginPayload,
  SignupPayload,
} from "../../types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ user: AuthenticatedUser }, LoginPayload>({
      query: (credentials) => ({
        url: "/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<{ message: string; user: string }, SignupPayload>({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
