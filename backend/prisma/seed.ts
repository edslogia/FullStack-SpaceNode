import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Obtener credenciales desde variables de entorno
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'SpaceNode2026!';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@spacenode.local';
  const adminFullName = process.env.ADMIN_FULLNAME || 'Administrador del Sistema';

  // Verificar si ya existe un administrador
    const existingAdmin = await prisma.administrator.findUnique({
      where: { username: adminUsername },
    });
  
    if (existingAdmin) {
      console.log('✓ Administrador default ya existe');
      return;
    }
  
    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
  
    // Crear administrador default
    const admin = await prisma.administrator.create({
  
    data: {
      username: adminUsername,
      password: hashedPassword,
      email: adminEmail,
      fullName: adminFullName,
      isActive: true,
    },
  });

  console.log('✓ Administrador default creado:');
  console.log(`  - Username: ${admin.username}`);
  console.log(`  - Email: ${admin.email}`);
  console.log('  - Contraseña: (hasheada con bcrypt)');
  console.log('\n⚠️  IMPORTANTE: Cambia las credenciales tras el primer login');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
