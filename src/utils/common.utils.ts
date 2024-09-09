import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class CommonUtilsService {
  constructor(private readonly configService: ConfigService) {}

  cryptoPassword(password: string): string {
    const secret = password + this.configService.get('CRYPTO_SECRET');
    return createHash('sha256').update(secret).digest('base64');
  }
}
