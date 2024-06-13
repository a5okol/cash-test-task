export interface IConfig {
  percents: number;
  week_limit: {
    amount: number;
    currency: string;
  };
  max?: {
    amount: number;
    currency: string;
  };
  min?: {
    amount: number;
    currency: string;
  };
}
