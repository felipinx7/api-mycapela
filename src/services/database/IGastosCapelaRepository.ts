import { prisma } from "../../config/prisma";
import { GastoCapelaDTO } from "../../schemas/GastoCapelaSchema";

export async function CriarGastoCapela(
  gastoCapela: GastoCapelaDTO,
  IDCategoria: string,
  IDCapela: string,
) {
  const gasto = await prisma.gastosCapela.create({
    data: {
      data: gastoCapela.data,
      valor: gastoCapela.valor,
      descricao: gastoCapela.descricao,
      idCapela: IDCapela,
      idCategoria: IDCategoria,
    },
  });

  return gasto;
}

export async function AtualizarGasto(id: string, gastoCapela: GastoCapelaDTO) {
  const gasto = await prisma.gastosCapela.update({
    where: { id },
    data: {
      data: gastoCapela.data,
      valor: gastoCapela.valor,
      descricao: gastoCapela.descricao,
    },
  });

  return gasto;
}

export async function PegarGasto(id: string) {
  const gasto = await prisma.gastosCapela.findUnique({
    where: { id },
  });

  return gasto;
}

export async function PegarGastos() {
  const gastos = await prisma.gastosCapela.findMany();

  return gastos;
}

export async function DeletarGasto(id: string) {
  const gasto = await prisma.gastosCapela.delete({
    where: { id },
  });

  return gasto;
}
