export interface AccountResponse {
  id: number;
  userId: number;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'CREDIT';
  balance: number;
  createdAt: string;
}

export interface UsersAccounts {
  fullName: string;
  accountNumber: string;
  balance: number;
}
