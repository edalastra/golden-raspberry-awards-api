import { awardsRepositoryFactory } from "../../domain/respositories/factories/awards.repository.factory.js";
import { AwardWinnerIntervalService } from "../awards-winner-interval.service.js";

export const awardWinnerIntervalServiceFactory = (): AwardWinnerIntervalService => {
    return new AwardWinnerIntervalService(awardsRepositoryFactory());
}