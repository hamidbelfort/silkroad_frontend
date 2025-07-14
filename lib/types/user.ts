export interface UserResponse {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: ROLE;
  avatar: string;
}
enum ROLE {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  CUSTOMER = "CUSTOMER",
}
