import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PacketService {
  private readonly logger = new Logger(PacketService.name);
}
