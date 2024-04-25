/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refreshAccess(req: Request, res: Response): {
        email: string;
        username: string;
        loginType: string;
        exp: any;
    };
    isEmailExist(req: {
        email: string;
    }): "exist" | "notExist";
    signup(req: SignupDto): {
        username: string;
        email: string;
    };
}
