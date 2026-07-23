import z from "zod";

export const OfertorioSchema = z.object({
  valor: z.number().min(0.1, "O valor tem que ser maior do que 10 centavos"),
  descricao: z
    .string()
    .min(4, "A descrição precisar tem mais de 4 caracateres")
    .optional(),
  data: z.date(),
});

export type OfertorioDTO = z.infer<typeof OfertorioSchema>;
