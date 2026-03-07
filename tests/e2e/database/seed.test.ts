import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "../../../src/config/database/seed";
import { createTempCsvFile } from "../../utils/csv-utils";
import { prisma } from "../../../src/config/database/prisma.client";
import env from "../../../src/shared/env";

describe("Database Seeding", () => {
    it("should seed the database without errors", async () => {
        const tempFilePath = createTempCsvFile([
            { year: "2020", title: "Movie A", producers: "Producer 1", winner: "yes", studios: "Studio 1" },
            { year: "2021", title: "Movie B", producers: "Producer 2", winner: "", studios: "Studio 1" }
        ]);

        await expect(seedDatabase(tempFilePath)).resolves.not.toThrow();

        const movies = await prisma.movies.findMany();

        expect(movies).toEqual([
            {
                id: expect.any(Number),
                title: "Movie A",
                year: 2020,
                winner: true
            },
            {
                id: expect.any(Number),
                title: "Movie B",
                year: 2021,
                winner: false
            }
        ]);

    });
});