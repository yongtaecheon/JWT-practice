/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: LoginDto, res: Response): {
        username: string;
        loginType: string;
    };
    logout(req: Request, res: Response): string;
    authAccess(req: Request, res: Response): {
        username: string;
        loginType: string;
    };
    refreshAccess(req: Request, res: Response): {
        username: string;
        loginType: string;
    };
}
