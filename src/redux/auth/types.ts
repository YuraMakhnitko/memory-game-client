export enum Status {
  LOADING = 'LOADING',
  SUCCSESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface UserProps {
  name?: string;
  email: string;
  password?: string;
  _id?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  isAuth: boolean;
  user: UserProps;
  status: string;
  loginOpen: boolean;
  registerOpen: boolean;
}
