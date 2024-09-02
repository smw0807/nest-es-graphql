import { registerAs } from '@nestjs/config';

export default registerAs('elastic', () => ({
  ES_HOSTS: process.env.ES_HOSTS || 'http://localhost:9200',
  ES_USERNAME: process.env.ES_USERNAME,
  ES_PASSWORD: process.env.ES_PASSWORD,
  ES_MAX_RESPONSE_SIZE: process.env.ES_MAX_RESPONSE_SIZE || '100mb',
  ES_REQUEST_TIMEOUT: +process.env.ES_REQUEST_TIMEOUT || 60000,
  ES_PING_TIMEOUT: +process.env.ES_PING_TIMEOUT || 60000,
  ES_INDEX_VER: process.env.ES_INDEX_VER || '0.0',
}));
