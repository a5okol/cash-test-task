export interface ICashInService {
  initializeConfig(): Promise<void>;
  calculateFee(amount: number): Promise<number>;
}
