import env from './shared/env.js';
import { createApp } from './config/app.js';

const app = createApp();

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok', app_version: env.APP_VERSION
    });
});

app.listen(env.PORT, () => console.log('Server running on ' + env.PORT));