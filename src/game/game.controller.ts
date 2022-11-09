import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OnlyAdmin } from 'src/auth/only-admin.decorator';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.gameService.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(false)
  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(false)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gameService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
