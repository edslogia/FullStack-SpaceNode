import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

/**
 * Script de seed para crear el usuario admin.
 * Se ejecuta manualmente tras crear las migraciones.
 * Run: npx ts-node prisma/seed.ts
 */
async function main() {
  console.log('🌱 Iniciando seed de datos...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@spacenode.com';
  const adminPassword = process.env.ADMIN_PASSWORD_TEMP || 'Admin@123Temp';

  // Validar credenciales
  if (adminPassword.length < 8) {
    throw new Error('❌ La contraseña temporal debe tener al menos 8 caracteres');
  }

  // Verificar si ya existe el admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`✅ El usuario admin ya existe: ${adminEmail}`);
    return;
  }

  // Hash de contraseña temporal
  const hashedPassword = await argon2.hash(adminPassword);

  // Crear usuario admin
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      firstLoginPasswordChange: true, // Fuerza cambio de contraseña en primer login
      isActive: true,
    },
  });

  console.log(`✅ Usuario admin creado:`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Role: ${admin.role}`);
  console.log(`   ID: ${admin.id}`);
  console.log('');
  console.log(`⚠️  IMPORTANTE:`);
  console.log(`   - El admin DEBE cambiar la contraseña temporal en el primer login`);
  console.log(`   - Credenciales temporales están en el archivo .env`);
}

main()
  .catch((error) => {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
