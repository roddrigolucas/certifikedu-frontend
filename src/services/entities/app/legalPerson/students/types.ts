export interface IRegisterStudent {
  name: string;
  email: string;
  document: string;
  schoolId: string;
  address: {
    streetNumber: string;
    street: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    complementary: string;
  };
  additional?: {
    id: string;
    institute: string;
    type: string;
    level: string;
    class: string;
  };
}

interface IRegisterUser {
  name?: string;
  documentNumber: string;
  email: string;
  phone?: string;
}

export interface IRegisterUserBulk {
  users: IRegisterUser[];
  school: string;
}
