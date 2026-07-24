import { fa } from "zod/v4/locales";
import { prisma } from "../config/prisma";

export async function VerificarExistenciaEmail(tabela: string, email: string) {
  const consulta = await (prisma as any)[tabela].findFirst({
    where: { email },
  });

  return consulta ? true : false;
}
