export interface ICashOutNaturalService {
  initializeConfig(): Promise<void>;
  calculateFee(date: string, amount: number, user_id: number): Promise<number>;
}
