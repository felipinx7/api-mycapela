import { prisma } from "../../config/prisma";
import { CapelaDTO } from "../../schemas/CapelaSchema";

export async function CriarCapela(dadosCapela: CapelaDTO) {
  const capela = await prisma.capela.create({
    data: {
      email: dadosCapela.email,
      nome: dadosCapela.nome,
      senha: dadosCapela.senha,
    },
  });

  console.log("Dados capela: ", capela)

  return capela;
}

export async function AtualizarCapela(dadosCapela: CapelaDTO, id: string) {
  const capela = await prisma.capela.update({
    where: { id },
    data: {
      nome: dadosCapela.nome,
      email: dadosCapela.email,
      senha: dadosCapela.senha,
    },
  });

  return capela;
}

export async function PegarCapelas() {
  const capelas = await prisma.capela.findMany();

  return capelas;
}

export async function PegarUnicaCapela(id: string) {
  const capela = await prisma.capela.findUnique({
    where: { id },
  });

  return capela;
}

export async function DeleteCapela(id: string) {
  const capela = await prisma.capela.delete({
    where: { id },
  });

  return capela;
}
