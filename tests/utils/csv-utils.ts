import fs from "fs";
import { CsvBatch } from "../../src/config/database/csv-batch.model";

export const createTempCsvFile = (content: CsvBatch[]): string => {
    const tempFilePath = "temp_test_data.csv";
    const csvContent = [
        "year;title;producers;winner;studios",
        ...content.map(row => `${row.year};${row.title};${row.producers};${row.winner};${row.studios}`)
    ].join("\n");
    fs.writeFileSync(tempFilePath, csvContent);
    return tempFilePath;
};