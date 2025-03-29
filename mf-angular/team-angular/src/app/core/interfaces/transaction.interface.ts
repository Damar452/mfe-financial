export interface Transaction {
  id:                   number;
  userId:               number;
  sourceAccountId:      number;
  destinationAccountId: number;
  amount:               number;
  type:                 string;
  timestamp:            Date;
  description:          string;
}
