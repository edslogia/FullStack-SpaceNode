import { useUser } from "@/shared/model/user-context";
import { useCustomers } from "@/entities/customer";
import { useOperators } from "@/entities/operator";
import { CustomerAccordionItem } from "./CustomerAccordionItem";
import "./DashboardAdminPage.css";

function DashboardAdminPage() {
  const { user } = useUser();
  const { customers, loading: loadingCustomers } = useCustomers();
  const { operators, loading: loadingOperators } = useOperators();

  return (
    <div className="dashboard-admin-container">
      <div className="dashboard-admin-header">
        <h1 className="dashboard-admin-title">
          Bienvenido, {user?.fullName || "Usuario"}
        </h1>
        <div className="dashboard-admin-email">{user?.email || "-"}</div>
      </div>

      <div className="dashboard-admin-content">
        {/* Acordeón de Clientes */}
        <div className="accordion mb-3" id="customersAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#customersCollapse"
                aria-expanded="false"
                aria-controls="customersCollapse"
              >
                <strong>Clientes</strong>
                <span className="badge bg-primary ms-2">
                  {loadingCustomers ? "..." : customers.length}
                </span>
              </button>
            </h2>
            <div
              id="customersCollapse"
              className="accordion-collapse collapse"
              data-bs-parent="#customersAccordion"
            >
              <div className="accordion-body">
                {loadingCustomers ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : customers.length === 0 ? (
                  <p className="text-muted">No hay clientes registrados</p>
                ) : (
                  <div className="accordion" id="nestedCustomersAccordion">
                    {customers.map((customer, index) => (
                      <CustomerAccordionItem
                        key={customer.id}
                        customer={customer}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acordeón de Operadores */}
        <div className="accordion" id="operatorsAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#operatorsCollapse"
                aria-expanded="false"
                aria-controls="operatorsCollapse"
              >
                <strong>Operadores</strong>
                <span className="badge bg-success ms-2">
                  {loadingOperators ? "..." : operators.length}
                </span>
              </button>
            </h2>
            <div
              id="operatorsCollapse"
              className="accordion-collapse collapse"
              data-bs-parent="#operatorsAccordion"
            >
              <div className="accordion-body">
                {loadingOperators ? (
                  <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : operators.length === 0 ? (
                  <p className="text-muted">No hay operadores registrados</p>
                ) : (
                  <div className="list-group">
                    {operators.map((operator) => (
                      <div
                        key={operator.id}
                        className="list-group-item list-group-item-action"
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{operator.fullName}</h5>
                          <small className="text-muted">
                            {operator.username}
                          </small>
                        </div>
                        <p className="mb-1">
                          <strong>Email:</strong> {operator.email}
                        </p>
                        <p className="mb-1">
                          <strong>Teléfono:</strong> {operator.phone}
                        </p>
                        <small
                          className={
                            operator.hasChangedPassword
                              ? "text-success"
                              : "text-warning"
                          }
                        >
                          {operator.hasChangedPassword
                            ? "✓ Contraseña actualizada"
                            : "⚠ Contraseña pendiente de cambio"}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminPage;
