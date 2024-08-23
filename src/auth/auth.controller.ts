import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
    changePasswordDto.email = req.user.email;
    return this.authService.changePassword(changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    this.authService.resetPassword(resetPasswordDto);
  }
}
