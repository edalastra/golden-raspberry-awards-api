import { PrismaClient } from "@prisma/client/extension";
import { Producer } from "./producer.js";

export class ProducersRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async create(data: Producer): Promise<void> {
        await this.prisma.producer.create({
            data: {
                name: data.name
            }
        });
    }
}