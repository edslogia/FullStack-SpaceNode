
/**
 * Entidad Customer: representa un cliente según el modelo Prisma.
 * Solo expone campos relevantes para la API.
 */
export class Customer {
	/** UUID del cliente */
	id: string;

	/** Username único del cliente */
	username: string;

	/** Nombre completo del cliente */
	fullName: string;

	/** Estado de actividad */
	isActive: boolean;

	/** Fecha de creación */
	createdAt: Date;

	/** Fecha de última actualización */
	updatedAt: Date;
}
