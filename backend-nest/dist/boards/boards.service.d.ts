/// <reference types="cookie-parser" />
import { Board } from './demoDb';
import { Request } from 'express';
export declare class BoardsService {
    private db;
    constructor();
    getPost(): Board[];
    createPost(req: Request): {
        title: string;
        content: string;
        createdAt: string;
        username: string;
        id: number;
    };
    modifyPost(id: number, req: Request, username: string): string;
    deletePost(id: number, username: string): string;
}
