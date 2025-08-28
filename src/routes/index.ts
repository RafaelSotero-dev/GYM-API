import { FastifyInstance } from 'fastify';
import { createNewGymMemberRoute } from './createNewGymMemberRoute.js';

export const routes = (app: FastifyInstance) => {
  createNewGymMemberRoute(app);
};
