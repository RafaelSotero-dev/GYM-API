import { IRequestParams } from '../controllers/request.js';
import { IQuery } from '../models/query.js';
import { IService } from './service.js';

export class DeleteGymMemberService implements IService {
  constructor(private model: IQuery) {}

  async validation(queryParams: IRequestParams) {
    await this.model.query(queryParams);
  }
}
