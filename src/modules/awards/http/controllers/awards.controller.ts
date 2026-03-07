import { Request, Response } from "express";
import { AwardWinnerIntervalService } from "../../services/awards-winner-interval.service.js";
import { AwardsIntervalResponse } from "../../models/awards-response.model.js";
import { logger } from "../../../../shared/utils/logger.js";
import { AppError } from "../../../../shared/errors/app.error.js";

export class AwardWinnerIntervalController {
    constructor(
        private readonly awardWinnerIntervalService: AwardWinnerIntervalService
    ) {}

    public async getAwards(req: Request, res: Response): Promise<Response<AwardsIntervalResponse>> {
        const traceId = req.headers["x-trace-id"] as string || "N/A";
        logger.info(`Trace ID: ${traceId} - Received request for award winners interval.`);
        
        try {
            const data = await this.awardWinnerIntervalService.getAwardWinnersInterval();
            return res.status(200).json(data);
        } catch (error) {
            logger.error(
                `Trace ID: ${traceId} - Error fetching award winners interval: 
                ${error instanceof Error ? error.message : String(error)}`
            );
            throw new AppError("An error occurred while fetching award winners interval.", traceId, 500);
        }
    }
}