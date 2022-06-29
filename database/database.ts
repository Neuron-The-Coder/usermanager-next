import { PrismaClient } from "@prisma/client";

// artinya declare global var (avoid dis in prod :)
// declare global {
//     var prisma: PrismaClient | undefined;
// }

export const prisma = new PrismaClient();

// Avoid dis in prod wkkwkwkwkw
// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;