import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.dto';
import { UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @Request() req) {
    // виклич categoriesService.create()
    // але звідки взяти userId? 🤔
    const userId = req.user.id;
    return this.categoriesService.create(userId, dto);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.categoriesService.findAll(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
    // виклич categoriesService.update()
    return this.categoriesService.update(parseInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // виклич categoriesService.remove()
    return this.categoriesService.remove(parseInt(id));
  }
}