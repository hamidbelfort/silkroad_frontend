export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}
export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: string;
}
