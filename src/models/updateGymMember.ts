import { QueryResult } from 'pg';
import { IRequest } from '../controllers/request.js';
import { IDatabaseConnect } from '../database/db.js';
import { IQuery } from './query.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const queryString = (column: string) => {
  return `
    UPDATE alunos SET ${column} = $1 WHERE cpf = $2;
`;
};

export class UpdateGymMember implements IQuery {
  constructor(private database: IDatabaseConnect) {}
  async query(queryParams: IRequest) {
    try {
      const { params, body } = queryParams;
      const { cpf } = params;

      if (body.email && typeof body.email === 'string') {
        const result = await this.database.connect<QueryResult>(
          'SELECT id_aluno FROM alunos WHERE email = $1',
          [body.email],
        );
        if (result.rows[0]) {
          throw new ErrorHandler('EMAIL JÁ CADASTRADO!', 409);
        }
      }

      if (body.CPF && typeof body.CPF === 'string') {
        const result = await this.database.connect<QueryResult>(
          'SELECT id_aluno FROM alunos WHERE cpf = $1',
          [body.CPF],
        );
        if (result.rows[0]) {
          throw new ErrorHandler('CPF JÁ CADASTRADO', 409);
        }
      }

      await this.database.connect(queryString(Object.keys(body)[0]), [
        Object.values(body)[0] as string,
        cpf,
      ]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
