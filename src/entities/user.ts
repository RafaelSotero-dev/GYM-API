interface IuserAddress {
  Rua: string;
  numero: number;
  Bairro: string;
  CEP: string;
}

export interface Iuser {
  nome: string;
  idade: number;
  email: string;
  foto: string;
  CPF: string;
  status: boolean;
  role: string;
  endereço: IuserAddress;
}
