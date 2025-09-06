import { z } from 'zod';
import { FastifyTypedInstance } from '../server.js';
import { PostgresConnection } from '../database/PostgresConnection.js';
import { UpdateGymMember } from '../models/updateGymMember.js';
import { UpdateGymMemberService } from '../services/updateGymMemberService.js';
import { UpdateGymMemberController } from '../controllers/updateGymMemberController.js';
import {
  alunoInput,
  updateInputSchema,
} from '../services/Validations/inputSchema.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const updateGymMemberRoute = (app: FastifyTypedInstance) => {
  app.put(
    '/alunos:cpf',
    {
      schema: {
        tags: ['Alunos'],
        description: 'Update gym member informations',
        body: updateInputSchema,
        params: z.object({
          cpf: z
            .string({ error: 'CPF INVALIDO!' })
            // eslint-disable-next-line no-useless-escape
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { error: 'CPF INVALIDO!' }),
        }),
        response: {
          201: z.null().describe('Updated Student'),
          400: z.object({
            data: z.object({ msg: z.string().or(z.array(z.string())) }),
          }),
          409: z.object({
            data: z.object({ msg: z.string() }),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const database = new PostgresConnection();
        const updateGymMember = new UpdateGymMember(database);
        const updateGymMemberService = new UpdateGymMemberService(
          updateGymMember,
        );
        const updateGymMemberController = new UpdateGymMemberController(
          updateGymMemberService,
        );

        const result = await updateGymMemberController.handler({
          body: req.body as alunoInput,
          params: req.params,
        });

        reply.status(result.status as 201).send();
      } catch (err) {
        const e = err as ErrorHandler;
        const status = e.status as 201 | 409 | 400;
        reply.status(status).send({ data: { msg: e.message } });
      }
    },
  );
};
