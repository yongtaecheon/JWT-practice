import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() req: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req, res);
  }
  @Delete('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
  @Get('/access') //access token 유효성 검증
  authAccess(@Req() req: Request) {
    return this.authService.authAccess(req);
  }
  @Patch('/refresh') //refresh token으로 access token 재발급
  refreshAccess(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.RefreshAccess(req, res);
  }
  @Post('/signup/check')
  isEmailExist(@Body() req: { email: string }) {
    return this.authService.isEmailExist(req.email);
  }
  @Put('/signup')
  signup(@Body() req: SignupDto) {
    return this.authService.signup(req);
  }
}
