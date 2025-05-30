export interface BankAccount {
  id?: string;
  userId: string;
  bankName: string;
  accountOwner: string;
  accountNumber?: string;
  iban: string;
  cardNumber?: string;
  cardImage?: string;
}
export interface BankAccountResponse {
  success: boolean;
  message: string;
  data?: BankAccount;
}
