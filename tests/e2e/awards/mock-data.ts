import { CsvBatch } from "../../../src/config/database/csv-batch.model";
import { AwardsIntervalResponse } from "../../../src/modules/awards/models/awards-response.model";

export interface MockData {
    inputData: CsvBatch[];
    expectedData: AwardsIntervalResponse;
}

export const mockSimpleCsvData: MockData = {
    inputData: [
        { year: "2000", title: "Movie A", producers: "Producer 1", winner: "yes", studios: "Studio A" },
        { year: "2001", title: "Movie B", producers: "Producer 2", winner: "yes", studios: "Studio B" },
        { year: "2002", title: "Movie C", producers: "Producer 1", winner: "yes", studios: "Studio C" },
        { year: "2003", title: "Movie D", producers: "Producer 3", winner: "",  studios: "Studio D" },
        { year: "2004", title: "Movie E", producers: "Producer 2", winner: "yes", studios: "Studio E" }
    ],
    expectedData: {
        min: [
            {
                producer: "Producer 1",
                interval: 2,
                previousWin: 2000,
                followingWin: 2002
            }
        ],
        max: [
            {
                producer: "Producer 2",
                interval: 3,
                previousWin: 2001,
                followingWin: 2004
            }
        ]
    }
};

export const mockMultipleWinnersCsvData = {
    inputData: [
        { year: "2001", title: "Movie A", producers: "Producer 1, Producer 2 and Producer 3", winner: "yes", studios: "Studio A" },
        { year: "2001", title: "Movie B", producers: "Producer 2 and Producer 3", winner: "yes", studios: "Studio B" },
        { year: "2002", title: "Movie C", producers: "Producer 2", winner: "yes", studios: "Studio C" },
        { year: "2003", title: "Movie D", producers: "Producer 3", winner: "", studios: "Studio D" },
        { year: "2004", title: "Movie E", producers: "Producer 1", winner: "yes", studios: "Studio E" }
    ] as CsvBatch[],
    expectedData: {
        min: [
            {
                producer: "Producer 2",
                interval: 0,
                previousWin: 2001,
                followingWin: 2001
            },
            {
                producer: "Producer 3",
                interval: 0,
                previousWin: 2001,
                followingWin: 2001
            }
        ],
        max: [
            {
                producer: "Producer 1",
                interval: 3,
                previousWin: 2001,
                followingWin: 2004
            }
        ]
    } as AwardsIntervalResponse
};

export const mockTieMinMaxCsvData: MockData = {
    inputData: [
        { year: "2000", title: "Movie A", producers: "Producer Min 1", winner: "yes", studios: "Studio" },
        { year: "2001", title: "Movie B", producers: "Producer Min 1", winner: "yes", studios: "Studio" },
        { year: "2005", title: "Movie C", producers: "Producer Min 2", winner: "yes", studios: "Studio" },
        { year: "2006", title: "Movie D", producers: "Producer Min 2", winner: "yes", studios: "Studio" },
        { year: "1990", title: "Movie E", producers: "Producer Max 1", winner: "yes", studios: "Studio" },
        { year: "2000", title: "Movie F", producers: "Producer Max 1", winner: "yes", studios: "Studio" },
        { year: "1985", title: "Movie G", producers: "Producer Max 2", winner: "yes", studios: "Studio" },
        { year: "1995", title: "Movie H", producers: "Producer Max 2", winner: "yes", studios: "Studio" }
    ],
    expectedData: {
        min: [
            { producer: "Producer Min 1", interval: 1, previousWin: 2000, followingWin: 2001 },
            { producer: "Producer Min 2", interval: 1, previousWin: 2005, followingWin: 2006 }
        ],
        max: [
            { producer: "Producer Max 1", interval: 10, previousWin: 1990, followingWin: 2000 },
            { producer: "Producer Max 2", interval: 10, previousWin: 1985, followingWin: 1995 }
        ]
    }
};

export const mockNoIntervalsCsvData: MockData = {
    inputData: [
        { year: "2000", title: "Movie A", producers: "Producer 1", winner: "yes", studios: "Studio" },
        { year: "2001", title: "Movie B", producers: "Producer 2", winner: "yes", studios: "Studio" },
        { year: "2002", title: "Movie C", producers: "Producer 3", winner: "yes", studios: "Studio" }
    ],
    expectedData: {
        min: [],
        max: []
    }
};