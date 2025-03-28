export interface AccountResponse {
  id: number;
  userId: number;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
  balance: number;
  createdAt: string;
}
