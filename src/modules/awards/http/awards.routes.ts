import { Router } from "express";
import { awardWinnerIntervalControllerFactory } from "./controllers/factories/awards.controller.factory.js";

const awardsRouter = Router();

const awardWinnerIntervalController = awardWinnerIntervalControllerFactory();

awardsRouter.get(
    "/winners-interval",
    awardWinnerIntervalController.getAwards.bind(awardWinnerIntervalController)
);

export default awardsRouter;
