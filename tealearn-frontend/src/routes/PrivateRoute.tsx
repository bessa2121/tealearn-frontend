import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}