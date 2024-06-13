import axios from 'axios';

import { CashInService } from '../../src/services/CashInService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CashInService', () => {
  let cashInService: CashInService;

  beforeEach(() => {
    cashInService = new CashInService();
    mockedAxios.get.mockResolvedValue({
      data: { percents: 0.03, max: { amount: 5, currency: 'EUR' } }
    });
  });

  test('calculate cash-in fee', async () => {
    await cashInService.initializeConfig();

    expect(await cashInService.calculateFee(200)).toBe(0.06);
    expect(await cashInService.calculateFee(20000)).toBe(5.0);
  });
});
