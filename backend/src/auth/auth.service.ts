import { ConflictException, UnauthorizedException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {

    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new ConflictException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });

    const token = await this.jwt.signAsync({ id: user.id });
    
    return { token };
  }
  async login(dto: LoginDto) {

        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!existingUser) throw new UnauthorizedException('Invalid email');

        const isPasswordValid = await bcrypt.compare(dto.password, existingUser.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

        const token = await this.jwt.signAsync({ id: existingUser.id });
        
        return { token };
  }
}