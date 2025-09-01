import { PostgresConnection } from '../database/PostgresConnection.js';
import { CreateNewGymMemberService } from '../services/createNewGymMemberService.js';
import { CreateNewGymMember } from '../models/createNewGymMember.js';
import { FastifyTypedInstance } from '../server.js';
import { alunoSchemaInput } from '../services/Validations/inputSchema.js';
import { CreateNewGymMemberController } from '../controllers/createNewGymMemberController.js';
import { z } from 'zod';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const createNewGymMemberRoute = (app: FastifyTypedInstance) => {
  app.post(
    '/alunos',
    {
      schema: {
        tags: ['Alunos'],
        description: 'Create New Gym Member',
        body: alunoSchemaInput,
        response: {
          201: z.null().describe('Member Created'),
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
        const createNewGymMemberModel = new CreateNewGymMember(database);
        const createNewGymMemberService = new CreateNewGymMemberService(
          createNewGymMemberModel,
        );
        const createNewGymMemberController = new CreateNewGymMemberController(
          createNewGymMemberService,
        );

        await createNewGymMemberController.handler({
          body: req.body,
        });

        return reply.status(201).send();
      } catch (err) {
        const e = err as ErrorHandler;
        const status = e.status as 201 | 400 | 409;
        reply
          .status(status)
          .send({ data: { msg: `Code: ${status} ~ Message: ${e.message} ` } });
      }
    },
  );
};
