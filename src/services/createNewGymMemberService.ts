import type { IRequestBody } from '../controllers/request.js';
import type { IService } from './service.js';
import type { IQuery } from '../models/query.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export class CreateNewGymMemberService implements IService {
  constructor(private db: IQuery) {}
  async validation(params: IRequestBody) {
    try {
      if (!params.body) {
        throw new ErrorHandler('CAMPOS INVALIDOS NA REQUISICAO!', 400);
      }

      if (
        Object.keys(params.body).length > 7 ||
        Object.keys(params.body.endereco).length > 4
      ) {
        throw new ErrorHandler('CAMPOS INVALIDOS NA REQUISICAO!', 400);
      }

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
