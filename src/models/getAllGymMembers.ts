import { QueryResult } from 'pg';
import { IDatabaseConnect } from '../database/db.js';
import { IQuery } from './query.js';
import { IAlunoOutPut } from '../controllers/reply.js';

export class GetAllGymMembers implements IQuery {
  constructor(private db: IDatabaseConnect) {}
  async query(): Promise<Array<IAlunoOutPut> | []> {
    const queryString = `SELECT a.nome, a.idade, a.email, a.foto, a.status, a.modalidade, a.updated_at as assinatura_expira, json_build_object(
'rua', e.rua, 'numero', e.numero, 'bairro', e.bairro, 'CEP', e.cep)as endereco 
FROM alunos as a
LEFT JOIN public.enderecos as e ON a.id_endereco = e.id_endereco
ORDER BY assinatura_expira ASC;`;

    try {
      const res = await this.db.connect<QueryResult>(queryString, []);

      if (!res.rows) {
        return [];
      }

      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
