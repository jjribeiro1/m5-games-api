import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Profile> {
    return this.prisma.profile
      .findUniqueOrThrow({
        where: { id },
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

  async findOne(id: number): Promise<Profile> {
    return this.findById(id);
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
