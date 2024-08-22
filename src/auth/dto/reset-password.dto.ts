import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from 'src/users/dto/create-user.dto';

export class ResetPasswordDto extends PartialType(CreateUserDto) {}
