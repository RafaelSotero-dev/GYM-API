import { IRequestParams } from '../controllers/request.js';
import { IQuery } from '../models/query.js';
import { subscriptionExpirationDate } from '../utils/dateFormatter.js';
import { IService } from './service.js';
import { alunoOutput } from './Validations/outputSchema.js';

export class GetGymMemberByCPFService implements IService {
  constructor(private model: IQuery) {}

  async validation(params: IRequestParams) {
    if (!params) {
      return {};
    }

    const res = await this.model.query<alunoOutput>(params);

    const newDate = new Date((res as alunoOutput).assinatura_expira);
    const assinaturaExpira = subscriptionExpirationDate(newDate);
    (res as alunoOutput).assinatura_expira = assinaturaExpira;

    return res;
  }
}
