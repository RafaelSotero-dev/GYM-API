import { z } from 'zod';

export const alunoOutPutSchema = z.array(
  z.object({
    nome: z.string(),
    idade: z.number(),
    email: z.email(),
    foto: z.string(),
    status: z.literal([0, 1]),
    modalidade: z.literal([1, 2, 3]),
    assinatura_expira: z.string(),
    endereco: z.object({
      rua: z.string(),
      numero: z.number(),
      bairro: z.string(),
      CEP: z.string(),
    }),
  }),
);

export type alunoOutput = z.infer<typeof alunoOutPutSchema>;
