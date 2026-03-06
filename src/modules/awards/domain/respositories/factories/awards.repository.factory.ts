import { AwardsRepository } from "../awards.repository.js";
import { prisma } from "../../../../../config/database/prisma.client.js";

export const awardsRepositoryFactory = (): AwardsRepository => {
    return new AwardsRepository(prisma)
}