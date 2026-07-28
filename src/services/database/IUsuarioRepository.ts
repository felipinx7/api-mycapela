import { prisma } from "../../config/prisma";
import { UsuarioDTO } from "../../schemas/UsuarioSchema";

export async function CriarUsuario(
  dadosUsuario: UsuarioDTO,
  IDCapela: string,
  senhaHash: string,
) {
  const usuario = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome,
      senha: senhaHash,
      tipoUsuario: dadosUsuario.TipoUsuario,
      idCapela: IDCapela,
    },
  });

  return usuario;
}

export async function AtualizarUsuario(id: string, dadosUsuario: UsuarioDTO) {
  const dados: any = {};

  if (dadosUsuario.TipoUsuario !== undefined) {
    dados.tipoUsuario = dadosUsuario.TipoUsuario;
  }
  if (dadosUsuario.email !== undefined) {
    dados.email = dadosUsuario.email;
  }
  if (dadosUsuario.nome !== undefined) {
    dados.nome = dadosUsuario.nome;
  }
  if (dadosUsuario.senha !== undefined) {
    dados.senha = dadosUsuario.senha;
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data: dados,
  });

  return usuario;
}

export async function PegarUsuario(id: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });

  return usuario;
}

export async function PegarUsuarios() {
  const usuarios = await prisma.usuario.findMany();
  return usuarios;
}

export async function DeletarUsuario(id: string) {
  const usuario = await prisma.usuario.delete({
    where: { id },
  });

  return usuario;
}
