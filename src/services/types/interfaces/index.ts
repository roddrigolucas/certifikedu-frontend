export interface IParams {
  [key: string]: any;
}

export interface IGenericOptions {
  url: string;
  params?: IParams;
}

export interface IResponse<T> {
  status: string;
  response: {
    data: T;
    message?: string;
  };
}

export interface IResponseData<T> {
  data: T;
}

export interface IErrorResponse {
  status: string;
  message: string;
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

export interface PaginationParams {
  page?: string;
  limit?: string;
}
