import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = window.localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
