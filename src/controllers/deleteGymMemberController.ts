import { IService } from '../services/service.js';
import { IController } from './controller.js';
import { IRequestParams } from './request.js';

export class DeleteGymMemberController implements IController {
  constructor(private service: IService) {}

  async handler(queryParams: IRequestParams) {
    try {
      await this.service.validation(queryParams);
      return { data: null, status: 204 };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
