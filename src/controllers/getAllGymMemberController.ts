import { IService } from '../services/service.js';
import { alunoOutput } from '../services/Validations/outputSchema.js';
import { IController } from './controller.js';

export class GetAllGymMembersController implements IController {
  constructor(private service: IService) {}

  async handler() {
    const res = await this.service.validation();

    if (!res) {
      return { data: [], status: 200 };
    }

    return { data: res as alunoOutput[], status: 200 };
  }
}
