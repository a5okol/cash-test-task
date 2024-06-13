import { IWeeklyCashOuts } from './IWeeklyCashOuts';

export interface ICalculateCashOutNaturalFee {
  date: string;
  amount: number;
  user_id: number;
  weeklyCashOuts: IWeeklyCashOuts;
}
