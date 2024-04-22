import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User, demoDb } from './demoDb';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private db: User[] = demoDb;
  constructor(private readonly configSevice: ConfigService) {}
  //login, authorizing password, publishing jwt
  login(req: LoginDto, res: Response) {
    const { email, password } = req;
    const userInfo = this.findUser(email);
    console.log(userInfo);
    //사용자 확인
    if (!userInfo) {
      console.log('ERROR: user does not exist');
      throw new NotFoundException('This user does not exist');
    }
    if (userInfo.password !== password) {
      console.log('ERROR: wrong password');
      throw new ForbiddenException('Wrong Password');
    }
    const tokenPayload = { ...userInfo };
    delete tokenPayload.password; //비밀번호는 제거하여 토큰에 전달
    try {
      //accessToken 발급
      const accessToken = jwt.sign(tokenPayload, this.getSecretKey('access'), {
        expiresIn: '1m', // 유효기간 1분
        issuer: 'yongtaecheon',
      });
      // refresh Token 발급
      const refreshToken = jwt.sign(
        tokenPayload,
        this.getSecretKey('refresh'),
        {
          expiresIn: '24h', // 유효기간 24시간
          issuer: 'yongtaecheon',
        },
      );
      //cookie에 토큰 저장하여 response 전달
      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });
      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });
      return { username: userInfo.username, loginType: 'initialLogin' };
    } catch (e) {
      console.log('ERROR: JWT not published');
      throw new InternalServerErrorException('Error on publishing JWT');
    }
  }
  logout(req: Request, res: Response) {
    //토큰 초기화, 삭제
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'this is for logout';
  }
  authToken(req: Request, res: Response, which: string) {
    try {
      let token, tokenPayload: any;
      if (which == 'access') {
        //access token 검증
        token = req.cookies.accessToken;
        tokenPayload = jwt.verify(token, this.getSecretKey('access'));
      } else if (which == 'refresh') {
        //refresh token 검증
        token = req.cookies.refreshToken;
        tokenPayload = jwt.verify(token, this.getSecretKey('refresh'));
      }
      console.log(tokenPayload);
      const userInfo = this.findUser(tokenPayload.email);
      const userInfoNoPwd = { ...userInfo };
      delete userInfoNoPwd.password; //비밀번호 제거
      if (which === 'access') {
        return { username: userInfo.username, loginType: 'accessToken' };
      } else if (which == 'refresh') {
        //access token 새로 발급
        const accessToken = jwt.sign(
          userInfoNoPwd,
          this.getSecretKey('access'),
          {
            expiresIn: '1m', // 유효기간 1분
            issuer: 'yongtaecheon',
          },
        );
        //cookie에 토큰 저장
        res.cookie('accessToken', accessToken, {
          secure: false,
          httpOnly: true,
        });
        return { username: userInfo.username, loginType: 'refreshToken' };
      }
    } catch (e) {
      console.log('ERROR: Token Expired or does not exist');
      throw new InternalServerErrorException('Token Expired or does not exist');
    }
  }
  private findUser(email: string): User {
    return this.db.filter((user) => user.email === email)[0];
  }
  private getSecretKey(which: string) {
    if (which === 'access') return this.configSevice.get('ACCESS_SECRET_KEY');
    else if (which === 'refresh')
      return this.configSevice.get('REFRESH_SECRET_KEY');
  }
}
