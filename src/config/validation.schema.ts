import * as joi from 'joi';

export const validationSchema = joi.object({
  APP_NAME: joi.string().default('NestJS App'),
  APP_PORT: joi.number().default(3000),
  API_PREFIX: joi.string().default('api'),
});
