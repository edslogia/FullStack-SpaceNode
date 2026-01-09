
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // Conexión estándar a PostgreSQL/TimescaleDB usando DATABASE_URL
    super();
  }
}
