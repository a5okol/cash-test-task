import { roundUp } from '../utils/roundUp';
import { CashInService } from './CashInService';
import { IOperation, ICommissionService } from '../interfaces';
import { CashOutNaturalService } from './CashOutNaturalService';
import { CashOutJuridicalService } from './CashOutJuridicalService';

export class CommissionService implements ICommissionService {
  private cashInService: CashInService;
  private cashOutNaturalService: CashOutNaturalService;
  private cashOutJuridicalService: CashOutJuridicalService;

  constructor() {
    this.cashInService = new CashInService();
    this.cashOutNaturalService = new CashOutNaturalService();
    this.cashOutJuridicalService = new CashOutJuridicalService();
  }

  async calculateCommissionFee(operations: IOperation[]): Promise<number[]> {
    const fees: number[] = [];

    for (const operation of operations) {
      const {
        date,
        type,
        user_id,
        user_type,
        operation: { amount }
      } = operation;
      let fee = 0;

      switch (type) {
        case 'cash_in':
          fee = await this.cashInService.calculateFee(amount);
          break;
        case 'cash_out':
          switch (user_type) {
            case 'natural':
              fee = await this.cashOutNaturalService.calculateFee(
                date,
                amount,
                user_id
              );
              break;
            case 'juridical':
              fee = await this.cashOutJuridicalService.calculateFee(amount);
              break;
          }
          break;
      }

      const roundedFee = roundUp(fee);
      fees.push(roundedFee);
    }

    return fees;
  }
}
