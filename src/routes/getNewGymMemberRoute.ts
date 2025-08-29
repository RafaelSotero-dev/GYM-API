import { z } from 'zod';
import { GetAllGymMembersController } from '../controllers/getAllGymMemberController.js';
import { PostgresConnection } from '../database/PostgresConnection.js';
import { GetAllGymMembers } from '../models/getAllGymMembers.js';
import { FastifyTypedInstance } from '../server.js';
import { GetAllGymMembersService } from '../services/getAllGymMemberService.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { alunoOutPutSchema } from '../services/Validations/outputSchema.js';

export const getNewGymMemberRoute = (app: FastifyTypedInstance) => {
  app.get(
    '/alunos',
    {
      schema: {
        tags: ['Alunos'],
        description: 'Return all gym members',
        response: {
          200: z
            .object({
              data: alunoOutPutSchema,
            })
            .or(z.object({ data: z.array(z.never()) })),
          404: z.object({
            data: z.object({
              msg: z.string({ error: 'SEM ALUNOS CADASTRADOS!' }),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const database = new PostgresConnection();
        const getAllGymMembers = new GetAllGymMembers(database);
        const getAllGymMembersService = new GetAllGymMembersService(
          getAllGymMembers,
        );
        const getAllGymMembersController = new GetAllGymMembersController(
          getAllGymMembersService,
        );

        const result = await getAllGymMembersController.handler();
        const status = result.status as 200;

        reply.status(status).send({ data: result.data });
      } catch (err) {
        const e = err as ErrorHandler;
        const status = e.status as 200 | 404;
        reply.status(status).send({ data: { msg: e.message } });
      }
    },
  );
};
