import { Injectable } from '@nestjs/common';
import { db } from './db';
import { sql } from 'drizzle-orm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
