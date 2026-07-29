import { Request } from "express";

export async function VerificarUsuarioLogado(req?: Request) {
  const tokenUsuario: string = req?.cookies.token;

  if (tokenUsuario.length > 0) {
    return true;
  } else {
    return false;
  }
}
