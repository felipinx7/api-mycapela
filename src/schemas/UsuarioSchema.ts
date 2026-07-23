import z from "zod";
import { TipoUsuario } from "../../generated/prisma/enums";

export const UsuarioSchema = z.object({
  nome: z.string().min(4, "O nome precisa ter mais de 4 caracteres"),
  email: z.email("Digite um email válido"),
  senha: z.string().min(8, "A senha precisa ter mais de 8 caracteres"),
  TipoUsuario: z.nativeEnum(TipoUsuario),
});

export type UsuarioDTO = z.infer<typeof UsuarioSchema>;
