import { IAlunoOutPut } from '../controllers/reply.js';
import { IQuery } from '../models/query.js';
import { IService } from './service.js';

const subscriptionExpirationDate = (date: Date) => {
  const nextMonth = date.getMonth() + 1;
  date.setMonth(nextMonth);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

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
