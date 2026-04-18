
import { CategoryType } from '@prisma/client';

export class CreateTransactionDto {
    amount!: number;
    type!: CategoryType;
    description?: string;
    categoryId!: number;
    date?: Date;
}