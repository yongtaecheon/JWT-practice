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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const demoDb_1 = require("./demoDb");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(configSevice) {
        this.configSevice = configSevice;
        this.db = demoDb_1.demoDb;
    }
    login(req, res) {
        const { email, password } = req;
        const userInfo = this.findUser(email);
        console.log(userInfo);
        if (!userInfo) {
            console.log('ERROR: user does not exist');
            throw new common_1.NotFoundException('This user does not exist');
        }
        if (userInfo.password !== password) {
            console.log('ERROR: wrong password');
            throw new common_1.ForbiddenException('Wrong Password');
        }
        const tokenPayload = { ...userInfo };
        delete tokenPayload.password;
        try {
            const accessToken = jwt.sign(tokenPayload, this.getSecretKey('access'), {
                expiresIn: '1m',
                issuer: 'yongtaecheon',
            });
            const refreshToken = jwt.sign(tokenPayload, this.getSecretKey('refresh'), {
                expiresIn: '24h',
                issuer: 'yongtaecheon',
            });
            res.cookie('accessToken', accessToken, {
                secure: false,
                httpOnly: true,
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
        }
        catch (e) {
            console.log('ERROR: JWT not published');
            throw new common_1.InternalServerErrorException('Error on publishing JWT');
        }
    }
    logout(req, res) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return 'Logout Successfully';
    }
    authAccess(req) {
        try {
            const token = req.cookies.accessToken;
            const tokenPayload = jwt.verify(token, this.getSecretKey('access'));
            console.log(tokenPayload);
            const { password, ...userInfo } = this.findUser(tokenPayload.email);
            return {
                email: userInfo.email,
                username: userInfo.username,
                loginType: 'accessToken',
                exp: tokenPayload.exp,
            };
        }
        catch (e) {
            console.log('ERROR: Access Token Expired');
            throw new common_1.InternalServerErrorException('Access Token Expired');
        }
    }
    RefreshAccess(req, res) {
        try {
            const token = req.cookies.refreshToken;
            const tokenPayload = jwt.verify(token, this.getSecretKey('refresh'));
            console.log(tokenPayload);
            const { password, ...userInfo } = this.findUser(tokenPayload.email);
            const accessToken = jwt.sign(userInfo, this.getSecretKey('access'), {
                expiresIn: '1m',
                issuer: 'yongtaecheon',
            });
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
        }
        catch (e) {
            console.log('ERROR: Refresh Token Expired');
            throw new common_1.InternalServerErrorException('Refresh Token Expired');
        }
    }
    isEmailExist(email) {
        return this.findUser(email) ? 'exist' : 'notExist';
    }
    signup(info) {
        const newUser = { id: this.db.length + 1, ...info };
        console.log(newUser);
        this.db.push(newUser);
        return { username: info.username, email: info.email };
    }
    findUser(email) {
        return this.db.filter((user) => user.email === email)[0];
    }
    getSecretKey(which) {
        if (which === 'access')
            return this.configSevice.get('ACCESS_SECRET_KEY');
        else if (which === 'refresh')
            return this.configSevice.get('REFRESH_SECRET_KEY');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map