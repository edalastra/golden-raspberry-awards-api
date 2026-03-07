import env from "./shared/env.js";
import { createApp } from "./config/app.js";
import { seedDatabase } from "./config/database/seed.js";
import { logger } from "./shared/utils/logger.js";

const startServer = async () => {
    await seedDatabase(env.CSV_PATH);

    const app = createApp();

    app.listen(env.PORT, () => logger.info("Server running on " + env.PORT));
}

startServer().catch(error => {
    logger.error("Error starting server:", error);
    process.exit(1);
});