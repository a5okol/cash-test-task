import { User } from '../models/User';

export type IFeeCalculator = (
  user: User,
  amount: number,
  date?: string
) => Promise<number>;

export type IUserConstructor = (userId: number) => User;
