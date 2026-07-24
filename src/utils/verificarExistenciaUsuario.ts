import { prisma } from "../config/prisma";

export async function VerificarExistenciaUsuario(tabela: string, id: string) {
  const usuario = await (prisma as any)[tabela].findUnique({
    where: { id },
  });

  if (!usuario) {
    return `${tabela} não foi encontrada.`;
  }
}
