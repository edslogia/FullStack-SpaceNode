import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetPasswordFlag() {
  try {
    // Cambiar el username si necesitas otro usuario
    const username = process.argv[2] || 'admin';

    const result = await prisma.administrator.update({
      where: { username },
      data: { hasChangedPassword: false },
    });

    console.log(
      `✅ Flag reseteado para usuario: ${result.username} (${result.email})`,
    );
    console.log(`   hasChangedPassword: ${result.hasChangedPassword}`);
  } catch (error) {
    console.error('❌ Error al resetear flag:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswordFlag();

// npx tsx prisma/reset-password-flag.ts
// npx prisma studio
