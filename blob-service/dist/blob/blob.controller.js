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
exports.BlobController = void 0;
const common_1 = require("@nestjs/common");
const blob_service_1 = require("./blob.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("./auth.guard");
const multerOptions = {
    dest: 'tmp/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
};
let BlobController = class BlobController {
    constructor(blobService) {
        this.blobService = blobService;
    }
    async uploadImage(req) {
        const token = req.token;
        const base64 = req.base64;
        return this.blobService.storeImage(base64, token);
    }
    async getBlob(params, res) {
        const id = params.id;
        console.log(id + "From blob controller");
        return this.blobService.getBlob(id, res);
    }
};
exports.BlobController = BlobController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multerOptions)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlobController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlobController.prototype, "getBlob", null);
exports.BlobController = BlobController = __decorate([
    (0, common_1.Controller)('blob'),
    __metadata("design:paramtypes", [blob_service_1.BlobService])
], BlobController);
//# sourceMappingURL=blob.controller.js.map