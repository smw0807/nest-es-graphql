import { LinkType } from 'pcap';

export type PcapPacket = {
  link_type: LinkType;
  pcap_header: PcapHeader;
  payload: EthernetPacket;
  emitter?: any;
};

export type PcapHeader = {
  tv_sec: number; // Timestamp seconds
  tv_usec: number; // Timestamp microseconds
  caplen: number; // Length of packet saved in capture
  len: number; // Original packet length
};

export type EthernetPacket = {
  emitter?: any;
  dhost: EthernetAddr;
  shost: EthernetAddr;
  ethertype: number; // Likely to be a constant for IP (2048)
  vlan: null | number;
  saddr: IPv4Addr;
  daddr: IPv4Addr;
  payload: IPv4;
};

export type EthernetAddr = {
  addr: number[]; // Array of 6 numbers representing MAC address
};

export type IPv4 = {
  emitter?: any;
  version: number;
  headerLength: number;
  diffserv: number;
  length: number;
  identification: number;
  flags: IPFlags;
  fragmentOffset: number;
  ttl: number;
  protocol: number; // Likely to be constants such as TCP (6)
  headerChecksum: number;
  saddr: IPv4Addr;
  daddr: IPv4Addr;
  protocolName?: string;
  payload: TCP;
};

export type IPFlags = {
  emitter?: any;
  reserved: boolean;
  doNotFragment: boolean;
  moreFragments: boolean;
};

export type IPv4Addr = {
  addr: number[]; // Array of 4 numbers representing IPv4 address
};

export type TCP = {
  emitter?: any;
  sport: number; // Source port
  dport: number; // Destination port
  seqno: number; // Sequence number
  ackno: number; // Acknowledgement number
  headerLength: number;
  reserved?: any;
  flags: TCPFlags;
  windowSize: number;
  checksum: number;
  urgentPointer: number;
  options: TCPOptions;
  data?: Uint8Array; // Optional payload, since it could be null
  dataLength: number;
};

export type TCPFlags = {
  emitter?: any;
  nonce: boolean;
  cwr: boolean;
  ece: boolean;
  urg: boolean;
  ack: boolean;
  psh: boolean;
  rst: boolean;
  syn: boolean;
  fin: boolean;
};

export type TCPOptions = {
  mss: null | number;
  window_scale: null | number;
  sack_ok: null | boolean;
  sack: null | any;
  timestamp: null | any;
  echo: null | any;
};
