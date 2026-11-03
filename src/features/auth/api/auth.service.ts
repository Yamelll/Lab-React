import type {
  AuthResponse,
  LoginInput,
  RegisteredUser,
  RegisterInput,
} from '@/features/auth/types/auth.types';
import { doPost } from '@/services/http.service';

export const login = (input: LoginInput): Promise<AuthResponse> =>
  doPost<LoginInput, AuthResponse>('/login', input);

export const register = (input: RegisterInput): Promise<RegisteredUser> =>
  doPost<RegisterInput, RegisteredUser>('/register', input);