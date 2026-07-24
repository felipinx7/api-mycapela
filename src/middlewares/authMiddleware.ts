import { Request } from "express";

export async function VerificarUsuarioLogado(req?: Request) {
  const token: string= req?.cookies
  return token;
}
