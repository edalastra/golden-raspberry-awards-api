import { createLogger, transports, config } from 'winston';
import env from '../env.js';

export const logger = createLogger({
  levels: config.syslog.levels,
  transports: [new transports.Console()],
  defaultMeta: { 
    service: env.APP_NAME, 
    version: env.APP_VERSION,
    timestamp: new Date().toISOString()
   },
});
