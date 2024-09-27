import { RegisterIndex } from '@codemask-labs/nestjs-elasticsearch';

@RegisterIndex('traffic')
export class PacketDocument {
  readonly linkType: string;
  readonly dhost: string;
  readonly shost: string;
  readonly ttl: number;
  readonly saddr: string;
  readonly daddr: string;
  readonly sport: number;
  readonly dport: number;
  readonly hexData: number;
  readonly stringData: string;
  readonly dataLength: number;
  readonly createdAt: Date;
}
