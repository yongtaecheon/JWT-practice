"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const demoDb_1 = require("./demoDb");
let BoardsService = class BoardsService {
    constructor() {
        this.db = demoDb_1.demoDb;
    }
    getPost() {
        console.log('getPost called');
        return this.db;
    }
    createPost(req) {
        const body = req.body;
        const newPost = { id: this.db.length + 1, ...body };
        console.log(newPost);
        this.db.push(newPost);
        return newPost;
    }
    modifyPost(id, req, username) {
        const body = req.body;
        let isExists = 0;
        this.db = this.db.map((p) => {
            if (p.id === id) {
                isExists = 1;
                if (p.username !== username)
                    throw new common_1.UnauthorizedException('이 게시글에 대한 권한이 없습니다.');
                p = { id, ...body };
                console.log(p);
            }
            return p;
        });
        if (!isExists)
            throw new common_1.NotFoundException('해당 게시글이 존재하지 않습니다.');
        return 'Post modified';
    }
    deletePost(id, username) {
        console.log('username:', username);
        const idx = this.db.findIndex((p) => {
            if (p.id === id) {
                if (p.username !== username)
                    throw new common_1.UnauthorizedException('이 게시글에 대한 권한이 없습니다.');
                console.log(p);
                return true;
            }
        });
        if (idx === -1)
            throw new common_1.NotFoundException('해당 게시글이 존재하지 않습니다.');
        this.db.splice(idx, 1);
        for (let i = idx; i < this.db.length; i++) {
            this.db[i].id -= 1;
        }
        return 'Post deleted';
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BoardsService);
//# sourceMappingURL=boards.service.js.map