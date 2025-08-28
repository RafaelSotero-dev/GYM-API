enum Modalidade {
  musculação = 1,
  Fidelidade = 2,
  Performace = 3,
}

export interface IAluno {
  idAluno?: string;
  nome: string;
  idade: number;
  email: string;
  foto: string;
  CPF: string;
  status: number;
  role: 'aluno' | 'admin';
  modalidade: Modalidade;
  idEndereco?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Aluno implements IAluno {
  public readonly nome: string;
  public readonly idade: number;
  public readonly email: string;
  public readonly foto: string;
  public readonly CPF: string;
  public readonly status: number;
  public readonly role: 'aluno' | 'admin';
  public readonly modalidade: Modalidade;
  private readonly id_Endereco: string;

  constructor(
    nome: string,
    idade: number,
    email: string,
    foto: string,
    CPF: string,
    status: number,
    role: 'aluno' | 'admin',
    modalidade: Modalidade,
    idEndereco: string,
  ) {
    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.foto = foto;
    this.CPF = CPF;
    this.status = status;
    this.role = role;
    this.modalidade = modalidade;
    this.id_Endereco = idEndereco;
  }
}
