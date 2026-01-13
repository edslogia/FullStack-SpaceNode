import { useUser } from "@/shared/model/user-context";

function DashboardOperatorPage() {
  const { user } = useUser();

  return (
    <div className="dashboard-operator-container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bienvenido, {user?.fullName || "Operador"}</h1>
      <div className="text-slate-300 fs-5 mb-2">
        Correo: {user?.email || "-"}
      </div>
      <div className="text-slate-400">Panel de Operador - SpaceNode</div>
    </div>
  );
}

export default DashboardOperatorPage;
