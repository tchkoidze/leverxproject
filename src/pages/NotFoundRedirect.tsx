import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { useAuth } from "../context/useContext";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";

export default function NotFoundRedirect() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = Boolean(user);
  // const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <p>Redirecting...</p>;
}
