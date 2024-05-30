import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Board, demoDb } from './demoDb';
import { BoardsDto } from './dto/board.dto';
import { Request } from 'express';

@Injectable()
export class BoardsService {
  private db: Board[] = demoDb;
  constructor() {}
  getPost() {
    console.log('getPost called');
    return this.db;
  }
  createPost(req: Request) {
    const body: BoardsDto = req.body;
    const newPost = { id: this.db.length + 1, ...body };
    console.log(newPost);
    this.db.push(newPost);
    return newPost;
  }
  modifyPost(id: number, req: Request, username: string) {
    const body: BoardsDto = req.body;
    let isExists = 0;
    this.db = this.db.map((p: Board) => {
      if (p.id === id) {
        isExists = 1;
        if (p.username !== username)
          throw new UnauthorizedException('이 게시글에 대한 권한이 없습니다.');
        p = { id, ...body };
        console.log(p);
      }
      return p;
    });
    if (!isExists)
      throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    return 'Post modified';
  }
  deletePost(id: number, username: string) {
    console.log('username:', username);
    const idx = this.db.findIndex((p) => {
      if (p.id === id) {
        if (p.username !== username)
          throw new UnauthorizedException('이 게시글에 대한 권한이 없습니다.');
        console.log(p);
        return true;
      }
    });
    if (idx === -1)
      throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    this.db.splice(idx, 1);
    for (let i = idx; i < this.db.length; i++) {
      this.db[i].id -= 1;
    }
    return 'Post deleted';
  }
}
