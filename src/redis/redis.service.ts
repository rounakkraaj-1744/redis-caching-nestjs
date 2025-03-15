import { Injectable } from '@nestjs/common';
import * as redis from 'redis';

@Injectable()
export class RedisService {
  private client: any;

  constructor() {
    this.client = redis.createClient({
      url: 'redis://localhost:6379',
    });

    this.client
      .connect()
      .then(() => {
        console.log('Connected to Redis');
      })
      .catch((err: any) => {
        console.error('Failed to connect to Redis', err);
      });
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, p0: number): Promise<void> {
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}