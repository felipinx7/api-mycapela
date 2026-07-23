import { prisma } from "../../config/prisma";
import { CapelaEntradaDTO } from "../../schemas/CapelaEntradaDizimoSchema";

export async function CriarEntradaDizimo(
  dadosEntrada: CapelaEntradaDTO,
  IDDizimista: string,
  IDCapela: string,
) {
  const entrada = await prisma.entradaDizimo.create({
    data: {
      data: dadosEntrada.data,
      valor: dadosEntrada.valor,
      idDizimista: IDDizimista,
      idCapela: IDCapela,
    },
  });

  return entrada;
}

export async function AtualizarEntradaDizimo(
  id: string,
  dadosEntrada: CapelaEntradaDTO,
) {
  const entrada = await prisma.entradaDizimo.update({
    where: { id },
    data: {
      data: dadosEntrada.data,
      valor: dadosEntrada.valor,
    },
  });

  return entrada;
}

export async function PegarEntradaDizimo(id: string) {
  const entrada = await prisma.entradaDizimo.findUnique({
    where: { id },
  });

  return entrada;
}

export async function PegarEntradasDizimos() {
  const entradas = await prisma.entradaDizimo.findMany();
  return entradas;
}

export async function DeletarEntradaDizimo(id: string) {
  const entrada = await prisma.entradaDizimo.delete({
    where: { id },
  });

  return entrada;
}
