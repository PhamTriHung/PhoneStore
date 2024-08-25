import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { validate, ValidationError } from 'class-validator';
import CreateUserDto from 'src/users/dto/create-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const loginDto: CreateUserDto = {
      email,
      password,
    };
    console.log(loginDto);

    const validationError: ValidationError[] = await validate(loginDto);
    console.log(validationError);

    if (validationError.length !== 0) {
      console.log(validationError);
    }
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
