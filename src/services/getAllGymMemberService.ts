import { IAlunoOutPut } from '../controllers/reply.js';
import { IQuery } from '../models/query.js';
import { subscriptionExpirationDate } from '../utils/dateFormatter.js';
import { IService } from './service.js';

export class GetAllGymMembersService implements IService {
  constructor(private model: IQuery) {}
  async validation() {
    const res = await this.model.query();

    if (!res) {
      return [];
    }

    const validated = (res as IAlunoOutPut[]).map((aluno: IAlunoOutPut) => {
      const { endereco, assinatura_expira } = aluno;
      const newDate = new Date(assinatura_expira);
      const formatedDate = subscriptionExpirationDate(newDate);
      return {
        ...aluno,
        assinatura_expira: formatedDate,
        endereco,
      };
    });

    return validated;
  }
}
