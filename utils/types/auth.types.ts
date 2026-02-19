export interface AuthUser {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
}
