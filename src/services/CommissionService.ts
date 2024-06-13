import { LegalPerson } from '../models/LegalPerson';
import { NaturalPerson } from '../models/NaturalPerson';
import { IOperation, ICommissionService } from '../interfaces';
import { IUser, IFeeCalculator, IUserConstructor } from '../interfaces';

export class CommissionService implements ICommissionService {
  private users: Map<number, IUser>;
  private feeCalculators: Record<string, IFeeCalculator>;
  private userConstructors: Record<string, IUserConstructor>;

  constructor() {
    this.users = new Map();

    this.feeCalculators = {
      cash_in: (user, amount) => user.calculateCashInFee(amount),
      cash_out: (user, amount, date) => user.calculateCashOutFee(date!, amount)
    };

    this.userConstructors = {
      natural: (userId) => new NaturalPerson(userId),
      juridical: (userId) => new LegalPerson(userId)
    };
  }

  private getUser(userId: number, userType: string): IUser {
    if (!this.users.has(userId)) {
      this.users.set(userId, this.userConstructors[userType](userId));
    }
    return this.users.get(userId)!;
  }

  async calculateCommissionFee(operations: IOperation[]): Promise<number[]> {
    const fees: number[] = [];

    for (const {
      date,
      type,
      user_id,
      user_type,
      operation: { amount }
    } of operations) {
      const user = this.getUser(user_id, user_type);
      const fee = await this.feeCalculators[type](user, amount, date);
      fees.push(fee);
    }

    return fees;
  }
}
