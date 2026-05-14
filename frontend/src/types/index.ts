export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
