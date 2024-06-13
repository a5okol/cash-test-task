import axios from 'axios';

import { IOperation } from '../../src/interfaces';
import { endpoints } from '../../src/config/apiConfig';
import { CommissionService } from '../../src/services/CommissionService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CommissionService', () => {
  let commissionService: CommissionService;

  beforeEach(() => {
    commissionService = new CommissionService();

    mockedAxios.get.mockImplementation((url) => {
      switch (url) {
        case endpoints.cashIn:
          return Promise.resolve({
            data: { percents: 0.03, max: { amount: 5, currency: 'EUR' } }
          });
        case endpoints.cashOutNatural:
          return Promise.resolve({
            data: {
              percents: 0.3,
              week_limit: { amount: 1000, currency: 'EUR' }
            }
          });
        case endpoints.cashOutJuridical:
          return Promise.resolve({
            data: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } }
          });
        default:
          return Promise.reject(new Error('Unknown URL'));
      }
    });
  });

  test('calculate commission fees', async () => {
    const operations: IOperation[] = [
      {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_in',
        operation: { amount: 200.0, currency: 'EUR' }
      },
      {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' }
      },
      {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 30000, currency: 'EUR' }
      }
    ];

    const fees = await commissionService.calculateCommissionFee(operations);

    expect(fees).toEqual([0.06, 0.9, 87.0]);
  });
});
