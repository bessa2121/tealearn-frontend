import {
  Routes,
  Route,
} from "react-router-dom";

import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { MaterialPage } from "@/pages/materials/MaterialPage";
import { MaterialDetailsPage } from "@/pages/materials/MaterialDetailsPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { AdaptationPage } from "@/pages/adaptations/AdaptationPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";

import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedLayout } from "@/layouts/ProtectedLayout";

export function AppRoutes() {
  return (
    <Routes>
      {/* Pública */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Privadas */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/materials"
          element={<MaterialPage />}
        />

        <Route
          path="/materials/:id"
          element={<MaterialDetailsPage />}
        />
        
        <Route
          path="/adaptations"
          element={<AdaptationPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
