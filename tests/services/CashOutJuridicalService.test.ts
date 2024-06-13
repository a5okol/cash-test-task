import axios from 'axios';

import { CashOutJuridicalService } from '../../src/services/CashOutJuridicalService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CashOutJuridicalService', () => {
  let cashOutJuridicalService: CashOutJuridicalService;

  beforeEach(() => {
    cashOutJuridicalService = new CashOutJuridicalService();
    mockedAxios.get.mockResolvedValue({
      data: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } }
    });
  });

  test('calculate cash-out juridical fee', async () => {
    await cashOutJuridicalService.initializeConfig();

    expect(await cashOutJuridicalService.calculateFee(100)).toBe(0.5);
    expect(await cashOutJuridicalService.calculateFee(200)).toBe(0.6);
  });
});
