import axios from 'axios';

import { CashOutNaturalService } from '../../src/services/CashOutNaturalService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CashOutNaturalService', () => {
  let cashOutNaturalService: CashOutNaturalService;

  beforeEach(async () => {
    cashOutNaturalService = new CashOutNaturalService();
    mockedAxios.get.mockResolvedValue({
      data: { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } }
    });
    await cashOutNaturalService.initializeConfig();
  });

  test('calculate cash-out natural fee', async () => {
    const fee1 = await cashOutNaturalService.calculateFee('2023-06-10', 200, 1);
    expect(fee1).toBe(0);

    const fee2 = await cashOutNaturalService.calculateFee(
      '2023-06-10',
      2000,
      1
    );
    expect(fee2).toBe(3.6);
  });
});
