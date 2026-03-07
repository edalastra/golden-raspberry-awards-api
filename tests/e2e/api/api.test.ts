import supertest from "supertest";
import { createApp } from "../../../src/config/app.js";
import env from "../../../src/shared/env.js";

const app = createApp();

describe("API (e2e)", () => {
    it("should return 200 for health route", async () => {
        const response = await supertest(app)
            .get("/health");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "ok",
            app_version: env.APP_VERSION
        });
    });

    it("should return 404 for unknown routes", async () => {
        const response = await supertest(app)
            .get("/v1/unknown-route");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: "error",
            message: "Route not found.",
            version: env.APP_VERSION
        });
    });
});