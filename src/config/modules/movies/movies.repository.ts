import { PrismaClient } from "@prisma/client/extension";
import { Movie } from "./movie.js";

export class MoviesRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async create(data: Movie): Promise<void> {
        await this.prisma.movie.create({
            data: {
                title: data.title,
                year: data.year,
                winner: data.winner
            }
        });
    }
}