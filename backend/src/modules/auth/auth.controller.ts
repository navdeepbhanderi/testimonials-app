import { BadGatewayException, Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { LocalAuthGuard } from 'src/common/guards/local.guard';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() userPayload: UserDto) {
    const createUser = await this.authService.createUser(userPayload);
    if (createUser) {
      return { message: 'We have registerd you self, Please login to continue', status: true }
    } else {
      throw BadGatewayException;
    }
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
  async handleRedirect(@Req() request: Request, @Res() res: Response) {
    const token = await this.authService.login(request.user);
    res.redirect(`http://localhost:4200/dashboard?token=${token.access_token}`);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // getUserDetails(@Param('id', ParseIntPipe) id:number, @Req() request: Request) {
  //   return request.user;
  // }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Req() request: Request) {
    const { id, exp, iat, ...user }: any = request.user;
    return user;
  }
}
