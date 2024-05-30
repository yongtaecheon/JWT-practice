import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [BoardsService, AuthService],
  controllers: [BoardsController],
})
export class BoardsModule {}
