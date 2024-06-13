import { getISOWeek } from '../utils/date';
import { roundUp } from '../utils/roundUp';
import { getCashOutNaturalConfig } from '../config/apiConfig';
import {
  IConfig,
  IWeeklyCashOuts,
  ICashOutNaturalService
} from '../interfaces';

export class CashOutNaturalService implements ICashOutNaturalService {
  private config!: IConfig;
  private weeklyCashOuts: IWeeklyCashOuts = {};

  async initializeConfig() {
    this.config = await getCashOutNaturalConfig();
  }

  private initializeWeeklyCashOut(user_id: number, week: number) {
    this.weeklyCashOuts[user_id] = { week, total: 0 };
  }

  private resetWeeklyCashOutIfNewWeek(user_id: number, week: number) {
    if (this.weeklyCashOuts[user_id].week !== week) {
      this.weeklyCashOuts[user_id].week = week;
      this.weeklyCashOuts[user_id].total = 0;
    }
  }

  private calculateFeeForAmountExceedingFreeLimit(
    amount: number,
    freeAmountRemaining: number
  ): number {
    const chargeableAmount = Math.max(amount - freeAmountRemaining, 0);
    return (chargeableAmount * this.config.percents) / 100;
  }

  private async ensureConfigInitialized(): Promise<void> {
    if (!this.config) {
      await this.initializeConfig();
    }
  }

  private ensureWeeklyCashOutInitialized(user_id: number, week: number) {
    if (!this.weeklyCashOuts[user_id]) {
      this.initializeWeeklyCashOut(user_id, week);
    }

    this.resetWeeklyCashOutIfNewWeek(user_id, week);
  }

  async calculateFee(
    date: string,
    amount: number,
    user_id: number
  ): Promise<number> {
    const week = getISOWeek(date);
    await this.ensureConfigInitialized();
    this.ensureWeeklyCashOutInitialized(user_id, week);

    const freeAmountLimit = this.config.week_limit.amount;
    const totalWeeklyCashOutByUserId = this.weeklyCashOuts[user_id].total;

    if (totalWeeklyCashOutByUserId < freeAmountLimit) {
      const freeAmountRemaining = freeAmountLimit - totalWeeklyCashOutByUserId;
      this.weeklyCashOuts[user_id].total += amount;
      const fee = this.calculateFeeForAmountExceedingFreeLimit(
        amount,
        freeAmountRemaining
      );
      return roundUp(fee);
    }

    const fee = (amount * this.config.percents) / 100;
    return roundUp(fee);
  }
}
