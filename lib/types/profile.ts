export interface Profile {
  id?: string;
  userId?: string;
  avatar?: string;
  address?: string;
  bio?: string;
  whatsapp?: string;
  wechat?: string;
}
export interface ProfileResponse {
  success: boolean;
  message: string;
}
