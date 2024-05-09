import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'jwt_practice',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  /*
  synchronize: 서버 실행때 엔티티 변경시 테이블 새로 만듦
  테이블 drop후 다시 생성이므로 데이터 모두 삭제됨.
  */
  logging: true, //ORM 작동마다 rawQuery 콘솔에 보여줌
};
