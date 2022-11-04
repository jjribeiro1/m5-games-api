import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateFavoriteDto) {
    return this.prisma.favoriteGame.create({
      data: {
        gameId: dto.gameId,
        profiles: {
          createMany: {
            data: {
              profileId: dto.profileId,
            },
          },
        },
      },
      select: {
        game: true,
      },
    });
  }

  async findAll() {
    return this.prisma.favoriteGame.findMany({
      select: {
        game: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
