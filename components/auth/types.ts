export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}