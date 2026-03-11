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
                winner: true,
                studios: "Studio 1"
            },
            {
                id: expect.any(Number),
                title: "Movie B",
                year: 2021,
                winner: false,
                studios: "Studio 1"
            }
        ]);

        const producers = await prisma.producers.findMany();
        
        expect(producers).toEqual([
            {
                id: expect.any(Number),
                name: "Producer 1"
            },
            {
                id: expect.any(Number),
                name: "Producer 2"
            }
        ]);
    });

    it("should create unique producers and associate them with movies", async () => {
        const tempFilePath = createTempCsvFile([
            { year: "2020", title: "Movie A", producers: "Producer 1, Producer 2 and Producer 3", winner: "yes", studios: "Studio 1" },
            { year: "2021", title: "Movie B", producers: "Producer 2 and Producer 3", winner: "", studios: "Studio 1" }
        ]);

        await expect(seedDatabase(tempFilePath)).resolves.not.toThrow();    

        const producers = await prisma.producers.findMany({
            include: {
                movies: true
            }
        });

        expect(producers).toEqual([
            {
                id: expect.any(Number),
                name: "Producer 1",
                movies: [
                    {
                        id: expect.any(Number),
                        title: "Movie A",
                        year: 2020,
                        winner: true,
                        studios: "Studio 1"
                    }
                ]
            },
            {
                id: expect.any(Number),
                name: "Producer 2",
                movies: [
                    {
                        id: expect.any(Number),
                        title: "Movie A",
                        year: 2020,
                        winner: true,
                        studios: "Studio 1"
                    },
                    {
                        id: expect.any(Number),
                        title: "Movie B",
                        year: 2021,
                        winner: false,
                        studios: "Studio 1"
                    }
                ]
            },
            {
                id: expect.any(Number),
                name: "Producer 3",
                movies: [
                    {
                        id: expect.any(Number),
                        title: "Movie A",
                        year: 2020,
                        winner: true,
                        studios: "Studio 1"
                    },
                    {
                        id: expect.any(Number),
                        title: "Movie B",
                        year: 2021,
                        winner: false,
                        studios: "Studio 1"
                    }
                ]
            }
        ]);

    });

    it("should handle save batch error", async () => {
        const batchSize = env.BATCH_SIZE;

        env.BATCH_SIZE = 2;

        const tempFilePath = createTempCsvFile([
            { year: "2020", title: "Movie A", producers: "Producer 1", winner: "yes", studios: "Studio 1" },
            { year: "2022", title: "Movie B", producers: "Producer 2", winner: "yes", studios: "Studio 1" },
            { year: "erro", title: "Movie C", producers: "Producer 2", winner: "", studios: "Studio 1" },
            { year: "2022", title: "Movie D", producers: "Producer 3", winner: "yes", studios: "Studio 1" },
        ]);

        await expect(seedDatabase(tempFilePath)).resolves.not.toThrow();

        const movies = await prisma.movies.findMany();

        expect(movies).toEqual([
            {
                id: expect.any(Number),
                title: "Movie A",
                year: 2020,
                winner: true,
                studios: "Studio 1"
            },
            {
                id: expect.any(Number),
                title: "Movie B",
                year: 2022,
                winner: true,
                studios: "Studio 1"
            }
        ]);

        const producers = await prisma.producers.findMany();
        
        expect(producers).toEqual([
            {
                id: expect.any(Number),
                name: "Producer 1"
            },
            {
                id: expect.any(Number),
                name: "Producer 2"
            }
        ]);

        env.BATCH_SIZE = batchSize;
    });
});