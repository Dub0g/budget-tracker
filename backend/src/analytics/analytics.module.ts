import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  imports: [PrismaModule, AuthModule],
})
export class AnalyticsModule {}
