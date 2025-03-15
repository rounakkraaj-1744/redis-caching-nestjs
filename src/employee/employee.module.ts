import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'prisma/prisma.service';
import { EmployeeService } from './employee.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [EmployeeController],
  providers: [PrismaService, EmployeeService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  // providers: [PrismaService, EmployeeService],
  imports: [CacheModule.register()]
})
export class EmployeeModule {}
