import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAnalyticsDto } from './dto/analytics.dto';



@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}
  
  async getSummary(userId: number, dto: GetAnalyticsDto) {
    // 1. Знайди всі транзакції юзера за період
    // Підказка: where може містити date фільтр:
    // date: { gte: dto.from, lte: dto.to }
    const transactions = await this.prisma.transaction.findMany({
  where: {
    userId: userId,
    date: {
      gte: dto.from ? new Date(dto.from) : undefined,
      lte: dto.to ? new Date(dto.to) : undefined,
    },
  },
  include: { category: true },
});

    // 2. Порахуй загальний дохід (всі транзакції де type === 'INCOME')
    // Підказка: transactions.filter(...).reduce(...)
    const totalIncome = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    // 3. Порахуй загальні витрати (всі транзакції де type === 'EXPENSE')
    const totalExpenses = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    // 4. Порахуй баланс (дохід - витрати)
    const balance = totalIncome - totalExpenses;

    // 5. Порахуй суму по категоріях
    // Підказка: групуй транзакції по categoryId
    
    const byCategory = transactions.reduce((acc, transaction) => {
    const categoryName = transaction.category.name;
  
  if (!acc[categoryName]) {
    acc[categoryName] = 0; // якщо категорії ще немає — створюємо з 0
  }
  
  acc[categoryName] += transaction.amount; // додаємо суму
  
  return acc;
}, {} as Record<string, number>);
    // 6. Поверни об'єкт з результатами
    return {
      totalIncome,
      totalExpenses,
      balance,
      byCategory,
    };
  }
}