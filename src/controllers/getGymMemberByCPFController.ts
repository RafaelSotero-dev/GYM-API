import { IService } from '../services/service.js';
import { IController } from './controller.js';
import { IRequestParams } from './request.js';

export class GetGymMemberByCPFController implements IController {
  constructor(private service: IService) {}

  async handler(params: IRequestParams) {
    const res = await this.service.validation(params);

    return { data: res, status: 200 };
  }
}
