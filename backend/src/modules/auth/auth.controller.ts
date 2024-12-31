import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { LocalAuthGuard } from 'src/common/guards/local.guard';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() userPayload: Prisma.UsersCreateInput) {
    return this.authService.createUser(userPayload)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLoginWithGoogle() {
    return { message: 'Google authentication' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Req() request: Request) {
    return request.user;
  }
}
