import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSignupMutation } from "../features/auth/authApi";
import { parseMutationError } from "../utils/parseMutationError";

export function useSignupForm() {
  const navigate = useNavigate();
  const [signupMutation, { error: signupError, isLoading }] =
    useSignupMutation();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (signupError) {
      setErrorMessage(parseMutationError(signupError));
    } else {
      setErrorMessage("");
    }
  }, [signupError]);

  const handleSubmit = async (form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      await signupMutation(form).unwrap();
      setErrorMessage("");
      navigate("/login");
    } catch {}
  };

  return { handleSubmit, errorMessage, isLoading };
}
