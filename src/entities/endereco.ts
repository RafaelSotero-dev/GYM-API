export interface IEndereco {
  idEndereco?: string;
  rua: string;
  numero: number;
  bairro: string;
  CEP: string;
}

export class Endereco implements IEndereco {
  public readonly rua: string;
  public readonly numero: number;
  public readonly bairro: string;
  public readonly CEP: string;

  constructor(rua: string, numero: number, bairro: string, CEP: string) {
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.CEP = CEP;
  }
}
