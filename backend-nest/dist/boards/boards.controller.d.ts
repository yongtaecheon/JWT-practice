/// <reference types="cookie-parser" />
import { BoardsService } from './boards.service';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class BoardsController {
    private readonly boardsService;
    private readonly authService;
    constructor(boardsService: BoardsService, authService: AuthService);
    getPost(): import("./demoDb").Board[];
    createPost(req: Request, res: Response): {
        title: string;
        content: string;
        createdAt: string;
        username: string;
        id: number;
    };
    modifyPost(id: number, req: Request, res: Response): string;
    deletePost(id: number, req: Request, res: Response): string;
}
