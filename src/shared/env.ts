import packageJson from '../../package.json' with { type: 'json' };
const version = packageJson.version;

export default {
    APP_VERSION: version,
    PORT: process.env.PORT || 3000
};