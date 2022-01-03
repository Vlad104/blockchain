import crypto from 'crypto';

export class Crypto {
  static hash(data: string) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
