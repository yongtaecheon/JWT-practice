/// <reference types="cookie-parser" />
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private readonly configSevice;
    private db;
    constructor(configSevice: ConfigService);
    login(req: LoginDto, res: Response): {
        email: string;
        username: string;
        loginType: string;
    };
    logout(req: Request, res: Response): string;
    authAccess(req: Request): {
        email: string;
        username: string;
        loginType: string;
        exp: any;
    };
    RefreshAccess(req: Request, res: Response): {
        email: string;
        username: string;
        loginType: string;
        exp: any;
    };
    isEmailExist(email: string): "exist" | "notExist";
    signup(info: SignupDto): {
        username: string;
        email: string;
    };
    private findUser;
    private getSecretKey;
}
