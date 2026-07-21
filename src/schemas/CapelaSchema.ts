import z from "zod";

export const CapelaSchema = z.object({
  nome: z.string().min(4, "O nome precisa ter mais de 4 caracteres"),
  email: z.email({ message: "Digite um email válido porfavor" }),
  senha: z.string().min(8, "A senha precisa ter mais de 8 caracteres"),
});

export type CapelaDTO = z.infer<typeof CapelaSchema>;
