import { useUser } from "@/shared/model/user-context";

function DashboardAdminPage() {
  const { user } = useUser();

  return (
    <div className="dashboard-admin-container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bienvenido, {user?.fullName || "Usuario"}</h1>
      <div className="text-slate-300 fs-5 mb-2">
        Correo: {user?.email || "-"}
      </div>
      <div className="text-slate-400">Disfruta la experiencia SpaceNode</div>
    </div>
  );
}

export default DashboardAdminPage;
