import request from "supertest";
import { jest } from "@jest/globals";
import fs from "fs";
import { createApp } from "../../../src/config/app.js";
import { clearDatabase, seedDatabase } from "../../../src/config/database/seed.js";
import { CsvBatch } from "../../../src/config/database/csv-batch.model.js";
import { MockData, mockMultipleWinnersCsvData, mockNoIntervalsCsvData, mockSimpleCsvData, mockTieMinMaxCsvData } from "./mock-data.js";
import { AwardWinnerIntervalService } from "../../../src/modules/awards/services/awards-winner-interval.service.js";
import env from "../../../src/shared/env.js";

const app = createApp();

const createTempCsvFile = (content: CsvBatch[]): string => {
	const tempFilePath = "temp_test_data.csv";
	const csvContent = [
		"year;title;producers;winner",
		...content.map(row => `${row.year};${row.title};${row.producers};${row.winner}`)
	].join("\n");
	fs.writeFileSync(tempFilePath, csvContent);
	return tempFilePath;
};

describe("AwardsController (e2e)", () => {
	describe("GET /awards/winners-interval", () => {
		it.each([
			mockSimpleCsvData,
			mockMultipleWinnersCsvData,
			mockTieMinMaxCsvData,
			mockNoIntervalsCsvData
		])("should return the correct intervals for producers wins", async ({ inputData, expectedData }: MockData) => {
			const tempFilePath = createTempCsvFile(inputData);

			await seedDatabase(tempFilePath);

			const response = await request(app)
				.get("/v1/awards/winners-interval");

			expect(response.status).toBe(200);

			expect(response.body).toMatchObject(expectedData);
		});

		it("should return void lists when database is clean", async () => {
			await clearDatabase();
			const response = await request(app)
				.get("/v1/awards/winners-interval");
			
			expect(response.status).toBe(200);
			expect(response.body).toEqual({
				min: [],
				max: []
			});
		});

		it("should return 500 if a internal error occoured", async () => {
			jest.spyOn(AwardWinnerIntervalService.prototype, "getAwardWinnersInterval").mockImplementation(() => {
				throw new Error("Internal Server Error");
			});

			const response = await request(app)
				.get("/v1/awards/winners-interval");

			expect(response.status).toBe(500);
			expect(response.body).toEqual({
				message: "An error occurred while fetching award winners interval.",
				status: "error",
				traceId: expect.any(String),
				version: env.APP_VERSION
			});
		});
	});
});