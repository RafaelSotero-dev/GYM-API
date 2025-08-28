import type { IRequest } from '../controllers/request.js';
import type { IService } from './service.js';
import type { IQuery } from '../models/query.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export class CreateNewGymMemberService implements IService {
  constructor(private db: IQuery) {}
  async validation(params: IRequest) {
    try {
      const res = await this.db.query({ body: params.body });
      if (typeof res === 'string') {
        throw new ErrorHandler(res, 409);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
