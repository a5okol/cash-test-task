import { roundUp } from '../utils/roundUp';
import { getISOWeek } from '../utils/date';
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

  private initializeWeeklyCashOut(userId: number, week: number) {
    this.weeklyCashOuts[userId] = { week, total: 0 };
  }

  private resetWeeklyCashOutIfNewWeek(userId: number, week: number) {
    if (this.weeklyCashOuts[userId].week !== week) {
      this.weeklyCashOuts[userId].week = week;
      this.weeklyCashOuts[userId].total = 0;
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

  private ensureWeeklyCashOutInitialized(userId: number, week: number) {
    if (!this.weeklyCashOuts[userId]) {
      this.initializeWeeklyCashOut(userId, week);
    }
    this.resetWeeklyCashOutIfNewWeek(userId, week);
  }

  async calculateFee(
    date: string,
    amount: number,
    userId: number
  ): Promise<number> {
    await this.ensureConfigInitialized();
    const week = getISOWeek(date);
    this.ensureWeeklyCashOutInitialized(userId, week);

    const freeAmountLimit = this.config.week_limit.amount;
    const totalWeeklyCashOutByUserId = this.weeklyCashOuts[userId].total;

    if (totalWeeklyCashOutByUserId < freeAmountLimit) {
      const freeAmountRemaining = freeAmountLimit - totalWeeklyCashOutByUserId;
      this.weeklyCashOuts[userId].total += amount;
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
