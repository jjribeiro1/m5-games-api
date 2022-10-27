import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    throw new Error('Method not implemented.');
  }
}
