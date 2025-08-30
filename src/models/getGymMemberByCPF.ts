import { QueryResult } from 'pg';
import { IDatabaseConnect } from '../database/db.js';
import { IQuery } from './query.js';
import { IRequestParams } from '../controllers/request.js';

const queryString = `SELECT a.nome, a.idade, a.email, a.foto, a.status, a.modalidade, a.updated_at as assinatura_expira, 
json_build_object('rua', e.rua, 'numero', e.numero, 'bairro', e.bairro, 'CEP', e.cep) as endereco FROM public.alunos as a
LEFT JOIN public.enderecos as e ON a.id_endereco = e.id_endereco
WHERE a.cpf = $1;
`;

export class GetGymMemberByCPF implements IQuery {
  constructor(private db: IDatabaseConnect) {}
  async query({ cpf }: IRequestParams) {
    try {
      if (!cpf) {
        return {};
      }

      const res = await this.db.connect<QueryResult>(queryString, [cpf]);

      if (!res.rows[0]) {
        return {};
      }

      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
