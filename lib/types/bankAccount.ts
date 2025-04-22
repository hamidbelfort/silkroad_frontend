export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountOwner: string;
  accountNumber: string;
  iban?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv2?: string;
  cardImageUrl?: string;
}
export interface BankAccountResponse {
  success: boolean;
  message: string;
}
