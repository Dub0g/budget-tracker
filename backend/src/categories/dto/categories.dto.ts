
import { CategoryType } from '@prisma/client';

export class CreateCategoryDto {
  name!: string;
  type!: CategoryType;
  
}