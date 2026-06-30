export interface IRegisterProfilePJ {
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
