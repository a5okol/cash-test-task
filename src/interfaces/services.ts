import { IOperation } from './operations';

export interface ICashInService {
  initializeConfig(): Promise<void>;
  calculateFee(amount: number): Promise<number>;
}

export interface ICashOutJuridicalService {
  initializeConfig(): Promise<void>;
  calculateFee(amount: number): Promise<number>;
}

export interface ICashOutNaturalService {
  initializeConfig(): Promise<void>;
  calculateFee(date: string, amount: number, user_id: number): Promise<number>;
}

export interface ICommissionService {
  calculateCommissionFee(operations: IOperation[]): Promise<number[]>;
}
