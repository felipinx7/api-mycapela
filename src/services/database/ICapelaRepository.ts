import { prisma } from "../../config/prisma";
import { CapelaDTO } from "../../schemas/CapelaSchema";

export async function CriarCapela(dadosCapela: CapelaDTO, senhaHash: string) {
  const capela = await prisma.capela.create({
    data: {
      email: dadosCapela.email,
      nome: dadosCapela.nome,
      senha: senhaHash,
    },
  });

  return capela;
}

export async function AtualizarCapela(dadosCapela: CapelaDTO, id: string) {
  const dados: any = {};

  if (dadosCapela.nome !== undefined) {
    dados.nome = dadosCapela.nome;
  }

  if (dadosCapela.email !== undefined) {
    dados.email = dadosCapela.email;
  }

  if (dadosCapela.senha !== undefined) {
    dados.senha = dadosCapela.senha;
  }

  const dadodsParaAtualizar = await prisma.capela.update({
    where: { id },
    data: dados,
  });


  return dadodsParaAtualizar
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

export async function PegarCapelaPorEmail(email: string) {
  const capela = prisma.capela.findFirst({
    where: { email },
  });

  return capela;
}
