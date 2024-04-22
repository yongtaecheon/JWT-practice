import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

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
  authAccess(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.authToken(req, res, 'access');
  }
  @Patch('/refresh') //refresh token으로 access token 재발급
  refreshAccess(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.authToken(req, res, 'refresh');
  }
}
