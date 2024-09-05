import { PartialType } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/create-user.dto';

export class LoginDto extends PartialType(CreateUserDto) {}
