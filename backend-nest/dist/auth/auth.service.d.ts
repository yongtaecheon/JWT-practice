/// <reference types="cookie-parser" />
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
export declare class AuthService {
    private readonly configSevice;
    private db;
    constructor(configSevice: ConfigService);
    login(req: LoginDto, res: Response): {
        username: string;
        loginType: string;
    };
    logout(req: Request, res: Response): string;
    authToken(req: Request, res: Response, which: string): {
        username: string;
        loginType: string;
    };
    private findUser;
    private getSecretKey;
}
