export interface ResetPasswordType {
  email: string;
  otp: string;
  newPassword: string;
}
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
