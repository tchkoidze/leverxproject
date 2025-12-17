import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../app/hooks";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  // const { isAuthenticated, loading } = useAuth();
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  //  if (!isAuthenticated) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
