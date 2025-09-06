import * as z from 'zod';

export const alunoSchemaInput = z.object({
  nome: z
    .string({ error: 'NOME INVALIDO!' })
    .nonempty({ error: 'NOME INVALIDO!' }),
  idade: z
    .number({ error: 'IDADE INVALIDA!' })
    .min(10, { error: 'IDADE MÍNIMA NÃO ATINGIDA' })
    .nonnegative({ error: 'IDADE NÃO PODE SER NEGATIVA!' })
    .nonoptional(),
  email: z
    .email({
      error: 'EMAIL INVALIDO!',
    })
    .nonempty(),
  foto: z.string({ error: 'FOTO INVALIDA!' }).nonempty(),

  CPF: z
    .string({ error: 'CPF INVALIDO!' })
    // eslint-disable-next-line no-useless-escape
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { error: 'CPF INVALIDO!' }),
  status: z.literal([0, 1], { error: 'STATUS INVALIDO!' }).optional(),
  role: z.literal(['aluno', 'admin'], { error: 'ROLE INVALIDA!' }).optional(),
  modalidade: z
    .literal([1, 2, 3], { error: 'MODALIDADE INVALIDA!' })
    .nonoptional({ error: 'MODALIDADE NÃO É OPCIONAL!' }),
  endereco: z.object(
    {
      rua: z
        .string({ error: 'RUA INVALIDA!' })
        .nonempty({ error: 'RUA INVALIDA!' }),
      numero: z
        .number({ error: 'NÚMERO INVALIDO!' })
        .min(1, { error: 'NÚMERO MÍNIMO NÃO ATINGIDO!' })
        .nonnegative({ error: 'NÚMERO INVALIDO!' })
        .nonoptional({ error: 'NÚMERO NÃO É OPCIONAL!' }),
      bairro: z
        .string({ error: 'BAIRRO INVALIDO!' })
        .nonempty({ error: 'BAIRRO INVALIDO!' }),
      CEP: z
        .string({ error: 'CEP INVALIDO!' })
        .regex(/^\d{2}\d{3}[-]\d{3}$/, { error: 'CEP INVALIDO' }),
    },
    { error: 'ENDEREÇO INVALIDO!' },
  ),
});

export const updateInputSchema = z
  .object({
    nome: z
      .string({ error: 'NOME INVALIDO!' })
      .nonempty({ error: 'NOME INVALIDO!' }),
  })
  .or(
    z
      .object({
        idade: z
          .number({ error: 'IDADE INVALIDA!' })
          .min(10, { error: 'IDADE MÍNIMA NÃO ATINGIDA' })
          .nonnegative({ error: 'IDADE NÃO PODE SER NEGATIVA!' }),
      })
      .or(
        z
          .object({
            email: z.email({ error: 'EMAIL INVALIDO!' }).nonempty(),
          })
          .or(
            z
              .object({
                foto: z.string({ error: 'FOTO INVALIDA!' }).nonempty(),
              })
              .or(
                z
                  .object({
                    CPF: z
                      .string({ error: 'CPF INVALIDO!' })
                      // eslint-disable-next-line no-useless-escape
                      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
                        error: 'CPF INVALIDO!',
                      }),
                  })
                  .or(
                    z
                      .object({
                        modalidade: z.literal([1, 2, 3], {
                          error: 'MODALIDADE INVALIDA!',
                        }),
                      })
                      .or(
                        z.object({
                          status: z.literal([0, 1], {
                            error: 'STATUS INVALIDO!',
                          }),
                        }),
                      ),
                  ),
              ),
          ),
      ),
  );

export type alunoInput = z.infer<typeof alunoSchemaInput>;
