import { IRequest } from '../controllers/request.js';
import { IQuery } from '../models/query.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { IService } from './service.js';

export class UpdateGymMemberService implements IService {
  constructor(private service: IQuery) {}
  async validation(params: IRequest) {
    if (!params.body) {
      throw new ErrorHandler('CAMPOS INVALIDOS NA REQUISICAO!', 400);
    }

    await this.service.query(params);
  }
}
