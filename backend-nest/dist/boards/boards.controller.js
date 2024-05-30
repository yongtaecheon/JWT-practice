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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const auth_service_1 = require("../auth/auth.service");
let BoardsController = class BoardsController {
    constructor(boardsService, authService) {
        this.boardsService = boardsService;
        this.authService = authService;
    }
    getPost() {
        return this.boardsService.getPost();
    }
    createPost(req, res) {
        this.authService.RefreshAccess(req, res);
        return this.boardsService.createPost(req);
    }
    modifyPost(id, req, res) {
        const username = this.authService.RefreshAccess(req, res).username;
        return this.boardsService.modifyPost(id, req, username);
    }
    deletePost(id, req, res) {
        const username = this.authService.RefreshAccess(req, res).username;
        return this.boardsService.deletePost(id, username);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Patch)('/modify/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "modifyPost", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "deletePost", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService,
        auth_service_1.AuthService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map