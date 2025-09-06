import { z } from 'zod';
import { DeleteGymMemberController } from '../controllers/deleteGymMemberController.js';
import { PostgresConnection } from '../database/PostgresConnection.js';
import { DeleteGymMember } from '../models/deleteGymMember.js';
import { FastifyTypedInstance } from '../server.js';
import { DeleteGymMemberService } from '../services/deleteGymMemberService.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const deleteGymMemberRoute = (app: FastifyTypedInstance) => {
  app.delete(
    '/alunos:cpf',
    {
      schema: {
        tags: ['Alunos'],
        description: 'Delete gym member',
        params: z.object({
          cpf: z
            .string({ error: 'CPF INVALIDO!' })
            // eslint-disable-next-line no-useless-escape
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { error: 'CPF INVALIDO!' }),
        }),
        response: {
          204: z.null().describe('Deleted Student'),
          400: z.object({
            data: z.object({ msg: z.string().or(z.array(z.string())) }),
          }),
          410: z.object({
            data: z.object({ msg: z.string().or(z.array(z.string())) }),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const database = new PostgresConnection();
        const deleteGymMember = new DeleteGymMember(database);
        const deleteGymMemberService = new DeleteGymMemberService(
          deleteGymMember,
        );
        const deleteGymMemeberController = new DeleteGymMemberController(
          deleteGymMemberService,
        );

        const result = await deleteGymMemeberController.handler(req.params);
        const status = result.status as 204;
        reply.status(status).send();
      } catch (err) {
        const e = err as ErrorHandler;
        const status = e.status as 204 | 400 | 410;
        reply.status(status).send({ data: { msg: e.message } });
      }
    },
  );
};
