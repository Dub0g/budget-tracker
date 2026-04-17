import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [PrismaModule, AuthModule],
})
export class CategoriesModule {}
