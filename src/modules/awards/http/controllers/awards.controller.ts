import { Request, Response } from "express";
import { AwardWinnerIntervalService } from "../../services/awards-winner-interval.service.js";
import env from "../../../../shared/env.js";
import { AwardsIntervalResponse } from "../../models/awards-response.model.js";
import { logger } from "../../../../shared/utils/logger.js";

export class AwardWinnerIntervalController {
    constructor(
        private readonly awardWinnerIntervalService: AwardWinnerIntervalService
    ) {}

    public async getAwards(req: Request, res: Response): Promise<Response<AwardsIntervalResponse>> {
        const traceId = req.headers["x-trace-id"] || "N/A";
        logger.info(`Trace ID: ${traceId} - Received request for award winners interval.`);
        
        try {
            const data = await this.awardWinnerIntervalService.getAwardWinnersInterval();
            return res.status(200).json(data);
        } catch (error) {
            logger.error(`Trace ID: ${traceId} - Error fetching award winners interval:`, error);
            return res.status(500).json({
                traceId,
                appVersion: env.APP_VERSION,
                error: "An error occurred while fetching award winners interval."
            });
        }
    }
}