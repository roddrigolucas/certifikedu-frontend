export interface IRegisterNaturalPerson {
  email: string;
  documentNumber: string;
  password: string;
  pfInfo: {
    nome: string;
    telefone: string;
    dataDeNascimento: string;
    cepNumber: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  };
}

export interface IRegisterLegalPerson {
  email: string;
  documentNumber: string;
  password: string;
  type: string;
  pjInfo: {
    razaoSocial: string;
    nomeFantasia: string;
    dataDeFundacao: string;
    telefone: string;
    socios: {
      nome: string;
      CPF: string;
      telefone: string;
      dataDeNascimento: string;
      cepNumber: string;
      estado: string;
      cidade: string;
      bairro: string;
      rua: string;
      numero: string;
      complemento: string;
    };
  };
}

export interface ICheckResetPassword {
  email: string;
}

export interface IResponseCheckResetPassword {
  hasAccount: boolean;
  isRaw: boolean;
}
