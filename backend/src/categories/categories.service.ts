import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/categories.dto';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateCategoryDto) {
    // створи категорію в базі
    // userId береться з токена (не від клієнта)
    return this.prisma.category.create({
      data: {
        name: dto.name,
        type: dto.type,
        userId: userId,
      },
    });

  }

  async findAll(userId: number) {
    // знайди всі категорії де userId збігається
    return this.prisma.category.findMany({
      where: { userId: userId },
    });
   
  }

  async update(id: number, dto: CreateCategoryDto) {
    // оновити категорію по id
    return this.prisma.category.update({
      where: { id: id },
      data: {
        name: dto.name,
        type: dto.type,
      },
    });
  }

  async remove(id: number) {
    // видалити категорію по id
    return this.prisma.category.delete({
      where: { id: id },
    });
  }
}