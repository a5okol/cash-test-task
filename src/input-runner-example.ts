import { readFileSync } from 'fs';

import { IOperation } from './interfaces';
import { CommissionService } from './services/CommissionService';

const inputFilePath = process.argv[2];

if (!inputFilePath) {
  console.error('Please provide the input file path as an argument.');
  process.exit(1);
}

const data = readFileSync(inputFilePath, 'utf8');
const operations: IOperation[] = JSON.parse(data);
const commissionService = new CommissionService();

commissionService
  .calculateCommissionFee(operations)
  .then((fees) => {
    fees.forEach((fee) => console.log(fee.toFixed(2)));
  })
  .catch((err) => {
    console.error('Error calculating fees:', err);
  });
