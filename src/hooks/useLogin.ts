import { useNavigate } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { useLoginMutation } from "../features/auth/authApi";
import type { AuthenticatedUser, LoginPayload } from "../types";
import { login } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading, error: loginError }] = useLoginMutation();
  const [error, setError] = useState("");

  useEffect(() => {
    if (loginError) {
      let message = "Registration failed";

      if ("data" in loginError && loginError.data) {
        if (
          typeof loginError.data === "object" &&
          "message" in loginError.data
        ) {
          message = (loginError.data as { message: string }).message;
        } else if (typeof loginError.data === "string") {
          message = loginError.data;
        }
      } else if ("message" in loginError) {
        message = loginError.message;
      }

      setError(message);
    } else {
      setError("");
    }
  }, [loginError]);

  const logIn = async (credentials: LoginPayload, remember: boolean) => {
    try {
      const user: { user: AuthenticatedUser } = await loginMutation(
        credentials
      ).unwrap();
      console.log(user.user);
      dispatch(login({ user: user.user, remember }));
      navigate("/");
    } catch (err: any) {
      console.error("Login failed", err);
      throw err;
    }
  };

  return { logIn, isLoading, error };
}
