export interface LoginRequest {
  email: string;
  pawwsord: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}
