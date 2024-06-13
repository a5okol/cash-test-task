import { getCashOutJuridicalConfig } from '../config/apiConfig';
import { ICashOutJuridicalService, IConfig } from '../interfaces';

export class CashOutJuridicalService implements ICashOutJuridicalService {
  private config!: IConfig;

  async initializeConfig() {
    this.config = await getCashOutJuridicalConfig();
  }

  async calculateFee(amount: number): Promise<number> {
    if (!this.config) {
      await this.initializeConfig();
    }
    return Math.max(
      (amount * this.config.percents) / 100,
      this.config?.min?.amount ?? 0
    );
  }
}
