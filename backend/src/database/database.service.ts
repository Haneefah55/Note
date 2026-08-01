import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
		//console.log('DATABASE_URL:', process.env.DATABASE_URL)
		
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }


  async onModuleInit() {
    await this.checkConnection();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  
  async checkConnection(): Promise<boolean> {
    try {
      
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connected successfully.');
      return true;
    } catch (error) {
      this.logger.error('Database connection error:', error);
      return false;
    }
  }
}
