import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { FullScreenLoader }
from "@/components/common/FullScreenLoader";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: Props) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
  return <FullScreenLoader />;
}

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}