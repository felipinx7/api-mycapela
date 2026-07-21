import z from "zod";

export const CapelaEntradaSchema = z.object({
  valor: z.number().min(0.1, "O Valor do dizimo precisa ser maior do que 10 centavos"),
  data: z.date(),
});

export type CapelaEntradaDTO = z.infer<typeof CapelaEntradaSchema>;
