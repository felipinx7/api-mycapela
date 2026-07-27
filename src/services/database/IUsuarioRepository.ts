import { prisma } from "../../config/prisma";
import { UsuarioDTO } from "../../schemas/UsuarioSchema";

export async function CriarUsuario(dadosUsuario: UsuarioDTO, IDCapela: string, senhaHash: string) {
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
  const usuario = await prisma.usuario.update({
    where: { id },
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome,
      senha: dadosUsuario.senha,
      tipoUsuario: dadosUsuario.TipoUsuario,
    },
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
