import { StrictMode } from "react";
import { UserProvider } from "@/shared/model/user-context";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { MainLayout } from "./app/layouts";
import { LoginPage } from "./pages/login";
import { DashboardAdminPage } from "./pages/dashboard-admin";
import PrivateRoute from "./shared/ui/PrivateRoute";

// Configuración temporal del router
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h1 className="display-4 fw-bold text-slate-200 mb-4">
                SpaceNode
              </h1>
              <p className="text-slate-400">Landing Page - En construcción</p>
            </div>
          </div>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <PrivateRoute />, // Guardia de autenticación
        children: [
          {
            path: "/dashboard-admin",
            element: <DashboardAdminPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
