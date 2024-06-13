import { User } from './User';
import { CashInService } from '../services/CashInService';
import { CashOutNaturalService } from '../services/CashOutNaturalService';

export class NaturalPerson extends User {
  private cashInService: CashInService;
  private cashOutService: CashOutNaturalService;

  constructor(userId: number) {
    super(userId, 'natural');
    this.cashInService = new CashInService();
    this.cashOutService = new CashOutNaturalService();
  }

  async calculateCashInFee(amount: number): Promise<number> {
    return this.cashInService.calculateFee(amount);
  }

  async calculateCashOutFee(date: string, amount: number): Promise<number> {
    return this.cashOutService.calculateFee(date, amount, this.userId);
  }
}
