export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
}
export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: string;
}
