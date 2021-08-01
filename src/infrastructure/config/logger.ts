import pino from 'pino';

export const logger = pino({
    name: 'blog',
    level: 'debug',
});