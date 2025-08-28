import type { IService } from '../services/service.js';
import type { IController } from './controller.js';
import { IReply } from './reply.js';
import { IRequest } from './request.js';

export class CreateNewGymMemberController implements IController {
  constructor(private service: IService) {}

  async handler(params: IRequest): Promise<IReply> {
    const res = await this.service.validation(params);
    if (res) {
      return {
        data: { msg: res as Array<string> },
        status: 201,
      };
    }

    return {
      data: { msg: 'Member Created' },
      status: 201,
    };
  }
}
