import { FastifyInstance } from 'fastify';
import { createNewGymMemberRoute } from './createNewGymMemberRoute.js';
import { getNewGymMemberRoute } from './getNewGymMemberRoute.js';

export const routes = (app: FastifyInstance) => {
  getNewGymMemberRoute(app);
  createNewGymMemberRoute(app);
};
