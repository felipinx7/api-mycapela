import { prisma } from "../../config/prisma";
import { OfertorioDTO } from "../../schemas/OfertorioSchema";

export async function CriarOfertorio(
  dadosOfertorio: OfertorioDTO,
  IDCapela: string,
  IDUsuario: string,
) {
  const ofertorio = await prisma.ofertorio.create({
    data: {
      data: dadosOfertorio.data,
      valor: dadosOfertorio.valor,
      descricao: dadosOfertorio.descricao,
      idCapela: IDCapela,
      idUsuario: IDUsuario,
    },
  });
  return ofertorio;
}

export async function AtualizarOfertorio(
  id: string,
  dadosOfertorio: OfertorioDTO,
) {
  const ofertorio = await prisma.ofertorio.update({
    where: { id },
    data: {
      data: dadosOfertorio.data,
      valor: dadosOfertorio.valor,
      descricao: dadosOfertorio.descricao,
    },
  });

  return ofertorio;
}

export async function PegarOfertorio(id: string) {
  const ofertorio = await prisma.ofertorio.findUnique({
    where: { id },
  });

  return ofertorio;
}

export async function PegarOfertorios() {
  const ofertorios = await prisma.ofertorio.findMany();

  return ofertorios;
}

export async function DeletarOfertorio(id: string) {
  const ofertorio = await prisma.ofertorio.delete({
    where: { id },
  });

  return ofertorio;
}
