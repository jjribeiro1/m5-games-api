import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login(dto: LoginDto) {
    const { username, password } = dto;

    const user: User = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }

    return `success`;
  }
}
