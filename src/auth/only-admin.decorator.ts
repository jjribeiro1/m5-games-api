import { SetMetadata } from '@nestjs/common';

export const ADMIN_KEY = 'admin';
export const OnlyAdmin = (option: boolean) => SetMetadata(ADMIN_KEY, option);
