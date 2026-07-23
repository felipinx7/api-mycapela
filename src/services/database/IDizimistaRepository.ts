import { prisma } from "../../config/prisma";
import { DizimistaDTO } from "../../schemas/DizimistaSchema";

export async function CriarDizimista(
  dadosDizimista: DizimistaDTO,
  IDCapela: string,
) {
  const dizimista = await prisma.dizimista.create({
    data: {
      nome: dadosDizimista.nome,
      idCapela: IDCapela,
    },
  });

  return dizimista;
}

export async function AtualizarDizimista(
  id: string,
  dadosDizimista: DizimistaDTO,
) {
  const dizimista = await prisma.dizimista.update({
    where: { id },
    data: {
      nome: dadosDizimista.nome,
    },
  });

  return dizimista;
}

export async function PegarDizimista(id: string) {
  const dizimista = await prisma.dizimista.findUnique({
    where: { id },
  });

  return dizimista;
}

export async function PegarDizimistas() {
  const dizimistas = await prisma.dizimista.findMany();

  return dizimistas;
}

export async function DeletarDizimista(id: string) {
  const dizimista = await prisma.dizimista.delete({
    where: { id },
  });

  return dizimista;
}
