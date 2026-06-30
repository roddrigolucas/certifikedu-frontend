export interface IProfilePJ {
  email: string;
  phone: string;
  companyName: string;
  fantasyName: string;
  cnpj: string;
  dateCreation: string;
  category: string;
  partner: Partner;
}

interface Partner {
  cpf: string;
  phone: string;
  name: string;
  birthdate: string;
  address: {
    street: string;
    streetNumber: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    complementary: string;
  };
}
