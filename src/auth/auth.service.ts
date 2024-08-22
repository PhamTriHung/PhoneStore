import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import passport from 'passport';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...newUser } = await this.usersService.create(
      createUserDto,
    );

    return newUser;
  }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (bcrypt.compareSync(password, user.password)) {
      const { password, ...newUser } = user;
      return newUser;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, oldPassword, newPassword } = changePasswordDto;
    const user = await this.usersService.findOneByEmail(email);

    if (bcrypt.compareSync(oldPassword, user.password)) {
      this.usersService.update({ email, password: newPassword });
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    this.usersService.update(resetPasswordDto);
  }
}
