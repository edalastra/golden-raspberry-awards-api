import { Request, Response } from "express";
import { AwardWinnerIntervalService } from "../../services/awards-winner-interval.service.js";

export class AwardWinnerIntervalController {
    constructor(
        private readonly awardWinnerIntervalService: AwardWinnerIntervalService
    ) {}

    public async getAwards(req: Request, res: Response): Promise<any> {
        const data = await this.awardWinnerIntervalService.getWinnersOrdenedByYear();

        return res.json(data);
    }
}