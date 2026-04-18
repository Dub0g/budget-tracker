import { Controller, Get, Post, Body, Patch, Param, Delete ,Request,UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Post()
    create(@Body() dto: CreateTransactionDto,@Request() req) {
       
        const userId = req.user.id;
        return this.transactionsService.create(userId, dto);
    }

    @Get()
    findAll(@Request() req) {
        const userId = req.user.id;
        return this.transactionsService.findAll(userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: CreateTransactionDto) {
        // виклич transactionsService.update()
        return this.transactionsService.update(parseInt(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // виклич transactionsService.remove()
        return this.transactionsService.remove(parseInt(id));

    }
}