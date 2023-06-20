export interface AuthModalProps {
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
}
export interface LogoutModalProps {
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
  action: () => void;
}

export interface UserSubmitRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserSubmitLoginForm {
  email: string;
  password: string;
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
