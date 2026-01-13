/**
 * Entidad Operator: representa un operador según el modelo Prisma.
 * Solo expone campos relevantes para la API.
 */
export class Operator {
  /** UUID del operador */
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  isActive: boolean;
  hasChangedPassword: boolean;
  createdAt: Date;
  updatedAt: Date;
  customers?: any[];
}
