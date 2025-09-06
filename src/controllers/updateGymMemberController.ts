import { IService } from '../services/service.js';
import { IController } from './controller.js';
import { IRequest } from './request.js';

export class UpdateGymMemberController implements IController {
  constructor(private service: IService) {}

  async handler(params: IRequest) {
    await this.service.validation(params);
    return { data: null, status: 201 };
  }
}
