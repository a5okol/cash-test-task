import { Request, Response } from 'express';

import { CommissionService } from '../services/CommissionService';

export class CommissionController {
  private commissionService: CommissionService;

  constructor() {
    this.commissionService = new CommissionService();
  }

  public calculateCommission = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result = await this.commissionService.calculateCommissionFee(
        req.body
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
