export interface BankAccount {
  id: string;
  userId: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  iban: string;
  expiryDate: string;
  cvv2?: string;
  cardImageUrl?: string;
}
export interface BankAccountResponse {
  success: boolean;
  message: string;
}
