export interface RequestDataSignUpLegalPerson {
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
      complemento: string | undefined;
    };
  };
}
