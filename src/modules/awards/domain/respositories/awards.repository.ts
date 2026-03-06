import { PrismaClient } from "@prisma/client";

export class AwardsRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async getMultipleWinners(): Promise<any[]> {
        const mutipleWin = await this.prisma.producers.findMany({
            where: {
                movies: {
                    some: {
                        winner: true
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        movies: {
                            where: {
                                winner: true
                            }
                        }
                    }
                },
                movies: {
                    where: {
                        winner: true
                    },
                    orderBy: {
                        year: 'asc'
                    }
                }
            }
        });
        
        return mutipleWin.filter(producer => producer._count.movies > 1)
    }
}