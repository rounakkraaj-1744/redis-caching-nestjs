import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    EmployeeModule,
    JwtModule.register({
      global: true,
      secret: '7777777',
      signOptions: { expiresIn: '600s' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
  ],
  providers: [PrismaService]
})

export class AppModule { }