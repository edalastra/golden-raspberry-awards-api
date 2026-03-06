import packageJson from '../../package.json' with { type: 'json' };
const version = packageJson.version;
const appName = packageJson.name;


export default {
    APP_VERSION: version,
    APP_NAME: appName,
    PORT: process.env.PORT || 3000,
    DATABASE_URL:"file:./dev.db",
    BATCH_SIZE: 1000,
    CSV_PATH: 'src/data/movielist.csv'
};