export interface IExistsUserPJ {
  email: string | null;
  isFound: boolean;
  name?: string | null;
  cpf?: string | null;
}

export interface IPermissionUserPJ {
  role: string;
  cpf: string;
}

export interface IPermissionUserPJPatch {
  role: string;
  cpfs: Array<string>;
}

export interface IUsersPJRoles {
  adminId: any;
  role: string;
  environment: string;
}
