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
import { SignupDto } from './dto/signup.dto';

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
        secure: false, // https에서만 쿠키 전송
        httpOnly: true, //js에서 접근 불가능(XSS 방지), http를 통해서만 접근 가능
      });
      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });
      return {
        email: userInfo.email,
        username: userInfo.username,
        loginType: 'initialLogin',
      };
    } catch (e) {
      console.log('ERROR: JWT not published');
      throw new InternalServerErrorException('Error on publishing JWT');
    }
  }
  logout(req: Request, res: Response) {
    //토큰 초기화, 삭제
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'Logout Successfully';
  }
  authAccess(req: Request) {
    try {
      //access token 검증
      const token = req.cookies.accessToken;
      const tokenPayload: any = jwt.verify(token, this.getSecretKey('access'));
      console.log(tokenPayload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = this.findUser(tokenPayload.email);
      return {
        email: userInfo.email,
        username: userInfo.username,
        loginType: 'accessToken',
        exp: tokenPayload.exp,
      };
    } catch (e) {
      console.log('ERROR: Access Token Expired');
      throw new InternalServerErrorException('Access Token Expired');
    }
  }
  RefreshAccess(req: Request, res: Response) {
    try {
      //refresh token 검증
      const token = req.cookies.refreshToken;
      const tokenPayload: any = jwt.verify(token, this.getSecretKey('refresh'));
      console.log(tokenPayload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = this.findUser(tokenPayload.email);
      //access token 새로 발급
      const accessToken = jwt.sign(userInfo, this.getSecretKey('access'), {
        expiresIn: '1m', // 유효기간 1분
        issuer: 'yongtaecheon',
      });
      //cookie에 토큰 저장
      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });
      return {
        email: userInfo.email,
        username: userInfo.username,
        loginType: 'refreshToken',
        exp: tokenPayload.exp,
      };
    } catch (e) {
      console.log('ERROR: Refresh Token Expired');
      throw new InternalServerErrorException('Refresh Token Expired');
    }
  }
  isEmailExist(email: string) {
    // 이메일 중복확인
    return this.findUser(email) ? 'exist' : 'notExist';
  }
  signup(info: SignupDto) {
    //회원 가입
    const newUser = { id: this.db.length + 1, ...info };
    console.log(newUser);
    this.db.push(newUser);
    return { username: info.username, email: info.email };
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
