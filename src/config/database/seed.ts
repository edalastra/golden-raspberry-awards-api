/* eslint-disable no-console */
import fs from 'node:fs';
import { parse } from 'csv-parse';
import env from '../../shared/env.js';
import { prisma } from './prisma.client.js';
import { CsvBatch } from './csv-batch.model.js';
import { logger } from '../../shared/utils/logger.js';

const errorStream = fs.createWriteStream('../../rows_with_error.json', { flags: 'a' });

function splitProducersName(producers: string): string[] {
    return producers
        .split(/, | and /)
        .map(name => name.trim())
        .filter(name => name.length > 0);
}

async function clearDatabase() {
    logger.info('Clearing database...');
    await prisma.movies.deleteMany({});
    await prisma.producers.deleteMany({});
    logger.info('Database cleared successfully.');
    await prisma.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name IN ('Movies', 'Producers');`);    
}

async function saveBatch(batch: CsvBatch[]) {
    try {
        await clearDatabase();
        const operations = batch.map(row => {
            const producersName = splitProducersName(row.producers);

            return prisma.movies.create({
                data: {
                    year: parseInt(row.year),
                    title: row.title,
                    winner: row.winner.toLowerCase() === 'yes',
                    producers: {
                        connectOrCreate: producersName.map(name => ({
                            where: { name },
                            create: { name }
                        }))
                    }
                }
            });
        });

        await prisma.$transaction(operations);
    } catch (error) {
        logger.error('Error saving batch:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        errorStream.write(JSON.stringify({ error: errorMessage, batch } + '\n'));
    }
}

export async function seedDatabase(csvPath: string) {
    try {
        const parser = fs.createReadStream(csvPath).pipe(parse({
            columns: true,
            delimiter: ';',
            trim: true,
            skip_empty_lines: true,
        }));

        let batch = [];
        let totalProcessed = 0;

        logger.info('Starting database seeding...');
        console.time('timeToSeedDatabase');
        for await (const row of parser) {
            batch.push(row);

            if (batch.length >= env.BATCH_SIZE) {
                await saveBatch(batch);
                totalProcessed += batch.length;
                batch = [];
            }
        }

        if (batch.length > 0) {
            await saveBatch(batch);
            totalProcessed += batch.length;
        }

        logger.info(`Processed ${totalProcessed} records...`);
    } catch (error) {
        logger.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
        console.timeEnd('timeToSeedDatabase');
    }

}