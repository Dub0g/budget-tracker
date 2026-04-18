import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateTransactionDto) {
    // створи транзакцію в базі
    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        type: dto.type,
        description: dto.description,
        date: dto.date,
        categoryId: dto.categoryId,
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    // знайди всі транзакції юзера
    // включи дані категорії (підказка: include: { category: true })
    return this.prisma.transaction.findMany({
      where: { userId: userId },
      include: { category: true },
    });
  }

  async update(id: number, dto: CreateTransactionDto) {
    // оновити транзакцію по id
    return this.prisma.transaction.update({
      where: { id: id },
      data: {
        amount: dto.amount,
        type: dto.type,
        description: dto.description,
        date: dto.date,
        categoryId: dto.categoryId,
      },
    });
  }

  async remove(id: number) {
    // видалити транзакцію по id
    return this.prisma.transaction.delete({
      where: { id: id },
    });
  }
}