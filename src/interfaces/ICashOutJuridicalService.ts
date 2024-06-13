export interface ICashOutJuridicalService {
  initializeConfig(): Promise<void>;
  calculateFee(amount: number): Promise<number>;
}
