import { FastifyInstance } from 'fastify';
import { createNewGymMemberRoute } from './createNewGymMemberRoute.js';
import { getAllGymMemberRoute } from './getAllGymMemberRoute.js';
import { getGymMemberByCPFRoute } from './getGymMemberByCPFRoute.js';
import { updateGymMemberRoute } from './updateGymMemberRoute.js';
import { deleteGymMemberRoute } from './deleteGymMemberRoute.js';

export const routes = (app: FastifyInstance) => {
  getAllGymMemberRoute(app);
  getGymMemberByCPFRoute(app);
  createNewGymMemberRoute(app);
  updateGymMemberRoute(app);
  deleteGymMemberRoute(app);
};
