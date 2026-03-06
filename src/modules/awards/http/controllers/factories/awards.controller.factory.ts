import { awardWinnerIntervalServiceFactory } from "../../../services/factories/awards.service.factory.js";
import { AwardWinnerIntervalController } from "../awards.controller.js";

export const awardWinnerIntervalControllerFactory = (): AwardWinnerIntervalController => {
    return new AwardWinnerIntervalController(awardWinnerIntervalServiceFactory());
}