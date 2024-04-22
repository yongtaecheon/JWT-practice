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
            return { username: userInfo.username, loginType: 'initialLogin' };
        }
        catch (e) {
            console.log('ERROR: JWT not published');
            throw new common_1.InternalServerErrorException('Error on publishing JWT');
        }
    }
    logout(req, res) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return 'this is for logout';
    }
    authToken(req, res, which) {
        try {
            let token, tokenPayload;
            if (which == 'access') {
                token = req.cookies.accessToken;
                tokenPayload = jwt.verify(token, this.getSecretKey('access'));
            }
            else if (which == 'refresh') {
                token = req.cookies.refreshToken;
                tokenPayload = jwt.verify(token, this.getSecretKey('refresh'));
            }
            console.log(tokenPayload);
            const userInfo = this.findUser(tokenPayload.email);
            const userInfoNoPwd = { ...userInfo };
            delete userInfoNoPwd.password;
            if (which === 'access') {
                return { username: userInfo.username, loginType: 'accessToken' };
            }
            else if (which == 'refresh') {
                const accessToken = jwt.sign(userInfoNoPwd, this.getSecretKey('access'), {
                    expiresIn: '1m',
                    issuer: 'yongtaecheon',
                });
                res.cookie('accessToken', accessToken, {
                    secure: false,
                    httpOnly: true,
                });
                return { username: userInfo.username, loginType: 'refreshToken' };
            }
        }
        catch (e) {
            console.log('ERROR: Token Expired or does not exist');
            throw new common_1.InternalServerErrorException('Token Expired or does not exist');
        }
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