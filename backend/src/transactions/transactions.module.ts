import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [PrismaModule, AuthModule],
})
export class TransactionsModule {}