import { prisma } from "../config/prisma";

export async function VerificarExistenciaUsuario(tabela: string, id: string) {
  const usuario = await (prisma as any)[tabela].findUnique({
    where: { id },
  });

  return usuario ? true : false;
}
