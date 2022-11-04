import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.profile
      .findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          userId: true,
          name: true,
          image: true,
          favoriteGames: {
            select: {
              favoriteGame: {
                select: {
                  game: true,
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

  async create(dto: CreateProfileDto): Promise<Profile> {
    const data: Prisma.ProfileCreateInput = {
      name: dto.name,
      image: dto.image,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };
    return this.prisma.profile.create({ data });
  }

  async findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findOne(id: number) {
    return this.findById(id);
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    await this.findById(id);
    const data: Partial<Profile> = { ...dto };

    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
