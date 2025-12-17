import { useNavigate } from "react-router";
// import { useAuth } from "../context/useContext";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

export function useLogout() {
  const dispatch = useAppDispatch();
  // const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // logout();
    navigate("/login");
  };

  return handleLogout;
}
