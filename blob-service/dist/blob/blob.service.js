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
exports.BlobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let jobIdCounter = 1;
let BlobService = class BlobService {
    constructor(blobModel) {
        this.blobModel = blobModel;
    }
    async storeImage(base64, token) {
        try {
            const newBlob = await this.blobModel.create({
                id: jobIdCounter++,
                base64,
                token,
                status: "PENDING"
            });
            return newBlob;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getBlob(id, res) {
        console.log(id);
        try {
            const blob = await this.blobModel.findOne({ id });
            if (!blob) {
                return res.status(404).json({
                    msg: "Blob not found with given id",
                });
            }
            return res.status(200).json(blob);
        }
        catch (error) {
            return res.status(500).json({
                msg: 'An error occurred while retrieving the blob',
                error: error.message,
            });
        }
    }
};
exports.BlobService = BlobService;
exports.BlobService = BlobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Blob.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlobService);
//# sourceMappingURL=blob.service.js.map