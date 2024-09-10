import * as joi from 'joi';

export const validationSchema = joi.object({
  // APPLICATION
  APP_NAME: joi.string().default('NestJS App'),
  APP_PORT: joi.number().default(3000),

  // ELASTICSEARCH
  ES_HOSTS: joi.string().required(),
  ES_USERNAME: joi.string().required(),
  ES_PASSWORD: joi.string().required(),
  ES_MAX_RESPONSE_SIZE: joi.string().default('100mb'),
  ES_REQUEST_TIMEOUT: joi.number().default(60000),
  ES_PING_TIMEOUT: joi.number().default(60000),

  // utils
  CRYPTO_SECRET: joi.string().default('secret'),
});
