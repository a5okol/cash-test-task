export interface IOperation {
  date: string;
  type: string;
  user_id: number;
  user_type: string;
  operation: {
    amount: number;
    currency: string;
  };
}

export type IWeeklyCashOuts = {
  [key: number]: { week: number; total: number };
};

export interface ICalculateCashOutNaturalFee {
  date: string;
  amount: number;
  user_id: number;
  weeklyCashOuts: IWeeklyCashOuts;
}
