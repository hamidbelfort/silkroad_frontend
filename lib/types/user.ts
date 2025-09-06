export interface UserResponse {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: ROLE;
  avatar: string;
}
export interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: ROLE;
  isActive: boolean;
  createdAt: string;
}
export const enum ROLE {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  CUSTOMER = "CUSTOMER",
}
