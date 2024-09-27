import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'NestJS App',
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  APP_ROLE: process.env.APP_ROLE || 'producer',
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || 'secret',
}));
