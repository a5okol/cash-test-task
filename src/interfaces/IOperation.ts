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
