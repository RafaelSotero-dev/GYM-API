import { FastifyInstance } from 'fastify';
import { createNewGymMemberRoute } from './createNewGymMemberRoute.js';
import { getAllGymMemberRoute } from './getAllGymMemberRoute.js';
import { getGymMemberByCPFRoute } from './getGymMemberByCPFRoute.js';

export const routes = (app: FastifyInstance) => {
  getAllGymMemberRoute(app);
  getGymMemberByCPFRoute(app);
  createNewGymMemberRoute(app);
};
