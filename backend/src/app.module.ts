import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, TestModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
