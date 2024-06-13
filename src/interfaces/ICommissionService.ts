import { IOperation } from './IOperation';

export interface ICommissionService {
  calculateCommissionFee(operations: IOperation[]): Promise<number[]>;
}
