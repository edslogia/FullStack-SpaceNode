import { useState } from "react";
import "./CustomerAccordionItem.css";
import {
  useCustomerDetail,
  updateCustomerStatus,
  type Customer,
} from "@/entities/customer";
import { updateOperatorStatus } from "@/entities/operator";

interface CustomerAccordionItemProps {
  customer: Customer;
  index: number;
  onCustomerStatusChange?: (customerId: string, newStatus: boolean) => void;
}

export function CustomerAccordionItem({
  customer,
  onCustomerStatusChange,
}: CustomerAccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customerStatus, setCustomerStatus] = useState(customer.isActive);
  const [operatorStatuses, setOperatorStatuses] = useState<
    Record<string, boolean>
  >({});
  const [updatingCustomer, setUpdatingCustomer] = useState(false);
  const [updatingOperator, setUpdatingOperator] = useState<string | null>(null);
  const { detail, loading, error, fetchDetail } = useCustomerDetail();

  const handleToggle = async () => {
    if (!isExpanded && !detail) {
      await fetchDetail(customer.id);
    }
    setIsExpanded(!isExpanded);
  };

  const handleCustomerStatusToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdatingCustomer(true);
    try {
      const newStatus = !customerStatus;
      await updateCustomerStatus(customer.id, newStatus);
      setCustomerStatus(newStatus);
      onCustomerStatusChange?.(customer.id, newStatus);
    } catch (err) {
      console.error("Error al actualizar estado del cliente:", err);
    } finally {
      setUpdatingCustomer(false);
    }
  };

  const handleOperatorStatusToggle = async (
    operatorId: string,
    currentStatus: boolean
  ) => {
    setUpdatingOperator(operatorId);
    try {
      const newStatus = !currentStatus;
      await updateOperatorStatus(operatorId, newStatus);
      setOperatorStatuses((prev) => ({ ...prev, [operatorId]: newStatus }));
    } catch (err) {
      console.error("Error al actualizar estado del operador:", err);
    } finally {
      setUpdatingOperator(null);
    }
  };

  const getOperatorStatus = (
    operatorId: string,
    defaultStatus: boolean
  ): boolean => {
    return operatorStatuses[operatorId] ?? defaultStatus;
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          <div className="d-flex w-100 align-items-center">
            <strong>{customer.fullName}</strong>
            <span className="ms-2 text-muted">({customer.username})</span>
            <button
              type="button"
              className={`badge ms-3 border-0 status-toggle-btn ${
                customerStatus ? "bg-success" : "bg-secondary"
              } ${updatingCustomer ? "status-updating" : ""}`}
              onClick={handleCustomerStatusToggle}
              disabled={updatingCustomer}
              title={`Clic para ${customerStatus ? "desactivar" : "activar"}`}
            >
              {customerStatus ? "Activo" : "Inactivo"}
            </button>
            <div className="ms-auto me-3 d-flex align-items-center">
              <span className="badge bg-info me-2">
                {customer.nodosCount} nodos
              </span>
              <span className="badge bg-warning">
                {customer.operatorsCount} operadores
              </span>
            </div>
          </div>
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
      >
        <div className="accordion-body">
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : detail ? (
            <>
              {/* Información básica */}
              <div className="mb-3">
                <p className="mb-0">
                  <small className="text-muted">
                    Creado: {new Date(detail.createdAt).toLocaleDateString()}{" "}
                    {" | "}
                    Actualizado:{" "}
                    {new Date(detail.updatedAt).toLocaleDateString()}
                  </small>
                </p>
              </div>

              {/* Acordeón de Operadores */}
              <div className="accordion mb-2" id={`operators-${customer.id}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#operatorsCollapse-${customer.id}`}
                      aria-expanded="false"
                    >
                      <strong>Operadores asignados</strong>
                      <span className="badge bg-warning ms-2">
                        {detail.operators.length}
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`operatorsCollapse-${customer.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#operators-${customer.id}`}
                  >
                    <div className="accordion-body">
                      {detail.operators.length === 0 ? (
                        <p className="text-muted mb-0">
                          No hay operadores asignados
                        </p>
                      ) : (
                        <div className="list-group">
                          {detail.operators.map((op) => {
                            const opStatus = getOperatorStatus(
                              op.operator.id,
                              op.operator.isActive
                            );
                            const isUpdating =
                              updatingOperator === op.operator.id;
                            return (
                              <div
                                key={op.id}
                                className="list-group-item list-group-item-action customer-operator-item"
                              >
                                <div className="d-flex w-100 justify-content-between">
                                  <h6 className="mb-1">
                                    {op.operator.fullName}
                                  </h6>
                                  <div className="d-flex align-items-center gap-2">
                                    <small className="text-muted">
                                      {op.operator.username}
                                    </small>
                                    <button
                                      type="button"
                                      className={`badge ms-2 border-0 status-toggle-btn ${
                                        opStatus ? "bg-success" : "bg-secondary"
                                      } ${isUpdating ? "status-updating" : ""}`}
                                      style={{
                                        minWidth: 70,
                                        fontSize: "0.75rem",
                                      }}
                                      onClick={() =>
                                        handleOperatorStatusToggle(
                                          op.operator.id,
                                          opStatus
                                        )
                                      }
                                      disabled={isUpdating}
                                      title={`Clic para ${
                                        opStatus ? "desactivar" : "activar"
                                      }`}
                                    >
                                      {opStatus ? "Activo" : "Inactivo"}
                                    </button>
                                  </div>
                                </div>
                                <p className="mb-1">
                                  <strong>Email:</strong> {op.operator.email}
                                </p>
                                <small
                                  className={
                                    op.operator.hasChangedPassword
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {op.operator.hasChangedPassword
                                    ? "✓ Contraseña actualizada"
                                    : "⚠ Contraseña pendiente"}
                                </small>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Acordeón de Nodos */}
              <div className="accordion" id={`nodos-${customer.id}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#nodosCollapse-${customer.id}`}
                      aria-expanded="false"
                    >
                      <strong>Nodos asignados</strong>
                      <span className="badge bg-info ms-2">
                        {detail.nodos.length}
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`nodosCollapse-${customer.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#nodos-${customer.id}`}
                  >
                    <div className="accordion-body">
                      {detail.nodos.length === 0 ? (
                        <p className="text-muted mb-0">
                          No hay nodos registrados
                        </p>
                      ) : (
                        <div className="list-group">
                          {detail.nodos.map((nodo) => (
                            <div
                              key={nodo.id}
                              className="list-group-item list-group-item-action"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">{nodo.name}</h6>
                                <small className="text-muted">
                                  {new Date(
                                    nodo.createdAt
                                  ).toLocaleDateString()}
                                </small>
                              </div>
                              <p className="mb-0 text-muted">
                                {nodo.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
