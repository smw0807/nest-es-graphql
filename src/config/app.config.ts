import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'NestJS App',
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  API_PREFIX: process.env.API_PREFIX || 'api',
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'secret',
}));
