import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: ['.env', '../.env'], quiet: true });

const prisma = new PrismaClient();
const EXAMPLE_PASSWORD = 'change-me-strong-password';

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');
  if (process.env.NODE_ENV === 'production' && password === EXAMPLE_PASSWORD) {
    throw new Error('Refusing to seed the example ADMIN_PASSWORD in production');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin ${email} already exists — leaving it unchanged`);
    return;
  }

  await prisma.user.create({
    data: {
      email,
      name: 'Admin',
      role: 'ADMIN',
      emailVerified: true,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
  console.log(`Seeded admin ${email}`);
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
