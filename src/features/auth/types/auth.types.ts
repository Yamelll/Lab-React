export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterFormValues = RegisterInput & {
  passwordConfirmation: string;
};

export type AuthResponse = {
  email: string;
  name: string;
  token: string;
};

export type RegisteredUser = {
  email: string;
  name: string;
};