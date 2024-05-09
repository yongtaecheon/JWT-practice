import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), //환경변수 load module
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardsModule, // ORM
  ],
  controllers: [AppController, BoardsController],
  providers: [AppService],
})
export class AppModule {}
