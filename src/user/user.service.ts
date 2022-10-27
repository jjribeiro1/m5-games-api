import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private UserSelect = {
    id: true,
    name: true,
    username: true,
    password: false,
    isAdmin: true,
  };
  async create(dto: CreateUserDto): Promise<User> {
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user.create({ data, select: this.UserSelect });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: this.UserSelect });
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id },
        select: this.UserSelect,
      })
      .catch((err) => {
        throw new NotFoundException(err.message);
      });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.prisma.user
      .findUniqueOrThrow({
        where: { id },
      })
      .catch((err) => {
        throw new NotFoundException(err.message);
      });

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.UserSelect,
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
