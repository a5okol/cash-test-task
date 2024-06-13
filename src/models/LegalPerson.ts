import { User } from './User';
import { CashInService } from '../services/CashInService';
import { CashOutJuridicalService } from '../services/CashOutJuridicalService';

export class LegalPerson extends User {
  private cashInService: CashInService;
  private cashOutService: CashOutJuridicalService;

  constructor(userId: number) {
    super(userId, 'juridical');
    this.cashInService = new CashInService();
    this.cashOutService = new CashOutJuridicalService();
  }

  async calculateCashInFee(amount: number): Promise<number> {
    return this.cashInService.calculateFee(amount);
  }

  async calculateCashOutFee(date: string, amount: number): Promise<number> {
    return this.cashOutService.calculateFee(amount);
  }
}
