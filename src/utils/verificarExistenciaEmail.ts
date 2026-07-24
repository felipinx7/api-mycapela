import { prisma } from "../config/prisma";

export async function VerificarExistenciaEmail(tabela: string, email: string) {
  const consulta = await (prisma as any)[tabela].findFirst({
    where: { email },
  });

  if (consulta) {
    return "Email Existente no banco";
  }
}
