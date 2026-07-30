import { prisma } from "../../config/prisma";
import { CategoriaDTO } from "../../schemas/CategoriaSchema";

export async function CriarCategoria(dadosCategoria: CategoriaDTO, IDCapela: string) {
  const categoria = await prisma.categoria.create({
    data: {
      nome: dadosCategoria.nome,
      idCapela: IDCapela,
    },
  });

  return categoria;
}

export async function AtualizarCategoria(id: string, dadosCategoria: CategoriaDTO) {
  const categoria = await prisma.categoria.update({
    where: { id },
    data: {
      nome: dadosCategoria.nome,
    },
  });

  return categoria;
}

export async function PegarCategoria(id: string) {
  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });

  return categoria;
}

export async function PegarCategorias() {
  const categorias = await prisma.categoria.findMany();
  return categorias;
}

export async function DeletarCategoria(id: string) {
  const categoria = await prisma.categoria.delete({
    where: { id },
  });

  return categoria;
}

export async function PegarCategoriaPorNome(nome: string) {
  const categoria = await prisma.categoria.findFirst({
    where: { nome },
  });

  return categoria;
}

export async function PegarCategoriaPorID(id: string) {
  const categoria = await prisma.categoria.findFirst({
    where: { id },
  });

  return categoria;
}
