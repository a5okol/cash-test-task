export interface IUser {
  userId: number;
  userType: string;
  calculateCashInFee(amount: number): Promise<number>;
  calculateCashOutFee(date: string, amount: number): Promise<number>;
}
