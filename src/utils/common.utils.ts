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

  //10진수 배열 -> 16진수
  decToHex(dec: number[]): string {
    return dec.map((num) => num.toString(16).padStart(2, '0')).join(':');
  }
  //16진수 -> Hex
  hexToDec(bufferData: Uint8Array): string {
    if (!bufferData) return null;
    return Array.from(bufferData)
      .map((num) => num.toString(16).padStart(2, '0'))
      .join(' ');
  }

  //hex -> string
  hexToString(bufferData: Uint8Array): string {
    if (!bufferData) return null;
    return Array.from(bufferData)
      .map((byte) => String.fromCharCode(byte, 16)) // 16진수를 10진수로 바꾼 후 ASCII로 변환
      .join('');
  }

  formatIP(addr: number[]): string {
    if (!addr) return null;
    if (addr.length === 4) return this.formatIPv4(addr);
    if (addr.length === 16) return this.formatIPv6(addr);
  }

  formatIPv4(addr: number[]): string {
    return addr.join('.');
  }

  formatIPv6(addr: number[]): string {
    return addr
      .reduce((acc, num, index) => {
        // 두 바이트마다 묶어 16진수로 변환
        if (index % 2 === 0) {
          const hexPart =
            num.toString(16).padStart(2, '0') +
            addr[index + 1].toString(16).padStart(2, '0');
          acc.push(hexPart);
        }
        return acc;
      }, [] as string[])
      .join(':');
  }
}
