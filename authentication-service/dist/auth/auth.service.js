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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./schemas/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signup(signupBody) {
        const { username, password, tid, oid, aud, azp, name } = signupBody;
        const existingUser = await this.userModel.findOne({ username });
        if (existingUser) {
            throw new common_1.BadRequestException("User already exists");
        }
        const newUser = new this.userModel({
            username,
            password,
            tid,
            oid,
            aud,
            azp,
            name,
        });
        try {
            return await newUser.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to create user");
        }
    }
    async validateUser(loginBody) {
        try {
            const { username, password } = loginBody;
            const user = await this.userModel.findOne({ username });
            if (user && user.password === password) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
    }
    async login(user) {
        const tokenObj = {
            id: user._id,
            username: user.username,
            tid: user.tid,
            oid: user.oid,
            aud: user.aud,
            azp: user.azp,
        };
        console.log(tokenObj);
        return this.jwtService.sign(tokenObj);
    }
    async getUsers() {
        const users = this.userModel.findOne({ username: 'Yash' });
        return users;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map