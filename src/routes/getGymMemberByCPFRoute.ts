import { z } from 'zod';
import { FastifyTypedInstance } from '../server.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import {
  alunoOutput,
  alunoOutPutSchema,
} from '../services/Validations/outputSchema.js';
import { PostgresConnection } from '../database/PostgresConnection.js';
import { GetGymMemberByCPF } from '../models/getGymMemberByCPF.js';
import { GetGymMemberByCPFService } from '../services/getGymMemberByCPFService.js';
import { GetGymMemberByCPFController } from '../controllers/getGymMemberByCPFController.js';

export const getGymMemberByCPFRoute = (app: FastifyTypedInstance) => {
  app.get(
    '/alunos:cpf',
    {
      schema: {
        tags: ['Alunos'],
        description: 'Return a gym member by CPF',
        params: z.object({
          cpf: z
            .string()
            // eslint-disable-next-line no-useless-escape
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { error: 'CPF INVALIDO!' }),
        }),
        response: {
          200: z.object({
            data: alunoOutPutSchema.or(z.object()),
          }),
          400: z.object({
            data: z.object({ msg: z.string().or(z.array(z.string())) }),
          }),
        },
      },
    },
    async (req, reply) => {
      try {
        const database = new PostgresConnection();
        const getGymMemberByCPF = new GetGymMemberByCPF(database);
        const getGymMemberByCPFService = new GetGymMemberByCPFService(
          getGymMemberByCPF,
        );
        const getGymMemberByCPFController = new GetGymMemberByCPFController(
          getGymMemberByCPFService,
        );
        const res = await getGymMemberByCPFController.handler(req.params);
        const status = res.status | 200;
        reply.status(status as 200).send({ data: res.data as alunoOutput });
      } catch (err) {
        const e = err as ErrorHandler;
        const status = e.status as 200 | 400;
        reply.status(status).send({ data: { msg: e.message } });
      }
    },
  );
};
