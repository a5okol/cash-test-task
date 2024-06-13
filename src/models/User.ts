import { IUser } from '../interfaces';

export abstract class User implements IUser {
  constructor(public userId: number, public userType: string) {}

  abstract calculateCashInFee(amount: number): Promise<number>;
  abstract calculateCashOutFee(date: string, amount: number): Promise<number>;
}
