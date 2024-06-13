import { getCashInConfig } from '../config/apiConfig';
import { ICashInService, IConfig } from '../interfaces';

export class CashInService implements ICashInService {
  private config!: IConfig;

  async initializeConfig() {
    this.config = await getCashInConfig();
  }

  async calculateFee(amount: number): Promise<number> {
    if (!this.config) {
      await this.initializeConfig();
    }
    return Math.min(
      (amount * this.config.percents) / 100,
      this.config?.max?.amount ?? 0
    );
  }
}
