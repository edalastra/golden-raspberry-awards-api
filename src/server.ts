import env from './shared/env.js';
import { createApp } from './config/app.js';
import { seedDatabase } from './config/database/seed.js';

const startServer = async () => {
    await seedDatabase(env.CSV_PATH);

    const app = createApp();

    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'ok', app_version: env.APP_VERSION
        });
    });

    app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));
}

startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});