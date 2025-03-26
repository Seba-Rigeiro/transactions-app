interface Account {
  id: number;
  currency: string;
}

export interface Transaction {
  id: number;
  accountFrom: Account;
  accountTo: Account;
  amount: number;
  date: Date;
  description: string;
}
