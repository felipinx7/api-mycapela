import z from "zod";

export const CategoriaSchema = z.object({
  nome: z.string().min(4, "O nome precisa ter mais de 4 caracteres"),
});

export type CategoriaDTO = z.infer<typeof CategoriaSchema>;
