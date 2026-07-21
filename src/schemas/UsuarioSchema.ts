import z from "zod"

const TipoUsuarioEnum = z.enum([ "ADMINISTRADOR" ,"USUARIO"])

export const UsuarioSchema = z.object({
    nome: z.string().min(4,"O nome precisa ter mais de 4 caracteres"),
    email: z.email("Digite um email válido"),
    senha: z.string().min(8, "A senha precisa ter mais de 8 caracteres"),
    TipoUsuario: TipoUsuarioEnum
})