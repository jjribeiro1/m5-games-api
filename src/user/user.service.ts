import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findById(id: number): Promise<User> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id },
        select: {
          ...this.UserSelect,
          profiles: {
            select: {
              id: true,
              name: true,
              image: true,
              favoriteGames: {
                select: {
                  favoriteGame: {
                    select: {
                      gameId: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch((err) => {
        throw new NotFoundException(err.message);
      });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const findByUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (findByUsername) {
      throw new BadRequestException('username deve ser único');
    }
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .create({ data, select: this.UserSelect })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: this.UserSelect });
  }

  async findOne(id: number): Promise<User> {
    return this.findById(id);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

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
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
