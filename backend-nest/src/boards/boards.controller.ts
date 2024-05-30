import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly authService: AuthService,
  ) {}
  @Get('/get')
  getPost() {
    return this.boardsService.getPost();
  }
  @Post('/create')
  createPost(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.authService.RefreshAccess(req, res);
    return this.boardsService.createPost(req);
  }
  @Patch('/modify/:id')
  modifyPost(
    @Param('id') id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.authService.RefreshAccess(req, res).username;
    return this.boardsService.modifyPost(id, req, username);
  }
  @Delete('/delete/:id')
  deletePost(
    @Param('id') id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = this.authService.RefreshAccess(req, res).username;
    return this.boardsService.deletePost(id, username);
  }
}
