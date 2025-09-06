import { QueryResult } from 'pg';
import { IRequestParams } from '../controllers/request.js';
import { IDatabaseConnect } from '../database/db.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { IQuery } from './query.js';

export class DeleteGymMember implements IQuery {
  constructor(private database: IDatabaseConnect) {}
  async query(queryParams: IRequestParams) {
    try {
      const { cpf } = queryParams;

      const result = await this.database.connect<QueryResult>(
        'SELECT id_aluno FROM alunos WHERE cpf = $1',
        [cpf],
      );

      if (!result.rows[0]) {
        throw new ErrorHandler('ALUNO NÃO ENCONTRADO!', 410);
      }

      await this.database.connect('DELETE FROM alunos WHERE cpf = $1', [cpf]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
