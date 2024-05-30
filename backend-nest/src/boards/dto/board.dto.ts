import { IsString } from 'class-validator';

export class BoardsDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  createdAt: string;
  @IsString()
  username: string;
}
