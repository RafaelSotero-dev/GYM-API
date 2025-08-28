import type { QueryResult } from 'pg';
import type { IDatabaseConnect } from '../database/db.js';
import type { IQuery } from './query.js';
import type { IRequest } from '../controllers/request.js';
import { Aluno } from '../entities/aluno.js';

export class CreateNewGymMember implements IQuery {
  constructor(private model: IDatabaseConnect) {}
  async query(queryParams: IRequest) {
    const fistQuery = `INSERT INTO enderecos(rua, numero, bairro, CEP) VALUES ($1, $2, $3, $4) RETURNING id_endereco;`;
    const secondQuery = `INSERT INTO alunos(nome, idade, email, foto, CPF, status, role, modalidade, id_endereco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const { endereco, ...aluno } = queryParams.body;

    try {
      const gymMemberEmailAlreadyExists = await this.model.connect<QueryResult>(
        `SELECT * FROM alunos WHERE email = $1`,
        [aluno.email],
      );
      if (gymMemberEmailAlreadyExists.rows[0]) {
        return 'Email Já existe!';
      }
      const gymMemberCPFAlreadyExists = await this.model.connect<QueryResult>(
        `SELECT * FROM alunos WHERE CPF = $1`,
        [aluno.CPF],
      );
      if (gymMemberCPFAlreadyExists.rows[0]) {
        return 'CPF Já existe!';
      }

      const response = await this.model.connect<QueryResult>(
        `SELECT id_endereco FROM enderecos WHERE CEP = $1 and numero = $2`,
        [endereco.CEP, endereco.numero],
      );

      if (response.rows[0]) {
        const alunoFormated = new Aluno(
          aluno.nome,
          aluno.idade,
          aluno.email,
          aluno.foto,
          aluno.CPF,
          aluno.status,
          aluno.role,
          aluno.modalidade,
          response.rows[0].id_endereco,
        );
        await this.model.connect(secondQuery, Object.values(alunoFormated));
        return;
      }

      const res = await this.model.connect<QueryResult>(
        fistQuery,
        Object.values(endereco),
      );

      const alunoFormated = new Aluno(
        aluno.nome,
        aluno.idade,
        aluno.email,
        aluno.foto,
        aluno.CPF,
        aluno.status,
        aluno.role,
        aluno.modalidade,
        res.rows[0].id_endereco,
      );
      await await this.model.connect(secondQuery, Object.values(alunoFormated));
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
