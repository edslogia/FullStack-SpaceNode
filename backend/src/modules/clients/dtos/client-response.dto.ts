/**
 * DTO de respuesta para Cliente.
 * Retorna la información del cliente sin datos sensibles.
 */
export class ClientResponseDto {
  id: string;
  name: string;
  address: string;
  contact?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
