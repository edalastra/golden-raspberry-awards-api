import { Router } from "express";
import awardsRouter from "../../modules/awards/http/awards.routes.js";
import env from "../env.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        app_version: env.APP_VERSION
    });
});                                    

router.use("/v1/awards", awardsRouter);

export default router;