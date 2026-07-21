import z from "zod";

export const DizimistaSchema = z.object({
  nome: z.string().min(4, "O nome precisa ter mais de 4 caracteres"),
});

export type DizimistaDTO = z.infer<typeof DizimistaSchema>;
